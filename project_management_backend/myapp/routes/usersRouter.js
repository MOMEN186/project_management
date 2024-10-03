const usersRouter = require("express").Router();
const usersController=require("../controllers/usersContoller");


usersRouter.get("/project_users", usersController.getProjectUsers);
usersRouter.get("/team_users", usersController.getTeamUsers);

usersRouter.post("/addUserToTeam", usersController.addUserToTeam);
// usersRouter.delete("/", usersController.removeUser);





module.exports = usersRouter;

