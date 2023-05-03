const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  port: dbConfig.PORT,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  socketPath: dbConfig.socketPath,
});

// open the MySQL connection
connection.connect(error => {
  if (error){
    console.log(error);
  }
  else {
    console.log("Successfully connected to the database.");
  }
});

module.exports = connection;