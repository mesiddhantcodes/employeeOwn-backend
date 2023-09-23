var express = require('express');
var router = express.Router();
var Project = require('../models/Project.model');
const ProjectController = require('../controller/Project.controller');
const AuthenticationMiddleware = require('../middleware/Authentication.middleware');

router.post(
    "/create", AuthenticationMiddleware.authenticate, ProjectController.create)

router.get("/getAllProjects", AuthenticationMiddleware.authenticate, ProjectController.getAllProjects);
router.get("/getProjectById/:projectId", AuthenticationMiddleware.authenticate, ProjectController.getProjectById);
router.get("/getProjectByUserId/", AuthenticationMiddleware.authenticate, ProjectController.getProjectByUser);
router.post("/assignProjectToUser", AuthenticationMiddleware.authenticate, ProjectController.assignProjectToUser);
router.put("/updateProjectById/:projectId", AuthenticationMiddleware.authenticate, ProjectController.updateProjectById);
router.put("/deleteProjectById/:projectId", AuthenticationMiddleware.authenticate, ProjectController.deleteProjectById);


module.exports = router;

