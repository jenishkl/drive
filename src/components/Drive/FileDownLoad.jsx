"use client";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LoadingButton from "../Common/Buttons/LoadingButton";

export default function FileDownLoadButton({ fileUrl, file_name }) {
  return (
    <>
      <LoadingButton
        label="Download"
        endIcon={<FileDownloadIcon />}
        onClick={() => {
          if (typeof window != "undefined") {
            window.open(fileUrl, "_blank");
            var link = document.createElement("a");
            link.href = fileUrl;
            link.download = file_name;
          }
        }}
      />
    </>
  );
}
