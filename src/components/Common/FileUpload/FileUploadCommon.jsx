import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { fileUplodimg, imgPng, pdfImg, wordImg } from "../../../helpers/images";
import style from "./ServiceType.module.css";
import DropBoxShare from "../Drive/DropBox";
import GoogleDriveShare from "../Drive/GoogleDrive";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteTempFile, getTempFile } from "../../../store/drive/driveActions";
import { driveSelector } from "../../../store/drive/driveSlice";
import { Each } from "../../../helpers/utils";
import { toast } from "sonner";
import FileUploadChunk from "../FileUploadChunk";
import { GlobalContext } from "../../../layout/GlobalContextProvider";
import { get } from "lodash";
import { IoArrowBackOutline } from "react-icons/io5";
import StringField from "../InputFields/StringField";
import { Vortex } from "react-loader-spinner";

export default function FileUploadCommon({
  formProps,
  handleFileOnChange,
  key = Math.random(100),
  googleDrive = true,
  dropBox = true,
  name = "upload",
  externalDrive = false,
  showLinks = false,
  // onDropBoxChange,
  // onDriveChange,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [links, setLinks] = useState(false);
  const [activeDeletion, setActiveDeletion] = useState([]);
  const linkBoxes = [
    { label: "Download Link", name: "download_link" },
    { label: "Upload Link", name: "upload_link" },
  ];
  const { watch, setValue, control, errors } = formProps || {};
  const { append, fields, remove } = useFieldArray({
    control: control,
    name: "files",
  });
  const { setFiles, setUploadOpen, files, setUrlBody } =
    useContext(GlobalContext) || {};
  const {
    getTempFileData,
    getTempFileLoading,
    deleteTempFileData,
    deleteTempFileLoading,
  } = useSelector(driveSelector);
  const onDriveChange = (e) => {
    setFiles(e);
    setUploadOpen("start");
  };
  const onDropBoxChange = (e) => {
    setFiles(e);
    setUploadOpen("start");
  };
  useEffect(() => {
    dispatch(getTempFile());
  }, [deleteTempFileData]);

  useEffect(() => {
    if (name) {
      setValue(name, getTempFileData, { shouldValidate: true });
    }
  }, [getTempFileData]);

  const handleDeleteTempFile = async (id) => {
    try {
      setActiveDeletion((prev) => [...prev, id]);
      await dispatch(deleteTempFile(id))
        .unwrap()
        .then((dat) => toast.success(dat?.messgae));
      setActiveDeletion((prev) => prev.filter((item) => item != id));
    } catch (error) {
      console.log("error", error);
      setActiveDeletion(null);
    }
  };
  return (
    <>
      {!links ? (
        <>
          <Grid item xs={12}>
            {/* {fields?.length !== 5 && ( */}
            <Grid item container lg={12} md={12} xs={12}>
              <Grid
                lg={!externalDrive ? 12 : 7}
                md={!externalDrive ? 12 : 7}
                xs={!externalDrive ? 12 : 12}
              >
                <Box
                  className={`drag_and_drop_input w-100  h-100 file-input-upload ${
                    get(errors, name)?.message
                      ? "error-border"
                      : style.drag_and_drop_input_service_sample
                  }`}
                >
                  <h4>Drag & Add files here</h4>
                  <img src={fileUplodimg} height={35} width={35} />
                  <h5 className={style.dandd_input_choose}>Choose from PC</h5>
                  <label htmlFor={key + "file"}></label>
                  <input
                    type="file"
                    id={key + "file"}
                    multiple
                    onChange={async (e) => {
                      console.log("e", e.target.files);
                      await Promise.all(
                        [...e.target.files].map((file) => {
                          append({ files: file });
                          // resumable.addFile(file);
                        })
                      );
                      setFiles([...e.target.files]);
                      setUploadOpen("start");
                      setUrlBody(null);
                      typeof handleFileOnChange == "function" &&
                        handleFileOnChange(e.target.files);

                      e.target.value = null;
                    }}
                    className={style["file-input-service-sample"]}
                  />
                </Box>
              </Grid>
              {externalDrive && (
                <>
                  {" "}
                  <Grid
                    lg={1}
                    md={1}
                    xs={12}
                    sx={{
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Typography variant="bold" size="small">
                      OR
                    </Typography>
                  </Grid>
                  <Grid lg={4} md={4} xs={12}>
                    <Box
                      className={`drag_and_drop_input w-100  h-100 file-input-upload ${
                        get(errors, name)?.message
                          ? "error-border"
                          : style.drag_and_drop_input_service_sample
                      }`}
                    >
                      <Typography
                        variant="light"
                        size="vsmall"
                        textAlign={"center"}
                      >
                        Upload your files by signing-in G-Drive or DropBox
                      </Typography>
                      <Box
                        my={2}
                        sx={{
                          display: "flex",

                          alignItems: "center",
                        }}
                        gap={2}
                      >
                        <Paper
                          sx={{
                            padding: "5px",
                            margin: "5px 0px",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          <Box>{googleDrive && <GoogleDriveShare />}</Box>
                        </Paper>
                        <Typography variant="bold" size="vsmall">
                          Or
                        </Typography>
                        <Paper
                          sx={{
                            padding: "5px",
                            margin: "5px 0px",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {dropBox && <DropBoxShare />}
                        </Paper>
                      </Box>
                      {showLinks && (
                        <Typography
                          className="text-center pointer-hand"
                          sx={{
                            textDecoration: "underline",
                            color: theme?.palette?.primary?.main,
                          }}
                          onClick={() => setLinks(true)}
                        >
                          Add Custom Links
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
            {/* // )} */}
          </Grid>

          <Grid xs={12} mt={2}>
            {getTempFileLoading && <LinearProgress />}
            {/* <Typography>Uploaded files</Typography> */}
            {getTempFileData?.length > 0 && (
              <div
                className={style.drag_and_drop_input_service_sample}
                style={{
                  marginTop: "5px",
                  width: "100%",
                }}
              >
                {/* <Typography>Uploaded files</Typography> */}

                {
                  <Each
                    of={getTempFileData}
                    render={(e) => {
                      return (
                        <>
                          <Grid
                            key={e.id}
                            item
                            width={"100%"}
                            lg={12}
                            md={12}
                            xs={12}
                            marginTop={1}
                            marginBottom={1}
                            sx={{
                              backgroundColor: "#E0E6FF",
                              padding: "10px",
                              borderRadius: "5px",
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={
                                  e.type == "application/pdf"
                                    ? pdfImg
                                    : e.type == "application/msword"
                                    ? wordImg
                                    : imgPng
                                }
                                height={25}
                                width={25}
                                alt={e.name}
                                style={{ marginRight: "5px" }}
                              />
                              <Typography variant="bold" size="small">
                                {e.file_name}
                              </Typography>
                            </Box>
                            <Box sx={{ padding: "0 5px" }}>
                              {deleteTempFileLoading &&
                              activeDeletion?.includes(e.id) ? (
                                <>
                                  {" "}
                                  <Vortex
                                    visible={true}
                                    height="30"
                                    width="30"
                                    ariaLabel="vortex-loading"
                                    wrapperStyle={{}}
                                    // wrapperClass="vortex-wrapper"
                                    colors={[
                                      "blue",
                                      "blue",
                                      "blue",
                                      "blue",
                                      "blue",
                                      "blue",
                                    ]}
                                  />
                                </>
                              ) : (
                                <CancelOutlinedIcon
                                  onClick={() => handleDeleteTempFile(e.id)}
                                />
                              )}
                            </Box>
                          </Grid>
                        </>
                      );
                    }}
                  />
                }
              </div>
            )}
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={3}
            >
              {/* <Typography>Non uploaded files</Typography> */}
              {/* <FileUploadChunk
            withButton={false}
            open={open}
            url={`cdrive/uploadFileAstemp`}
            // url={`case/retrieval/uploadFileDeliver/${params.caseId}/${
            //   watch("facility_id")?.id
            // }`}
            onFileSuccess={() => {
              dispatch(getTempFile());
              setValue();
            }}
            files={watch("files")?.map((it) => it.files)}
          /> */}
            </Stack>

            {/* {fields.length > 0 && (
          <div
            className={style.drag_and_drop_input_service_sample}
            style={{ marginTop: "5px" }}
          >
            <Typography>Non uploaded files</Typography>
            <Grid container lg={10} md={10} xs={12}>
              {fields
                ?.map((it) => it.files)
                .map((e, i) => (
                  <Grid
                    key={e.id}
                    item
                    lg={12}
                    md={12}
                    xs={12}
                    marginTop={1}
                    marginBottom={1}
                    sx={{
                      backgroundColor: "#E0E6FF",
                      padding: "10px",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={
                          e.type == "application/pdf"
                            ? pdfImg
                            : e.type == "application/msword"
                            ? wordImg
                            : imgPng
                        }
                        height={25}
                        width={25}
                        alt={e.name}
                        style={{ marginRight: "5px" }}
                      />
                      <Typography variant="bold" size="small">
                        {e.name}
                      </Typography>
                    </Box>
                    <Box sx={{ padding: "0 5px" }}>
                      <CancelOutlinedIcon onClick={() => remove(i)} />
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </div>
        )} */}
          </Grid>
        </>
      ) : (
        <Box
          className={`drag_and_drop_input  d-block ${
            get(errors, name)?.message ? "error-border" : "normal-border"
          }`}
          mt={1}
        >
          <Box className="d-flex align-items-center justify-content-between">
            <Typography variant="bold" component={"h4"} mb={3}>
              Custom Link Upload
            </Typography>
            <Typography
              variant="bold"
              component={"h4"}
              onClick={() => setLinks(false)}
              className="pointer-hand"
              sx={{
                color: theme?.palette?.primary?.main,
              }}
            >
              <IoArrowBackOutline />
              Back
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={12} lg={5}>
              <Each
                of={linkBoxes}
                render={(link) => (
                  <Grid
                    container
                    gap={2}
                    className="d-flex align-items-center w-100"
                  >
                    <Grid item xs={12} lg={3}>
                      <Typography variant="bold" component={"h5"} my={3}>
                        {link.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      <StringField
                        control={control}
                        name={link.name}
                        label={link.label}
                      />
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>
          <Typography variant="bold" component={"p"}>
            Note: Please provide open or full access to the share folder while
            sharing the link
          </Typography>
        </Box>
      )}
      <Box>
        <Typography color={theme?.palette?.error?.main} m={1}>
          {get(errors, name)?.message}
        </Typography>
      </Box>
    </>
  );
}
