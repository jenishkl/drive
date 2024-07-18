"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingButton from "../Common/Buttons/LoadingButton";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { chooseColor } from "@/store/drive/driveActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { driveSelector } from "@/store/drive/driveSlice";

export default function ChooseColorPopUp({ onClose, open, folder_id }) {
  const [color, setColor] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const { chooseColorLoading } = useSelector(driveSelector);
  const handleChangecolor = async () => {
    try {
      await dispatch(chooseColor({ folder_id, color }))
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
      <Dialog open={open} onClose={onClose} aria-labelledby={"choose-color"}>
        <DialogTitle id={"color-pop"}></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <SketchPicker
              color={color}
              onChangeComplete={(color) => setColor(color.hex)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" size="small" variant="cancel">
            Cancel
          </Button>
          <LoadingButton
            onClick={handleChangecolor}
            color="primary"
            label="Save"
            loading={chooseColorLoading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
