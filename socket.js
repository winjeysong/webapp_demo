const http = require('http');
const express = require('express');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket.listen(server); // listen on http server with socket.io

let count = 0;
const countUp = () => {
  count += 1;
  console.log(count);
  io.sockets.send(count); // send count to listening socket
};

app.use(express.static('socket'));
app.get('/', (req, res) => {
  res.redirect('socket.html');
});

server.listen(3000);
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
setInterval(countUp, 1000);
