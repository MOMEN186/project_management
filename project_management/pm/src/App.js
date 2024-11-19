// App.js
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
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export const cookiesContext = createContext();
const cookies = new Cookies();

function App() {
  const isAuthenticated = () => cookies.get("user")?.token;

  return (
    <Router>
      <cookiesContext.Provider value={cookies}>
        <TopNav />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<Homepage />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<TasksList />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<Task />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/addtask"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<Task />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<ProjectsList />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/addproject"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<Project />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<Project />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<TeamsList />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/addteam"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<Team />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/teams/:id"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<Team />}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                condition={isAuthenticated}
                element={<Profile />}
                redirectTo="/login"
              />
            }
          />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </cookiesContext.Provider>
    </Router>
  );
}

export default App;
