import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReactQuill from "react-quill";
import "../../App.css";
import { useContext, useState } from "react";
import { addComment, editComment } from "../../controllers/TaskController";
import { cookiesContext } from "../../../../src/App";
import { useNavigate } from "react-router-dom";

export default function Comment({ taskID, commentID }) {
  const [focus, setFocus] = useState(false);
  const [comment, setComment] = useState("");
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const navigate = useNavigate();



  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log({commentID})
    if (commentID)
      await editComment(user.token, user.id, taskID, commentID, comment);
    else await addComment(user.token, user.id, taskID, comment);

    navigate(0);
  };

  return (
    <Box sx={{ width: "100%", flexGrow: 1, height: "100%" }}>
      <Grid
        container
        display="flex"
        flexDirection="column"
        width="100%"
        sx={{ overflow: "hidden", height: "100%" }}
      >
        <Grid item height="100%">
          <ReactQuill
            value={comment}
            onChange={(e) => {
              setComment(e);
              setFocus(true);
            }}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            style={{
              height: "150px",
              width: "725px",
            }}
            theme="snow"
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ header: [1, 2, 3, false] }],
                [{ align: [] }],
              ],
            }}
          />
          <Grid display={focus ? "flex" : "none"} width="100%" marginLeft={1}>
            <Button
              sx={{
                backgroundColor: "#549efe",
                color: "black",
                textTransform: "none",
                width: "1px",
                fontSize: "14px",
              }}
              onClick={handleUpdate}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setFocus(false);
                setComment("");
              }}
              sx={{
                color: "#a4c0cc",
              }}
            >
              cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}


