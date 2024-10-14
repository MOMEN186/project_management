import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";

import React, { useContext, useEffect, useState } from "react";
import { getTeamMembers } from "../../controllers/TeamsController";
import { cookiesContext } from "../../App";
import { styled } from "@mui/material/styles";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function MembersList({ id }) {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user") || "");
  const [token] = useState(user?.token || "");
  const [members, setMembers] = useState([]);
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);

  useEffect(() => {
    async function fetchTeamMembers() {
      const result = await getTeamMembers(id, token);
      setMembers(result || []);
    }

    fetchTeamMembers();
  }, []);

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Team Members {members.length ? members.length : ""}
      </Typography>
      <Typography
        sx={{ mt: 4, mb: 2 }}
        variant="h6"
        component="div"
      ></Typography>
      <Demo>
        <List dense={dense}>
          {members &&
            members.length &&
                      members.map((member, key) => {
                
              return<ListItem key={key}>
                <ListItemText primary={member.username} />
              </ListItem>;
            })}
        </List>
      </Demo>
    </Grid>
  );
}
