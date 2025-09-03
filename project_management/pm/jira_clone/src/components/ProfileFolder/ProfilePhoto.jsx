import { Avatar, Box, Button, Dialog, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { cookiesContext } from "../../App";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { DeleteImage, getImage, UploadImage } from "../../controllers/ProfileController";

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

function ProfilePhoto() {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const [open, setOpen] = useState(false);
  const [profile_photo, setProfile_photo] = useState(
    localStorage.getItem("profile_photo")
  );

  useEffect(() => {
    async function getProfilePhoto() {
      const result = await getImage(user.token, user.id, "profile_photo");

      const pf = result?.profile_photo?.data
        ? btoa(String.fromCharCode(...result.profile_photo.data))
        : "";

      localStorage.setItem("profile_photo", pf);
      setProfile_photo(pf);
      console.log("in useEffect",{profile_photo})
    }
    if (localStorage.getItem("profile_photo") === null) getProfilePhoto();

  }, []);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("profile_photo", file);

    await UploadImage(user.token, user.id, formData, "profile_photo").then(() => {
      setOpen(false);
      // Set profile_photo directly after uploading a new photo
      const reader = new FileReader();
      reader.onload = () => {
        const base64Photo = reader.result.split(",")[1];
        localStorage.setItem("profile_photo", base64Photo);
        setProfile_photo(base64Photo);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = async () => {

    await DeleteImage(user.toke, user.id, "profile_photo");
    setOpen(false);
    localStorage.removeItem("profile_photo");
    setProfile_photo(null);
  };
  return (
    <Grid
      item
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      sx={{
        position: "absolute",
        left: "25%",
        top: "18%",
        transform: "translateX(-50%)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 132,
          height: 132,
          "&:hover .icon": {
            display: "flex",
            opacity: 1,
          },
        }}
      >
        <Avatar
          src={profile_photo ? `data:image/*;base64,${profile_photo}` : ""}
          sx={{
            width: 132,
            height: 132,
            mb: 2,
            fontSize: 48,
            border: "2px solid black",
            backgroundColor: "#0052cc",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {user.avatar
            ? user.avatar
            : (user.first_name[0] + user.last_name[0]).toUpperCase()}
        </Avatar>

        <Box
          className="icon"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            display: profile_photo ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            transition: "opacity 0.2s ease-in-out",
            borderRadius: "50%",
            opacity: profile_photo?1:0,
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <CameraAltIcon
              fontSize="small"
              sx={{
                fontSize: 32,
                color: "black",
                padding: "4px",
              }}
            />
          </IconButton>
        </Box>
        <Dialog open={open} onClose={() => setOpen(0)}>
          <Box
            sx={{
              backgroundColor: "#1d2025",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              role={undefined}
              component="label"
              variant="contained"
              tabIndex={-1}
              sx={{
                backgroundColor: "#1d2025",
                color: "#a4c0cc",
                fontSize: "14px",
                border: "none",
              }}
            >
              Change profile photo
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
                backgroundColor: "#1d2025",
                color: "#a4c0cc",
                fontSize: "14px",
                border: "none",
              }}
            >
              Remove
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Grid>
  );
}

export default ProfilePhoto;


