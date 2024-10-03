import React, { useEffect, useState } from "react";
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
import { getProjects,getProjectByID } from "../../controllers/ProjectsController";
import { updateTask } from "../../controllers/TaskController";
function Task() {
  const location = useLocation();

  const [title, setTitle] = useState(location.state?.title||"");
  const [description, setDescription] = useState(location.state?.descrip||"");
  const [tday, setTday] = useState(dayjs(location.state?.end_date||new Date()));
  const [status, setStatus] = useState(location.state?.status||"todo");
  const [projects, setProjects] = useState([]);
  const [current_project, setCurrent_project] = useState({
    id: location.state?.id||"",
    title:'',
  });


  useEffect(() => {
    async function fetchProjects() {
      const result = await getProjects();
      setProjects(result);
    }

    async function fetchProjectByID() {
      const result = await getProjectByID(location.state.project_id);
      setCurrent_project({
        id: result.id,
        title:result.title,
        
       })
     
    }

    fetchProjects();
    fetchProjectByID();

  }, [location.state.project_id]);

  




  const handleSubmit = async (e) => {
    updateTask(current_project.id,title, description, tday, status,location.state.id);
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
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormControl fullWidth >
                    <Select
                      value={current_project.id ||""}
                      onChange={(e) => {
                        const selected_project = projects.find(p => p.id === e.target.value);
                        setCurrent_project({
                          id: selected_project.id,
                          title:selected_project.title,
                        });
                      }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="project"
                    >
                      {projects.map((project) => (
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
                      onChange={(e) => {
                        
                        setStatus(e.target.value);
                      }}
                    >
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
                      value={tday}
                      onChange={(newValue) => {
                        setTday(newValue)
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
