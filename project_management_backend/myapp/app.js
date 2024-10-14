var express = require('express');
const app = express();
const cors = require("cors");
const {authMiddleWare} = require("./middlewares/authMiddleWare")
const db = require("./db");
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware setup (move this up, before passport and routes)
app.use(session({
  secret: '2000',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if using https
}));


// Route imports
const tasksRouter = require("./routes/TaskRoutes");
const teamsRouter = require("./routes/teamsRoutes");
const projectsRouter = require("./routes/ProjectsRoutes");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRoutes");

// Route middleware
app.use("/tasks", authMiddleWare,tasksRouter);
app.use("/teams",  authMiddleWare,teamsRouter);
app.use("/projects", authMiddleWare, projectsRouter);
app.use("/users", authMiddleWare, usersRouter);
app.use("/auth", authRouter);


db.startCleanUpJob();

app.listen(8080, () => {
  console.log(`server is listening on port 8080`);
});

module.exports = app;