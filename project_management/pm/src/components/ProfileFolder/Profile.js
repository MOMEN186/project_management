import React, { useContext } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { cookiesContext } from "../../App";
import About from "./About";
import "../../App.css";
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
export default function Profile() {
  const cookies = useContext(cookiesContext);
  console.log(cookies.get("user"));
  // const [user] = useState(cookies.get("user"));
  // const [userProfile, ] = useState({
  //   first_name: user?.first_name || "",
  //   last_name: user?.last_name || "",
  //   id: user?.id || "",
  //   username: user?.username || "",
  //   avatar: user?.avatar,
  //   email: user?.email,
  //   profile_photo: user?.profile_photo,
  //   cover_photo: user?.cover_photo,
  // });

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
          <Grid item sx={{ backgroundColor: "#1d2025", width: "35%" }}>
            <About />
          </Grid>
          <Grid item sx={{ backgroundColor: "#1d2025", width: "25%" }}></Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
