import React, { useState, useEffect,useContext } from "react";
import {getTasks,deleteTask} from "../../controllers/TaskController";
import { NavLink } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Button,
  Box,
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { cookiesContext } from "../../App";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const cookies = useContext(cookiesContext);
  const [user,] = useState(cookies.get("user"));
  const [token,] = useState(user.token);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("in task list ",token)
      const fetchedTasks = await getTasks(user.id,token);
      setTasks(fetchedTasks);
      console.log({tasks})
    };

    fetchTasks();
  }, []);

  const handelDelete=async(task_id) => {
    const responseStatus = await deleteTask(task_id,token);
    console.log({ responseStatus });
    if(responseStatus===200)window.location.reload(); 
  }


  return (
    <Box >
    <TableContainer>
      <Table>
        <TableRow >
          <TableCell sx={{borderBottom:"none"}}>
            <NavLink to="/addtask">
              <Button sx={{color:"white"}} >Add Task</Button>
            </NavLink>
          </TableCell>
              </TableRow>
      
          
        
          {
              tasks.map((task) => {
                      return (
                          <TableRow key={task.id}>
                              <TableCell>
                                  <NavLink to="/tasks/id"
                                  state={task}
                                  >
                                      <Button sx={{color:"white"}}>
                                            {task.title}
                                      </Button>
                                  </NavLink>
                                
                          </TableCell>
                          <TableCell>
                            <Button sx={{color:"white"}} onClick={()=>{handelDelete(task.id)}}> 
                            <DeleteOutlineIcon fontSize="small"/>

                            </Button>
                          </TableCell>
                             
                          </TableRow>
                      )
                  })
              }
                
      </Table>
      </TableContainer>
      </Box>

  );
}

export default TasksList;
