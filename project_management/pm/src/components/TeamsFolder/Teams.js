import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { TableContainer, Table, TableRow, TableCell } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme, StyledTextField } from "../TaskFolder/styled/TaskFormStyled";
import { createTeam, updateTeam } from "../../controllers/TeamsController";
import Button from "@mui/material/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../../App.css";
import { cookiesContext } from "../../App";
import Members from "./Members";

function ProjectForm() {
  const location = useLocation();
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user") || {});
  const [token] = useState(user?.token || "");
  const navigate = useNavigate();

  const [teamDetails, setTeamDetails] = useState({
    title: location.state?.team_name,
    participants: [],
    id: location.state?.id,
    admin_id: location.state?.admin_id || user.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeam = !teamDetails?.id;
    if (newTeam) createTeam(teamDetails, token);
    else updateTeam(teamDetails, token);
    navigate("/teams");
  };

  console.log({teamDetails})

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" sx={{ color: "white", padding: "20px" }} noValidate>
        <div>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>
                  <h2>New Team</h2>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <StyledTextField
                    variant="outlined"
                    label="Title"
                    value={teamDetails.title}
                    onChange={(e) => {
                      console.log({ e });
                      setTeamDetails({
                        ...teamDetails,
                        title: e.target.value,
                      });
                    }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Members
                    teamDetails={teamDetails}
                    setTeamDetails={setTeamDetails}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <NavLink to="/teams">
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
                  </NavLink>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default ProjectForm;
