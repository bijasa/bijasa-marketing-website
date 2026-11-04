import { normalize, validate } from '../lib/contact.ts';
/** In-memory mock handler: no persistent storage and no outbound delivery. */
export function createMockHandler({ delay = 400, now = Date.now } = {}) {
 const attempts=new Map();
 return async(req,res)=>{
  const origin=req.headers.origin;
  if(!origin || !/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)){res.writeHead(403).end();return;}
  res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json');
  if(req.method==='OPTIONS'){res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');res.writeHead(204).end();return;}
  if(req.url!=='/enquiries' || req.method!=='POST'){res.writeHead(404).end('{}');return;}
  const key=req.socket.remoteAddress,time=now();const recent=(attempts.get(key)||[]).filter(t=>time-t<60000);attempts.set(key,recent);
  if(recent.length>=5){res.setHeader('Retry-After','60');res.writeHead(429).end('{"accepted":false}');return;}recent.push(time);
  try{
   if(!req.headers['content-type']?.startsWith('application/json')){res.writeHead(415).end('{}');return;}
   let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>12000){res.writeHead(413).end('{}');return;}}
   const input=normalize(JSON.parse(body));
   if(Object.keys(validate(input)).length){res.writeHead(422).end('{"accepted":false}');return;}
   await new Promise(resolve=>setTimeout(resolve,delay));
   res.writeHead(200).end('{"accepted":true,"mock":true}');
  }catch{if(!res.headersSent)res.writeHead(400).end('{"accepted":false}');}
 };
}
