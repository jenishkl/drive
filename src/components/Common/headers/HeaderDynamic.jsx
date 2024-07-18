"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HeaderDynamic({
  left,
  right,
  sticky,
  height,
  top,
  spacing,
  bottom,
  variant,
  padding,
  type,
  bgColor,
}) {
  const N = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Box display={"flex"} gap={2} m={2} flexDirection={"column"}>
        {right}
      </Box>
    </Menu>
  );

  return (
    <>
      <Paper
        variant={variant ?? "header"}
        className="border-color"
        sx={(th) => ({
          position: sticky && "sticky",
          height: height,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          background: th.palette.mode == "light" && bgColor,
          //   flexWrap: "wrap",
          // gap: 3,
          // p: 1,
          top: top,
          overflow: "auto",
          zIndex: 10,

          // alignItems: "",
          padding: padding,
          justifyContent: "center",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
        })}
      >
        {left && (
          <Grid
            container
            spacing={spacing}
            display={"flex"}
            width={"100%"}
            height={"100%"}
            // mx={1}
            sx={{
              flexWrap: "nowrap",
            }}
          >
            <Grid
              item
              xs={12}
              // width={"min-content"}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {left}
            </Grid>

            <Grid
              item
              xs={"auto"}
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 3,
                mx: 2,
                alignItems: "center",
              }}
            >
              {right}
            </Grid>
            {right && (
              <Grid
                item
                xs={1}
                sx={{ display: { xs: "flex", md: "none" } }}
                justifyContent={"right"}
              >
                <IconButton
                  size="medium"
                  className="p-0 "
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        )}
        <Grid>{bottom}</Grid>
      </Paper>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </>
  );
}
