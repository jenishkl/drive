"use client";
import CircularWithValueLabel from "@/components/Common/FileUpload/UploadCircularProgress";
import FileUploadChunk from "@/components/Common/FileUploadChunk";
import ConfirmPopUp from "@/components/Common/Popups/ConfirmPopUp";
import { getTempFile } from "@/store/drive/driveActions";
import store from "@/store/store";
import ThemeProvider from "@/theme";
import { IconButton, Typography, useTheme } from "@mui/material";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React, { createContext, useMemo, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { Toaster } from "sonner";

export const GlobalContext = createContext();
export default function GlobalContextProvider({ children, tM }) {
  const [themeMode, setThemeMode] = useState(tM ?? "dark");
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [broken, setBroken] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [divisionPopup, setDivisionPopup] = useState(null);
  const [tabValue, setTabValue] = useState("my-drive");

  //DELETE LOADING
  // const deleteLoading = useSelector(loadingSelector);
  //SUBMIT LOADING

  //DIRTY
  const [dirty, setDirty] = useState(false);

  //covertPopup
  const theme = useTheme();
  const dispatch = useDispatch();
  const [convertPopUp, setConvertPopUp] = useState(null);

  //setupAccountPopUp
  const [setupAccountPopUp, setSetupAccountPopUp] = useState(null);

  //popUp form
  const [popUpForm, setPopupForm] = useState(null);

  // DROPBOX FILE
  const [file, setfile] = useState(null);

  //Delete pop up
  const [deletePopUp, setDeletePopup] = useState(false);

  //CONFIRM POPUP
  const [confirmPopUp, setConfirmPopUp] = useState(null);

  //UPLOAD POPUP
  const [uploadOpen, setUploadOpen] = useState(null);

  //UPLOAD FILE
  const [files, setFiles] = useState(null);

  const [tempFiles, setTempFiles] = useState();

  const [progress, setProgress] = useState(0);

  const [urlBody, setUrlBody] = useState(null);

  const progressBar = useMemo(() => {
    return (
      <>
        {
          tempFiles?.[0] && (
            // <Draggable onStop={onStop} onDrag={onDrag}>
            <IconButton
              sx={
                {
                  // position: "absolute",
                  // zIndex: "111111110",
                  // top: "1%",
                  // left: "80%",
                }
              }
              // onClick={() => setUploadOpen(true)}
            >
              <CircularWithValueLabel
                progress={typeof progress == "number" ? progress : 0}
              />
              <Typography variant="bold" size="xlsmall">
                %
              </Typography>
            </IconButton>
          )
          // </Draggable>
        }
      </>
    );
  }, [progress, tempFiles]);
  return (
    <>
      <>
        <GlobalContext.Provider
          value={{
            //THEME
            themeMode,
            setThemeMode,

            //SideBAR
            sideBarOpen,
            setSideBarOpen,
            collapsed,
            setCollapsed,
            toggle,
            setToggle,
            broken,
            setBroken,

            //POPUP FORM
            popUpForm,
            setPopupForm,

            //DIVISIONPOPUP
            divisionPopup,
            setDivisionPopup,

            //ConvertPopup
            convertPopUp,
            setConvertPopUp,

            //setupAccountPopUp
            setupAccountPopUp,
            setSetupAccountPopUp,

            //Dirty
            dirty,
            setDirty,

            //delete popup
            deletePopUp,
            setDeletePopup,

            //CONFIRM POPUP
            confirmPopUp,
            setConfirmPopUp,

            //UPLOAD POPUP
            uploadOpen,
            setUploadOpen,
            //FILES
            files,
            setFiles,

            urlBody,
            setUrlBody,

            tabValue,
            setTabValue,
          }}
        >
          <ThemeProvider>
            {children}
            <Toaster position="top-center" richColors duration={3000} />
            <ProgressBar
              height="5px"
              color="#0038ff"
              options={{ showSpinner: false }}
              shallowRouting
            />
            {confirmPopUp && <ConfirmPopUp />}
            {files?.[0] && (
              <FileUploadChunk
                withButton={false}
                progressBar={progressBar}
                open={uploadOpen}
                tempFiles={tempFiles}
                setTempFiles={setTempFiles}
                setProgress={setProgress}
                progress={progress}
                url={urlBody?.url}
                // url={`case/retrieval/uploadFileDeliver/${params.caseId}/${
                //   watch("facility_id")?.id
                // }`}
                chuckSize={100}
                body={urlBody?.body}
                onClose={() => setUploadOpen(false)}
                onFileSuccess={() => {
                  dispatch(getTempFile());
                }}
                files={files}
                setFiles={setFiles}
              />
            )}
          </ThemeProvider>
        </GlobalContext.Provider>
      </>
    </>
  );
}
