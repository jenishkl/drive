"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseFolder } from "../../store/drive/driveActions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import LoadingButton from "../Common/Buttons/LoadingButton";
import CasCaderField from "../Common/InputFields/CasCader";
import RadioField from "../Common/InputFields/RadioField";
import { driveSelector } from "../../store/drive/driveSlice";
export default function ChooseFolderPopUp({
  onClick,
  setMoveCopyOpen,
  moveCopyOpen,
  control,
  watch,
  setValue,
}) {
  const dispatch = useDispatch();
  const { chooseFolderData } = useSelector(driveSelector);
  useEffect(() => {
    dispatch(chooseFolder(watch("table")));
  }, [watch("table")]);
  return (
    <Dialog
      open={moveCopyOpen}
      fullWidth
      maxWidth="sm"
      onClose={() => setMoveCopyOpen(false)}
      aria-labelledby={"guwdwd"}
    >
      <DialogTitle id={"move-File"}>
        <Typography>{moveCopyOpen}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* <RadioField
            control={control}
            name={"table"}
            onChange={(e) => setValue("table", e.target.value)}
            radios={[
              { label: "MyDrive", value: 1 },
              // { label: "Shared Folders", value: 2 },
            ]}
          /> */}
          <CasCaderField
            control={control}
            label={"Folder"}
            name={"folder_id"}
            options={chooseFolderData}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="cancel"
          onClick={() => setMoveCopyOpen(false)}
          color="primary"
        >
          Cancel
        </Button>
        <LoadingButton
          label="Save"
          //   loading={moveFileLoading || copyFileLoading}
          onClick={onClick}
        />
      </DialogActions>
    </Dialog>
  );
}
