import { Box, Container, Modal } from "@mui/material";
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
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { decode } from "../../helpers/utils";

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
      if (type == "view") {
        // data.shared_id = params?.shared_id;
        let d = decode(params?.fileId)?.split("_");
        data.f_id = d[0];
        data.drive = d[1];
        data.type = d[2];
        await dispatch(publicFilePasswordCheck(data)).unwrap();
      } else {
        data.request_id = params?.request_id;
        data.id = params?.submitter_id;
        await dispatch(checkPassword(data)).unwrap();
      }
    } catch (error) {
      toast.error(error?.error?.message);
      console.log("error", error);
    }
  };
  return (
    <Modal
      open={true}
      //   onClose={() => setViewFile(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container maxWidth="md" className="d-flex flex-column gap-3">
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
          <LoadingButton
            loading={checkPasswordLoading}
            label="Check"
            onClick={handleSubmit(handleCheck)}
          />
        </Container>
      </Box>
    </Modal>
  );
}
