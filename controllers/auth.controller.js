const Auth = require("../models/auth.model.js");




exports.getUserNameLogin = (req, res) => {
  Auth.getUserName(req.params.login, req.params.password, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'wrong login/password'
      })
    } else res.send(data);
  });
};

exports.createUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "User can not be empty!"
    });
  }

  const auth = new Auth({
    userid: req.body.userid,
    login: req.body.login,
    password: req.body.password,
  });

  Auth.create(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};








