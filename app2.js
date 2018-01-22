/**
 * routing
 */

const http = require('http');
const server = http.createServer((request, response) => {
  const res_test = request.url === '/test' ? 'you have hit the test page' : 'hello world';
  response.writeHead(200, { 'Content-type': 'text/plain' });
  response.end(res_test);
}).listen(3000);

console.log('Listening on port %d', server.address().port);