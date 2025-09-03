import { createFileRoute } from "@tanstack/react-router"
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getTeamMembers, getTeams } from "../../jira_clone/src/controllers/TeamsController";
import { cookiesContext } from "../App";
import { StyledTextField } from "../../jira_clone/src/components/TaskFolder/styled/TaskFormStyled";

export const Route = createFileRoute('/teams/')({
  component: Index,
})



export default function TeamsList({ small }) {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const [token] = useState(user?.token || "");
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(search);

  useEffect(() => {
    async function fetchTeams() {
      const result = await getTeams(user.id, token);

      if (!Array.isArray(result)) {
        setTeams([]);
        return;
      }

      const withTeamMembers = await Promise.all(
        result.map(async (team) => {
          let members = await getTeamMembers(team.id, user.token, 5);
          members.push(user);
          return { ...team, members };
        })
      );

      setTeams(withTeamMembers);
    }

    fetchTeams();
  }, []);

  useEffect(() => {
    let result = teams;
    console.log(teams);
    if (search.length) {
      console.log(search);
      result = teams.filter((team) => {
        return team?.team_name?.includes(search);
      });
    }
    setSearchResult(result);
  }, [search, teams]);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <NavLink
            style={{
              color: "#a4c0cc",
              textDecoration: "none",

              "&:hover": {
                backgroundColor: "grey",
              },
            }}
            to="/addteam"
          >
            Create Team
          </NavLink>
        </Grid>
        <Grid
          size={10}
          item
          fullWidth
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StyledTextField
            id="standard-basic"
            label="search for teams"
            variant="standard"
            value={search}
            fullWidth
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            sx={{ color: "red", width: "50%" }}
          />
        </Grid>
        {searchResult?.length > 0 ? (
          searchResult?.map((team) => (
            <Grid>
              <Card
                sx={{
                  width: "145px",
                  height: "180px",
                  backgroundColor: "#14181b",
                  color: "white",
                }}
              >
                <CardActionArea
                  sx={{ height: "100%" }}
                  component={Link}
                  to={`/teams/${team.id}`}
                >
                  <CardMedia
                    component="img"
                    height="83px"
                    image={`https://picsum.photos/seed/${team.id}/300/200`}
                    alt={`${team.team_name}'s image`}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="caption"
                      component="div"
                      sx={{ overflow: "hidden", whiteSpace: "nowrap" }}
                    >
                      {team.team_name}
                    </Typography>
                    <AvatarGroup max={5}>
                      {team.members &&
                        team.members.length > 0 &&
                        team.members.map((member) => (
                          <Avatar
                            sx={{
                              height: 24,
                              width: 24,
                              fontSize: 8,
                              backgroundColor: "#0150d0",
                            }}
                            key={member.id}
                            alt={member.first_name}
                          >
                            {(
                              member.first_name[0] + member.last_name[0]
                            ).toUpperCase()}
                          </Avatar>
                        ))}
                    </AvatarGroup>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid></Grid>
        )}
      </Grid>
    </Box>
  );
}
