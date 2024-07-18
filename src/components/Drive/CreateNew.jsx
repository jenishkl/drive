"use client";
import { ListItemIcon, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { GlobalContext } from "@/layout/GlobalContextProvider";
import { toast } from "sonner";
import Actions from "../Common/dropdowns/Actions";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next-nprogress-bar";
import _ from "lodash";
import { USER } from "@/helpers/utils";
import { driveSelector } from "@/store/drive/driveSlice";
import { useDispatch, useSelector } from "react-redux";
import { createFolderMyDrive } from "@/store/drive/driveActions";
import { useForm } from "react-hook-form";
import PopUpForm from "../Common/Popups/PopUpForm";

export default function CreateNew({ grand_folder_details, folder_id, drive }) {
  const [openFolder, setOpenFolder] = useState();
  const { control, setValue, watch, getValues, reset } = useForm();
  const formProps = { control, setValue, watch, getValues, reset };
  const router = useRouter();
  const dispatch = useDispatch();
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
  } = useContext(GlobalContext) || {};
  const {
    createFolderMyDriveLoading,
    createFolderMyDriveData,
    storageDetailsData,
    storageDetailsLoading,
  } = useSelector(driveSelector);
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

  const menuItems = [
    <MenuItem
      onClick={() => {
        setOpenFolder(true);
      }}
    >
      <ListItemIcon>
        <DriveFolderUploadIcon />
      </ListItemIcon>
      Create Folder
    </MenuItem>,
    <MenuItem onClick={() => {}}>
      <label htmlFor="fileupload-mydrive" className="row-align-center">
        <ListItemIcon>
          <UploadIcon />
        </ListItemIcon>
        Upload File
      </label>
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
              url: `MyDrive/${grand_folder_details?.created_by ?? USER?.id}/`,
              body: { folder_id: folder_id, myDrive: true },
            });
            setFiles([...e.target.files]);
            setUploadOpen("start");
          }
          e.target.value = null;
        }}
      />
    </MenuItem>,
  ];

  return (
    <>
      <Actions
        menuItems={menuItems}
        label={"New"}
        variant="action"
        row={!sideBarOpen}
        startIcon={<AddIcon />}
      />

      <PopUpForm
        fieldDatas={fieldDatas}
        open={openFolder}
        onClose={() => setOpenFolder(false)}
        loading={createFolderMyDriveLoading}
      />
    </>
  );
}
