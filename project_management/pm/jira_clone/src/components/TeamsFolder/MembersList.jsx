import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { cookiesContext } from "../../App";
import { getTeamMembers } from "../../controllers/TeamsController";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function MemberList({ id }) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const cookies = useContext(cookiesContext);
  useEffect(() => {
    async function fetchTeamMembers() {
      const result = await getTeamMembers(id, cookies.get("user").token);
      console.log("all team members", result);
      setMembers(result);
    }

    fetchTeamMembers();
  }, []);

  return (
    <Box
      display="flex"
      rowGap="5vh"
      flexDirection="column"
      justifyContent="flex-start"
      alignContent="flex-start"
    >
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper
          elevation={5}
          sx={{
            maxWidth: 300,
            backgroundColor: "black",
            border: "1px solid grey",
          }}
        >
          <FireNav component="nav" disablePadding>
            <ListItem
              component="div"
              disablePadding
              sx={{ backgroundColor: "black", width: "300px" }}
            ></ListItem>
            <Divider />
            <Box
              sx={[
                open
                  ? {
                      bgcolor: "black",
                      width: "300px",
                    }
                  : {
                      bgcolor: "black",
                      width: "300px",
                    },
                open
                  ? {
                      pb: 2,
                    }
                  : {
                      pb: 0,
                    },
              ]}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={[
                  {
                    px: 3,
                    pt: 2.5,
                  },
                  open
                    ? {
                        pb: 0,
                      }
                    : {
                        pb: 2.5,
                      },
                  open
                    ? {
                        "&:hover, &:focus": {
                          "& svg": {
                            opacity: 1,
                          },
                        },
                      }
                    : {
                        "&:hover, &:focus": {
                          "& svg": {
                            opacity: 0,
                          },
                        },
                      },
                ]}
              >
                <ListItemText
                  primary={`Team Members : ${members.length}`}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                  }}
                  secondary="momen ehab,...."
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={[
                    {
                      opacity: 10,
                      transition: "0.2s",
                      color:"white"
                    },
                    open
                      ? {
                        transform: "rotate(-180deg)",
                        
                        }
                      : {
                        transform: "rotate(0)",
                        
                        },
                  ]}
                />
              </ListItemButton>
              {open &&
                members.map((item) => (
                  <ListItemButton
                    key={item.first_name}
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "white",
                      backgroundColor: "black",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.username}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
