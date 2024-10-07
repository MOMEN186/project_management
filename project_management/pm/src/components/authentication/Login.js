import {
  Box,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useState,useContext } from "react";
import { StyledTextField } from "../TaskFolder/styled/TaskFormStyled";
import { NavLink } from "react-router-dom";
import { login } from "../../controllers/authController";
import { useNavigate } from "react-router-dom";
import { cookiesContext } from "../../App";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const cookies=useContext(cookiesContext);
    const navigate = useNavigate();
    

    const handleSubmit = async () => {
      
        const token = await login(email, password);
        console.log({cookies});
        cookies.set("token", token);
        navigate("/");
    }


    return (
        <Box component="form">
            <TableContainer>
                <Table>
                    <TableRow>
                        <TableCell>
                            <StyledTextField
                                variant="outlined"
                                label="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <StyledTextField
                                variant="outlined"
                                label="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Button sx={{ color: "white" }}
                            onClick={handleSubmit}
                            >Login</Button>
                        </TableCell>
                    </TableRow>

                    <NavLink to="/signup" style={{ color: "white" }}>
                        dont have an account? signup
                    </NavLink>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Login;
