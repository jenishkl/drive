import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleGdriveAndDropBox } from "../../../store/cases/orderIntakeSlice";
import { useLocation } from "react-router";
import { get, setStorage } from "../helper";
import { fileDownload } from "../../../store/cases/orderIntakeActions";
import { getTempFile } from "../../../store/drive/driveActions";

const DropboxAuthFinish = () => {
  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();
  const dropboxApiEndpoint = "https://content.dropboxapi.com/2/files/download";

  const location = useLocation();
  const onChange = get("dropBoxOnChange");
  

  console.log("location", location);
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const channel = new BroadcastChannel("dropBoxData");

  const triggerOnChange = (file) => {
    channel.postMessage(file);
  };
 

  const openDropboxChooser = () => {
    if (window.Dropbox && accessToken) {
      setStorage("dropboxLoading", true);
      window.Dropbox.choose({
        success: async function (files) {
          try {
            let fileDataArray = [];
            for (const file of files) {
              console.log("fileeee", file);
              // const fileData = await downloadFileFromServer(file.id, file.name);

             

              
              triggerOnChange(file);
             
            }

             
          } catch (error) {
            console.error("Error processing downloads:", error);
          } finally {
            setStorage("dropboxLoading", false);
          }
        },
        cancel: function () {
          console.log("User cancelled the Dropbox chooser.");
          setStorage("dropboxLoading", false);
        },
        linkType: "preview",
        multiselect: true,
      });
    }
  };



  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {accessToken ? (
        <>
          <Typography variant="bold" size="medium" my={2}>
            Authentication successful. Click below to select files from Dropbox.
          </Typography>
          <Button variant="save" onClick={openDropboxChooser} id="open-dropBox">
            Select Files from Dropbox
          </Button>
        </>
      ) : (
        <Typography variant="bold" size="medium" my={2}>
          Authenticating with Dropbox...
        </Typography>
      )}
    </Box>
  );
};

export default DropboxAuthFinish;
