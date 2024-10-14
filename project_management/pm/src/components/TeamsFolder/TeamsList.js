import {
    Button,
    Table,
    TableCell,
    TableContainer,
    TableRow,
  } from "@mui/material";
  import { NavLink } from "react-router-dom";
  import React, { useContext, useEffect, useState } from "react";
  import {  getTeams} from "../../controllers/TeamsController";
  import { cookiesContext } from "../../App";

export default function TeamsList() {
     
  const cookies = useContext(cookiesContext);
  const [user,] = useState(cookies.get("user"));
   const [token,] = useState(user?.token || "");
  const [teams, setTeams] = useState([]);
    
  useEffect(() => {
    async function fetchTeams() {
      const result = await getTeams(user.id, token);
      setTeams(result || []);
    } 

    fetchTeams();
  },[])


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

          {
       teams.map((team) => (
              <TableRow >
                <TableCell key={team.id}>
                  <NavLink to="/teams/id"
                  style={{color:"white"}}
                  state={team}
                  >
                        {team.team_name}
                  </NavLink>
              
                </TableCell>
              </TableRow>
            ))
          }
  
        
        </Table>
      </TableContainer>
    );
  }
  