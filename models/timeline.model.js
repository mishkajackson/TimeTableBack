const sql = require("./db.js");

// constructor
const TimeLine = function (timeline) {
  this.name = timeline.name
  this.date = timeline.date
  this.day = timeline.day
  this.cab = timeline.cab
};


TimeLine.getAllTimeLine = (result) => {
  sql.query(`SELECT tl.id, u.name, u.id AS userid, tl.date, tl.day, tl.cab FROM timeline tl, users u WHERE tl.userid = u.id`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

TimeLine.findByCab = (cab, result) => {
  sql.query(`SELECT * FROM timeline WHERE cab = ${cab}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

TimeLine.create = (newTimeLine, result) => {
  sql.query(`INSERT INTO timeline SET ?`, newTimeLine, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newTimeLine });
    result(null, { id: res.insertId, ...newTimeLine });
  });
};

TimeLine.findById = (id, result) => {
  sql.query(`SELECT * FROM timeline WHERE timeline.id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

TimeLine.updateById = (id, timeline, result) => {
  sql.query(
    "UPDATE timeline SET name = ?, date = ?, day = ?, cab = ? WHERE id = ?",
    [timeline.name, timeline.date, timeline.day, timeline.cab, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Users with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...timeline });
      result(null, { id: id, ...timeline });
    }
  );
};

TimeLine.remove = (id, result) => {
  sql.query("DELETE FROM timeline WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

// Users.findById = (id, result) => {
//   sql.query(`SELECT * FROM users WHERE users.id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found users: ", res);
//       result(null, res);
//       return;
//     }
//     result({ kind: "not_found" }, null);
//   });
// };





// Users.remove = (id, result) => {
//   sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted user with id: ", id);
//     result(null, res);
//   });
// };

module.exports = TimeLine;