module.exports = app => {
    const users = require("../controllers/users.controller.js");
  const timeline = require("../controllers/timeline.controller.js");

  app.get("/users/", users.findAllUsers);
  app.get("/users/:id", users.findUserById);
  app.post("/users/", users.createUser);
  app.put("/users/:id", users.update);
  app.delete("/users/:id", users.delete);

  app.get("/timeline/", timeline.findAllTimeLine)
  app.get("/timeline/:id", timeline.findTimeLineById);
  app.get("/timeline/cab/:cab", timeline.findTimeLineByCab);
  app.post("/timeline/", timeline.createTimeLine);
  app.put("/timeline/:id", timeline.update);
  app.delete("/timeline/:id", timeline.delete);

  };