import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInquiryApp } from '../server/inquiries.mjs';
const password='local-test-password-not-for-deployment';
test('requests are durable, reject cross-origin input, and protect the sales list',async()=>{
 const folder=mkdtempSync(join(tmpdir(),'feed-inquiry-test-')),file=join(folder,'requests.sqlite');
 let db,server;
 try {
  const first=createInquiryApp({databasePath:file,publicUrl:'https://feed.example.org',adminPassword:password});db=first.db;
  server=await new Promise(resolve=>{const s=first.app.listen(0,'127.0.0.1',()=>resolve(s))});
  const base=`http://127.0.0.1:${server.address().port}`;
  const payload={kind:'quote',name:'Test buyer',phone:'+968 90000000',details:'<script>alert(1)</script>',consent:true};
  const submit=(body,origin='https://feed.example.org')=>fetch(base+'/api/inquiries',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
  assert.equal((await submit(payload,'https://other.example.org')).status,403);
  assert.equal((await submit({...payload,consent:false})).status,400);
  const result=await submit(payload);assert.equal(result.status,201);assert.ok((await result.json()).id);
  assert.equal(db.prepare('SELECT COUNT(*) count FROM inquiries').get().count,1);
  assert.equal((await fetch(base+'/admin')).status,401);
  const admin=await fetch(base+'/admin',{headers:{Authorization:'Basic '+Buffer.from('admin:'+password).toString('base64')}});
  assert.equal(admin.status,200);const html=await admin.text();assert.ok(html.includes('&lt;script&gt;'));assert.ok(!html.includes('<script>'));
  await new Promise(resolve=>server.close(resolve));server=null;db.close();db=null;
  const second=createInquiryApp({databasePath:file,publicUrl:'https://feed.example.org',adminPassword:password});db=second.db;
  assert.equal(db.prepare('SELECT COUNT(*) count FROM inquiries').get().count,1);
 } finally {if(server)await new Promise(resolve=>server.close(resolve));db?.close();rmSync(folder,{recursive:true,force:true});}
});
test('sample requests never enter the real sales database and are rejected when demo is off',async()=>{
 const old=process.env.DEMO_MODE;
 const {app,db}=createInquiryApp({databasePath:':memory:',publicUrl:'https://feed.example.org',adminPassword:password});let server;
 try{
  server=await new Promise(resolve=>{const s=app.listen(0,'127.0.0.1',()=>resolve(s))});const base=`http://127.0.0.1:${server.address().port}`;
  const submit=()=>fetch(base+'/api/demo/inquiries',{method:'POST',headers:{Origin:'https://feed.example.org','Content-Type':'application/json'},body:JSON.stringify({kind:'quote',name:'Sample buyer',phone:'+968 90000000',consent:true})});
  for(const value of ['on','true']){process.env.DEMO_MODE=value;const result=await submit();assert.equal(result.status,201);assert.equal((await result.json()).demo,true)}
  assert.equal(db.prepare('SELECT COUNT(*) count FROM inquiries').get().count,0);
  for(const value of ['off','false']){process.env.DEMO_MODE=value;assert.equal((await submit()).status,404)}
 }finally{if(server)await new Promise(resolve=>server.close(resolve));db.close();if(old===undefined)delete process.env.DEMO_MODE;else process.env.DEMO_MODE=old;}
});
