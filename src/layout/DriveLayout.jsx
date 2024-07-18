"use client";
import TabDynamic from "@/components/Common/Tabs/TabDynamic";
import HeaderDynamic from "@/components/Common/headers/HeaderDynamic";
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "./GlobalContextProvider";
import { USER, decriptData } from "@/helpers/utils";
import Link from "next/link";
import MainSideBar from "./SideBars/MainSideBar";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import ThemeSwitch from "@/components/switch/ThemeSwitch";
import MyAccountPopUp from "./MyaccountPopup";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import { ContextMenu, IconMenuItem } from "mui-nested-menu";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { toast } from "sonner";
import {
  createFolderMyDrive,
  storageDetails,
} from "@/store/drive/driveActions";
import { useDispatch, useSelector } from "react-redux";
import PopUpForm from "@/components/Common/Popups/PopUpForm";
import { driveSelector } from "@/store/drive/driveSlice";
import { useForm } from "react-hook-form";
import UploadIcon from "@mui/icons-material/Upload";
import _ from "lodash";
import FolderFileSearch from "@/components/Common/InputFields/FolderFileSearch";

export default function DriveLayout({
  children,
  folder_details = {},
  storageData = {},
  grand_folder_details = {},
}) {
  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();
  const [openFolder, setOpenFolder] = useState();
  const dispatch = useDispatch();
  const { control, setValue, watch, getValues, reset } = useForm();
  const formProps = { control, setValue, watch, getValues, reset };
  const {
    createFolderMyDriveLoading,
    createFolderMyDriveData,
    getFileAccessLoading,
    storageDetailsLoading,
    storageDetailsData,
  } = useSelector(driveSelector);
  const dd = {};
  const { tabValue, setTabValue } = dd || {};
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

    sideBarOpen,
    setSideBarOpen,
  } = dd || {};
  let tabList = [
    { name: "My Drive" },
    { name: "Work Drive" },
    { name: "Shared Files" },
    { name: "File requests" },
    { name: "Archived" },
    { name: "Bin" },
  ];

  var drive = 2;
  var folder_id = 0;
  // if (pathName?.split("/")?[1] == "my-drive") {
  //   drive = 2;
  //   folder_id = 0;
  // }
  // if (pathName?.split("/")[1] == "work-drive") {
  //   drive = 1;
  //   folder_id = 0;
  // }

  // if (pathName?.split("/")[1] == "drive") {
  //   folder_id = decriptData(params?.folder)?.split("_")[0];
  //   drive = decriptData(params?.folder)?.split("_")[1];
  // }

  const handleDragOver = (e) => {
    e.preventDefault();
    // setDrop(true);
  };

  const handleDrop = (e) => {
    if (!storageDetailsLoading) {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (e.dataTransfer.files?.[0]) {
        const size = _.sum([...files]?.map((it) => it?.size));
        if (size >= storageDetailsData?.freeSpace) {
          return toast.info("InSufficient Storage");
        }
        setUrlBody({
          url: `MyDrive/${grand_folder_details?.created_by ?? USER?.id}/`,
          body: { folder_id: folder_id, myDrive: true, drive: 1 },
        });
        setFiles([...files]);
        setUploadOpen("start");
        // Promise.all(
        //   [...files].map((file) => {
        //     append({ file: file });
        //   })
        // );
      }
    }
    // setDrop(false);
  };
  const handleCreateFolder = async () => {
    try {
      await dispatch(
        createFolderMyDrive({
          name: watch("name"),
          parent_id: folder_id,
          drive: drive,
        })
      ).unwrap();
      toast.success("Folder created successfully");

      setOpenFolder(false);
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  };
  const fieldDatas = {
    formProps,
    fields: [
      {
        name: "name",
        type: "text",
        label: "Folder Name",
      },
    ],
    onSubmit: handleCreateFolder,
  };
  const menuItemsData = [
    {
      label: "New Folder",
      leftIcon: <CreateNewFolderIcon />,
      callback: (event, item) => {
        console.log("event", event);
        setOpenFolder(true);
      },
    },
  ];
  const [mousePosition, setMousePosition] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setMousePosition({
      mouseX: event.clientX,
      mouseY: event.clientY,
    });
  };

  const handleClose = () => {
    setMousePosition(null);
  };
  useEffect(() => {
    dispatch(storageDetails({ folder_id }));
  }, [folder_id]);
  return (
    <>
      <Box
        onContextMenu={handleContextMenu}
        style={{
          position: "relative",
        }}
      >
        {/* <Menu
          open={mousePosition !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            mousePosition !== null
              ? { top: mousePosition.mouseY, left: mousePosition.mouseX }
              : undefined
          }
        >
          <IconMenuItem
            onClick={() => setOpenFolder(true)}
            sx={{ width: "250px" }}
            leftIcon={<CreateNewFolderIcon />}
            // rightIcon={<SaveIcon />}
            label="New Folder"
          />
          <Divider />
          <IconMenuItem
            sx={{ width: "250px" }}
            leftIcon={<UploadIcon />}
            // rightIcon={<SaveIcon />}
            label={
              <>
                <label
                  htmlFor="fileupload-mydrive"
                  className="row-align-center"
                >
                  Upload File
                </label>
              </>
            }
          />
          <input
            type="file"
            id="fileupload-mydrive"
            style={{ display: "none" }}
            multiple
            onChange={(e) => {
              if (e.target.files?.[0] && !storageDetailsLoading) {
                const size = _.sum([...e.target.files]?.map((it) => it?.size));
                if (size >= storageDetailsData?.freeSpace) {
                  return toast.info("InSufficient Storage");
                }
                setUrlBody({
                  url: `MyDrive/${
                    grand_folder_details?.created_by ?? USER?.id
                  }/`,
                  body: { folder_id: folder_id, myDrive: true },
                });
                setFiles([...e.target.files]);
                setUploadOpen("start");
              }
              e.target.value = null;
            }}
          />
        </Menu> */}

        <Box
          display={"flex"}
          flexDirection={"column"}
          // onDragOver={handleDragOver}
          // onDrop={handleDrop}
        >
          {/* <HeaderDynamic
            sticky={true}
            top={"0px"}
            height={"62px"}
            // bgColor={"var(--primary-color)"}
            left={
              <>
                <Stack
                  width={"100%"}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"row"} alignItems={"center"} width={"45%"}>
                    <Typography
                      component={"div"}
                      sx={(theme) => ({
                        fontFamily: "Jost !important",
                        color: theme?.palette?.logoColor?.color,
                      })}
                      width={"200px"}
                      variant="subtitle1"
                      fontWeight={700}
                      fontSize={23}
                      ml={5}
                      textTransform={"uppercase"}
                    >
                      Drive
                    </Typography>{" "}
                    <IconButton onClick={() => setSideBarOpen(!sideBarOpen)}>
                      {!sideBarOpen ? (
                        <FormatAlignRightIcon />
                      ) : (
                        <FormatAlignLeftIcon />
                      )}
                    </IconButton>
                    <Grid item xs={6} md={12}>
                      <Card sx={{ border: "none" }}>
                        <FolderFileSearch />
                      </Card>
                    </Grid>
                  </Stack>

                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"end"}
                  >
                    <ThemeSwitch />

                    <MyAccountPopUp />
                  </Stack>
                </Stack>

           
              </>
            }
          /> */}
          <Stack direction={"row"} width={"100%"}>
            <Box position={"sticky"}>
              {/* <MainSideBar
                folder_id={folder_id}
                drive={drive}
                grand_folder_details={grand_folder_details}
              /> */}
            </Box>
            <Box width={"100%"} height={"100%"}>
              {children}
            </Box>
          </Stack>
        </Box>
      </Box>
      <PopUpForm
        fieldDatas={fieldDatas}
        open={openFolder}
        onClose={() => setOpenFolder(false)}
        loading={createFolderMyDriveLoading}
      />
    </>
  );
}
