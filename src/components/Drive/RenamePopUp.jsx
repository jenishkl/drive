"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingButton from "../Common/Buttons/LoadingButton";
import { useForm } from "react-hook-form";
import StringField from "../Common/InputFields/StringField";
import { useDispatch, useSelector } from "react-redux";
import { renameFolder } from "@/store/drive/driveActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { driveSelector } from "@/store/drive/driveSlice";

export default function RenamePopUp({ onClose, open, id, type, name }) {
  const { control, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      name: name,
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { renameFolderData, renameFolderLoading } = useSelector(driveSelector);
  const handleSave = async (data) => {
    try {
      await dispatch(renameFolder({ name: data?.name, id: id, type }))
        .unwrap()
        .then((d) => toast.success(d?.message));
      onClose();
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        fullWidth
        onClose={onClose}
        aria-labelledby={"rename"}
      >
        <DialogTitle id={"rename"}>Rename</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 3 }}>
            <StringField
              control={control}
              label={"Folder Name"}
              name={"name"}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <LoadingButton
            label="Save"
            onClick={handleSubmit(handleSave)}
            loading={renameFolderLoading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
