import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState,useContext } from "react";
import { getProjects } from "../../controllers/ProjectsController";
import { cookiesContext } from "../../App";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const cookies = useContext(cookiesContext);
  
  useEffect(() => {
    console.log({cookies});
    const token = cookies.get("token");

    async function getData() {
      const result = await getProjects(token);

      setProjects(result);
    }

    getData();
  }, []);

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

        {projects.map((project) => (
          <TableRow>
            <TableCell>
              <NavLink to="/projects/:id" style={{ color: "white" }}
              state={project}
              >
                <Button sx={{ color: "white" }}>{project.title}</Button>
              </NavLink>
            </TableCell>

          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
}
