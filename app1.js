const http = require('http');
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-type': 'text/plain' });
  response.end('hello world');
}).listen(3000);

console.log('Listening on port %d', server.address().port);