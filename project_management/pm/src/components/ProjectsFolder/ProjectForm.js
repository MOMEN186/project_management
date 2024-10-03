import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
//   InputLabel,
//   MenuItem,
//   Select,
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
} from "../TaskFolder/styled/TaskFormStyled";
import { createProject } from "../../controllers/ProjectsController";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../../App.css";

function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tday, setTday] = useState(null);

  const handleSubmit = () => {
    createProject(title, description,tday.format("YYYY-MM-DD"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" sx={{ color: "white", padding: "20px" }} noValidate>
        <div>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>
                  <h2>New Project</h2>
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
                    <FormHelperText>Project description</FormHelperText>
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
                      renderInput={(params) => (
                        <StyledTextField {...params} label="Deadline" />
                      )}
                      slots={{
                        openPickerButton: StyledButton,
                        day: StyledDay,
                      }}
                    />
                  </LocalizationProvider>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <NavLink to="/projects">
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

export default ProjectForm;
