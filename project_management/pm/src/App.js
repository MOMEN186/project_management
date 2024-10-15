import "./App.css";
import React, { createContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";

import Homepage from "./components/Homepage";
import TopNav from "./components/TopNav";
import TasksList from "./components/TaskFolder/TasksList";
import Task from "./components/TaskFolder/Task";
import ProjectsList from "./components/ProjectsFolder/ProjectsList";
import Project from "./components/ProjectsFolder/Project";
import Team from "./components/TeamsFolder/Team";
import TeamsList from "./components/TeamsFolder/TeamsList";
import Cookies from "universal-cookie";
import Profile from "./components/ProfileFolder/Profile";

export const cookiesContext = createContext();
const cookies = new Cookies();

function App() {
  return (
    <Router>
      <cookiesContext.Provider value={cookies}>
        <TopNav />
        <Routes>

          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/tasks" element={<TasksList />} />
          <Route path="/tasks/:id" element={<Task />} />
          <Route path="/addtask" element={<Task />} />

          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/addproject" element={<Project />} />
          <Route path="/projects/:id" element={<Project />} />

          <Route path="/teams" element={<TeamsList />} />
          <Route path="/addteam" element={<Team />} />
          <Route path="teams/:id" element={<Team />} />

          
          <Route path="/profile" element={<Profile/>} />
          <Route />
        </Routes>
      </cookiesContext.Provider>
    </Router>
  );
}

export default App;
