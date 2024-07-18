import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ImageCommon from "../../imagecomponent/ImageCommon";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ImagePreview({ image, iframe }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      className="preview"
      sx={{
        position: "absolute",
        transform: "translate(-50%,-50%)",
        top: "50%",
        left: "50%",
        display: "none",
      }}
    >
      <IconButton onClick={handleOpen}>
        <RemoveRedEyeIcon fontSize="5px" sx={{ fontSize: "10px" }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <AvatarEditor
            image={image}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
          /> */}
          {iframe ? (
            <>
              <iframe src={URL.createObjectURL(image)} frameborder="0"></iframe>
            </>
          ) : (
            <ImageCommon
              loading="lazy"
              original={true}
              src={
                image &&
                (typeof image == "object" ? URL.createObjectURL(image) : image)
              }
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}
