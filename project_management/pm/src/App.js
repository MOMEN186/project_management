import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import TopNav from "./components/TopNav";
import TasksList from "./components/TaskFolder/TasksList";
import Task from "./components/TaskFolder/Task";
import TaskForm from "./components/TaskFolder/TaskForm";
import Teams from "./components/TeamsFolder/Teams";
import Projects from "./components/ProjectsFolder/ProjectsList";
import ProjectForm from "./components/ProjectsFolder/ProjectForm";
import Project from "./components/ProjectsFolder/Project";

function App() {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TasksList />} />
        <Route path="/tasks/:id" element={<Task />} />
        <Route path="/addtask" element={<TaskForm />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/addproject" element={<ProjectForm />} />
        <Route path="projects/:id" element={<Project/> }/>
      </Routes>
    </Router>
  );
}

export default App;
