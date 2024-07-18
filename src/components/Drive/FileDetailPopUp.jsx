"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  DialogContentText,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileDetails, sharedPeoples } from "../../store/drive/driveActions";
import { driveSelector } from "../../store/drive/driveSlice";
import ProfileAvatarGroup from "../Common/Avatar/AvatarGroup";
import {
  Each,
  decriptData,
  encode,
  encriptData,
  file_icon,
  folder,
  imageurl,
} from "../../helpers/utils";
import StringField from "../Common/InputFields/StringField";
import DateField from "../Common/InputFields/DateField";
import SwitchField from "../Common/InputFields/SwitchField";
import ManageSharedPeoples from "./ManageSharedPeoples";
import CloseIcon from "@mui/icons-material/Close";
import { convertFileSize } from "../Common/helper";
import FileCard from "./FIleCard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BadgeAvatar from "../Common/Avatar/BadgeAvatar";
import TTTypography from "../Common/ToolTipComponents/TTTypography";
import Link from "next/link";
import { FRONT_END_URL } from "@/helpers/envis";
export default function FileDetailPopUp({ open, onClose, id, drive, detail }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { fileDetailsData, shareFileInternalData, removeSharedUserData } =
    useSelector(driveSelector);
  useEffect(() => {
    if (id) {
      dispatch(fileDetails({ id, drive }));
    }
  }, [id, shareFileInternalData, removeSharedUserData]);
  let filemodel = (file_type) =>
    [
      "jpg",
      "jpeg",
      "png",
      "PNG",
      "gif",
      "bmp",
      "tiff",
      "webp",
      "svg",
      "jfif",
    ].includes(file_type);
  function copy() {
    // Get the text content from the h1 element
    var copyText = document.getElementById("file-link").textContent;

    // Create a temporary text area to hold the text
    var textArea = document.createElement("textarea");
    textArea.value = copyText;

    // Avoid scrolling to the bottom of the page by setting the position to fixed
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";

    // Append the text area to the body
    document.body.appendChild(textArea);

    // Select the text inside the text area
    textArea.focus();
    textArea.select();

    // Copy the text inside the text area
    try {
      navigator.clipboard.writeText(textArea.value).then(
        function () {
          // Alert the copied text
          alert("Copied the text: " + textArea.value);
        },
        function (err) {
          console.error("Could not copy text: ", err);
        }
      );
    } catch (err) {
      console.error("Fallback: Could not copy text: ", err);
    }

    // Remove the temporary text area
    document.body.removeChild(textArea);
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        fullWidth
        onClose={onClose}
        maxWidth={"xs"}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          File details
          <IconButton variant="cancel" onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box className="row-align-center">
                {!filemodel(fileDetailsData?.file_ext) ? (
                  file_icon(fileDetailsData?.file_ext)
                ) : (
                  <img
                    src={imageurl(fileDetailsData?.file_path)}
                    style={{ width: "50px" }}
                    alt=""
                  />
                )}
                {/* <Typography variant="bold" size="medium" className="singleLine">
                  {fileDetailsData?.file_name}
                </Typography> */}
              </Box>
              <hr />
            </Grid>
            <Grid
              item
              xs={12}
              // display={"flex"}
              // flexDirection={"column"}
              // justifyContent={"flex-start"}
              // alignItems={"flex-start"}
            >
              <Typography variant="bold" size="high">
                Who can access
              </Typography>
              <Stack direction={"row"} my={1} gap={1} alignItems={"center"}>
                <ProfileAvatarGroup
                  data={fileDetailsData?.accessers}
                  max={5}
                  nameKey="user_details.name"
                  imageKey="user_details.profile_img"
                />
                <ManageSharedPeoples
                  accessers={fileDetailsData?.accessers}
                  f_id={id}
                  drive={drive}
                  type={2}
                  detail={detail}
                />
              </Stack>
              <hr />
            </Grid>
            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="light" size="xlsmall">
                File Name
              </Typography>
              <Typography variant="bold" size="small">
                {fileDetailsData?.file_name}
              </Typography>
              <hr />
            </Grid>
            <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"column"}
              gap={1}
            >
              <Typography variant="light" size="xlsmall">
                Created By
              </Typography>
              <Stack direction={"row"} gap={1}>
                <BadgeAvatar
                  size="small"
                  src={imageurl(fileDetailsData?.owner_details?.profile_img)}
                  name={fileDetailsData?.owner_details?.name}
                />
                <Stack direction={"column"}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <TTTypography
                      variant="bold"
                      size="small"
                      content={fileDetailsData?.owner_details?.name}
                    />
                    <Button
                      size="small"
                      variant="orange"
                      sx={{ fontSize: "10px !important" }}
                    >
                      {fileDetailsData?.owner_details?.is_client == 0
                        ? "Lezdo"
                        : "Client"}
                    </Button>
                  </Stack>
                  <TTTypography
                    variant="bold"
                    size="small"
                    content={fileDetailsData?.owner_details?.email}
                  />
                </Stack>
              </Stack>
              <hr />
            </Grid>
            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="light" size="xlsmall">
                Share Link
              </Typography>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Link
                  id="file-link"
                  target="_blank"
                  className="singleLine"
                  href={
                    FRONT_END_URL +
                    `/drive/${folder(
                      fileDetailsData?.folder_id,
                      fileDetailsData?.drive
                    )}/${encriptData(fileDetailsData?.id)}`
                  }
                >
                  <TTTypography
                    variant="light"
                    size="medium"
                    sx={{ color: "blue" }}
                    line="doubleLine"
                    content={
                      FRONT_END_URL +
                      `/drive/${folder(
                        fileDetailsData?.folder_id,

                        fileDetailsData?.drive
                      )}/${encriptData(fileDetailsData?.id)}`
                    }
                  />
                </Link>
                <IconButton onClick={() => copy()}>
                  <ContentCopyIcon />
                </IconButton>
              </Stack>
              <hr />
            </Grid>
            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="light" size="xlsmall">
                Location
              </Typography>
              <Typography variant="bold" size="small">
                {fileDetailsData?.drive == 1 ? "Case Drive" : "My Drive"}
              </Typography>
            </Grid>

            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="light" size="xlsmall">
                File Type
              </Typography>
              <Typography variant="bold" size="small">
                {fileDetailsData?.file_ext}
              </Typography>
            </Grid>
            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="light" size="xlsmall">
                File Size
              </Typography>
              <Typography variant="bold" size="small">
                {convertFileSize(fileDetailsData?.file_size)}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ ml: 2 }}></DialogActions>
      </Dialog>
    </>
  );
}
