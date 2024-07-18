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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { folderDetails, sharedPeoples } from "../../store/drive/driveActions";
import { driveSelector } from "../../store/drive/driveSlice";
import { DeleteIcon, FolderIcon, OpenFolder } from "../../helpers/icons";
import ProfileAvatarGroup from "../Common/Avatar/AvatarGroup";
import {
  Each,
  USER,
  dateFormate,
  encriptData,
  folder,
  imageurl,
} from "../../helpers/utils";
import StringField from "../Common/InputFields/StringField";
import DateField from "../Common/InputFields/DateField";
import SwitchField from "../Common/InputFields/SwitchField";
import ManageSharedPeoples from "./ManageSharedPeoples";
import CloseIcon from "@mui/icons-material/Close";
import { convertFileSize } from "../Common/helper";
import BadgeAvatar from "../Common/Avatar/BadgeAvatar";
import TTTypography from "../Common/ToolTipComponents/TTTypography";
import dayjs from "dayjs";
import Link from "next/link";
import { FRONT_END_URL } from "@/helpers/envis";
export default function FolderDetailPopUp({ open, onClose, id, drive,detail }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    folderDetailsData,
    shareFileInternalData,
    removeSharedUserData,
    changeAccessLevelData,
  } = useSelector(driveSelector);
  const { folderDetails: folderDetail } = folderDetailsData || {};

  useEffect(() => {
    if (id) {
      dispatch(folderDetails({ id }));
    }
  }, [id, shareFileInternalData, removeSharedUserData, changeAccessLevelData]);

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
          Folder details
          <IconButton variant="cancel" onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <>{FolderIcon()}</>
              <hr />
            </Grid>
            <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
            >
              <Typography variant="bold" size="high">
                Who can access
              </Typography>
              <Stack direction={"column"} gap={1} alignItems={"center"}>
                <ProfileAvatarGroup
                  data={folderDetail?.accessers}
                  max={5}
                  nameKey="user_details.name"
                  imageKey="user_details.profile_img"
                />
                <ManageSharedPeoples
                  accessers={folderDetail?.accessers}
                  f_id={id}
                  drive={drive}
                  type={1}
                  detail={detail}
                />
              </Stack>
              <hr />
            </Grid>

            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="bold" size="small">
                Folder Name
              </Typography>
              <Typography variant="light" size="xlsmall">
                {folderDetail?.name ?? "SDSDS"}
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
                Owned By
              </Typography>
              {folderDetail?.owner_details && (
                <Stack direction={"row"} gap={1}>
                  <BadgeAvatar
                    size="small"
                    src={imageurl(folderDetail?.owner_details?.profile_img)}
                    name={folderDetail?.owner_details?.name}
                  />
                  <Stack direction={"column"}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <TTTypography
                        variant="bold"
                        size="small"
                        content={folderDetail?.owner_details?.name}
                      />
                      <Button
                        size="small"
                        variant="orange"
                        sx={{ fontSize: "10px !important" }}
                      >
                        {folderDetail?.owner_details?.is_client == 1
                          ? "Client"
                          : "Lezdo"}
                      </Button>
                    </Stack>
                    <TTTypography
                      variant="bold"
                      size="small"
                      content={folderDetail?.owner_details?.email}
                    />
                  </Stack>
                </Stack>
              )}
              {folderDetail?.client_details && (
                <Stack direction={"row"} gap={1}>
                  <BadgeAvatar
                    size="small"
                    src={imageurl(folderDetail?.client_details?.profile_img)}
                    name={folderDetail?.client_details?.name}
                  />
                  <Stack direction={"column"}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <TTTypography
                        variant="bold"
                        size="small"
                        content={folderDetail?.client_details?.name}
                      />
                      <Button
                        size="small"
                        variant="orange"
                        sx={{ fontSize: "10px !important" }}
                      >
                        Client
                      </Button>
                    </Stack>
                    <TTTypography
                      variant="bold"
                      size="small"
                      content={folderDetail?.client_details?.email}
                    />
                  </Stack>
                </Stack>
              )}
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
                    `/drive/${encriptData(
                      folder(folderDetail?.id, folderDetail?.drive)
                    )}`
                  }
                >
                  <TTTypography
                    variant="light"
                    size="medium"
                    sx={{ color: "blue" }}
                    line="doubleLine"
                    content={
                      FRONT_END_URL +
                      `/drive/${encriptData(
                        folder(folderDetail?.id, folderDetail?.drive)
                      )}`
                    }
                  />
                </Link>
                {/* <IconButton onClick={() => copy()}>
                  <ContentCopyIcon />
                </IconButton> */}
              </Stack>
              <hr />
            </Grid>

            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="bold" size="small">
                Folder Location
              </Typography>
              <Typography variant="light" size="xlsmall">
                {folderDetail?.drive == 1 ? "Case Drive" : "My Drive"}
              </Typography>
              <hr />
            </Grid>

            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="bold" size="small">
                Folder Counts
              </Typography>
              <Typography variant="light" size="xlsmall">
                {folderDetail?.total_folders_count}
              </Typography>
              <hr />
            </Grid>

            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="bold" size="small">
                Files Count
              </Typography>
              <Typography variant="light" size="xlsmall">
                {folderDetail?.total_files_count}
              </Typography>
              <hr />
            </Grid>
            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="bold" size="small">
                Folder Size
              </Typography>
              <Typography variant="light" size="xlsmall">
                {convertFileSize(folderDetail?.total_size)}
              </Typography>
              <hr />
            </Grid>
            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              <Typography variant="bold" size="small">
                Created at
              </Typography>
              <Typography variant="light" size="xlsmall">
                {dayjs(folderDetail?.created_at).format(
                  dateFormate({ time: true })
                )}
              </Typography>
              <hr />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ ml: 2 }}></DialogActions>
      </Dialog>
    </>
  );
}
