const express = require("express");
const tasksController= require("../controllers/tasksController");

const tasksRouter = express.Router();

tasksRouter.post("/:id/addcomment", tasksController.addComment);
tasksRouter.get("/:id/getcomments", tasksController.getComments);
tasksRouter.patch("/:id/editcomment", tasksController.editComment);
tasksRouter.delete("/:id/deletecomment", tasksController.deleteComment);

tasksRouter.get("/", tasksController.getAllTasks);
 tasksRouter.get("/:id", tasksController.getTaskByID)
tasksRouter.post("/", tasksController.createTask);
tasksRouter.put("/", tasksController.updateTask);
tasksRouter.delete("/", tasksController.deleteTask);

module.exports = tasksRouter;