import React, { useContext, useState } from "react";
import { Box, FormControl, FormHelperText } from "@mui/material";
import { TableContainer, Table, TableRow, TableCell } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider } from "@mui/material/styles";
import {
  theme,
  StyledButton,
  StyledDay,
  StyledDatePicker,
  StyledTextField,
} from "../TaskFolder/styled/TaskFormStyled";
import {
  UpdateProject,
  createProject,
} from "../../controllers/ProjectsController";
import Button from "@mui/material/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../App.css";
import { cookiesContext } from "../../App";
import dayjs from "dayjs";
function Project() {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const [token] = useState(user.token);

  const navigate = useNavigate();
  const location = useLocation();

  const [projectDetails, setProjectDetails] = useState({
    title: location.state?.title || "",
    description: location.state?.descrip || "",
    tday: dayjs(location.state?.end_date || new Date()),
    id: location.state?.id || 0,
    manager_id:user.id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let responseStatus = 0;
    if (!projectDetails.id)
      responseStatus = await createProject(projectDetails, token);
    else responseStatus = await UpdateProject(projectDetails, token);

    if (responseStatus === 200) navigate("/projects");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" sx={{ color: "white", padding: "20px" }} noValidate>
        <div>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>
                  <h2>Edit Project</h2>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <StyledTextField
                    variant="outlined"
                    label="Title"
                    value={projectDetails.title}
                    onChange={(e) => {
                      setProjectDetails({
                        ...projectDetails,
                        title: e.target.value,
                      });
                    }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="ql-container">
                  <FormControl>
                    <ReactQuill
                      style={{
                        maxHeight: "300px",
                        overflow: "auto",
                        maxWidth: "350px",
                      }}
                      theme="snow"
                      value={projectDetails.description}
                      onChange={(e) => {
                        console.log({e})
                        setProjectDetails({
                          ...projectDetails,
                          description: e,
                        });
                        console.log({e})
                      }}
                      modules={{
                        toolbar: [
                          ["bold", "italic", "underline", "strike"], // Text styling
                          [{ list: "ordered" }, { list: "bullet" }], // Lists
                          [{ header: [1, 2, 3, false] }], // Headers
                          [{ align: [] }], // Text alignment
                        ],
                      }}
                    ></ReactQuill>
                    <FormHelperText>Project description</FormHelperText>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDatePicker
                      label="dead line"
                      value={projectDetails.tday}
                      onChange={(e) => {
                        setProjectDetails({
                          ...projectDetails,
                          tday: e,
                        });
                      }}
                      renderInput={(params) => (
                        <StyledTextField {...params} label="Deadline" />
                      )}
                      slots={{
                        openPickerButton: StyledButton,
                        day: StyledDay,
                      }}
                    />
                  </LocalizationProvider>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <NavLink to="/projects">
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

export default Project;
