import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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
} from "./styled/TaskFormStyled";
import { createTask } from "../../controllers/TaskController";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import "../../App.css";
import { getProjects } from "../../controllers/ProjectsController"



function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tday, setTday] = useState(null);
  const [status, setStatus] = useState("todo");
  const [projects,setProjects]=useState([]);
  const [current_project, setCurrent_project] = useState("");

  useEffect(() => {

    async function fetchProjects() {
      const result = await getProjects();
      setProjects(result);
    }
    fetchProjects();

  }, []);


  const handleSubmit = () => {
    createTask(current_project.id,title, description, tday.format("YYYY-MM-DD"), status);
  };



  return (
    <ThemeProvider theme={theme}>
      <Box component="form" sx={{ color: "white", padding: "20px" }} noValidate>
        <div>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>
                  <h2>New Task</h2>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <StyledTextField
                    variant="outlined"
                    label="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>select project</InputLabel>
                    <Select
                      value={current_project}
                      onChange={(e) => {
                        setCurrent_project(e.target.value);
                      
                      }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="project"
                    >
                      {

                        projects.map((project) => (
                        <MenuItem key={project.id} value={project}>{project.title}</MenuItem>
                        ))
                      
                      }
                    </Select>
                  </FormControl>
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
                      value={description}
                      onChange={setDescription}
                      modules={{
                        toolbar: [
                          ["bold", "italic", "underline", "strike"], // Text styling
                          [{ list: "ordered" }, { list: "bullet" }], // Lists
                          [{ header: [1, 2, 3, false] }], // Headers
                          [{ align: [] }], // Text alignment
                        ],
                      }}
                    ></ReactQuill>
                    <FormHelperText>task description</FormHelperText>
                  </FormControl>
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
                      value={status}
                      label="Age"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}>
                      <MenuItem value="todo">Todo</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Code Review">Code Review</MenuItem>
                      <MenuItem value="QA">QA</MenuItem>
                      <MenuItem value="Finished Susbended">Finished Susbended</MenuItem>
                    </Select>
                    <FormHelperText>Task Status</FormHelperText>
                  </FormControl>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDatePicker
                      label="dead line"
                      value={tday}
                      onChange={(value) => {
                        setTday(value);
                      }}
                     
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

export default TaskForm;