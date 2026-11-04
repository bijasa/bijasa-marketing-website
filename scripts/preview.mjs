import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out');
const port=Number(process.env.PREVIEW_PORT || 3000);
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.txt':'text/plain','.xml':'application/xml','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep) && file!==root){res.writeHead(403).end();return;}
  try{if((await stat(file)).isDirectory())file=path.join(file,'index.html');}catch{}
  let data;try{data=await readFile(file);}catch{res.statusCode=404;file=path.join(root,'404.html');data=await readFile(file);}
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-cache');res.end(data);
 }catch{res.writeHead(400).end('Invalid request');}
});
server.on('error',error=>{console.error(`Preview failed: ${error.message}`);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`Bijasa V2 static preview: http://localhost:${port}`));
