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

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks(cookies.get("token"));
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  const handelDelete=(task_id) => {
    deleteTask(task_id);

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
