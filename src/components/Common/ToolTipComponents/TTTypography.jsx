import { Box, Skeleton, Tooltip, Typography } from "@mui/material";
import React from "react";

export default function TTTypography({
  variant,
  size,
  content,
  line = "singleLine",
  loading,
  sx,
}) {
  return (
    <Tooltip title={<Box sx={{ p: 1 }}>{content}</Box>} arrow sx={{ m: 4 }}>
      <Typography variant={variant} size={size} className={line} sx={{ ...sx }}>
        {loading ? <Skeleton width={"100%"} /> : content}
      </Typography>
    </Tooltip>
  );
}
