/**
 * Optional dev helper: serves only database.json over HTTP (no directory listing,
 * no path traversal). Prefer importing database.json in the app (see NeighborhoodLookup).
 *
 * Cleartext HTTP is for local development only — do not expose this on a network.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');
const port = Number(process.env.PORT || 8080);

const server = http.createServer((req, res) => {
  const urlPath = new URL(req.url || '/', 'http://localhost').pathname;

  if (urlPath !== '/database.json') {
    res.statusCode = 404;
    res.end();
    return;
  }

  fs.readFile(DB_FILE, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    // Dev-only; tighten if you ever bind beyond localhost
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Dev JSON server at http://127.0.0.1:${port}/database.json`);
});
