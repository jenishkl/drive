import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { grey } from "@mui/material/colors";

const FileIconComponent = (fileName) => {
  if (!fileName) return;
  console.log('fileName', fileName)
  const extension = fileName.split(".").pop().toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return (
        <ImageIcon sx={{ color: grey[500] }} />
      );
    case "mp4":
    case "avi":
    case "mov":
      return <VideoLibraryIcon sx={{ color: grey[500] }} />;
    case "mp3":
case "wav":
    case "aac":
      return <AudioFileIcon sx={{ color: grey[500] }} />;
    case "pdf":
    case "doc":
    case "docx":
      return <DescriptionIcon sx={{ color: grey[500] }} />;
    default:
      return <InsertDriveFileIcon sx={{ color: grey[500] }} />;
  }
};

export default FileIconComponent;
