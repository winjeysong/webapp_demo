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

app.all('/user/*?', (req, res, next) => { // general config for route: /user/...
  res.contentType('json');
  next();
});

app.get('/user/list', (req, res) => { // get user list
  res.send({ title: 'user list' });
});

app.post('/user/create', (req, res) => { // create user
  res.send({ title: 'user created' });
});

app.get('/user/read/:id(\\d+)', (req, res) => { // find user & its ID
  res.send({
    title: `user with id ${req.params.id} found`,
  });
});

app.get('/user/delete/:id(\\d+)', (req, res) => { // delete user
  res.send({
    title: `user with id ${req.params.id} deleted`,
  });
});

app.get('/user/update/:id(\\d+)', (req, res) => { // update user
  res.send({
    title: `user with id ${req.params.id} updated`,
  });
});
/* --------- server config ---------- */

// server start
server.listen(3000);
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
