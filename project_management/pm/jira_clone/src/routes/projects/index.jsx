import { createFileRoute } from "@tanstack/react-router"
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import {
  deleteProject,
  getProjects,
} from "../../jira_clone/src/controllers/ProjectsController";
import { cookiesContext } from "../App";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
export const Route = createFileRoute("/projects/")({
  component: NotFound,
})
export default function ProjectsList({ addProject }) {
  const [projects, setProjects] = useState([]);
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies?.get("user"));
  const [token] = useState(user.token);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      console.log({ token });
      const result = await getProjects(user.id, token);

      setProjects(result || []);
    }

    getData();
  }, []);

  const handelDelete = async (id) => {
    const responseStatus = await deleteProject(id, token);
    if (responseStatus === 200) navigate("/projects");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} >
        {addProject ? (
          <Button
            component={Link}
            to="/addproject"
            sx={{ color: "white", marginLeft: 3 }}
          >
            Add Project
          </Button>
        ) : (
          <Typography marginLeft="25px">Projects</Typography>
        )}
        <List>
          {projects?.map((project) => (
            <ListItem
              sx={{ paddingRight: 10, "&:hover": { backgroundColor: "grey" } }}
              secondaryAction={
                <IconButton edge="end" onClick={() => handelDelete(project.id)}>
                  <DeleteOutlineIcon sx={{ color: "white" }} fontSize="small" />
                </IconButton>
              }
            >
              <ListItemButton
                sx={{ "&:hover": { backgroundColor: "grey" } }}
                component={Link}
                to={`/projects/${project.id}`}
                state={project}
              >
                <ListItemText primary={project.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
