const Users = require("../models/users.model.js");



exports.findAllUsers = (req, res) => {
  Users.getAllUsers((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        })
      } else res.send(data);
    });
  };

exports.findUserById = (req, res) => {
  Users.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      })
    } else res.send(data);
  });
};

// Create a User
exports.createUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "User can not be empty!"
    });
  }

  const user = new Users({
    name: req.body.name,
    role: req.body.role
  });

  Users.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};


exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Users.updateById(
    req.params.id,
    new Users(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Users.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};