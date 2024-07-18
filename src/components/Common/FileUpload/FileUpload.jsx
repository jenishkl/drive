import { useTheme } from "@emotion/react";
import { Box, Card, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { SlSocialDropbox } from "react-icons/sl";
import fileUplo from "../../../assets/SettingsIcons/services-page/service_file_upload.svg";
import { MdCancel } from "react-icons/md";
import dropbox from "../../../assets/Cases/dropbox.svg";
import googledrive from "../../../assets/Cases/google-drive.svg";
import style from "../../../pages/Settings/Services/service-type/ServiceType.module.css";
import ImageCommon from "../../imagecomponent/ImageCommon";
import { IoArrowBackOutline } from "react-icons/io5";
import { Each } from "../../../helpers/utils";
import StringField from "../InputFields/StringField";
import { get } from "lodash";
import FileIconComponent from "./FileIcon";
import { grey } from "@mui/material/colors";
import GoogleDrive from "../Drive/GoogleDrive";
import DropBoxShare from "../Drive/DropBox";
import { useSelector } from "react-redux";

export default function FileUpload({
  file,
  uploadFile,
  removeFile,
  showDriveBox = false,
  name,
  state,
  setState,
  FormProp,
  onGDriveChange,
  onDropBoxChange,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const reduxState = useSelector((state) => state.orderIntake);
  const theme = useTheme();
  const [links, setLinks] = useState(false);
  const linkBoxes = [
    { label: "Download Link", name: "download_link" },
    { label: "Upload Link", name: "upload_link" },
  ];
  const { control, setValue, watch, errors } = FormProp || {};
  console.log("file", file);

  console.log('watch("gDriveLinks")', watch("gDriveLinks"));
  console.log("reduxState", reduxState);
  return (
    <Box>
      {console.log("state?.name", state?.name)}
      {!links ? (
        <Grid
          container
          className="w-100"
          alignContent={"stretch"}
          // onDragEnter={() => setIsDragging(true)}
          // onDragLeave={() => setIsDragging(false)}
        >
          <Grid
            item
            xs={12}
            md={showDriveBox ? 6 : 12}
            lg={showDriveBox ? 5 : 12}
          >
            <div
              className="h-100"
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onDragEnd={() => setIsDragging(false)}
            >
              <Box
                className={`drag_and_drop_input w-100  h-100 file-input-upload ${
                  get(errors, name)?.message ? "error-border" : "normal-border"
                }`}
              >
                {(file || file?.length != 0) && (
                  <Box
                    className={"border-0 w-100"}
                    sx={{ position: "relative" }}
                  >
                    <Grid
                      container
                      sx={{
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Each
                        of={file}
                        render={(render, i) => (
                          <Grid item xs={12} md={6} lg={4}>
                            <Card
                              className={
                                "border-0 d-flex justify-content-around align-items-center flex-wrap"
                              }
                              sx={{
                                px: 1,
                                py: 2,
                                m: 1,
                                background:
                                  theme?.palette?.previewForm?.background,
                                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                              }}
                            >
                              {FileIconComponent(render)}
                              <Typography
                                variant="bold"
                                size="small"
                                // component={"p"}
                                className="text-center"
                              >
                                {render}
                              </Typography>
                              <Typography>
                                <MdCancel
                                  style={{ zIndex: 2, position: "relative" }}
                                  className="pointer-hand ml-1"
                                  color={grey[700]}
                                  onClick={() => {
                                    removeFile(name, i);
                                    setIsDragging(false);
                                  }}
                                />
                              </Typography>
                            </Card>
                          </Grid>
                        )}
                      />
                    </Grid>
                  </Box>
                )}
                <Typography variant="bold" my={1} component={"h4"}>
                  Drag & Add files here
                </Typography>
                {!file || file?.length == 0 ? (
                  <>
                    <ImageCommon
                      src={fileUplo}
                      height={"35px"}
                      width={"35px"}
                    />
                    <Typography
                      variant="bold"
                      my={1}
                      component={"h5"}
                      className={style.dandd_input_choose}
                    >
                      Choose from PC
                    </Typography>
                  </>
                ) : (
                  isDragging && (
                    <Box className="position-absolute" sx={{ zIndex: 2 }}>
                      <SlSocialDropbox
                        color={theme?.palette?.primary?.main}
                        size={50}
                      />
                    </Box>
                  )
                )}
                <label htmlFor="file-input"></label>
                <input
                  type="file"
                  id="file-input"
                  style={{ zIndex: 1 }}
                  onChange={(e) => uploadFile(e, name)}
                  className={style["file-input-service-sample"]}
                  multiple="multiple"
                />
              </Box>
            </div>
          </Grid>
          {showDriveBox && (
            <>
              <Grid
                item
                xs={12}
                md={1}
                lg={1}
                sx={{ display: "grid", placeItems: "center" }}
              >
                <Typography className="text-center">OR</Typography>
              </Grid>
              <Grid item xs={12} md={5} lg={3}>
                <Box
                  className={`drag_and_drop_input  h-100 ${
                    get(errors, name)?.message
                      ? "error-border"
                      : "normal-border"
                  }`}
                >
                  <Typography
                    variant="bold"
                    fontSize={"12px"}
                    textAlign={"center"}
                  >
                    Upload your files by signing G-Drive or Addbox
                  </Typography>
                  <Box
                    my={2}
                    gap={2}
                    sx={{ display: "flex", alignItems: "center" }}
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
                      <GoogleDrive onChange={onGDriveChange} />
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
                      <DropBoxShare
                        key={get("dropboxLoading")}
                        onChange={onDropBoxChange}
                      />
                    </Paper>
                  </Box>
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
                </Box>
              </Grid>
            </>
          )}
        </Grid>
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
    </Box>
  );
}
