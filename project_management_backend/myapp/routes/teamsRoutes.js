const express = require("express");
const teamsRouter = express.Router();
const teamsController = require("../controllers/teamsController");


teamsRouter.post("/",teamsController.createTeam);
teamsRouter.get("/",teamsController.getAllTeams);
teamsRouter.put("/", teamsController.updateTeam);
teamsRouter.get("/users", teamsController.getAllUsers);
teamsRouter.get("/members", teamsController.getTeamMembers);

module.exports=teamsRouter;

