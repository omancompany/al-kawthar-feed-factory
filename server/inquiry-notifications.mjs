import {DatabaseSync} from 'node:sqlite';
import {pathToFileURL} from 'node:url';
export function prepareNotificationStore(db){
 db.exec(`CREATE TABLE IF NOT EXISTS inquiry_notifications (
 id TEXT PRIMARY KEY, inquiry_id TEXT NOT NULL UNIQUE,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','sending','sent','uncertain')),
 attempts INTEGER NOT NULL DEFAULT 0, claimed TEXT);`);
}
export function claimNotification(db){
 return db.prepare(`UPDATE inquiry_notifications SET status='sending',attempts=attempts+1,claimed=?
 WHERE id=(SELECT id FROM inquiry_notifications WHERE status='pending' ORDER BY rowid LIMIT 1)
 AND status='pending' RETURNING *`).get(new Date().toISOString());
}
export async function dispatchInquiryNotifications(db,send,limit=20){
 if(!send)return {configured:false,sent:0};
 let sent=0;
 for(let i=0;i<Math.min(100,limit);i++){
  const row=claimNotification(db);if(!row)break;
  try{await send({id:row.id,inquiryId:row.inquiry_id,messageId:`<inquiry-${row.id}@notifications.invalid>`})}
  catch{db.prepare("UPDATE inquiry_notifications SET status='uncertain' WHERE id=? AND status='sending' AND attempts=?").run(row.id,row.attempts);continue}
  db.prepare("UPDATE inquiry_notifications SET status='sent' WHERE id=? AND status='sending' AND attempts=?").run(row.id,row.attempts);sent++;
 }
 return {configured:true,sent};
}
export function configuredNotificationSender(env=process.env){
 const {INQUIRY_EMAIL_URL:url,INQUIRY_EMAIL_KEY:key,INQUIRY_EMAIL_TO:to,PUBLIC_URL:site}=env;
 if(!url&&!key&&!to)return null;
 if(!url||!key||key.length<32||!to||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to))throw Error('Inquiry email configuration incomplete');
 const endpoint=new URL(url),publicUrl=new URL(site);
 if(endpoint.username||endpoint.password||endpoint.protocol!=='https:'||publicUrl.protocol!=='https:')throw Error('Inquiry email requires HTTPS and no URL credentials');
 return async row=>{
  const response=await fetch(endpoint,{method:'POST',signal:AbortSignal.timeout(15000),headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({to,subject:'طلب مبيعات جديد',text:`وصل طلب جديد: ${row.inquiryId}\nراجع الطلب من قائمة المبيعات: ${publicUrl.origin}/admin`,messageId:row.messageId})});
  // A timeout or unclear result is held, never automatically retried.
  if(!response.ok)throw Error('Inquiry email not confirmed');
  const confirmation=await response.json();if(confirmation.ok!==true)throw Error('Inquiry email not confirmed');
 };
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 if(!process.env.INQUIRY_DATA_FILE)throw Error('INQUIRY_DATA_FILE is required');
 const db=new DatabaseSync(process.env.INQUIRY_DATA_FILE);prepareNotificationStore(db);
 try{console.log(JSON.stringify(await dispatchInquiryNotifications(db,configuredNotificationSender())))}finally{db.close()}
}
