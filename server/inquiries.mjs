import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, chmodSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { randomUUID, timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { trustImmediateProxy, resolveTrustedProxyAddresses } from './trusted-proxy.mjs';
import { prepareNotificationStore } from './inquiry-notifications.mjs';

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function createInquiryApp({ databasePath, publicUrl, adminPassword, trustedProxyAddresses=['127.0.0.1','::1'], now=Date.now }) {
  if (!databasePath || !publicUrl || !adminPassword || adminPassword.length < 20) throw Error('Configure INQUIRY_DATA_FILE, PUBLIC_URL and INQUIRY_ADMIN_PASSWORD (at least 20 characters).');
  const origin = new URL(publicUrl).origin;
  if (databasePath !== ':memory:') mkdirSync(dirname(resolve(databasePath)), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(databasePath);
  if (databasePath !== ':memory:') chmodSync(databasePath, 0o600);
  db.exec(`PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS inquiries (id TEXT PRIMARY KEY, kind TEXT NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL, details TEXT NOT NULL, created TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'New');`);
  prepareNotificationStore(db);
  if(!db.prepare('PRAGMA table_info(inquiries)').all().some(column=>column.name==='read_at'))db.exec('ALTER TABLE inquiries ADD COLUMN read_at TEXT');
  const app = express();
  app.set('trust proxy',trustImmediateProxy(trustedProxyAddresses));
  app.disable('x-powered-by');
  app.use((req,res,next) => { res.set('X-Content-Type-Options','nosniff'); res.set('Referrer-Policy','same-origin'); next(); });
  app.use('/api', (_req,res,next) => { res.set('Cache-Control','no-store'); next(); });
  app.use(express.json({ limit: '16kb' }));
  const attempts = new Map();
  const loginAttempts = new Map();
  app.get('/health', (_req,res) => { db.prepare('SELECT 1').get(); res.json({ok:true}); });
  const demosEnabled=()=>['on','true','1'].includes((process.env.DEMO_MODE||'off').trim().toLowerCase());
  app.get('/runtime-config.js',(_req,res)=>res.set('Cache-Control','no-store').type('application/javascript').send('window.__SITE_DEMO_ENABLED__ = '+demosEnabled()+';'));
  app.post('/api/demo/inquiries',(req,res)=>{
    if(!demosEnabled())return res.status(404).json({error:'Demo is disabled'});
    if(req.get('origin')!==origin)return res.sendStatus(403);
    if(!req.body?.name||!req.body?.phone||req.body?.consent!==true)return res.status(400).json({error:'Check your sample request'});
    return res.status(201).json({ok:true,id:'demo-'+randomUUID(),demo:true});
  });
  app.post('/api/inquiries', (req,res) => {
    if (req.get('origin') !== origin) return res.status(403).json({error:'Origin rejected'});
    const timestamp = now();
    for (const [ip,value] of attempts) if (timestamp-value.start > 60_000) attempts.delete(ip);
    const rate = attempts.get(req.ip) || {start:timestamp,count:0};
    rate.count++; attempts.set(req.ip,rate);
    if (rate.count > 10) return res.status(429).json({error:'Please try again later'});
    const body=req.body || {}, name=String(body.name||'').trim(), phone=String(body.phone||'').trim().replace(/[٠-٩۰-۹]/g, c => String(c.charCodeAt(0) - (c <= '٩' ? 0x660 : 0x6f0))), kind=String(body.kind||'');
    if (!['quote','product','consultation'].includes(kind) || name.length < 2 || name.length > 120 || !/^[+\d ()-]{7,30}$/.test(phone) || body.consent !== true || typeof body.details !== 'string' || body.details.length > 8000) return res.status(400).json({error:'Check the required details and consent'});
    const id=randomUUID();
    try {
      db.exec('BEGIN');
      db.prepare('INSERT INTO inquiries(id,kind,name,phone,details,created) VALUES(?,?,?,?,?,?)').run(id,kind,name,phone,body.details,new Date().toISOString());
      db.prepare('INSERT INTO inquiry_notifications(id,inquiry_id) VALUES(?,?)').run(randomUUID(),id);
      db.exec('COMMIT');
      return res.status(201).json({ok:true,id});
    } catch { try{db.exec('ROLLBACK')}catch{}return res.status(503).json({error:'Unable to save your request. Please try again.'}); }
  });
  app.use('/admin', (req,res,next) => {
    res.set('Cache-Control','no-store');
    res.set('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'");
    const timestamp=now();
    for(const [ip,rate] of loginAttempts)if(timestamp-rate.start>=15*60_000)loginAttempts.delete(ip);
    const rate=loginAttempts.get(req.ip)||{start:timestamp,count:0};
    if(rate.count>=5)return res.status(429).set('Retry-After',String(Math.max(1,Math.ceil((rate.start+15*60_000-timestamp)/1000)))).send('Please try again later');
    const encoded = req.get('authorization')?.match(/^Basic (.+)$/)?.[1];
    const decoded=encoded ? Buffer.from(encoded,'base64').toString() : '';
    const supplied=Buffer.from(decoded.slice(decoded.indexOf(':')+1));
    const expected=Buffer.from(adminPassword);
    if (decoded.slice(0,decoded.indexOf(':'))!=='admin'||supplied.length !== expected.length || !timingSafeEqual(supplied,expected)) {
      rate.count++;loginAttempts.set(req.ip,rate);
      return res.status(401).set('WWW-Authenticate','Basic realm="Sales requests", charset="UTF-8"').send('Authentication required');
    }
    loginAttempts.delete(req.ip);
    next();
  });
  app.get('/admin', (_req,res) => {
    const rows=db.prepare('SELECT * FROM inquiries ORDER BY created DESC LIMIT 500').all();
    const unread=db.prepare("SELECT count(*) n FROM inquiries WHERE read_at IS NULL").get().n;
    const held=db.prepare("SELECT count(*) n FROM inquiry_notifications WHERE status IN ('sending','uncertain')").get().n;
    res.type('html').send(`<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>طلبات أعلاف الكوثر</title><style>body{font:16px system-ui;max-width:1200px;margin:32px auto;padding:16px;color:#302578}table{border-collapse:collapse;width:100%}td,th{padding:12px;border:1px solid #ddd;text-align:start;vertical-align:top}pre{white-space:pre-wrap;font:inherit}button{padding:8px}input{max-width:150px}</style><h1>طلبات أعلاف الكوثر</h1><p role="status">طلبات غير مقروءة: <strong>${unread}</strong> | تنبيهات بريد تحتاج مراجعة: ${held}</p><p><a href="/admin/export.csv">تصدير الطلبات CSV</a></p><p>آخر ٥٠٠ طلب محفوظ. تحديث الصفحة يجلب أحدث الطلبات.</p><table><tr><th>التاريخ</th><th>العميل</th><th>الطلب</th><th>الحالة</th></tr>${rows.map(r=>`<tr><td>${escapeHtml(r.created)}</td><td>${escapeHtml(r.name)}<br><bdi>${escapeHtml(r.phone)}</bdi></td><td>${escapeHtml(r.kind)}<pre>${escapeHtml(r.details)}</pre></td><td>${escapeHtml(r.status)}${r.read_at?'<p>تمت القراءة</p>':`<form method="post" action="/admin/read"><input type="hidden" name="id" value="${escapeHtml(r.id)}"><button>تحديد كمقروء</button></form>`}<form method="post" action="/admin/status"><input type="hidden" name="id" value="${escapeHtml(r.id)}"><select name="status"><option>New</option><option>Contacted</option><option>Closed</option></select><button>حفظ</button></form></td></tr>`).join('')}</table></html>`);
  });
  app.get('/admin/export.csv',(_req,res)=>{
    const csv=value=>'"'+String(value??'').replace(/^[=+@\-\t\r]/,"'$&").replaceAll('"','""')+'"';
    const rows=db.prepare('SELECT id,kind,name,phone,details,created,status FROM inquiries ORDER BY created DESC LIMIT 10000').all();
    const fields=['id','kind','name','phone','details','created','status'];
    res.set('Content-Disposition','attachment; filename="sales-inquiries.csv"').type('text/csv; charset=utf-8').send('\uFEFF'+[fields,...rows.map(row=>fields.map(field=>row[field]))].map(row=>row.map(csv).join(',')).join('\r\n'));
  });
  app.post('/admin/read',express.urlencoded({extended:false,limit:'2kb'}),(req,res)=>{
    if(req.get('origin')!==origin)return res.sendStatus(403);
    if(typeof req.body.id!=='string')return res.sendStatus(400);
    db.prepare('UPDATE inquiries SET read_at=COALESCE(read_at,?) WHERE id=?').run(new Date().toISOString(),req.body.id);
    res.redirect(303,'/admin');
  });
  app.post('/admin/status', express.urlencoded({extended:false,limit:'2kb'}), (req,res) => {
    if(req.get('origin') !== origin) return res.sendStatus(403);
    if(!['New','Contacted','Closed'].includes(req.body.status))return res.sendStatus(400);
    db.prepare('UPDATE inquiries SET status=? WHERE id=?').run(req.body.status,req.body.id);
    res.redirect(303,'/admin');
  });
  const dist=resolve(dirname(fileURLToPath(import.meta.url)),'../dist');
  app.use(express.static(dist,{index:'index.html'}));
  app.get('*',(_req,res)=>res.sendFile(join(dist,'index.html')));
  app.use((err,_req,res,_next)=>res.status(err.status===413?413:400).json({error:'Invalid request'}));
  return {app,db};
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const {lookup}=await import('node:dns/promises');
  // In Compose only gateway is reachable by visitors. A changed gateway address
  // requires restarting this app; arbitrary forwarded headers are never trusted.
  const trustedProxyAddresses=await resolveTrustedProxyAddresses({configured:process.env.INQUIRY_TRUSTED_PROXY_IPS,production:process.env.NODE_ENV==='production',lookup});
  const {app}=createInquiryApp({databasePath:process.env.INQUIRY_DATA_FILE,publicUrl:process.env.PUBLIC_URL,adminPassword:process.env.INQUIRY_ADMIN_PASSWORD,trustedProxyAddresses});
  app.listen(Number(process.env.PORT||3000),process.env.HOST||'127.0.0.1',()=>console.log('Sales website ready'));
}
