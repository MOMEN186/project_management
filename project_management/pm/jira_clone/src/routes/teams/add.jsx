import { createFileRoute } from "@tanstack/react-router"
import React, { useState, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme, StyledTextField } from "../../jira_clone/src/components/TaskFolder/styled/TaskFormStyled";
import { createTeam, updateTeam } from "../../jira_clone/src/controllers/TeamsController";
import Button from "@mui/material/Button";
import {  useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../App.css";
import { cookiesContext } from "../App";
import Members from "../../jira_clone/src/components/TeamsFolder/Members";
import { getTeamByID } from "../../jira_clone/src/controllers/TeamsController";


export const Route = createFileRoute('/teams/add')({
  component: Index,
})


function Team() {

  const { id } = useParams();
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user") || {});
  const [token] = useState(user?.token || "");
  const navigate = useNavigate();

  const [teamDetails, setTeamDetails] = useState({
    team_name: "",
    id: id || "",
    admin_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeam = !id;
    if (newTeam) createTeam(teamDetails, token);
    else updateTeam(teamDetails, token);
    navigate("/teams");
  };

  useEffect(() => {

    async function fetchTeamByID() {
      const result = await getTeamByID(id, token);
      console.log("fetch team by id", result)

      setTeamDetails({
        team_name: result.team_name,
        id: id,
        admin_id: result.admin_id,
        participants_count: result.participants_count,
      });
    }

    fetchTeamByID();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{ color: "white", padding: "20px" }}
        noValidate
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        rowGap="5vh"
        marginLeft="10px"

      >{
         
            <Typography >
          {id?"Edit Team":"Create Team"}
        </Typography>
        
      }
      
        <StyledTextField
          variant="outlined"
          label="team name"
          value={teamDetails.team_name}
          onChange={(e) => {
            console.log({ e });
            setTeamDetails({
              ...teamDetails,
              title: e.target.value,
            });
          }}
          sx={{width:"300px"}}

        />

        <Members teamDetails={teamDetails} setTeamDetails={setTeamDetails} />

        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "gray",
            marginLeft: 1,
          }}
          onClick={handleSubmit}
        >
          save
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default Team;
