import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Avatar, Box, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  console.log(location);
  const [user, setUser] = useState({
    first_name: location.state?.first_name || "",
    last_name: location.state?.last_name || "",
    id: location.state?.id || "",
    username: location.state?.username || "",
    avatar: location.state?.avatar,
  });

  return (
      <Box display="flex" justifyContent="center" alignItems="center" minWidth="100vw"
      component="form"
      >
      <Avatar sx={{ width: 150, height: 150 }}>
        {user.avatar
          ? user.avatar
          : (user.first_name[0] + user.last_name[0]).toUpperCase()}
          </Avatar>
          
          <TextField>
              
          </TextField>
    </Box>
  );
}
