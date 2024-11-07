import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
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
import {
  updateTask,
  createTask,
  getTaskByID,
} from "../../controllers/TaskController";
import { cookiesContext } from "../../App";

function Task() {
  const { id } = useParams();

  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const [token] = useState(user.token);

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    tday: dayjs(new Date()),
    status: "todo",
    projectId: "",
    id: id,
    assignee_id: "",
  });

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const newTask = taskDetails.id || 0;

  useEffect(() => {
    async function fetchProjects() {
      const result = await getProjects(user.id, token);
      setProjects(result?.length ? result : []);
    }

    fetchProjects();
  }, [taskDetails.projectId]);

  useEffect(() => {
    async function fetchTaskByID() {
      const result = await getTaskByID(id, token);
      setTaskDetails({
        title: result.title,
        description: result.descrip,
        tday: dayjs(result.end_date),
        status: result.status,
        projectId: result.project_id,
        id: id,
        assignee_id: result.assignee_id,
      });
    }
    fetchTaskByID();
  }, []);

  useEffect(() => {
    console.log(taskDetails);
  }, []);

  const handleSubmit = async (e) => {
    if (!newTask) createTask(taskDetails, token);
    else updateTask(taskDetails, token);
    navigate("/tasks");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          color: "white",
          padding: "20px",
          width: 1,
        }}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        rowGap="4vh"
        flexDirection="column"
        noValidate
      >
        <Typography>{id ? "Edit Task" : "Create Task"}</Typography>
        <StyledTextField
          variant="outlined"
          label="Title"
          value={taskDetails.title}
          onChange={(e) => {
            setTaskDetails({ ...taskDetails, title: e.target.value });
          }}
          sx={{ width: "350px" }}
        />

        <FormControl fullWidth>
          <Select
            // defaultValue={""}
            value={taskDetails.projectId}
            onChange={(e) => {
              const selected_project = projects.find(
                (p) => p.id === e.target.value
              );
              setTaskDetails({
                ...taskDetails,
                projectId: selected_project.id,
              });
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="project"
            sx={{ width: "350px" }}
          >
            {projects.map((project) => (
              <MenuItem value={project.id} key={project.id}>
                {project.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ReactQuill
          style={{
            maxHeight: "300px",
            overflow: "auto",
            maxWidth: "350px",
          }}
          theme="snow"
          value={taskDetails.description}
          onChange={(e) => {
            setTaskDetails({ ...taskDetails, description: e });
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

        <FormControl sx={{ minWidth: "350px" }}>
          <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={taskDetails.status}
            onChange={(e) => {
              setTaskDetails({ ...taskDetails, status: e.target.value });
            }}
          >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Code Review">Code Review</MenuItem>
            <MenuItem value="QA">QA</MenuItem>
            <MenuItem value="Finished Susbended">Finished Susbended</MenuItem>
          </Select>
          <FormHelperText>Task Status</FormHelperText>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDatePicker
            value={taskDetails.tday}
            onChange={(e) => {
              console.log({ e });
              setTaskDetails({ ...taskDetails, tday: e });
            }}
            label="dead line"
            slots={{
              openPickerButton: StyledButton,
              day: StyledDay,
              textField: (params) => <StyledTextField {...params} />,
            }}
          />
        </LocalizationProvider>

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

export default Task;
