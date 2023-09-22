
var TaskModel = require('../models/Task.model');
var UserModel = require('../models/User.model');
var ProjectModel = require('../models/Project.model');
const TaskController = {
    create: async (req, res) => {
        var { taskName, taskDescription, createdBy, projectId } = req.body;
        let checkIfUserExists;
        try {
            checkIfUserExists = await UserModel.findOne({ _id: createdBy });
            checkIfProjectExists = await ProjectModel.findOne({ _id: projectId });
        }
        catch (err) {
            return res.status(404).send("User or Project does not exists");
        }
        if (!checkIfUserExists || !checkIfProjectExists) {
            return res.status(404).send("User or Project does not exists");
        }
        var task = new TaskModel({
            taskName,
            taskDescription,
            createdBy,
            projectId
        });
        let ifTaskSaved = await task.save();
        if (!ifTaskSaved) {
            return res.status(500).send("Task not saved something went wrong");
        }
        return res.status(200).send("Task created successfully");
    },
    getTaskById: async (req, res) => {
        let { taskId } = req.params;
        let task = await TaskModel.findOne({ _id: taskId, isDeleted: false });
        if (!task) {
            return res.status(404).send("Task not found");
        }
        return res.status(200).send(task);
    },
    getTaskByProjectId: async (req, res) => {
        const { projectId } = req.params;
        let checkIfProjectExists
        try {
            checkIfProjectExists = await ProjectModel.findOne({ _id: projectId,isDeleted:false });
        }
        catch (err) {
            return res.status(404).send("Project not found");
        }
        if (!checkIfProjectExists) {
            return res.status(404).send("Project not found");
        }
        let task = await TaskModel.find({ projectId: projectId, isDeleted: false });
        if (!task) {
            return res.status(404).send("Task not found");
        }

        return res.status(200).send(task);
    },
    updateTaskById: async (req, res) => {
        var { taskId } = req.params;
        var { taskName, taskDescription, taskDeadline, assignedTo, status } = req.body;
        let checkIfTaskExists;
        try {
            checkIfTaskExists = await TaskModel.findOne({ _id: taskId });
        }
        catch (err) {
            return res.status(400).send('Task does not exists');
        }
        if (!checkIfTaskExists) {
            return res.status(400).send('task does not exists');
        }
        let updateTask = await TaskModel.updateOne({ _id: taskId },
            {
                taskName,
                taskDescription,
                taskDeadline,
                assignedTo,
                status,
                updatedAt: new Date(),
            });
        if (!updateTask) {
            return res.status(500).send("Task not updated something went wrong");
        }
        return res.status(200).send("Task updated successfully");

    },
    deleteTaskById: async (req, res) => {
        var { taskId } = req.params;
        let checkIfTaskExists;
        try {
            checkIfTaskExists = await TaskModel.findOne({ _id: taskId });
        }
        catch (err) {
            return res.status(400).send("Task does not exists");
        }
        // if (!checkIfTaskExists) {
        //     return res.status(400).send("Task does not exists");
        // }
        let isTaskDeleted = await TaskModel.updateOne({ isDeleted: true });
        if (!isTaskDeleted) {
            return res.status(500).send("Task not deleted something went wrong");
        }
        return res.status(200).send("Task deleted successfully");
    },
    assignTaskToUser: async (req, res) => {
        const { taskId, userId } = req.body;
        let checkIfTaskExists;
        let checkIfUserExists;
        try {
            checkIfTaskExists = await TaskModel.findOne({ _id: taskId });
            checkIfUserExists = await UserModel.findOne({ _id: userId });
            console.log(checkIfTaskExists, checkIfUserExists)
        }
        catch (err) {
            console.log(err);
            return res.status(404).send("User or Task does not exists");
        }
        if (!checkIfTaskExists || !checkIfUserExists) {
            return res.status(404).send("User or Task does not exists");
        }
        if (checkIfTaskExists.assignedTo.includes(userId)) {
            return res.status(400).send("User already assigned to this task");
        }
        checkIfTaskExists.assignedTo.push(userId);
        checkIfUserExists.tasks.push(taskId);
        let ifTaskSaved = await checkIfTaskExists.save();
        let ifUserSaved = await checkIfUserExists.save();
        let assignTask = await TaskModel.updateOne(
            {
                _id: taskId
            },
            {
                updatedAt: new Date(),
            }
        );
        if (!ifTaskSaved || !ifUserSaved || !assignTask) {
            return res.status(500).send("Something went wrong");
        }
        return res.status(200).send("Task assigned successfully");
    }
}
module.exports = TaskController;