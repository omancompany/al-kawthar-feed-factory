import test from 'node:test';import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';
import {createInquiryApp} from '../server/inquiries.mjs';
import {claimNotification,dispatchInquiryNotifications,configuredNotificationSender} from '../server/inquiry-notifications.mjs';
const password='synthetic-admin-password-at-least20';
const auth='Basic '+Buffer.from('admin:'+password).toString('base64');
async function fixture(run){const folder=mkdtempSync(join(tmpdir(),'inquiry-outbox-'));const file=join(folder,'data.sqlite');const {app,db}=createInquiryApp({databasePath:file,publicUrl:'https://site.example.test',adminPassword:password});const server=await new Promise(r=>{const s=app.listen(0,'127.0.0.1',()=>r(s))});try{await run('http://127.0.0.1:'+server.address().port,db,file)}finally{await new Promise(r=>server.close(r));db.close();rmSync(folder,{recursive:true,force:true})}}
const submit=(base,details='Synthetic only')=>fetch(base+'/api/inquiries',{method:'POST',headers:{Origin:'https://site.example.test','Content-Type':'application/json'},body:JSON.stringify({kind:'quote',name:'Synthetic client',phone:'96890000000',details,consent:true})});
test('request and pending notification persist together; missing provider preserves pending',async()=>fixture(async(base,db,file)=>{
 assert.equal((await submit(base)).status,201);
 assert.equal((await dispatchInquiryNotifications(db,null)).configured,false);
 const {DatabaseSync}=await import('node:sqlite');const reopened=new DatabaseSync(file);
 try{assert.equal(reopened.prepare("SELECT count(*) n FROM inquiry_notifications WHERE status='pending'").get().n,1)}finally{reopened.close()}
 db.exec("CREATE TRIGGER reject_notification BEFORE INSERT ON inquiry_notifications BEGIN SELECT RAISE(ABORT,'synthetic failure'); END;");
 assert.equal((await submit(base)).status,503);assert.equal(db.prepare('SELECT count(*) n FROM inquiries').get().n,1);
}));
test('stable delivery identity, no resend of SENT or ambiguous mail, crash claims remain held',async()=>fixture(async(base,db)=>{
 await submit(base);const sent=[];assert.equal((await dispatchInquiryNotifications(db,async row=>sent.push(row))).sent,1);
 assert.match(sent[0].messageId,/^<inquiry-.+@notifications\.invalid>$/);
 await dispatchInquiryNotifications(db,async()=>assert.fail('SENT resent'));
 await submit(base);await dispatchInquiryNotifications(db,async()=>{throw Error('uncertain')});
 assert.equal(db.prepare("SELECT count(*) n FROM inquiry_notifications WHERE status='uncertain'").get().n,1);
 await submit(base);assert.ok(claimNotification(db));
 await dispatchInquiryNotifications(db,async()=>assert.fail('held notification resent'));
 assert.equal(db.prepare("SELECT count(*) n FROM inquiry_notifications WHERE status='sending'").get().n,1);
}));
test('admin unread badge and CSV are protected, escaped, and status changes update unread count',async()=>fixture(async(base,db)=>{
 const result=await submit(base,'=HYPERLINK("https://example.test")');const {id}=await result.json();
 assert.equal((await fetch(base+'/admin/export.csv')).status,401);
 const admin=await fetch(base+'/admin',{headers:{Authorization:auth}});assert.ok((await admin.text()).includes('<strong>1</strong>'));
 const csv=await fetch(base+'/admin/export.csv',{headers:{Authorization:auth}});assert.equal(csv.status,200);assert.match(csv.headers.get('content-disposition'),/attachment/);assert.ok((await csv.text()).includes("'=HYPERLINK"));
 assert.equal((await fetch(base+'/admin/status',{method:'POST',redirect:'manual',headers:{Authorization:auth,Origin:'https://evil.example','Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({id,status:'Contacted'})})).status,403);
 assert.equal((await fetch(base+'/admin/status',{method:'POST',redirect:'manual',headers:{Authorization:auth,Origin:'https://site.example.test','Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({id,status:'Contacted'})})).status,303);
 assert.equal(db.prepare("SELECT count(*) n FROM inquiries WHERE status='New'").get().n,0);
 assert.equal(db.prepare('SELECT count(*) n FROM inquiries WHERE read_at IS NULL').get().n,1);
 assert.equal((await fetch(base+'/admin/read',{method:'POST',redirect:'manual',headers:{Authorization:auth,Origin:'https://site.example.test','Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({id})})).status,303);
 assert.equal(db.prepare('SELECT count(*) n FROM inquiries WHERE read_at IS NULL').get().n,0);
}));
test('email is optional and partial/insecure configuration fails closed',()=>{
 assert.equal(configuredNotificationSender({}),null);
 assert.throws(()=>configuredNotificationSender({INQUIRY_EMAIL_TO:'sales@example.test'}));
 assert.throws(()=>configuredNotificationSender({INQUIRY_EMAIL_URL:'http://mail.example.test/send',INQUIRY_EMAIL_KEY:'s'.repeat(32),INQUIRY_EMAIL_TO:'sales@example.test',PUBLIC_URL:'https://site.example.test'}));
});
