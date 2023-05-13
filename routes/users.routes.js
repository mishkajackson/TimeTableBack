module.exports = app => {
  const users = require("../controllers/users.controller.js");
  const timeline = require("../controllers/timeline.controller.js");
  const auth = require("../controllers/auth.controller.js");

  app.get("/api/users/", users.findAllUsers);
  app.get("/api/users/:id", users.findUserById);
  app.post("/api/users/", users.createUser);
  app.put("/api/users/:id", users.update);
  app.delete("/api/users/:id", users.delete);

  app.get("/api/timeline/", timeline.findAllTimeLine)
  app.get("/api/timeline/:id", timeline.findTimeLineById);
  app.get("/api/timeline/cab/:cab", timeline.findTimeLineByCab);
  app.post("/api/timeline/", timeline.createTimeLine);
  app.put("/api/timeline/:id", timeline.update);
  app.delete("/api/timeline/:id", timeline.delete);

  app.get("/api/auth/:login/:password", auth.getUserNameLogin);
  };