import * as React from "react";
import { Avatar, Badge, Box, Fab } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useState } from "react";
import ImagePreview from "../Popups/ImagePreview";
import { imageurl, randomColor } from "../../../helpers/utils";
export default function BadgeAvatar({
  image,
  handleImageChange,
  isEdit,
  id = Math.random(1000),
  size = "medium",
  name = "",
}) {
  const [file, setFile] = useState("");

  const getSize = () => {
    switch (size) {
      case "small":
        return {
          width: { xs: "20px", md: "35px" },
          height: { xs: "20px", md: "35px" },
        };
      case "medium":
        return {
          width: { xs: "40px", md: "55px" },
          height: { xs: "40px", md: "55px" },
        };
      case "large":
        return {
          width: { xs: "40px", md: "55px" },
          height: { xs: "40px", md: "55px" },
        };
      case "x-large":
        return {
          width: { xs: "70px", md: "75px" },
          height: { xs: "70px", md: "75px" },
        };
      case "xl-large":
        return {
          width: { xs: "85px", md: "90px" },
          height: { xs: "85px", md: "90px" },
        };
      case "xxl-large":
        return {
          width: { xs: "105px", md: "110px" },
          height: { xs: "105px", md: "110px" },
        };
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        position: "relative",
        width: "fit-content",
        height: "fit-content",
        "&:hover .preview": {
          display: "block !important",
        },
      }}
    >
      <Avatar
        alt="Travis Howard"
        key={image}
        src={!image?.size ? image?.split('//')[1]?image: imageurl(image) : URL.createObjectURL(image)}
        sx={{
          background: randomColor(name ?? "J"),
          ...getSize(),
          fontSize: "15px",
        }}
        variant="solid"
      >
        {name?.slice(0, 2)?.toUpperCase()}
      </Avatar>

      <ImagePreview
        image={!image?.size ? image?.split('//')[1]?image: imageurl(image) : URL.createObjectURL(image)}
      />
      {isEdit && (
        <Fab
          color="invertX"
          aria-label="add"
          sx={{
            width: "17px",
            position: "absolute",
            minHeight: "15px !important",
            height: "17px",
            bottom: 0,
            right: 0,
          }}
          // onClick={()=>}
        >
          <label class="custom-file-upload" for={"actual-btn" + id}>
            <AddAPhotoIcon
              color="invertY"
              sx={{ width: "12px", height: "12px" }}
            />
          </label>{" "}
        </Fab>
      )}
      <input
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          // setFile(e.target.files[0]);
          handleImageChange(e.target.files[0]);
          e.target.value = null;
        }}
        id={"actual-btn" + id}
      />
    </Box>
  );
}
