import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import dropboxLogo from "../../../assets/Cases/dropbox.svg"; // Ensure correct import path
import ImageCommon from "../../imagecomponent/ImageCommon";
import { Dropbox } from "dropbox";
import { useDispatch, useSelector } from "react-redux";
import { Vortex } from "react-loader-spinner";
import { get, setStorage } from "../helper";
import {
  getTempFile,
  uploadFileViaDrive,
  uploadFileViaDropBox,
} from "../../../store/drive/driveActions";
import { getSessionStorage } from "../../../helpers/utils";
import { SESSION } from "../../../helpers/localSessions";
import API from "@/store/api";
import {
  DROP_BOX_ACCESS_TOKEN,
  DROP_BOX_APP_KEY,
  FRONT_END_URL,
} from "@/helpers/envis";

export default function DropBoxShare({ onChange }) {
  const [loading, setLoading] = useState(false);
  const CLIENT_ID = DROP_BOX_APP_KEY;
  const dispatch = useDispatch();
  const REDIRECT_URI = `${FRONT_END_URL}/dropbox-auth-finish`;
  const ACCESS_TOKEN = DROP_BOX_ACCESS_TOKEN;
  let openWindow;
  const authenticateWithDropbox = async () => {
    setStorage("dropboxLoading", true);
    const dbx = new Dropbox({ clientId: CLIENT_ID });
    const authUrl = await dbx.auth.getAuthenticationUrl(REDIRECT_URI);
    if (typeof window != "undefined") {
    openWindow = window.open(
      authUrl,
      "_blank",
      "width=800,height=600,noopener"
    );
  }
  };
  console.log("openWindow", openWindow);
  useEffect(() => {
    const channel = new BroadcastChannel("dropBoxData");
    channel.onmessage = async (event) => {
      if (event?.data) {
        console.log("event?.data", event?.data);
        setLoading(true);
        API;
        await dispatch(
          uploadFileViaDropBox({
            fileId: event?.data?.id,
            accessToken: ACCESS_TOKEN,
            name: event?.data?.name,
            link: event?.data?.link,
            session_id: getSessionStorage(SESSION.SESSION_ID),
          })
        );
        await dispatch(getTempFile()).unwrap();
        setLoading(false);
      }
      if (openWindow) {
        openWindow.close();
      }
    };

    // Cleanup on component unmount
    return () => {
      channel.close();
      if (openWindow) {
        openWindow.close();
      }
    };
  }, []);

  return (
    <Button onClick={authenticateWithDropbox} className="d-flex">
      {loading ? (
        <Box>
          <Vortex
            visible={true}
            height="30"
            width="30"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            // wrapperClass="vortex-wrapper"
            colors={["blue", "blue", "blue", "blue", "blue", "blue"]}
          />
        </Box>
      ) : (
        <>
          <ImageCommon
            src={dropboxLogo}
            alt="DropBox"
            height="15px"
            width="15px"
          />
          <Typography variant="bold" size="vsmall" sx={{ paddingLeft: "2px" }}>
            DropBox
          </Typography>
        </>
      )}
    </Button>
  );
}
