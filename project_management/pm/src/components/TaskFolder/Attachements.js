import { Box, Button, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useContext, useEffect, useState } from "react";
import { cookiesContext } from "../../App";
import { addFile, getFiles } from "../../controllers/TaskController";
import FileViewer from "./FileViewer";
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
export default function Attachement({ taskId }) {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const [attachements, setAttachements] = useState([]);
  const handleUpload = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user.id);

    await addFile(user.token, user.id, taskId, formData);
  };

  useEffect(() => {
    async function fetchAttachements() {
      const result = await getFiles(user.token, taskId);
      console.log(result);
      setAttachements(result || []);
    }
    fetchAttachements();
  }, [taskId, user.token]);

  return (
    <Box>
      <Grid>
        <Grid>
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
                if (event.target.files[0]) handleUpload(event.target.files[0]);
              }}
            />
          </Button>
        </Grid>
        <Grid display="flex" flexDirection="row" columnGap={1}>
          {attachements.map((attachement) => (
            <Grid display="flex" flexDirection="row">
      
                <FileViewer fileData={attachement} taskId={taskId} />
              </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
