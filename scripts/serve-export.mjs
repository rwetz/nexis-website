import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

// Preview the static export with HTTP compression, as a static CDN serves it.
const root = resolve('out');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webm': 'video/webm' };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if (!extname(file)) file = resolve(file, 'index.html');
    let data;
    let status = 200;
    try { data = await readFile(file); }
    catch { file = resolve(root, '404.html'); data = await readFile(file); status = 404; }
    const type = types[extname(file)] || 'application/octet-stream';
    const compressed = /text|json|svg/.test(type) && /gzip/.test(req.headers['accept-encoding'] || '');
    const body = compressed ? gzipSync(data) : data;
    res.writeHead(status, { 'Content-Type': type, 'Content-Length': body.length, 'Vary': 'Accept-Encoding', ...(compressed ? { 'Content-Encoding': 'gzip' } : {}), 'Cache-Control': pathname.startsWith('/_next/static/') ? 'public, max-age=31536000, immutable' : 'public, max-age=600' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(500).end(); }
}).listen(4173, '127.0.0.1', () => console.log('Static preview: http://127.0.0.1:4173'));
