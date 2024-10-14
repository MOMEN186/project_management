import React, { useEffect, useState,useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import {
  theme,
  StyledButton,
  StyledDay,
  StyledDatePicker,
  StyledTextField,
} from "./styled/TaskFormStyled";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
import { getProjects } from "../../controllers/ProjectsController";
import { updateTask,createTask } from "../../controllers/TaskController";
import { cookiesContext } from "../../App";

function Task() {
  const location = useLocation();

  const cookies = useContext(cookiesContext);
  const [user,] = useState(cookies.get("user"));
  const [token,] = useState(user.token);
  const [taskDetails,setTaskDetails] = useState({
    title: location.state?.title || "",
    description: location.state?.descrip || "",
    tday: dayjs(location.state?.end_date || new Date()),
    status: location.state?.status || "todo",
    projectId: location.state?.project_id || "",
    id: location.state?.id || "",
    assignee_id:user?.id || ""
  })

  const [projects, setProjects] = useState([""]);
  
  const newTask = taskDetails.id || 0;

  
  useEffect(() => {
    console.log("in task", token)

    async function fetchProjects() {
      const result = await getProjects(token);
      setProjects(result?.length ? result : []);
    }

    fetchProjects();

  }, [taskDetails.projectId]);

  
  
  const handleSubmit = async (e) => {
     console.log({newTask})
    if (!newTask)createTask(taskDetails,token)
      else
     updateTask(taskDetails,token);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" sx={{ color: "white", padding: "20px" }} noValidate>
        <div>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>
                  <h2>Edit Task</h2>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <StyledTextField
                    variant="outlined"
                    label="Title"
                    value={taskDetails.title}
                    onChange={(e) => {
                      setTaskDetails({...taskDetails,title:e.target.value});
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormControl fullWidth >
                    <Select
                      defaultValue={""}
                      value={taskDetails.projectId}
                      onChange={(e) => {
                        const selected_project = projects.find(p => p.id === e.target.value);
                        setTaskDetails({...taskDetails,projectId:selected_project.id});
                      }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="project"
                    >
                      {
                        projects.map((project) => (
                        <MenuItem  value={project.id} key={project.id}>
                          {project.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="ql-container">
                  <ReactQuill
                    style={{
                      maxHeight: "300px",
                      overflow: "auto",
                      maxWidth: "350px",
                    }}
                    theme="snow"
                    value={taskDetails.description}
                    onChange={
                      (e) => { setTaskDetails({ ...taskDetails, description: e}); }
                    }
                    modules={{
                      toolbar: [
                        ["bold", "italic", "underline", "strike"], // Text styling
                        [{ list: "ordered" }, { list: "bullet" }], // Lists
                        [{ header: [1, 2, 3, false] }], // Headers
                        [{ align: [] }], // Text alignment
                      ],
                    }}
                  ></ReactQuill>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <FormControl sx={{ minWidth: 400 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={taskDetails.status}
                      onChange={(e) => {
                       
                        setTaskDetails({...taskDetails,status:e.target.value});
                      }}>
                      <MenuItem value="todo">Todo</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Code Review">Code Review</MenuItem>
                      <MenuItem value="QA">QA</MenuItem>
                      <MenuItem value="Finished Susbended">
                        Finished Susbended
                      </MenuItem>
                    </Select>
                    <FormHelperText>Task Status</FormHelperText>
                  </FormControl>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDatePicker
                      value={taskDetails.tday}
                      onChange={(e) => {
                        console.log({e})
                        setTaskDetails({...taskDetails,tday:e});
                      }}
                      label="dead line"
                      slots={{
                        openPickerButton: StyledButton,
                        day: StyledDay,
                        textField: (params) => <StyledTextField {...params} />
                      }}
                    />
                  </LocalizationProvider>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <NavLink to="/tasks">
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

export default Task;
