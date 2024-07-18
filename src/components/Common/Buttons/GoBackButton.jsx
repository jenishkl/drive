"use client";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function GoBackButton({ reversed = true }) {
  const router = useRouter();
  const pathn = usePathname();
  const pathName = pathn?.split("/");
  let path = pathName.splice(0, pathName.length - 1).join("/");
  console.log("path", path);
  return (
    <IconButton
      onClick={() => {
        if (reversed) router.push(path);
        else router.push(path);
      }}
      sx={{ pointerEvents: "auto" }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}
