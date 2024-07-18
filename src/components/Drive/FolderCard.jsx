"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  DeleteIcon,
  EditIcon,
  OpenFolder,
  ShareFile,
} from "../../helpers/icons";
import {
  Box,
  Card,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  Select,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TTTypography from "../Common/ToolTipComponents/TTTypography";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

//ICONS
import FolderIcon from "@mui/icons-material/Folder";
import RecyclingIcon from "@mui/icons-material/Recycling";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InfoIcon from "@mui/icons-material/Info";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ArchiveIcon from "@mui/icons-material/Archive";
import SharePopUp from "./SharePopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  binView,
  copyFolder,
  deleteFolder,
  downloadFileZip,
  folderBinAndArchieve,
  getAllFolders,
  getFolders,
  moveFolder,
} from "../../store/drive/driveActions";
import { toast } from "sonner";
import { GlobalContext } from "../../layout/GlobalContextProvider";
import { driveSelector } from "../../store/drive/driveSlice";
import { useForm } from "react-hook-form";
import ChooseFolderPopUp from "./ChooseFolderPopUp";
import FolderDetailPopUp from "./FolderDetailPopUp";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import MaptoProjectPopUp from "./MaptoProjectPopUp";
import FolderMenu from "./FolderMenu";
import { encriptData } from "@/helpers/utils";
export default function FolderCard({
  loading = false,
  name,
  id,
  stage,
  bin,
  archive = 0,
  detail,
  viewOnly = false,
  url,
  drive,
  onlyMenu,
  color,
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [moveCopyOpen, setMoveCopyOpen] = useState(false);
  const N = useRouter();
  const params = useParams();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { confirmPopUp, setConfirmPopUp } = useContext(GlobalContext) || {};
  const {
    getAllFoldersData,
    moveFolderData,
    moveFolderLoading,
    copyFolderLoading,
  } = useSelector(driveSelector);
  const { control, setValue, watch, handleSubmit } = useForm({
    defaultValues: {},
  });

  const handleMoveFolder = async (data) => {
    try {
      console.log("data", data);
      if (moveCopyOpen == "Move File") {
        await dispatch(moveFolder({ ...data, id: id }))
          .unwrap()
          .then((data) => toast.success(data?.message));
      } else {
        await dispatch(copyFolder({ ...data, id: id }))
          .unwrap()
          .then((data) => toast.success(data?.message));
      }
      setMoveCopyOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {onlyMenu ? (
        <FolderMenu
          archive={archive}
          bin={bin}
          id={id}
          detail={detail}
          drive={drive}
          type={1}
        />
      ) : (
        <Card
          sx={{
            background: "#ECF0FF",
            maxWidth: "500px",
            border: "none",
            cursor: "pointer",
          }}
          className="row-align-between  gap-2 p-2"
        >
          {
            <Link href={`/drive/${encriptData(id + "_" + drive)}`} >
              <Box className="row-align-between gap-2">
                <FolderIcon sx={{ color: color ?? "grey !important" }} />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TTTypography
                    content={name}
                    size={"medium"}
                    variant={"bold"}
                    loading={loading}
                    sx={{ color: "#000 !important", minWidth: "100px" }}
                    line="singleLine"
                  />
                  <Stack direction={"column"}>
                    <Typography
                      variant="light"
                      size="xlsmall"
                      sx={{ color: "#000 !important" }}
                    ></Typography>
                    <Typography
                      variant="light"
                      size="xlsmall"
                      sx={{ color: "#000 !important" }}
                    >
                      {loading ? (
                        <Skeleton height={"10px"} />
                      ) : (
                        detail?.case_details?.case_id ??
                        detail?.client_details?.client_id ??
                        detail?.company_details?.company_id ??
                        detail?.owner_details?.name
                      )}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Link>
          }
          {!viewOnly && (
            <Box>
              <FolderMenu
                archive={archive}
                bin={bin}
                id={id}
                detail={detail}
                drive={drive}
                type={1}
              />
              {/* <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <IconButton
                      variant="nonebg"
                      {...bindTrigger(popupState)}
                      endIcon={<></>}
                    >
                      {!loading && <MoreVertIcon />}
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>{menu}</Menu>
                  </React.Fragment>
                )}
              </PopupState> */}
            </Box>
          )}
        </Card>
      )}
      {shareOpen && (
        <SharePopUp
          type={1}
          open={shareOpen}
          id={id}
          drive={drive}
          onClose={() => setShareOpen(null)}
        />
      )}
      {openDetail && (
        <FolderDetailPopUp
          open={openDetail}
          setShareOpen={setShareOpen}
          drive={drive}
          onClose={() => setOpenDetail(false)}
          id={id}
        />
      )}
      {moveCopyOpen && (
        <ChooseFolderPopUp
          control={control}
          setValue={setValue}
          moveCopyOpen={moveCopyOpen}
          onClick={handleSubmit(handleMoveFolder)}
          watch={watch}
          setMoveCopyOpen={setMoveCopyOpen}
        />
      )}

      {}
    </>
  );
}
