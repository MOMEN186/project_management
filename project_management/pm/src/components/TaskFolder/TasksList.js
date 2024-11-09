import React, { useState, useEffect, useContext } from "react";
import { getTasks, deleteTask } from "../../controllers/TaskController";
import { Link } from "react-router-dom";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { cookiesContext } from "../../App";

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
        {tasks.map((task) => (
          <ListItem
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
              sx={{ "&:hover": { backgroundColor: "grey" }, width:"100%" }}
            >
              <ListItemText primary={task.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TasksList;
