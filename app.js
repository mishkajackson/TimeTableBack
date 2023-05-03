const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const port = 8000

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

app.use(cors());


// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application.!!" });
});
require("./routes/users.routes.js")(app);



// set port, listen for requests
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})