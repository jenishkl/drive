import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FileCard from "../../components/Drive/FIleCard";
import HeaderDynamic from "../../components/Common/headers/HeaderDynamic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import style from "../../pages/Settings/Services/service-type/ServiceType.module.css";
import PasswordModal from "./PasswordModal";
import { driveSelector } from "../../store/drive/driveSlice";
import { useDispatch, useSelector } from "react-redux";
import { fileUpload } from "../../store/cases/orderIntakeActions";
import {
  checkPassword,
  getSubmiterFiles,
  getTempFile,
  submitterDeleteFile,
  uploadFile,
} from "../../store/drive/driveActions";
import API from "../../store/api";
import ReplayIcon from "@mui/icons-material/Replay";
import Resumable from "resumablejs";
import { get } from "lodash";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { toast } from "sonner";
import { GlobalContext } from "../../App";
import { useParams } from "react-router-dom";
import {
  getSessionStorage,
  imageurl,
  removeSessionStorage,
  setSessionStorage,
} from "../../helpers/utils";
import FileUploadCommon from "../../components/Common/FileUpload/FileUploadCommon";
import { SESSION } from "../../helpers/localSessions";
import LoadingButton from "../../components/Common/Buttons/LoadingButton";
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "500",
  maxHeight: "600px",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};
export default function UploadFile() {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 38,
      request_id: 28,
      folder_id: 10,
      loaded: 0,
      total: 0,
    },
    shouldUnregister: false,
  });
  const formProps = {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    setError,
    getValues,
    clearErrors,
  };
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
  const [drop, setDrop] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { confirmPopUp, setConfirmPopUp } = useContext(GlobalContext)||{};
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const { append, fields, remove } = useFieldArray({
    control: control,
    name: "file",
  });
  const {
    checkPasswordData,
    checkPasswordLoading,
    getSubmiterFilesData,
    getTempFileData,
    uploadFileData,
    uploadFileLoading,
  } = useSelector(driveSelector);

  const handleUpload = async (data) => {
    try {
      await dispatch(
        uploadFile({
          id: watch("id"),
          request_id: watch("request_id"),
          folder_id: watch("folder_id"),
          fileId: getTempFileData?.map((it) => it.id),
          email: watch("email"),
        })
      ).unwrap();
      dispatch(getSubmiterFiles(watch("id")));
      dispatch(getTempFile());
    } catch (error) {
      console.log("error", error);
    }
  };
  const left = (
    <Box
      textAlign={"right"}
      width={"100%"}
      className="row-align-center gap-3 justify-content-end"
    >
      <LoadingButton
        loading={uploadFileLoading}
        onClick={handleSubmit(handleUpload)}
        disabled={!getTempFileData?.[0]}
        label="Submit"
      />
      {/* <Button
        variant="contained"
        // disabled={!watch("file")?.[0]}
      >
        Submit
      </Button> */}
    </Box>
  );

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDrop(true);
    console.log("drop", drop);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log("files", files);
    if (files.length) {
      Promise.all(
        [...files].map((file) => {
          append({ file: file });
        })
      );
    }
    setDrop(false);
  };
  useEffect(() => {
    if (checkPasswordData?.data) {
      let data = checkPasswordData?.data;
      setSessionStorage(SESSION.SUBMITTER_DATA, { ...data, status: 200 });
      setSessionStorage(SESSION.SESSION_ID, data?.session_id);
      reset({
        ...getValues(),
        id: data?.id,
        request_id: data?.request_id,
        folder_id: data?.folder_id,
        folder_name: data?.folder_name,
        email: data?.email,
        password: data?.password,
        session_id: data?.session_id,
      });
    }
  }, [checkPasswordData]);

  useEffect(() => {
    if (getSessionStorage(SESSION.SUBMITTER_DATA)) {
      let data = getSessionStorage(SESSION.SUBMITTER_DATA);
      reset({
        ...getValues(),
        id: data?.id,
        request_id: data?.request_id,
        folder_id: data?.folder_id,
        folder_name: data?.folder_name,
        email: data?.email,
        password: data?.password,
        session_id: data?.session_id,
      });
    }
  }, [getSessionStorage(SESSION.SUBMITTER_DATA)?.status]);
  const deleteFile = async (id) => {
    try {
      await dispatch(submitterDeleteFile(id)).unwrap();
      toast.success("File Deleted Successfully");
      console.log("getValues()", getValues());
      dispatch(getSubmiterFiles(watch("id")));
      setConfirmPopUp(null);
    } catch (error) {
      console.log("error", error);
    }
  };
  const page = useMemo(() => {
    switch (getSessionStorage(SESSION.SUBMITTER_DATA)?.status) {
      case 200:
        return (
          <Box>
            <Grid container spacing={4} py={4}>
              <FileUploadCommon
                formProps={formProps}
                googleDrive={true}
                dropBox={true}
                externalDrive={true}
              />
              {/* {fields?.map((file, index) => (
                <Grid item xs={12} sm={2} key={file.id}>
                  <FileCard
                    name1={file?.file?.name}
                    size={file?.file?.size}
                    file={file?.file}
                    file_type={file?.file?.type?.split("/")?.[1]}
                    onRemove={() => remove(index)}
                  />
                </Grid>
              ))} */}
            </Grid>
            <Typography variant="bold" size="medium" className="my-4">
              Uploaded Files
            </Typography>

            <Grid container spacing={4}>
              {getSubmiterFilesData?.map((file, index) => (
                <Grid item xs={12} sm={4} md={2} key={file?.id}>
                  <FileCard
                    name1={file?.file_name}
                    size={file?.file_size}
                    file={imageurl(file?.file_path)}
                    file_type={file?.file_name?.split(".")?.slice(-1)[0]}
                    onRemove={() =>
                      setConfirmPopUp({
                        onSubmit: () => deleteFile(file?.id),
                        content: "Are you sure delete this file?",
                      })
                    }
                  />
                </Grid>
              ))}
            </Grid>
            {/* 
            <Box
              mt={10}
              position={"absolute"}
              top={-79}
              left={0}
              width={"100%"}
              height={"100vh"}
              minHeight={"100vh !important"}
              zIndex={drop ? 10 : -1}
            >
              <div
                className={style.drag_and_drop_input_service_sample}
                style={{ height: "100%" }}
              >
                <CloudUploadIcon sx={{ fontSize: "200px" }} />

                <input
                  type="file"
                  id="request-files"
                  ref={fileInputRef}
                  multiple={true}
                  // value={watch("file") ?? []}
                  accept=".zip,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  // onClick={(e) => e.preventDefault()}

                  onChange={(e) => {
                    console.log("e", e.target.files);
                    Promise.all(
                      [...e.target.files].map((file) => {
                        append({ file: file });
                        // resumable.addFile(file);
                      })
                    );
                    e.target.value = null;
                  }}
                  className={style["file-input-service-sample"]}
                />
              </div>
            </Box> */}
          </Box>
        );
      default:
        return (
          <PasswordModal
            control={control}
            handleSubmit={handleSubmit}
            watch={watch}
          />
        );
    }
  }, [watch("file"), drop, checkPasswordData, getSubmiterFilesData]);
  useEffect(() => {
    dispatch(getSubmiterFiles(watch("id")));
  }, [watch("id"), getTempFileData]);
  return (
    <Box
      // onDragOver={handleDragOver}
      // onDrop={handleDrop}
      // onDragLeave={() => setDrop(false)}
      sx={{ height: "100vh" }}
    >
      <Box
        sx={{
          background: "var(--primary-color) !important",
          p: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
        // onDragOver={handleDragOver}
        // onDragLeave={() => setDrop(false)}
        // onDragEnd={() => setDrop(false)}
        // onDragEnter={(s) => alert("")}
        // position={"relative"}
        // onDrop={handleDrop}
      >
        <Typography color={"white"} variant="bold" size="high">
          Upload File
        </Typography>
        <Typography color={"white"} variant="bold" size="high">
          {watch("email")}
        </Typography>
        <Button
          variant="cancel"
          onClick={() => {
            removeSessionStorage(SESSION.SUBMITTER_DATA);
            removeSessionStorage(SESSION.SESSION_ID);
          }}
        >
          Log Out
        </Button>
      </Box>
      <HeaderDynamic left={left} padding={2} />
      <Container maxWidth="80%">{!loading && page}</Container>
    </Box>
  );
}
