const UserModel=require('../models/User.model');
const TaskModel=require('../models/Task.model');
const ProjectModel=require('../models/Project.model');


const TaskController={
    getMyTask:async(req,res)=>{
        let {userId}=req.body;
        let checkIfUserExists;
        try{
            checkIfUserExists=await UserModel.findOne({_id:userId});
        }
        catch(err){
            return res.status(404).send("User not found");
        }
        if(!checkIfUserExists){
            return res.status(404).send("User not found");
        }
        let task=await TaskModel.find({createdBy:userId,isDeleted:false});
        if(!task){
            return res.status(404).send("Task not found");
        }
        return res.status(200).send(task);
    },
}