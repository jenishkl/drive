import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function ImageCommon({
  src,
  aspectRatio = 1,
  width = "100%",
  height = "100%",
  objectFit = "contain",
  original = false,
  loading = "eager",
  quality = 100,
}) {
  return (
    <>
      {!original && (
        <Box
          sx={{
            position: "relative",
            aspectRatio: aspectRatio,
            width: width,
          }}
        >
          <Image
            src={src}
            loading={loading}
            quality={quality}
            // unoptimized
            fill
            alt="img"
            style={{ objectFit: objectFit }}
          />
        </Box>
      )}

      {original && (
        <>
          <Image
            src={src}
            loading={loading}
            quality={quality}
            sizes="100vw"
            width={0}
            alt="img"

            height={0}
            // unoptimized
            style={{ width: "100%", height: "100%", objectFit: objectFit }}
          />
        </>
      )}
    </>
  );
}
