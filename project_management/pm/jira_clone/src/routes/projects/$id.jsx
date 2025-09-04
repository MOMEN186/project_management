import { createFileRoute } from "@tanstack/react-router"
import React, { useContext, useEffect, useState } from "react";
import { Box, FormControl, FormHelperText, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider } from "@mui/material/styles";
import {
  theme,
  StyledButton,
  StyledDay,
  StyledDatePicker,
  StyledTextField,
}from "../../components/TaskFolder/styled/TaskFormStyled";
import {
  UpdateProject,
  createProject,
  getProjectByID,
} from "../../controllers/ProjectsController";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "../App.css";
import { cookiesContext } from "../../main";
import dayjs from "dayjs";

export const Route = createFileRoute('/projects/$id')({
  component: Index,
});


export default function Project() {
 let { id } = useParams();
 const cookies = useContext(cookiesContext);
 const [user] = useState(cookies.get("user"));
 const [token] = useState(user.token);
 const navigate = useNavigate();

 const [projectDetails, setProjectDetails] = useState({
   title: "",
   description: "",
   tday: dayjs(new Date()),
   id: id,
   manager_id: user.id,
 });

 useEffect(() => {
   async function fetchProjectByID() {
     try {
       const result = await getProjectByID(id, token);
       console.log(result.title);
       setProjectDetails({
         title: result.title.toString(),
         description: result.descrip,
         tday: dayjs(result.end_date),
         id: id,
         manager_id: result.managerid,
       });
     } catch (e) {
       console.log({ e });
     }
   }
   if(id)
   fetchProjectByID();
 }, []);

 useEffect(() => {
   console.log(projectDetails);
 }, [projectDetails]);

 const handleSubmit = async (e) => {
   e.preventDefault();
   let responseStatus = 0;
   if (!projectDetails.id)
     responseStatus = await createProject(projectDetails, token);
   else responseStatus = await UpdateProject(projectDetails, token);
   console.log({responseStatus})
   if (responseStatus) navigate("/projects")
 };

 return (
   <ThemeProvider theme={theme}>
     <Box
       component="form"
       sx={{ color: "white", padding: "20px", width: 1 }}
       noValidate
       display="flex"
       justifyContent="flex-start"
       alignItems="flex-start"
       rowGap="5vh"
       flexDirection="column"
     >
       <Typography>
         {projectDetails.id ? "Edit Project" : "Add Project"}
       </Typography>
       
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
         sx={{ width: "350px" }}
       />

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
             console.log({ e });
             setProjectDetails({
               ...projectDetails,
               description: e,
             });
             console.log({ e });
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
           sx={{ width: "350px" }}
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
         to="/projects"
       >
         save
       </Button>
     </Box>
   </ThemeProvider>
 );
}

