/**
 * routing
 */

const http = require('http');

const server = http.createServer((request, response) => {
  const resTest = request.url === '/test' ? 'you have hit the test page' : 'hello world';
  response.writeHead(200, { 'Content-type': 'text/plain' });
  response.end(resTest);
}).listen(3000);

console.log('Listening on port %d', server.address().port);
