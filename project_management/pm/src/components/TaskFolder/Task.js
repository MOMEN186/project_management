import React from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { theme } from "./styled/TaskFormStyled";
import Grid from "@mui/material/Grid2";

import Comment from "./Comment";
import CommentsList from "./CommentsList";
import TaskForm from "./TaskForm";

function Task() {
  const { id } = useParams();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          height: "100%",
        }}
        noValidate
      >
        <Grid container display="flex" flexDirection="row" height="100%">
          <Grid
            display="flex"
            flexDirection="column"
            sx={{
              padding: "20px",
              height: "100%",
            }}
          >
            <TaskForm id={id} />
            <Grid container>
              <Typography>Comments</Typography>
            </Grid>
            <Grid>
              <Comment taskID={id} />
            </Grid>
            <Grid container marginTop={3}>
              <CommentsList taskID={id} />
            </Grid>
          </Grid>

          
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Task;
