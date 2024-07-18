"use client";
import { USER, decriptData } from "@/helpers/utils";
import { GlobalContext } from "@/layout/GlobalContextProvider";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";

export default function DragDropLayout({ children }) {
  const {
    //UPLOAD POPUP
    uploadOpen,
    setUploadOpen,
    //FILES
    files,
    setFiles,
    //URL
    urlBody,
    setUrlBody,
  } = useContext(GlobalContext) || {};
  const router = useRouter();
  const pathName = usePathname();
  var drive = "";
  var folder_id = "";
  if (pathName?.split("/")[1] == "my-drive") {
    drive = 2;
    folder_id = 0;
  }
  if (pathName?.split("/")[1] == "work-drive") {
    drive = 1;
    folder_id = 0;
  }
  if (pathName?.split("/")[1] == "drive") {
    folder_id = decriptData(params?.folder)?.split("_")[0];
    drive = decriptData(params?.folder)?.split("_")[1];
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    // setDrop(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log("files", files);
    if (files.length) {
      setUrlBody({
        url: `mydrive/${USER?.is_client == 1 ? "client" : "admin"}/${
          USER?.id
        }/`,
        body: { folder_id: folder_id, myDrive: true },
      });
      setFiles([...files]);
      setUploadOpen("start");
      // Promise.all(
      //   [...files].map((file) => {
      //     append({ file: file });
      //   })
      // );
    }
    // setDrop(false);
  };
  return (
    <>
      <Box onDragOver={handleDragOver} onDrop={handleDrop}>
        {children}
      </Box>
    </>
  );
}
