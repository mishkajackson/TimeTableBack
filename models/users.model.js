const sql = require("./db.js");

// constructor
const Users = function(users) {
  this.name = users.name
  this.role = users.role
};


Users.getAllUsers = (result) => {
  sql.query(`SELECT * FROM users ORDER BY name`, (err, res) => {
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

Users.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE users.id = ${id}`, (err, res) => {
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

Users.create = (newUser, result) => {
  sql.query(`INSERT INTO users SET ?`, newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

Users.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, role = ? WHERE id = ?",
    [user.name, user.role, id],
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

      console.log("updated tutorial: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

Users.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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

module.exports = Users;