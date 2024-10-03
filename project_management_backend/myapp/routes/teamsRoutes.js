const teamsRouter = require("express").Router();
const teamsController = require("../controllers/teamsController");

teamsRouter.get("/",teamsController.getAllTeams);
teamsRouter.post("/",teamsController.createTeam);
teamsRouter.patch("/",teamsController.updateTeam);
module.exports=teamsRouter;

