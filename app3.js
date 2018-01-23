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
// routes
app.get('/maomao', (request, response) => {
  response.redirect('/index.html');
});

app.all('/:objType/*?', (req, res, next) => { // general config for route: /user/...
  res.contentType('json');
  next();
});

app.get('/:objType/list', (req, res) => { // get user list
  res.send({ title: `${req.params.objType} list` });
});

app.post('/:objType/create', (req, res) => { // create user
  res.send({ title: `${req.params.objType} created` });
});

app.get('/:objType/read/:id(\\d+)', (req, res) => { // find user & its ID
  res.send({
    title: `${req.params.objType} with id ${req.params.id} found`,
  });
});

app.get('/:objType/delete/:id(\\d+)', (req, res) => { // delete user
  res.send({
    title: `${req.params.objType} with id ${req.params.id} deleted`,
  });
});

app.get('/:objType/update/:id(\\d+)', (req, res) => { // update user
  res.send({
    title: `${req.params.objType} with id ${req.params.id} updated`,
  });
});
/* --------- server config ---------- */

// server start
server.listen(3000);
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
