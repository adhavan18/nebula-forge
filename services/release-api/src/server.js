import http from 'node:http';
import { randomUUID } from 'node:crypto';

const port = Number(process.env.PORT || 8080);
const release = process.env.RELEASE_ID || 'local-dev';
const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json');
  if (req.url === '/health' || req.url === '/ready') {
    res.writeHead(200); return res.end(JSON.stringify({ status: 'ok', release }));
  }
  if (req.url === '/v1/release' && req.method === 'POST') {
    res.writeHead(202); return res.end(JSON.stringify({ accepted: true, release, requestId: randomUUID() }));
  }
  res.writeHead(404); res.end(JSON.stringify({ error: 'not_found' }));
});
server.listen(port, '0.0.0.0');
