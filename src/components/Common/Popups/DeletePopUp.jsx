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
export default function DeletePopUp({ loading }) {
  const { deletePopUp, setDeletePopup } = useContext(GlobalContext)||{};
  const { onDelete, content } = deletePopUp;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => setDeletePopup(null);
  return (
    <Dialog
      fullScreen={fullScreen}
      open={deletePopUp}
      fullWidth
      onClose={handleClose}
      maxWidth={"xs"}
      aria-labelledby="responsive-dialog-title"
    >
      <Box className="p-4">
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
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <LoadingButton onClick={onDelete} loading={loading} label="Delete" />
          <Button type="submit" variant="cancel" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
