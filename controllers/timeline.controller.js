const TimeLine = require("../models/timeline.model.js");



exports.findAllTimeLine = (req, res) => {
  TimeLine.getAllTimeLine((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        })
      } else res.send(data);
    });
  };

exports.findTimeLineByCab = (req, res) => {
  TimeLine.findByCab(req.params.cab, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      })
    } else res.send(data);
  });
};

exports.createTimeLine = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "User can not be empty!"
    });
  }

  const timeLine = new TimeLine({
    name: req.body.name,
    date: req.body.date,
    day: req.body.day,
    cab: req.body.cab,
  });

  TimeLine.create(timeLine, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};
exports.findTimeLineById = (req, res) => {
  TimeLine.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      })
    } else res.send(data);
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

  TimeLine.updateById(
    req.params.id,
    new TimeLine(req.body),
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
  TimeLine.remove(req.params.id, (err, data) => {
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

// exports.findUserById = (req, res) => {
//   Users.findById(req.params.id, (err, data) => {
//     if (err) {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       })
//     } else res.send(data);
//   });
// };






