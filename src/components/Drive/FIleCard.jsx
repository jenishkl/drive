"use client";
import React, { useContext, useEffect, useState } from "react";
import { DeleteIcon, EditIcon, ShareFile } from "../../helpers/icons";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TTTypography from "../Common/ToolTipComponents/TTTypography";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Modal from "@mui/material/Modal";
//ICONS
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RecyclingIcon from "@mui/icons-material/Recycling";

import InfoIcon from "@mui/icons-material/Info";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ArchiveIcon from "@mui/icons-material/Archive";
import SharePopUp from "./SharePopUp";
import {
  dateFormate,
  encode,
  encriptData,
  file_icon,
  folder,
  imageurl,
  lastseen,
} from "../../helpers/utils";
import CancelIcon from "@mui/icons-material/Cancel";
import ImagePreview from "../Common/Popups/ImagePreview";
import ImageCommon from "../imagecomponent/ImageCommon";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  copyFile,
  deleteFile,
  fileBinAndArchieve,
  getAllFolders,
  moveFile,
} from "../../store/drive/driveActions";
import { GlobalContext } from "../../layout/GlobalContextProvider";
import FileDetailPopUp from "./FileDetailPopUp";
import { useForm } from "react-hook-form";
import { driveSelector } from "../../store/drive/driveSlice";
import ChooseFolderPopUp from "./ChooseFolderPopUp";
import { useRouter } from "next/navigation";
import FileMenu from "./FileMenu";
import Link from "next/link";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function FileCard({
  name1,
  size,
  file_type = "",
  onRemove,
  id,
  bin = 0,
  archieve = 0,
  detail,
  drive,
  file_link,
  file = file_link ?? file,
  viewOnly = false,
  onlyMenu = false,
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const { confirmPopUp, setConfirmPopUp } = useContext(GlobalContext) || {};
  const N = useRouter();
  const [openDetail, setOpenDetail] = useState(false);
  const [moveCopyOpen, setMoveCopyOpen] = useState(false);
  const [viewFile, setViewFile] = useState(null);
  const dispatch = useDispatch();
  const { getAllFoldersData, moveFileData, moveFileLoading, copyFileLoading } =
    useSelector(driveSelector);
  const { control, setValue, watch, handleSubmit } = useForm({
    defaultValues: {},
    shouldUnregister: false,
  });
  const handleBinFile = async (type) => {
    try {
      if (type == 1) {
        await dispatch(
          fileBinAndArchieve({
            id,
            type: type,
            updateType: detail?.archive == 0 ? 1 : 0,
            drive,
          })
        ).unwrap();
        toast.success(
          `File ${
            archieve == 1 ? "un archieved" : "moved to archieve"
          } successfully`
        );
      } else {
        await dispatch(
          fileBinAndArchieve({
            id,
            type: type,
            updateType: detail?.bin == 0 ? 1 : 0,
            drive,
          })
        ).unwrap();
        toast.success(
          `File ${detail?.bin == 1 ? "un bin" : "moved to bin"} successfully`
        );
      }

      setConfirmPopUp(null);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleDelete = async () => {
    try {
      await dispatch(deleteFile({ id, drive })).unwrap();
      toast.success("File deleted");
      setConfirmPopUp(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  let filemodel = [
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

  const handleMoveFile = async (data) => {
    try {
      console.log("data", data);

      await dispatch(
        moveFile({
          from: drive == 1 ? 2 : 1,
          to: data?.table,
          folder_id: data?.folder_id,
          files_id: [id],
          type: moveCopyOpen == "Copy File" ? 2 : 1,
        })
      )
        .unwrap()
        .then((data) => toast.success(data?.message));

      setMoveCopyOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {onlyMenu ? (
        <FileMenu
          archive={archieve}
          bin={bin}
          type={2}
          detail={detail}
          drive={drive}
          id={id}
        />
      ) : (
        <>
          <Card sx={{ background: "#ECF0FF", border: "none" }} className=" p-2">
            <Box>
              <Link
                href={`/drive/${folder(detail?.folder_id, drive)}/${encriptData(
                  id
                )}`}
                target="_blank"
              >
                <Box
                  sx={{ cursor: "pointer", width: "100%" }}
                  overflow={"hidden"}
                >
                  {filemodel && (
                    <ImageCommon
                      aspectRatio={1.4}
                      src={file}
                      objectFit="contain"
                      // height="160px"
                    />
                  )}
                  {!filemodel && (
                    <>
                      {detail?.thumbnail_img ? (
                        <Box sx={{ background: "white" }}>
                          {" "}
                          <ImageCommon
                            aspectRatio={1.4}
                            src={detail?.thumbnail_img}
                            objectFit="cover"
                            // height="160px"
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            aspectRatio: 1.4,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {file_icon(file_type)}
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Link>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  overflow: "auto",
                }}
              >
                <Stack direction={"column"} width={"100%"}>
                  <TTTypography
                    content={name1?.replaceAll("_", " ") ?? ""}
                    size={"medium"}
                    variant={"bold"}
                    sx={{ color: "#000 !important" }}
                    line="singleLine"
                  />
                  <Typography
                    variant="light"
                    size="xlsmall"
                    sx={{ color: "#000 !important" }}
                  >
                    {/* {dayjs(detail?.created_at).format(dateFormate({}))} */}
                  </Typography>
                </Stack>
                {!viewOnly && (
                  <>
                    <FileMenu
                      archive={archieve}
                      bin={bin}
                      type={2}
                      detail={detail}
                      drive={drive}
                      id={id}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Card>
        </>
      )}
      {shareOpen && (
        <SharePopUp
          open={shareOpen}
          id={id}
          type={2}
          drive={drive}
          onClose={() => setShareOpen(null)}
        />
      )}
      {openDetail && (
        <FileDetailPopUp
          drive={drive}
          id={id}
          open={openDetail}
          onClose={() => setOpenDetail(null)}
        />
      )}
      {/* {viewFile && <ImagePreview image={viewFile} iframe={true} />} */}
      {viewFile && (
        <Modal
          open={viewFile}
          onClose={() => setViewFile(null)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Container maxWidth="md">
              <Button
                variant="contained"
                sx={{ position: "fixed", right: 30, top: 20 }}
                onClick={() => setViewFile(null)}
              >
                Close
              </Button>
              <Box mt={5}>
                <iframe
                  src={
                    file &&
                    (typeof file == "object" ? URL.createObjectURL(file) : file)
                  }
                  style={{ width: "100%", height: "100vh " }}
                  frameborder="0"
                ></iframe>
              </Box>
              {/* ) : (
              <ImageCommon
                src={
                  image &&
                  (typeof image == "object" ? URL.createObjectURL(file) : file)
                }
              />
            )} */}
            </Container>
          </Box>
        </Modal>
      )}

      {moveCopyOpen && (
        <ChooseFolderPopUp
          control={control}
          watch={watch}
          moveCopyOpen={moveCopyOpen}
          setMoveCopyOpen={setMoveCopyOpen}
          onClick={handleSubmit(handleMoveFile)}
          setValue={setValue}
        />
      )}
    </>
  );
}
