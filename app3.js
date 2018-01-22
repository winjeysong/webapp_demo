/**
 * with express
 */
// modules
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const errorhandler = require('errorhandler');

// variables
const app = express();
const server = http.createServer(app);

/* --------- server config ---------- */
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static('public')); // load static files
// dev mode
if (app.get('env') === 'development') {
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  app.use(errorhandler({
    dumpExceptions: true,
    showStack: true,
  }));
}
// prod mode
if (app.get('env') === 'production') {
  app.use(errorhandler());
}
app.get('/', (request, response) => {
  response.send('Hello Express');
});
/* --------- server config ---------- */

// server start
server.listen(3000);
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
