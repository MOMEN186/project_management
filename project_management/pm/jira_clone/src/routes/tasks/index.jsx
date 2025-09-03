import { createFileRoute } from "@tanstack/react-router"
import React, { useState, useEffect, useContext } from "react";
import { getTasks, deleteTask } from "../../jira_clone/src/controllers/TaskController";
import { Link } from "react-router-dom";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  IconButton,
  ListItemIcon,
  Icon,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { cookiesContext } from "../App";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PestControlIcon from "@mui/icons-material/PestControl";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";


const type = [
  { name: "task", icon: <CheckBoxIcon sx={{ color: "#4389e1" }} /> },
  { name: "story", icon: <BookmarkBorderIcon sx={{ color: "#76952c" }} /> },
  { name: "bug", icon: <PestControlIcon sx={{ color: "#e46157" }} /> },
];

export const Route = createFileRoute('/tasks/')({
  component: Index,
})


function TasksList() {

  const [tasks, setTasks] = useState([]);
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const [token] = useState(user.token);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks(user.id, token);
      setTasks(fetchedTasks);
      console.log({ tasks });
    };

    fetchTasks();
  }, []);

  const handelDelete = async (task_id) => {
    const responseStatus = await deleteTask(task_id, token);
    console.log({ responseStatus });
    if (responseStatus === 200) window.location.reload();
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDirection="column"
    >
      <List>
        <ListItem>
          <ListItemButton component={Link} to="/addtask">
            <ListItemText primary="Add Task" />
          </ListItemButton>
        </ListItem>
        {tasks.length>0 &&tasks?.map((task) => {
          const taskType=type.find((t)=>t.name===task.type);
          
        return  <ListItem
            sx={{ paddingRight: 10, "&:hover": { backgroundColor: "grey" } }}
            secondaryAction={
              <IconButton edge="end" onClick={handelDelete}>
                <DeleteOutlineIcon sx={{ color: "white" }} fontSize="small" />
              </IconButton>
            }
          >
            <ListItemButton
              component={Link}
              to={`/tasks/${task.id}`}
              sx={{ "&:hover": { backgroundColor: "grey" }, width: "100%" }}
            >
              <ListItemIcon>
              {taskType?.icon||null}
              </ListItemIcon>
              <ListItemText primary={task.title} />
            </ListItemButton>
          </ListItem>
        })}
      </List>
    </Box>
  );
}

export default TasksList;
