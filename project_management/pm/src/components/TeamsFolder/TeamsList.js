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
  
  export default function TeamsList() {
    
    return (
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell>
              <NavLink to="/addteam">
                <Button sx={{ color: "white" }}>Add Team</Button>
              </NavLink>
            </TableCell>
          </TableRow>
  
        
        </Table>
      </TableContainer>
    );
  }
  