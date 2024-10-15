import {
  Box,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { StyledTextField } from "../TaskFolder/styled/TaskFormStyled";
import { Link, NavLink } from "react-router-dom";
import { login } from "../../controllers/authController";
import { useNavigate } from "react-router-dom";
import { cookiesContext } from "../../App";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = useContext(cookiesContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const result = await login(email, password);
    console.log({ cookies });
    cookies.set("user", {
      email: result.email,
      token: result.token,
      username: result.username,
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
    });
    console.log("in Login", cookies.get("user"));
    navigate("/");
    window.location.reload();
  };

    return (
      
      <Box component="form"
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="Center"
          flexDirection="column"
          rowGap="5vh"
          sx={{width:1,minHeight:'75vh'}}
        >
            <Typography variant="h4">
                Login
            </Typography>
      <StyledTextField
        variant="outlined"
        label="email"
        value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{width:"300px"}}
      />

      <StyledTextField
        variant="outlined"
        label="password"
        value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{width:"300px"}}

      />

      <Button sx={{ color: "white","&:hover":{color:"#154a7e"} }} onClick={handleSubmit}>
        Login
      </Button>

      <Button component={Link} to="/signup">
        dont have an account? sign in
      </Button>
    </Box>
  );
}

export default Login;
