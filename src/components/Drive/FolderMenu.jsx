"use client";
import React, { useContext, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { IconMenuItem, NestedMenuItem } from "mui-nested-menu";
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
import {
  copyFolder,
  deleteFolder,
  downloadFileZip,
  folderBinAndArchieve,
  getFileAccess,
  moveFolder,
} from "@/store/drive/driveActions";
import { useDispatch, useSelector } from "react-redux";
import ShareIcon from "@mui/icons-material/Share";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import DeleteIcon from "@mui/icons-material/Delete";
import SharePopUp from "./SharePopUp";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ChooseFolderPopUp from "./ChooseFolderPopUp";
import FolderDetailPopUp from "./FolderDetailPopUp";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { GlobalContext } from "@/layout/GlobalContextProvider";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SourceIcon from "@mui/icons-material/Source";
import MaptoProjectPopUp from "./MaptoProjectPopUp";
import { SketchPicker } from "react-color";
import ColorField from "../Common/InputFields/ColorField";
import ChooseColorPopUp from "./ChooseColorPopUp";
import EditIcon from "@mui/icons-material/Edit";
import RenamePopUp from "./RenamePopUp";
import { useRouter } from "next/navigation";
import { driveSelector } from "@/store/drive/driveSlice";
import { RotatingLines } from "react-loader-spinner";
import { USER } from "@/helpers/utils";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdOutlineColorLens, MdOutlineFileDownload } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiFolderSettingsLine } from "react-icons/ri";
import { PiRecycleFill } from "react-icons/pi";
export default function FolderMenu({
  id,
  drive,
  type = 1,
  detail,
  bin,
  archive,
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [moveCopyOpen, setMoveCopyOpen] = useState(false);
  const [chososeColorPopUp, setChososeColorPopUp] = useState(false);
  const [renamePopUp, setRenamePopUp] = useState(false);
  const [accessLevel, setAccessLevel] = useState(0);
  const { confirmPopUp, setConfirmPopUp } = useContext(GlobalContext) || {};
  const { control, setValue, watch, handleSubmit } = useForm({
    defaultValues: {},
  });
  const { getFileAccessData, getFileAccessLoading } =
    useSelector(driveSelector);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    if (USER?.id == detail?.created_by) {
      setAccessLevel(2);
    } else {
      dispatch(getFileAccess({ f_id: id, type }))
        .unwrap()
        .then((d) => setAccessLevel(d?.access_level));
    }

    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleDownloadFile = async () => {
    try {
      toast.promise(
        await dispatch(downloadFileZip({ id, type: drive })).unwrap(),
        {
          loading: "Loading...",
          success: (data) => {
            return `File download has been started`;
          },
          error: "Error",
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleArchiveandBin = async (type) => {
    try {
      if (type == 1) {
        await dispatch(
          folderBinAndArchieve({
            id,
            type: type,
            updateType: detail?.archive == 0 ? 1 : 0,
            drive: drive,
          })
        ).unwrap();
        toast.success(
          `Folder ${
            archive == 1 ? "un archieved" : "moved to archive"
          } successfully`
        );
      } else {
        await dispatch(
          folderBinAndArchieve({
            id,
            type: type,
            updateType: detail?.bin == 0 ? 1 : 0,
            drive: drive,
          })
        ).unwrap();
        // dispatch(getFolders({ id: params?.folderId, stage: params?.stageId }));
        toast.success(
          `Folder ${bin == 1 ? "un bin" : "moved to bin"} successfully`
        );
      }
      router.refresh();
      setConfirmPopUp(null);
    } catch (error) {
      console.log("error", error);
    }
  };
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
  const handleDelete = async () => {
    try {
      await dispatch(deleteFolder({ id, params: { drive } })).unwrap();
      toast.success("File deleted");
      router.refresh();
      setConfirmPopUp(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="file_menu">
      <IconButton variant="contained" onClick={handleClick}>
        <MoreVertIcon sx={{ color: "#000 !important" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        className="file_menu"
        onClose={handleClose}
        sx={{ p: 5 }}
        PaperProps={{
          sx: {
            p: 1,
            border: "none",
            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.15)",
            borderRadius: "5px",
            fontSize: "5px !important",
          },
        }}
      >
        <IconMenuItem
          onClick={() => setOpenDetail(detail)}
          sx={{ width: "250px", fontSize: "5px !important" }}
          leftIcon={<IoIosInformationCircleOutline size={20} />}
          // rightIcon={<SaveIcon />}
          label="Details"
        />
        {accessLevel == 2 && (
          <IconMenuItem
            onClick={() => setRenamePopUp(detail)}
            sx={{ width: "250px" }}
            leftIcon={<CiEdit size={20} />}
            // rightIcon={<SaveIcon />}
            label="Rename"
          />
        )}
        <IconMenuItem
          onClick={() => handleDownloadFile()}
          leftIcon={<MdOutlineFileDownload size={20} />}
          // rightIcon={<SaveIcon />}
          label="Download"
        />

        {accessLevel == 2 && (
          <NestedMenuItem
            className="file_menu"
            leftIcon={<IoShareSocialOutline size={20} />}
            //   rightIcon={<FlutterDashIcon />}
            MenuProps={{
              className: "file_menu",
              PaperProps: {
                boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.15)",
                borderRadius: "5px",
              },
            }}
            label="Share"
            parentMenuOpen={open}
          >
            <IconMenuItem
              onClick={() => setShareOpen(true)}
              leftIcon={<IoShareSocialOutline size={20} />}
              // rightIcon={<SaveIcon />}
              label="Share"
            />
            {/* <IconMenuItem
              onClick={handleClose}
              leftIcon={<AddToDriveIcon />}
              // rightIcon={<SaveIcon />}
              label="Drive"
            />
            <IconMenuItem
              onClick={handleClose}
              leftIcon={<MoveToInboxIcon />}
              // rightIcon={<SaveIcon />}
              label="Drop Box"
            /> */}
          </NestedMenuItem>
        )}
        {accessLevel == 2 && (
          <NestedMenuItem
            className="file_menu"
            leftIcon={<RiFolderSettingsLine size={20} />}
            //   rightIcon={<FlutterDashIcon />}
            label="Organize"
            MenuProps={{
              className: "file_menu",
              PaperProps: {
                boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.15)",
                borderRadius: "5px",
              },
            }}
            parentMenuOpen={open}
          >
            {USER?.profile_id == 1 && detail?.parent_id == 0 && (
              <MaptoProjectPopUp drive={drive} folder_id={id} />
            )}
            <IconMenuItem
              onClick={() => setChososeColorPopUp(true)}
              leftIcon={<MdOutlineColorLens size={20}/>}
              // rightIcon={<SaveIcon />}
              label="Choose Colour"
            />

            {/* <NestedMenuItem
            onClick={handleClose}
            leftIcon={<ColorLensIcon />}
            // rightIcon={<SaveIcon />}
            label="Choose Folder Color"
          >
            <IconMenuItem
              onClick={() => setMoveCopyOpen("Copy File")}
              leftIcon={<FolderCopyIcon />}
              // rightIcon={<SaveIcon />}
              label={"ssssddddd"}
            />
          </NestedMenuItem> */}
          </NestedMenuItem>
        )}
        {accessLevel == 2 && (
          <>
            {/* <IconMenuItem
              onClick={() => setMoveCopyOpen("Move File")}
              leftIcon={<DriveFileMoveIcon />}
              // rightIcon={<SaveIcon />}
              label="Move To"
            />
            <IconMenuItem
              onClick={() => setMoveCopyOpen("Copy File")}
              leftIcon={<FolderCopyIcon />}
              // rightIcon={<SaveIcon />}
              label="Copy To"
            /> */}
            {/* <IconMenuItem
              onClick={() =>
                setConfirmPopUp({
                  onSubmit: () => handleArchiveandBin(1),
                  content: `Are you sure to ${
                    archive == 1 ? "Un archive" : "archieve"
                  } this Folder`,
                })
              }
              leftIcon={<ArchiveIcon />}
              // rightIcon={<SaveIcon />}
              label={archive == 1 ? "Un Archive" : "Archieve"}
            /> */}
            <IconMenuItem
              onClick={() =>
                setConfirmPopUp({
                  onSubmit: () => handleArchiveandBin(2),
                  content: `Are you sure to ${
                    bin == 1 ? "Un Bin" : "bin"
                  } this Folder`,
                })
              }
              leftIcon={<PiRecycleFill size={20}/>}
              // rightIcon={<SaveIcon />}
              label={bin == 1 ? "UnBin" : "Bin"}
            />
            {bin == 1 && (
              <IconMenuItem
                onClick={() =>
                  setConfirmPopUp({
                    onSubmit: handleDelete,
                    content: "Are you sure delete this folder ?",
                  })
                }
                leftIcon={<DeleteIcon />}
                // rightIcon={<SaveIcon />}
                label="Delete"
              />
            )}{" "}
          </>
        )}
      </Menu>
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
          detail={detail}
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
      {chososeColorPopUp && (
        <ChooseColorPopUp
          folder_id={id}
          open={chososeColorPopUp}
          onClose={() => setChososeColorPopUp(false)}
        />
      )}
      {renamePopUp && (
        <RenamePopUp
          id={id}
          onClose={() => setRenamePopUp()}
          open={renamePopUp}
          type={1}
          name={detail?.name}
        />
      )}
    </div>
  );
}
