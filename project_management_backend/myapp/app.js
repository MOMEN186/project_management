var express = require('express');
const app = express();
const tasksRouter = require("./routes/TaskRoutes");
const teamsRouter = require("./routes/teamsRoutes");
const projectsRouter = require("./routes/ProjectsRoutes");
const usersRouter = require("./routes/usersRouter");
const cors = require("cors");

app.use(express.json()); 
app.use(cors())
app.use("/tasks",tasksRouter);
app.use("/teams",teamsRouter);
app.use("/projects", projectsRouter);
app.use("/users", usersRouter);

app.listen(8080, () => {
  console.log(`server is listening on port 8080`);
})


module.exports = app;
