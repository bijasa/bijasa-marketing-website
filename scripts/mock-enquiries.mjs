// Local testing only. Never deploy this mock. No messages or addresses are logged/stored.
import http from 'node:http';
import { createMockHandler } from './mock-enquiry-handler.mjs';
const server=http.createServer(createMockHandler());
server.on('error',error=>{console.error(`Cannot start local mock (${error.code}). Run npm run dev:mock in an unrestricted local Terminal.`);process.exitCode=1;});
server.listen(3401,'127.0.0.1',()=>console.log('Local enquiry mock: http://127.0.0.1:3401 — no storage or email delivery'));
