import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function NotFound() {
  return (
      <Grid display="flex"  justifyContent="center" alignItems="center"
     sx={{width:"100%",height:"100%",position:"fixed"}}
      >
      <Typography>Erorr 404 Not Found!</Typography>
    </Grid>
  );
}
