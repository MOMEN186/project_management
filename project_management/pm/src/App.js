// App.js
import "./App.css";
import React, { createContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import TopNav from "./components/TopNav";
import TasksList from "./pages/TasksList";
import Task from "./pages/Task";
import ProjectsList from "./pages/ProjectsList";
import Project from "./pages/Project";
import Team from "./pages/Team";
import TeamsList from "./pages/TeamsList";
import Cookies from "universal-cookie";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
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
