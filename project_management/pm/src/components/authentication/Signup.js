import {
  Box,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { StyledTextField } from "../TaskFolder/styled/TaskFormStyled";
import { NavLink } from "react-router-dom";
import { signup } from "../../controllers/authController";
export default function Signup() {
  
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");


  const handleSubmit = async () => {
    
    await signup(first_name, last_name, email, password);

  }

  return (
    <Box component="form">
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell>
              <StyledTextField
                variant="outlined"
                label="first name"
                value={first_name}
                onChange={(e) => {
                  setFirst_name(e.target.value);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <StyledTextField
                variant="outlined"
                label="last name"
                value={last_name}
                onChange={(e) => {
                  setLast_name(e.target.value);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <StyledTextField
                variant="outlined"
                label="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <StyledTextField
                variant="outlined"
                label="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell>
              <StyledTextField
                variant="outlined"
                label="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <NavLink to="/teams">
                 <Button sx={{ color: "white" }}
              onClick={handleSubmit}
              >SignUp</Button>
              </NavLink>
             
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <NavLink to="/login" style={{ color: "white" }}>
                ALready have an account? login
              </NavLink>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Box>
  );
}
