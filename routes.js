const configRoutes = (app) => {
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
};

module.exports = { configRoutes };

