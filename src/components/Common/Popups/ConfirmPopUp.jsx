import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useContext } from "react";
import { GlobalContext } from "../../../layout/GlobalContextProvider";
import LoadingButton from "../Buttons/LoadingButton";
import { useSelector } from "react-redux";
import { loadingSelector } from "../../../store/selectors";
export default function ConfirmPopUp({ props, open, onClose }) {
  const { confirmPopUp, setConfirmPopUp } = useContext(GlobalContext)||{};
  const { onSubmit, content, content2 } = confirmPopUp || props || {};
  const theme = useTheme();
  //DELETE LOADING
  const loading = useSelector(loadingSelector);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => setConfirmPopUp(null);
  return (
    <Dialog
      fullScreen={fullScreen}
      open={confirmPopUp || open}
      fullWidth
      onClose={handleClose}
      maxWidth={"sm"}
      aria-labelledby="responsive-dialog-title"
    >
      <Box className="p-4 text-center">
        <DialogTitle
          id="responsive-dialog-title"
          component={"div"}
          className="row-center  "
        >
          <WarningAmberIcon color="primary" sx={{ fontSize: "60px" }} />
        </DialogTitle>
        <DialogContent sx={{ display: "grid" }}>
          <Typography variant="bold" size="high" sx={{ justifySelf: "center" }}>
            {content ?? "Are you sure you want to delete ?"}
          </Typography>
          {content2 && (
            <Typography
              variant="light"
              size="small"
              sx={{ justifySelf: "center" }}
            >
              {content2 ?? "Are you sure you want to delete ?"}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <LoadingButton
            onClick={onSubmit}
            loading={loading.includes(true)}
            label={"Confirm"}
          />
          <Button type="submit" variant="cancel" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
