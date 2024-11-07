import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { getTeams } from "../../controllers/TeamsController";
import { cookiesContext } from "../../App";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import "../../App.css";
import AboutForm from "./AboutForm";

// const borderColor = "#85B8FF";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    // Handle single-word names
    children:
      name.split(" ").length > 1
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : name[0], // Just use first letter if single word
  };
}
export default function About() {
  const [teams, setTeams] = useState([]);
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));

  useEffect(() => {
    async function fetchTeams() {
      const result = await getTeams(user.id, user.token);
      setTeams(result);
    }
    fetchTeams();
  }, []);

  useEffect(() => {
    async function getUserInfo() {}
    getUserInfo();
  });

  return (
    <Box display="flex" width="100%" sx={{ flexGrow: 1 }}>
      <Grid container display="flex" flexDirection="column" rowGap="2vh">
        <AboutForm />

        <Grid
          item
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          width="100%"
        >
          <Typography variant="caption">TEAMS</Typography>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ padding: "4px 0" }}>
              <ListItemButton
                component={Link}
                to="/addteam"
                sx={{
                  "&:hover": { backgroundColor: "#282D33" },
                  padding: "4px 8px",
                }}
              >
                <ListItemIcon>
                  <Avatar sx={{ backgroundColor: "white" }}>
                    <AddIcon sx={{ color: "black" }} />
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary="Create Team" />
              </ListItemButton>
            </ListItem>
            {teams.map((team) => (
              <ListItem key={team.id} sx={{ padding: "4px 0" }}>
                <ListItemButton
                  component={Link}
                  to={`/teams/${team.id}`}
                  sx={{
                    "&:hover": { backgroundColor: "#282D33" },
                    borderRadius: "5px",
                    padding: "4px 8px",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(`${team.team_name}`)}>
                      <GroupIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={team.team_name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
