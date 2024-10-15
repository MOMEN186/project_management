const projectsRouter = require("express").Router();
const projectsController = require("../controllers/projectsController");

projectsRouter.get("/:id", projectsController.getProjectByID);
projectsRouter.get("/", projectsController.getAllProjects);
projectsRouter.post("/", projectsController.createProject);
projectsRouter.put("/", projectsController.updateProject);
projectsRouter.delete("/", projectsController.deleteProject);
module.exports = projectsRouter;



