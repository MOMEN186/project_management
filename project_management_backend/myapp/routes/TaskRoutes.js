const express = require('express');
const tasksController = require('../controllers/tasksController');
const db = require('../db');
const tasksRouter = express.Router();

tasksRouter.post('/:id/addcomment', tasksController.addComment);
tasksRouter.get('/:id/getcomments', tasksController.getComments);
tasksRouter.patch('/:id/editcomment', tasksController.editComment);
tasksRouter.delete('/:id/deletecomment', tasksController.deleteComment);
tasksRouter.post('/:id/addfile', db.upload.single("file"), tasksController.addFile);
tasksRouter.get("/:id/getfiles", tasksController.getFiles);
tasksRouter.delete("/:id/deletefile", tasksController.deleteFile);
tasksRouter.get('/', tasksController.getAllTasks);
tasksRouter.get('/:id', tasksController.getTaskByID);
tasksRouter.post('/', tasksController.createTask);
tasksRouter.put('/', tasksController.updateTask);
tasksRouter.delete('/', tasksController.deleteTask);

module.exports = tasksRouter;
