"use client";
import {
  Box,
  Container,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import React from "react";
import StringField from "../../components/Common/InputFields/StringField";
import { useForm } from "react-hook-form";
import LoadingButton from "../../components/Common/Buttons/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  checkPassword,
  publicFilePasswordCheck,
} from "../../store/drive/driveActions";
import { driveSelector } from "../../store/drive/driveSlice";
import { toast } from "sonner";
import { decode } from "../../helpers/utils";
import { useParams } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100",
  height: "100",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function PasswordModal({ type, control, handleSubmit }) {
  const dispatch = useDispatch();
  const params = useParams();
  const { checkPasswordData, checkPasswordLoading } =
    useSelector(driveSelector);
  // const { control, setValue, watch, handleSubmit } = useForm({
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });
  const handleCheck = async (data) => {
    try {
      data.request_id = params?.id;
      await dispatch(checkPassword(data)).unwrap();
    } catch (error) {
      toast.error(error?.error?.message);
      console.log("error", error);
    }
  };
  return (
    <>
      <Dialog open={true}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack direction={"column"} gap={3} mt={2}>
              <StringField
                control={control}
                label={"Email"}
                name={"email"}
                type="email"
              />
              <StringField
                control={control}
                label={"Password"}
                name={"password"}
                type="password"
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {" "}
          <LoadingButton
            loading={checkPasswordLoading}
            label="Check"
            onClick={handleSubmit(handleCheck)}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
