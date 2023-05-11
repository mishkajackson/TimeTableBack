const sql = require("./db.js");

// constructor
const Auth = function (auth) {
    this.userid = auth.userid
    this.login = auth.login
    this.password = auth.password
};




Auth.getUserName = (login, password, result) => {
    sql.query(`SELECT u.name, u.id, u.role FROM auth a, users u WHERE a.userid = u.id AND a.login = '${login}' AND a.password = '${password}'`, (err, res) => {
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

Auth.create = (newAuth, result) => {
    sql.query(`INSERT INTO auth SET ?`, newAuth, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { id: res.insertId, ...newAuth });
        result(null, { id: res.insertId, ...newAuth });
    });
};

// TimeLine.findById = (id, result) => {
//     sql.query(`SELECT * FROM timeline WHERE timeline.id = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found users: ", res);
//             result(null, res);
//             return;
//         }
//         result({ kind: "not_found" }, null);
//     });
// };

// TimeLine.updateById = (id, timeline, result) => {
//     sql.query(
//         "UPDATE timeline SET userid = ?, date = ?, day = ?, cab = ? WHERE id = ?",
//         [timeline.userid, timeline.date, timeline.day, timeline.cab, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found Users with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated tutorial: ", { id: id, ...timeline });
//             result(null, { id: id, ...timeline });
//         }
//     );
// };

// TimeLine.remove = (id, result) => {
//     sql.query("DELETE FROM timeline WHERE id = ?", id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         if (res.affectedRows == 0) {
//             result({ kind: "not_found" }, null);
//             return;
//         }

//         console.log("deleted user with id: ", id);
//         result(null, res);
//     });
// };


module.exports = Auth;