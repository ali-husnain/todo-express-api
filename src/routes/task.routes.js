const { authJwt } = require("../middleware");
const controller = require("../controllers/task.controller");
module.exports = function (app) {
    
  app.post(
    "/api/task/all",
    [authJwt.verifyToken],
    controller.findAll
  );
  
  app.get(
    "/api/task/progress",
    [authJwt.verifyToken],
    controller.overAllProgress
  );  
  
  app.post(
    "/api/task/progressbyrange",
    [authJwt.verifyToken],
    controller.taskProgressByRange
  );

  
  app.get(
    "/api/task/view/:id",
    [authJwt.verifyToken],
    controller.viewTask
  );
    
  app.post(
    "/api/task/create",
    [authJwt.verifyToken],
    controller.createTask
  );
  
  app.patch(
    "/api/task/update",
    [authJwt.verifyToken],
    controller.update
  );
  
  app.patch(
    "/api/task/markcomplete",
    [authJwt.verifyToken],
    controller.markComplete
  );

  app.delete(
    "/api/task/delete/:id",
    [authJwt.verifyToken],
    controller.delete
  );
};