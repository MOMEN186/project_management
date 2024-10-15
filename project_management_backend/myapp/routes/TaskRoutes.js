const express = require("express");
const tasksController= require("../controllers/tasksController");

const tasksRouter = express.Router();

tasksRouter.get("/", tasksController.getAllTasks);
 tasksRouter.get("/:id", tasksController.getTaskByID)
tasksRouter.post("/", tasksController.createTask);
tasksRouter.put("/", tasksController.updateTask);
tasksRouter.delete("/", tasksController.deleteTask);

module.exports = tasksRouter;