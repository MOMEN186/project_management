import Grid from "@mui/material/Grid2";
import "../../App.css";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { cookiesContext } from "../../App";
import { deleteComment, getComments } from "../../controllers/TaskController";
import ReactQuill from "react-quill";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
export default function CommentsList({ taskID }) {
  const [comments, setComments] = useState([]);
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const [editingID, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchComments() {
      const result = await getComments(user.token, taskID);
      setComments(result || []);
    }
    if(taskID)
    fetchComments();
  }, []);

  const handleDelete = async (commentID, taskID) => {
    await deleteComment(user.token, user.id, taskID, commentID);
    navigate(0);
  };

  const RQ = ({ value }) => (
    <ReactQuill
      readOnly={true}
      value={value}
      className="borderless-editor"
      modules={{
        toolbar: false,
      }}
      style={{ marginTop: "0px", marginLeft: "37px", width: "100px" }}
    />
  );

  return (
    <Box sx={{ flexGrow: 1, width: 100 }}>
      <Grid container display="flex" flexDirection="column">
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Grid container display="flex" flexDirection="column" key={comment.id}>
              <Grid item display="flex" flexDirection="row" alignItems="center">
                <Avatar sx={{ width: 32, height: 32 }}>
                  {comment.username[0]}
                </Avatar>
                <Typography sx={{ marginLeft: "5px", fontSize: "14px" }}>
                  {comment.username}
                </Typography>
              </Grid>

              {comment.id === editingID ? (
                <Comment commentID={comment.id} taskID={comment.task_id} content={ comment.content} />
              ) : (
                <RQ value={comment.content} />
              )}
              <Grid display="flex" flexDirection="row" width="100%" >
                {!(comment.id === editingID) && (
                  <Grid display="flex" flexDirection="row" width="100%" columnGap={-5}
                    marginLeft={2}
                    
                  >
                    <Button
                      sx={{
                        color: "#a4c0cc",
                        textTransform: "none",
                        "&:hover": {
                          textDecoration: "underline",
                          border: "none",
                          backgroundColor: "#1d2025",
                        },
                      }}
                      onClick={() => {
                        setEditingId(comment.id);
                      }}
                    >
                      edit
                    </Button>

                    <Typography>.</Typography>
                    
                    <Button
                         sx={{
                          color: "#a4c0cc",
                          textTransform: "none",
                          "&:hover": {
                            textDecoration: "underline",
                            border: "none",
                            backgroundColor: "#1d2025",
                          },
                        }}
                      onClick={() => handleDelete(comment.id, comment.task_id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
