import React, { useEffect, useState } from "react";
import ImageCommon from "../../imagecomponent/ImageCommon";
import { Box, Button, Typography } from "@mui/material";
import googledrive from "../../../assets/Cases/google-drive.svg";
import LoadingButton from "../Buttons/LoadingButton";
import { Modal } from "react-bootstrap";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { Vortex } from "react-loader-spinner";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import {
  getTempFile,
  uploadFileViaDrive,
} from "../../../store/drive/driveActions";
import { getSessionStorage } from "../../../helpers/utils";
import { SESSION } from "../../../helpers/localSessions";
import {
  DISCOVERY_DOCS,
  GOOGLE_DRIVE_ID,
  GOOGLE_DRIVE_KEY,
  SCOPES,
} from "@/helpers/envis";

const GoogleDriveShare = ({ onChange, setLoading }) => {
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] =
    useState(false);
  const [listDocumentsVisibility, setListDocumentsVisibility] = useState(false);
  const [signedInUser, setSignedInUser] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const CLIENT_ID = GOOGLE_DRIVE_ID;
  const API_KEY = GOOGLE_DRIVE_KEY;

  const listFiles = (token) => {
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, mimeType, modifiedTime)",
        // q: searchTerm,
      })
      .then(
        function (response) {
          setIsFetchingGoogleDriveFiles(false);

          setFiles(response.result.files);
          gapi.load("picker", () => gisLoaded(token));
        },
        function (error) {
          console.error("Error: ", error.result.error.message);
          handleSignOutClick();
        }
      );
  };

  function createPicker(oauthToken) {
    console.log("access_token", accessToken);
    console.log("oauthToken", oauthToken);
    if (google && google.picker) {
      const picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .addView(google.picker.ViewId.DOCS)
        .setOAuthToken(oauthToken)
        .setDeveloperKey(API_KEY)
        .setCallback((data) => pickerCallback(data, oauthToken))
        .build();
      picker.setVisible(true);
    } else {
      alert("error");
      console.error("Google Picker library is not loaded.");
    }
  }

  const pickerCallback = async (data, accessToken) => {
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
      const docs = data[google.picker.Response.DOCUMENTS];

      for (const doc of docs) {
        console.log("doc", doc);
        const fileId = doc[google.picker.Document.ID];
        const name = doc[google.picker.Document.NAME];
        const link = doc[google.picker.Document.URL];
        const file_size = doc?.sizeBytes;
        setIsLoadingGoogleDriveApi(true);
        const fileData = await dispatch(
          uploadFileViaDrive({
            fileId,
            accessToken,
            name,
            link,
            file_size,
            session_id: getSessionStorage(SESSION.SESSION_ID),
          })
        ).unwrap();
        await dispatch(getTempFile());
      }
      setIsLoadingGoogleDriveApi(false);
    }
  };

  useEffect(() => {
    loadGapiScript();
    if (typeof window != "undefined") {
      window?.google?.accounts?.id?.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });
    }
  }, []);

  const loadGapiScript = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load("client", initializeGapiClient);
    };
    document.head.appendChild(script);
  };

  const initializeGapiClient = () => {
    window.gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
      })
      .then(
        () => {
          console.log("GAPI client loaded for API");
        },
        (error) => {
          console.error("Error loading GAPI client for API", error);
        }
      );
  };

  const handleCredentialResponse = (response) => {
    console.log("Credential Response:", response);
    const credential = JSON.parse(atob(response.credential.split(".")[1]));
  };
  const handleSignOutClick = () => {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
  };
  function gisLoaded(token) {
    gapi.load("client", {
      callback: () => createPicker(token),
      onerror: function () {
        alert("gapi.client failed to load!");
      },
      timeout: 5000,
      ontimeout: function () {
        alert("gapi.client could not load in a timely manner!");
      },
    });
  }
  const LeftSideSignInButton = () => {
    const login = useGoogleLogin({
      onSuccess: (res) => {
        console.log("Login Success: currentUser:", res);
        const token = res.access_token;
        console.log("res.access_token", res.access_token);
        console.log(" OAuth Token:", token);
        setAccessToken(token);
        listFiles(token);
      },
      onError: (err) => {
        console.log("Login Failed:", err);
      },
      scope: SCOPES,
    });

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => login()}
      >
        <ImageCommon
          src={googledrive}
          alt="g-drive"
          height={"15px"}
          width={"15px"}
        />
        <Typography variant="bold" size="vsmall" sx={{ paddingLeft: "2px" }}>
          G-Drive
        </Typography>
      </div>
    );
  };

  return (
    <div>
      <Button className="d-flex">
        {isLoadingGoogleDriveApi ? (
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
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <LeftSideSignInButton />
            </GoogleOAuthProvider>
          </>
        )}
      </Button>
    </div>
  );
};

export default GoogleDriveShare;
