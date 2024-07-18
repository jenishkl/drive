import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { logo, play, whiteStar } from "../../helpers/images";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
// import DivisionSelect from "../../components/headerComponents/DivisionSelect";
import { ClickAwayListener, Grid } from "@mui/material";
import { GlobalContext } from "../../App";
import ImageCommon from "../../components/imagecomponent/ImageCommon";
import { Search, SearchIconWrapper, StyledInputBase } from "../../theme/header";
import Link from "../../components/Common/Link/Link";
import whatsNew from "../../assets/images/whats_new_icon.gif";
import ThemeSwitch from "../../components/switch/ThemeSwitch";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { RiMenu2Fill, RiMenu3Fill } from "react-icons/ri";
import { removeSessionStorage } from "../../helpers/utils";
import { deleteToken, getMessaging } from "firebase/messaging";

import NotificationsPopover from "../../components/NotifcationPopOver";
import WhatsNew from "../../pages/dashboard/components/WhatsNew";
import { useState } from "react";
import GlobalSearch from "../../pages/dashboard/components/GlobalSearch";
import { SidebarHeader } from "./SideBarHeader";
import MessagePopup from "../../pages/dashboard/components/MessagePopUp";
import MyAccountPopUp from "./MyaccountPopup";
import DivisionsFilter from "../../pages/dashboard/components/DivisionsFilter";

export default function MainHeader() {
  const {
    sideBarOpen,
    setSideBarOpen,
    setToggle,
    toggle,
    collapsed,
    setCollapsed,
    themeMode,
  } = React.useContext(GlobalContext) || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openNew, setOpenNew] = useState(false);
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
  const messaging = getMessaging();

  const logout = () => {
    deleteToken(messaging)
      .then(() => {
        console.log("Token deleted.");
      })
      .catch((err) => {
        console.log("Unable to delete token. ", err);
      });
    localStorage.clear();
    window.location.replace("/");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <>
      <Menu
        component={"div"}
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
        <div className="row-align-center">
          {/* <ThemeSwitch /> */}
        </div>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            {" "}
            <Link to={"/client"} style={{ color: "black" }}>
              <SettingsIcon />
            </Link>
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          // background: "#0038FF !important",
          zIndex: 50,
          height: "57px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1, md: 9 },
            minHeight: "57px !important",
            pl: "0 !important",
          }}
        >
          <Box className="d-flex align-items-center">
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? (
                <RiMenu2Fill color="#fff" size={20} />
              ) : (
                <RiMenu3Fill color="#fff" size={20} />
              )}
            </IconButton>
            <IconButton
              sx={{ display: { xs: "none", md: "block" } }}
              onClick={() => {
                setSideBarOpen(!sideBarOpen);
                setCollapsed(!collapsed);
              }}
            >
              {" "}
              {collapsed ? (
                <RiMenu2Fill color="#fff" size={20} />
              ) : (
                <RiMenu3Fill color="#fff" size={20} />
              )}
            </IconButton>
            <GlobalSearch />
            {/* <Box sx={{ ml: 3 }}>
              <DivisionsFilter />
            </Box> */}
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            <Box mr={2}>
              <ThemeSwitch />
            </Box>
            <ClickAwayListener onClickAway={() => setOpenNew(false)}>
              <Box sx={{ width: "171px", display: "flex" }}>
                <li
                  className="nav-item mt-auto mb-auto d-flex align-items-center"
                  onClick={() => setOpenNew(!openNew)}
                >
                  <img src={whatsNew} width="30" height="30" />
                  <Typography
                    sx={{ color: "white", cursor: "pointer" }}
                    variant="bold"
                    size="small"
                  >
                    What's New
                  </Typography>
                </li>
              </Box>
            </ClickAwayListener>

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              // color="inherit"
            >
              <Badge badgeContent={0} color="primary">
                <IconButton sx={{ color: "white" }}>
                  <MessagePopup />
                </IconButton>
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <NotificationsPopover />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Link
                to={"/admin/setting/personal-details"}
                style={{ color: "white" }}
              >
                <SettingsIcon />
              </Link>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {" "}
              <MyAccountPopUp />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <WhatsNew show={openNew} setOpen={setOpenNew} />
    </>
  );
}
