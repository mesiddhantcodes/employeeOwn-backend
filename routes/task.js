var express = require('express');
const TaskController = require('../controller/Task.controller');
const AuthenticationMiddleware = require('../middleware/Authentication.middleware');

var router = express.Router();
router.post("/create", AuthenticationMiddleware.authenticate, TaskController.create);
router.get("/getTaskById/:taskId", AuthenticationMiddleware.authenticate, TaskController.getTaskById);
router.get("/getTaskByProjectId/:projectId", AuthenticationMiddleware.authenticate, TaskController.getTaskByProjectId  );
router.put("/updateTaskById/:taskId", AuthenticationMiddleware.authenticate,TaskController.updateTaskById);
router.delete("/deleteTaskById/:taskId", AuthenticationMiddleware.authenticate,TaskController.deleteTaskById);
router.post('/assignTaskToUser', AuthenticationMiddleware.authenticate, TaskController.assignTaskToUser);
module.exports = router;