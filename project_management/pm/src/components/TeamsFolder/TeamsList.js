import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";

import { Link, NavLink } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { getTeams } from "../../controllers/TeamsController";
import { cookiesContext } from "../../App";

export default function TeamsList() {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const [token] = useState(user?.token || "");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      const result = await getTeams(user.id, token);
      setTeams(result || []);
    }

    fetchTeams();
  }, []);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Demo>
          <List
            component="nav"
            sx={{ color: "white", backgroundColor: "black" }}
          >
            <ListItem>
              <ListItemButton component={Link} to="/addteam">
                <ListItemText primary="Add Team" />
              </ListItemButton>
            </ListItem>
            {teams.map((team, id) => (
              <Button
                component={Link}
                to={`/teams/${team.id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                <ListItem
                  sx={{
                    paddingRight: 10,
                    "&:hover": { backgroundColor: "grey" },
                  }}
                >
                  <ListItemButton
                    sx={{ "&:hover": { backgroundColor: "grey" } }}
                  >
                    <ListItemText primary={team.team_name} />
                  </ListItemButton>
                </ListItem>
              </Button>
            ))}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
}
