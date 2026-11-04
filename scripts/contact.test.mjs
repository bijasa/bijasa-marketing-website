import test from 'node:test';
import assert from 'node:assert/strict';
import { normalize,validate } from '../lib/contact.ts';
const valid={name:'Review User',email:'review@example.com',company:'',projectType:'Other / Custom Requirement',budget:'',message:'A local review of a custom workflow.',consent:'on',website:''};
test('custom enquiries and optional company/budget are accepted',()=>assert.deepEqual(validate(normalize(valid)),{}));
test('missing required fields produce errors',()=>{const e=validate(normalize({}));for(const k of ['name','email','projectType','message','consent'])assert.ok(e[k]);});
test('rejects injected headers, unlisted enums, honeypot and excessive length',()=>{for(const [field,value] of [['name','User\r\nBcc: attacker@example.com'],['email','user@example.com\r\nInjected'],['projectType','arbitrary'],['budget','arbitrary'],['website','bot'],['message','x'.repeat(1501)]])assert.ok(validate(normalize({...valid,[field]:value}))[field],field);});
test('normalizes whitespace, not non-string data',()=>{assert.equal(normalize({...valid,name:' Review User '}).name,'Review User');assert.ok(validate(normalize({...valid,email:{value:'test@example.com'}})).email);});
test('plain message markup stays data; control characters rejected',()=>{assert.deepEqual(validate(normalize({...valid,message:'Please discuss <script> as plain text.'})),{});assert.ok(validate(normalize({...valid,message:'Hidden control \x00 content'})).message);});

import { createMockHandler } from './mock-enquiry-handler.mjs';
import { enquiryConfig, deliverEnquiry } from '../lib/enquiry-delivery.ts';
async function request(handler,{origin='http://localhost:3000',method='POST',body=JSON.stringify(valid),contentType='application/json',url='/enquiries'}={}){
 const req={headers:{origin,'content-type':contentType},method,url,socket:{remoteAddress:'127.0.0.1'},async *[Symbol.asyncIterator](){yield Buffer.from(body);}};
 const result={headers:{},status:0,body:'',headersSent:false,setHeader(k,v){this.headers[k]=v;},writeHead(status){this.status=status;return this;},end(body=''){this.body=body;this.headersSent=true;return this;}};
 await handler(req,result);return result;
}
test('mock accepts local validated requests with explicit mock receipt',async()=>{const result=await request(createMockHandler({delay:0}));assert.equal(result.status,200);assert.deepEqual(JSON.parse(result.body),{accepted:true,mock:true});assert.equal(result.headers['Cache-Control'],'no-store');});
test('mock rejects untrusted origins, wrong content types and invalid bodies',async()=>{for(const [options,status] of [[{origin:'https://bijasa.com'},403],[{origin:'http://localhost.evil.test:3000'},403],[{method:'OPTIONS'},204],[{method:'GET'},404],[{contentType:'text/plain'},415],[{body:'not json'},400],[{body:'{}'},422],[{body:JSON.stringify({...valid,website:'spam'})},422],[{body:'x'.repeat(12001)},413]])assert.equal((await request(createMockHandler({delay:0}),options)).status,status);});
test('mock throttles repeated attempts and recovers after a minute',async()=>{let time=1000;const handler=createMockHandler({delay:0,now:()=>time});for(let i=0;i<5;i++)assert.equal((await request(handler)).status,200);assert.equal((await request(handler)).status,429);time+=60001;assert.equal((await request(handler)).status,200);});
test('production delivery defaults disabled; only loopback gets a mock',()=>{assert.equal(enquiryConfig('bijasa.com').mode,'disabled');assert.equal(enquiryConfig('localhost').mode,'mock');assert.equal(enquiryConfig('localhost.evil.test').mode,'disabled');});
test('adapter requires explicit acceptance; malformed, rate limited and failed receipts reject',async()=>{const original=globalThis.fetch;try{for(const response of [new Response('{"accepted":false}'),new Response('{"accepted":true}'),new Response('not json'),new Response('{}',{status:429}),new Response('{}',{status:500})]){globalThis.fetch=async()=>response;await assert.rejects(()=>deliverEnquiry(normalize(valid),enquiryConfig('localhost')));}globalThis.fetch=async()=>new Response('{"accepted":true,"mock":true}');assert.equal(await deliverEnquiry(normalize(valid),enquiryConfig('localhost')),'mock');}finally{globalThis.fetch=original;}});
