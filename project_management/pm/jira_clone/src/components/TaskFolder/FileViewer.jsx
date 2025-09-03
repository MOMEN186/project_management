import { IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../App.css";
import { deleteFile } from "../../controllers/TaskController";
import { useContext, useEffect, useState } from "react";
import { cookiesContext } from "../../../../src/App";
import { formatDate } from "../../controllers/dateController";
const excel = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
const isExcel = (type) => excel.includes(type);

function downloadFile(data, filename, type) {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function PdfFile({ fileData }) {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
       const blob = new Blob([new Uint8Array(fileData.attachement.data)], {
    type: "application/pdf",
  });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  },[])


  return (
    <Grid item>
    <object
      data={pdfUrl}
      type="application/pdf"
      height="90px"
      width="150px"
    >
    </object>
  </Grid>
  );
}

function ImageFile({ fileData }) {
  const binaryData = new Uint8Array(fileData.attachement.data);
  const image = btoa(String.fromCharCode(...binaryData));
  return (
    <Grid container direction="column" spacing={1}>
      <img
        width="100px"
        height="100px"
        src={`data:image/*;base64,${image}`}
        alt=""
      />
    </Grid>
  );
}

function WordFile({ fileData }) {
 
  const [wordUrl, setWordUrl] = useState("");

  useEffect(() => {
     const blob = new Blob([new Uint8Array(fileData.attachement.data)], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
    const url = URL.createObjectURL(blob);
    setWordUrl(url);
  },[])

  return (
    <Grid item>
      <object
        src={wordUrl}
        title={fileData.name}
        height="90px"
        width="150px"
        aria-label="d"
        type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
    </Grid>
  );
}

function ExcelFile({ fileData }) {
  
  const [excelUrl, setExcelUrl] = useState("");
  useEffect(() => {
      const binaryData = new Uint8Array(fileData.attachement.data);
  const blob = new Blob([binaryData], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
    setExcelUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    }
    },[fileData])

  return (
    <Grid>
      <object
        src={excelUrl}
        width="150px"
        height="90px"
        style={{ border: "none" }}
        title="Excel Viewer"
      ></object>
    </Grid>
  );
}


export default function FileViewer({ fileData, taskId }) {
  const cookies = useContext(cookiesContext);
  const [user] = useState(cookies.get("user"));
  const date=formatDate(fileData.creation_date)
  const mimetype = fileData.type;
  let File = null;

  if (mimetype === "application/pdf") {
    File = <PdfFile fileData={fileData} />;
  } else if (mimetype === "image/jpeg") {
    File = <ImageFile fileData={fileData} />;
  } else if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    File = WordFile({ fileData: fileData });
  } else if (isExcel(mimetype)) {
    File = ExcelFile({ fileData: fileData });
  }
 
  const handleDownload = () => {
    downloadFile(
      new Uint8Array(fileData.attachement.data),
      fileData.name,
      mimetype
    );
  };
  const handleDelete = async () => {
    await deleteFile(user.token, taskId, fileData.id, user.id);
  };

  return (
    <Grid container sx={{ width: "150px" }}>
      <Grid>
        {File ? (
          <Grid sx={{ position: "relative" }}>
            <IconButton onClick={handleDownload} sx={{ position: "absolute" }}>
              <CloudDownloadIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              sx={{ position: "absolute", right: "0px" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            {File}
            <Typography sx={{
              fontSize: "10px", width: "90px",
              whiteSpace: "normal", 
              wordWrap: "break-word",
              overflow: "hidden", 
              textOverflow: "ellipsis",

            }}>
              {fileData.name}
            </Typography>

            <Typography sx={{
                fontSize: "10px", 
            }}>
              {date}
            </Typography>
          </Grid>
        ) : (
            <Grid width="150px">

            <Typography>Unsupported media type</Typography>
            <IconButton onClick={handleDownload} sx={{ position: "absolute" }}>
              <CloudDownloadIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              sx={{ position: "absolute",marginLeft: "50px" }}
            >
              <DeleteIcon fontSize="small" />
              </IconButton>
              </Grid>
        )}
      </Grid>
    </Grid>
  );
}


