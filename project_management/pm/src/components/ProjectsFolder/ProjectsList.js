import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import {
  deleteProject,
  getProjects,
} from "../../controllers/ProjectsController";
import { cookiesContext } from "../../App";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const cookies = useContext(cookiesContext);
  const [user,] = useState(cookies.get("user"));
  const [token,] = useState(user.token);
  useEffect(() => {

    async function getData() {
      console.log({token})
      const result = await getProjects(user.id,token);
      
      setProjects(result);
    }

    getData();
  }, []);

  const handelDelete = async (id) => {
    const responseStatus = await deleteProject(id, token);
    console.log({responseStatus})
    if (responseStatus === 200)  window.location.reload(); 
  };

  return (
    <TableContainer>
      <Table>
        <TableRow>
          <TableCell>
            <NavLink to="/addproject">
              <Button sx={{ color: "white" }}>Add Project</Button>
            </NavLink>
          </TableCell>
        </TableRow>

        {
            (projects.map((project) => (
            <TableRow>
              <TableCell>
                <NavLink
                  to="/projects/:id"
                  style={{ color: "white" }}
                  state={project}
                >
                  <Button sx={{ color: "white" }}>{project.title}</Button>
                </NavLink>
              </TableCell>
              <TableCell>
                <Button
                  sx={{ color: "white" }}
                  onClick={() => {
                    handelDelete(project.id);
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>)
                      ))}
      </Table>
    </TableContainer>
  );
}
