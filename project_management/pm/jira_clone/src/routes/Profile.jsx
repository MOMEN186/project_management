import { createFileRoute } from "@tanstack/react-router"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import About from "../components/ProfileFolder/About";
import "../App.css";
import CoverPhoto from "../components/ProfileFolder/CoverPhoto";
import ProfilePhoto from "../components/ProfileFolder/ProfilePhoto";
export const Route = createFileRoute('/Profile')({
  component: Index,
})


export default function Profile() {

  return (
    <Box display="flex" sx={{ flexGrow: 1 }} width="100%">
      <Grid container width="100vw" sx={{ postion: "reative" }}>
        <Grid width="100%">
          <CoverPhoto />
        </Grid>
        <Grid>
          <ProfilePhoto />
        </Grid>
        <Grid
          disply="flex"
          alignContent="center"
          justifyContent="center"
          container
          width="100%"
          marginTop={10}
        >
          <Grid item sx={{ backgroundColor: "#1d2025", width: "60%" }}>
            <About />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
