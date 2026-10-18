import test from 'node:test';import assert from 'node:assert/strict';
import {createInquiryApp} from '../server/inquiries.mjs';import {trustImmediateProxy,resolveTrustedProxyAddresses} from '../server/trusted-proxy.mjs';
const password='synthetic-admin-password-at-least20';
const body={kind:'quote',name:'Synthetic client',phone:'96890000000',details:'Synthetic',consent:true};
async function fixture(options,run){const {app,db}=createInquiryApp({databasePath:':memory:',publicUrl:'https://site.example.test',adminPassword:password,...options});const server=await new Promise(r=>{const s=app.listen(0,'127.0.0.1',()=>r(s))});try{await run('http://127.0.0.1:'+server.address().port,db)}finally{await new Promise(r=>server.close(r));db.close()}}
test('exactly one trusted hop; an unknown direct peer cannot spoof forwarded identity',async()=>{
 const trust=trustImmediateProxy(['127.0.0.1']);assert.equal(trust('127.0.0.1',0),true);assert.equal(trust('127.0.0.1',1),false);assert.equal(trust('203.0.113.20',0),false);assert.equal(trust('::ffff:127.0.0.1',0),true);
 await fixture({trustedProxyAddresses:['192.0.2.1']},async base=>{
  for(let i=0;i<10;i++)assert.equal((await submit(base,'203.0.113.'+i)).status,201);
  assert.equal((await submit(base,'198.51.100.1')).status,429);
 });
});
const submit=(base,ip)=>fetch(base+'/api/inquiries',{method:'POST',headers:{Origin:'https://site.example.test','Content-Type':'application/json','X-Forwarded-For':ip},body:JSON.stringify(body)});
test('two proxied clients have separate limits and leftmost spoofed addresses do not bypass them',async()=>fixture({},async base=>{
 for(let i=0;i<10;i++)assert.equal((await submit(base,'203.0.113.1')).status,201);
 assert.equal((await submit(base,'198.51.100.2, 203.0.113.1')).status,429);
 assert.equal((await submit(base,'203.0.113.2')).status,201);
}));
test('admin failure throttle is per client, expires, and requires admin username',async()=>{
 let clock=1000;await fixture({now:()=>clock},async base=>{
 const auth=(ip,user='admin',pw='wrong')=>fetch(base+'/admin',{headers:{'X-Forwarded-For':ip,Authorization:'Basic '+Buffer.from(user+':'+pw).toString('base64')}});
 for(let i=0;i<5;i++)assert.equal((await auth('203.0.113.1')).status,401);
 const blocked=await auth('203.0.113.1','admin',password);assert.equal(blocked.status,429);assert.ok(blocked.headers.get('retry-after'));
 assert.equal((await auth('203.0.113.2','other',password)).status,401);
 assert.equal((await auth('203.0.113.2','admin',password)).status,200);
 clock+=15*60_000;assert.equal((await auth('203.0.113.1','admin',password)).status,200);
 });
});

test('blank production proxy configuration discovers only the Compose gateway',async()=>{
 for(const configured of [undefined,'','  ,  ']){
  let calls=0;
  const addresses=await resolveTrustedProxyAddresses({configured,production:true,lookup:async(host,options)=>{calls++;assert.equal(host,'gateway');assert.deepEqual(options,{all:true});return [{address:'172.20.0.2'},{address:'fd00::2'}]}});
  assert.equal(calls,1);assert.deepEqual(addresses,['172.20.0.2','fd00::2']);
  const trust=trustImmediateProxy(addresses);assert.equal(trust('172.20.0.2',0),true);assert.equal(trust('172.20.0.3',0),false);assert.equal(trust('172.20.0.2',1),false);
 }
});
test('explicit proxy addresses override discovery; development fallback stays loopback only',async()=>{
 const lookup=async()=>{throw Error('Discovery must not run')};
 assert.deepEqual(await resolveTrustedProxyAddresses({configured:' 192.0.2.1, ::1 ',production:true,lookup}),['192.0.2.1','::1']);
 assert.deepEqual(await resolveTrustedProxyAddresses({configured:'',production:false,lookup}),['127.0.0.1','::1']);
});
test('failed, empty or invalid gateway discovery and invalid explicit proxies fail closed',async()=>{
 await assert.rejects(resolveTrustedProxyAddresses({production:true,lookup:async()=>{throw Error('DNS unavailable')}}));
 for(const entries of [[],[{address:'invalid'}]])await assert.rejects(resolveTrustedProxyAddresses({production:true,lookup:async()=>entries}));
 await assert.rejects(resolveTrustedProxyAddresses({configured:'not-an-ip',production:true,lookup:async()=>[]}));
});
