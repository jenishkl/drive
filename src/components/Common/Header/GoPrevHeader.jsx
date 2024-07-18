import React from 'react'
import {IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import '../../../pages/Settings/ConfigureRoles/configure.css';
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import LoadingButton from '../Buttons/LoadingButton';

export default function GoPrevHeader({
  onClick,
  Label,
  Buttons = [],
  Color = "blue",
  height = "60px",
  position = "static",
  hideBackBtn = false,
  RightSideComponent = () => {},
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box
      className="px-3  header-box-shadow d-flex justify-content-between align-items-center sub-header-sticky-style flex-wrap"
      sx={{
        height: height,
        borderColor: theme.palette?.borderColor?.color,
        position: position,
        // zIndex:1
      }}
    >
      <Box className="d-flex align-items-center">
        {!hideBackBtn && (
          <IoChevronBackCircleOutline
            size={20}
            className="mr-1 pointer-hand"
            onClick={onClick ?? goBack}
          />
        )}
        <Typography
          component={"h3"}
          className="m-0"
          sx={{ textTransform: "capitalize" }}
        >
          {" "}
          {Label}
        </Typography>
      </Box>
      <Box className="d-flex align-items-center headerBtns" gap={2}>
        <RightSideComponent />
        {Buttons.map((btn, b) => (
          <LoadingButton
            variant={btn.color === "blue" ? "save" : "cancel"}
            onClick={btn.onClick}
            label={btn.label}
            loading={btn.loading}
          ></LoadingButton>
        ))}
      </Box>
    </Box>
  );
}
