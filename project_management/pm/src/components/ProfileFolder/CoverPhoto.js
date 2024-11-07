import { Box, Button, Dialog, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { DeleteImage, getImage, UploadImage } from "../../controllers/ProfileController";
import { styled } from "@mui/material/styles";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { cookiesContext } from "../../App";
import Grid from "@mui/material/Grid2";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  backgroundColor: "red",
});
function CoverPhoto() {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const [open, setOpen] = useState(false);
  const [cover_photo, setCover_photo] = useState(
    localStorage.getItem("cover_photo")
  );

  const handleUpload = async(file) => {
    const formData = new FormData();
    formData.append("cover_photo", file);
    await  UploadImage(user.token, user.id, formData,"cover_photo").then(() => {
      setOpen(false);
    });
   
      const result = await getImage(user.token, user.id, "cover_photo");
      const cf = result?.cover_photo?.data
          ? btoa(String.fromCharCode(...result.cover_photo.data))
          : '';
      
      localStorage.setItem("cover_photo", cf);
      setCover_photo(cf);
    
      console.log(result)
  };

  const handleDelete = () => {
    DeleteImage(user.token, user.id, "cover_photo");
    localStorage.removeItem("cover_photo");
    setCover_photo("");
  };
  return (
    <Box width="100%" sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid
          item
          width="100%"
          height="190px"
          display="flex"
          flexDirection="column"
          sx={{
            backgroundImage: cover_photo
              ? `url(data:image/jpeg;base64,${cover_photo})`
              : "linear-gradient(270deg, rgb(255, 240, 179) 0%, rgb(255, 196, 0) 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            "&:hover": {
              "& .icon-button": {
                display: "flex",
              },
              background: "rgb(182, 194, 207)",
            },
          }}
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            className="icon-button"
            onClick={() => setOpen(!open)}
            sx={{
              color: "#1d2025",
              display: "none",
              width: "100%",
              height: "100%",

              borderRadius: 0,
              "& .MuiTouchRipple-root": {
                borderRadius: 0,
              },
            }}
          >
            <InsertPhotoIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <Box
              sx={{
                height: "90px",
                backgroundColor: "#1d2025",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: 0,
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{
                  backgroundColor: "#1d2025",
                  color: "#a4c0cc",
                  fontSize: "14px",
                  border: "none",
                }}
              >
                Upload image
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    if (event.target.files[0])
                      handleUpload(event.target.files[0]);
                  }}
                />
              </Button>
              <Button
                onClick={handleDelete}
                sx={{
                  border: "none",
                  color: "#a4c0cc",
                  fontSize: "14px",
                  boxShadow: "",
                }}
              >
                Remove image
              </Button>
            </Box>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CoverPhoto;
