const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const port = 8080; // You can use any port you prefer
const serve = serveStatic('.', { 'index': ['index.html'] });

const server = http.createServer((req, res) => {
  const done = finalhandler(req, res);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Enable CORS for all origins
  serve(req, res, done);
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});