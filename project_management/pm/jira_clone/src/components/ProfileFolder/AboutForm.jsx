import { Box, IconButton, TextField, Typography } from "@mui/material";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import EmailIcon from "@mui/icons-material/Email";
import { useContext, useEffect, useState } from "react";
import { cookiesContext } from "../../App";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  getUserInfo,
  updateUserInfo,
} from "../../controllers/ProfileController";

const fontColor = "#a4c0cc";
const bg = "#1d2025";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: 206,
  position: "relative",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#1d2025",
    "&:hover": {
      backgroundColor: "#1d2025",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: bg,
      },
    },
    "&.Mui-focused": {
      backgroundColor: "#1d2025",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: bg,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#85B8FF",
  },
  "& .MuiInputBase-input": {
    color: fontColor,
    backgroundColor: bg,
    height: 10,
  },
}));

export default function AboutForm() {
  const cookies = useContext(cookiesContext);
  const [user, setUser] = useState(cookies.get("user"));
  const [focusedField, setFocusedField] = useState(null);

  const [about, setAbout] = useState({
    job_title: user?.job_title,
    organization: user?.organization,
    department: user?.department,
  });

  async function fetchUserInfo() {
    const result = await getUserInfo(user.token, user.id);
    console.log("result", result);
    const userCookies = {
      email: result.email,
      token: result.token,
      username: result.username,
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
      job_title: result.job_title,
      organization: result.organization,
      department: result.department,
    };
    cookies.set("user",  userCookies);
    setUser(cookies.get("user"));
    console.log("cookies:", cookies.get("user"));
  }

  useEffect(() => {
    console.log("in useEffect");
    fetchUserInfo();
  }, []);

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleupdate = async (key, value) => {
    console.log({ key, value });
    await updateUserInfo(user.token, user.id, key, value);
    fetchUserInfo();
    handleBlur();
  };

  return (
    <Box>
      <Grid display="flex" flexDirection="column" rowGap="1vh">
        <Typography sx={{ fontSize: "24px" }}>{"momen ehab"}</Typography>
        <Typography variant="caption">ABOUT</Typography>

        <Grid display="flex" flexDirection="row" alignItems="center" gap={1}>
          <WorkOutlineOutlinedIcon fontSize="small" />

          <StyledTextField
            value={about?.job_title}
            placeholder="Your job title"
            onChange={(e) => {
              setAbout({ ...about, job_title: e.target.value });
            }}
            onFocus={() => handleFocus("job_title")}
          />
          {focusedField === "job_title" && (
            <Box className="action-buttons">
              <IconButton
                onClick={() => {
                  handleupdate("job_title", about.job_title);
                }}
              >
                <DoneIcon sx={{ color: fontColor, backgroundColor: bg }} />
              </IconButton>
              <IconButton>
                <CloseIcon
                  sx={{ color: fontColor }}
                  onClick={() => {
                    setAbout({ ...about, job_title: user.job_title });
                  }}
                />
              </IconButton>
            </Box>
          )}
        </Grid>

        <Grid
          item
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
        >
          <AccountTreeOutlinedIcon fontSize="small" />
          <StyledTextField
            value={about?.department}
            placeholder="Your department"
            onChange={(e) => {
              setAbout({ ...about, department: e.target.value });
            }}
            onFocus={() => handleFocus("department")}
          />
          {focusedField === "department" && (
            <Box className="action-buttons">
              <IconButton>
                <DoneIcon
                  sx={{ color: fontColor, backgroundColor: bg }}
                  onClick={() => {
                    handleupdate("department", about.department);
                  }}
                />
              </IconButton>
              <IconButton>
                <CloseIcon sx={{ color: fontColor }} />
              </IconButton>
            </Box>
          )}
        </Grid>

        <Grid
          item
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
        >
          <CorporateFareIcon fontSize="small" />

          <StyledTextField
            placeholder="Your organization"
            value={about?.organization}
            onChange={(e) => {
              setAbout({ ...about, organization: e.target.value });
            }}
            onFocus={() => handleFocus("organization")}
          />
          {focusedField === "organization" && (
            <Box className="action-buttons">
              <IconButton>
                <DoneIcon
                  sx={{ color: fontColor, backgroundColor: bg }}
                  onClick={() => {
                    handleupdate("organization", about.organization);
                  }}
                />
              </IconButton>
              <IconButton>
                <CloseIcon sx={{ color: fontColor }} />
              </IconButton>
            </Box>
          )}
        </Grid>

        <Grid item display="flex" flexDirection="column" rowGap="1vh">
          <Typography variant="caption">CONTACT</Typography>
          <Grid display="flex" flexDirection="row" alignItems="center">
            <EmailIcon />
            <StyledTextField value={user.email} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}


