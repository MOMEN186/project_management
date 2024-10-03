const projectsRouter = require("express").Router();
const projectsController = require("../controllers/projectsController");



projectsRouter.get("/", projectsController.getAllProjects);
projectsRouter.get("/:id",projectsController.getProjectByID)
projectsRouter.post("/", projectsController.createProject);
projectsRouter.put("/", projectsController.updateProject);


module.exports = projectsRouter;



