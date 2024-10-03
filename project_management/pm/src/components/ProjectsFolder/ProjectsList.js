import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getProjects } from "../../controllers/ProjectsController";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getData() {
      const result = await getProjects();

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
