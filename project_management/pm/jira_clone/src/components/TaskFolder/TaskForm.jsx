import Grid from "@mui/material/Grid2";
import { useContext, useEffect, useState } from "react";
import { getProjects } from "../../controllers/ProjectsController";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  createTask,
  getTaskByID,
  updateTask,
} from "../../controllers/TaskController";
import { cookiesContext } from "../../../../src/App";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  StyledButton,
  StyledDatePicker,
  StyledDay,
  StyledTextField,
} from "./styled/TaskFormStyled";
import ReactQuill from "react-quill";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PestControlIcon from "@mui/icons-material/PestControl";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Attachments from "./Attachements";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const status = [
  "todo",
  "In Progress",
  "Code Review",
  "QA",
  "Finished Susbended",
];
const type = [
  { name: "task", icon: <CheckBoxIcon sx={{ color: "#4389e1" }} /> },
  { name: "story", icon: <BookmarkBorderIcon sx={{ color: "#76952c" }} /> },
  { name: "bug", icon: <PestControlIcon sx={{ color: "#e46157" }} /> },
];
const priority = [
  {
    name: "Low",
    icon: <LowPriorityIcon sx={{ color: "green" }} />,
  },
  {
    name: "Medium",
    icon: <FormatListBulletedIcon sx={{ color: "#4389e1" }} />,
  },
  { name: "High", icon: <PriorityHighIcon sx={{ color: "red" }} /> },
];

export default function TaskForm({ id }) {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    tday: dayjs(new Date()),
    status: "todo",
    projectId: "",
    id: id,
    assignee_id: "",
    type: "",
    priority: "",
  });

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const newTask = taskDetails.id || 0;

  useEffect(() => {
    async function fetchProjects() {
      const result = await getProjects(user.id, user.token);
      setProjects(result || []);
    }
    if(id)
    fetchProjects();
  }, [user.token, user.id,id]);

  useEffect(() => {
    async function fetchTaskByID() {
      const result = await getTaskByID(id, user.token);
      setTaskDetails({
        title: result?.title,
        description: result?.descrip,
        tday: dayjs(result?.end_date),
        status: result?.status,
        projectId: result?.project_id,
        id: result?.id,
        assignee_id: result?.assignee_id,
        type: result?.type,
        priority: result?.priority,
      });
    }
    if (id) fetchTaskByID();
  }, []);

  const handleSubmit = async (e) => {
    if (!newTask) createTask(taskDetails, user.token);
    else updateTask(taskDetails, user.token);
    navigate("/tasks");
  };

  return (
    <Grid
      item
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDirection="column"
      rowGap="4vh"
      padding="20px"
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

      <Attachments taskId={id} />

      <FormControl fullWidth>
        <InputLabel>Project</InputLabel>
        <Select
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
        className=""
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
          {status.map((st, index) => (
            <MenuItem key={index} value={st}>
              {st}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Task Status</FormHelperText>
      </FormControl>

      <FormControl sx={{ minWidth: "350px" }}>
        <InputLabel id="demo-simple-select-helper-label">type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={taskDetails.type}
          onChange={(e) => {
            setTaskDetails({ ...taskDetails, type: e.target.value });
          }}
        >
          {type.map(({ name, icon }, index) => (
            <MenuItem key={index} value={name}>
              <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ListItemIcon sx={{ minWidth: "auto" }}>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </Grid>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>type</FormHelperText>
      </FormControl>

      <FormControl sx={{ minWidth: "350px" }}>
        <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={taskDetails.priority}
          onChange={(e) => {
            console.log(taskDetails.priority);
            setTaskDetails({ ...taskDetails, priority: e.target.value });
          }}
        >
          {priority.map(({ name, icon }, index) => (
            <MenuItem key={index} value={name}>
              <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ListItemIcon>
                  {icon}
                 
                </ListItemIcon>
                <ListItemText primary={name} />
              </Grid>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>priority</FormHelperText>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDatePicker
          value={taskDetails.tday}
          onChange={(e) => {
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
    </Grid>
  );
}


