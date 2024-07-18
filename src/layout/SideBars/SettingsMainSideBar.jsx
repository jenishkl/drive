import React, { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { SidebarHeader, StyledLogo } from './SideBarHeader'
import { Box, Button, IconButton, Switch, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../App";
// import { menuClasses } from "../../helpers/utils";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { sideBarThemes } from "../../theme/sidebarTheme";
import { Each } from "../../helpers/utils";
import { logo } from "../../helpers/images";
import ImageCommon from "../../components/imagecomponent/ImageCommon";
import { LogoIcon } from "../../helpers/icons";
import { SidebarHeader } from "../Headers/SideBarHeader";
export const menuClasses = {
  root: "ps-menu-root",
  menuItemRoot: "ps-menuitem-root",
  subMenuRoot: "ps-submenu-root",
  button: "ps-menu-button",
  prefix: "ps-menu-prefix",
  suffix: "ps-menu-suffix",
  label: "ps-menu-label",
  icon: "ps-menu-icon",
  subMenuContent: "ps-submenu-content",
  SubMenuExpandIcon: "ps-submenu-expand-icon",
  disabled: "ps-disabled",
  active: "ps-active",
  open: "ps-open",
};

export default function SettingsMainSideBar({ menus }) {
  const {
    sideBarOpen,
    setSideBarOpen,
    themeMode: theme,
    setThemeMode,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  // hex to rgba converter
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const { toggle, setToggle, collapsed, setCollapsed, broken, setBroken } =
    useContext(GlobalContext);
  const [rtl, setRtl] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(true);
  // const [theme, setTheme] = React.useState("light");
  const [mount, setMount] = React.useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      fontSize: "26px",
      // color: sideBarThemes[theme].menu.icon,
      // [`&.${menuClasses.disabled}`]: {
      //   color: sideBarThemes[theme].menu.disabled.color,
      // },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
      display: sideBarOpen ? "none" : "block",
      size: "7px",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: sideBarThemes[theme].menu.subMenuContainer.background,
    }),
    button: {
      // paddingLeft: "7px !important",
      [`&.${menuClasses.disabled}`]: {
        color: sideBarThemes[theme].menu.disabled.color,
      },
      [`&.${menuClasses.active}`]: {
        background: sideBarThemes[theme].menu.active.background,
        color: " !important",
        "&:hover": {
          backgroundColor: sideBarThemes[theme].menu.active.background,
          color: "#0000",
        },
      },
      "&:hover": {
        backgroundColor: sideBarThemes[theme].menu.hover.backgroundColor,
        color: "#0000",
      },
      alignItems: "center",
    },

    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
      marginTop: "6px",
    }),
  };

  const handleNavigation = (item) => {
    console.log("item", item);
    if (item?.target) {
      window.open(item?.link, item?.target);
    } else {
      navigate(item?.link);
    }
  };
  const isActive = (path, data) => {
    var k = false;
    if (path && data) {
      k = data.some((item) => item?.link?.split("/").slice(-1)[0] === path);
    }
    return k;
  };
  const isMainMenuActive = (item, idx) => {
    if (window.location.pathname.split("/")[idx] == item?.split("/")[idx])
      return true;
    else return false;
  };
  const handleSubMenuOpen = (index, e) => {
    setActiveIndex(() => (e ? index : undefined));
  };
  return (
    <Box className="side-bar-menu-container h-100">
      <Sidebar
        onMouseEnter={() => setSideBarOpen(false)}
        onMouseLeave={() => (collapsed ? setSideBarOpen(true) : "")}
        collapsed={sideBarOpen}
        toggled={toggle}
        breakPoint={"900px"}
        className={theme}
        onBreakPoint={setBroken}
        onBackdropClick={() => setToggle(false)}
        backgroundColor={sideBarThemes[theme].sidebar.backgroundColor}
        rootStyles={{
          color: sideBarThemes[theme].sidebar.color,
          border: "none",
          zIndex: "1000",
          overflow: "unset !important",
          transition: "ease-in-out 0.5s",
          // boxShadow: " 0px 0px 4px 0px #00000040",
          borderRight: "1px solid rgb(223, 223, 223)",
          position: collapsed && "fixed",
        }}
      >
        <SidebarHeader />
       
        <Box height={"100%"} overflow={"auto"}>
          <Menu
            menuItemStyles={menuItemStyles}
            style={{ gap: "89px" }}
            transitionDuration={500}
            closeOnClick={true}
          >
            {menus.map((item, i) => {
              return item.subMenu ? (
                <SubMenu
                  active={isActive(
                    window.location.pathname.split("/").slice(-1)[0],
                    item.subMenu
                  )}
                  key={i}
                  open={activeIndex === i}
                  onOpenChange={(e) => handleSubMenuOpen(i, e)}
                  className="mb-2 pt-1 sub-menu-header"
                  icon={
                    <Box
                      style={{
                        fontSize: "18px !important",
                        color: isActive(
                          window.location.pathname.split("/").slice(-1)[0],
                          item.subMenu
                        )
                          ? sideBarThemes[theme].menu.active.foreground
                          : sideBarThemes[theme].menu?.inactive?.foreground,
                      }}
                      className="menu-icon"
                    >
                      {item?.icon}
                    </Box>
                  }
                  label={
                    <Box>
                      <Typography
                        className="mx-2"
                        variant="bold"
                        color={
                          isActive(
                            window.location.pathname.split("/").slice(-1)[0],
                            item.subMenu
                          ) && sideBarThemes[theme].menu.active.foreground
                        }
                        sx={{ fontWeight: 600, fontSize: "15px" }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  }
                >
                  <Each
                    of={item.subMenu}
                    render={(subMenu) => (
                      <MenuItem
                        // active={
                        //   window.location.pathname.split("/").slice(-1)[0] ==
                        //   subMenu?.link?.split("/").slice(-1)[0]
                        // }
                        className="py-1 sub-menu-item"
                        onClick={() => handleNavigation(subMenu)}
                        style={{ color: "black" }}
                      >
                        <Typography
                          variant="bold"
                          size={"small"}
                          sx={{
                            fontWeight:
                              window.location.pathname
                                .split("/")
                                .slice(-1)[0] ==
                              subMenu?.link?.split("/").slice(-1)[0]
                                ? "bold"
                                : 500,
                          }}
                          className="px-2 mx-2"
                          color={
                            window.location.pathname.split("/").slice(-1)[0] ==
                              subMenu?.link?.split("/").slice(-1)[0] &&
                            sideBarThemes[theme].menu.active.subMenuForeground
                          }
                        >
                          {subMenu.name}
                        </Typography>
                      </MenuItem>
                    )}
                  />
                </SubMenu>
              ) : (
                <MenuItem
                  active={
                    window.location.pathname.split("/")[2] ==
                    item?.link?.split("/")[2]
                  }
                  key={i}
                  onClick={() => handleNavigation(item)}
                  style={{
                    color:
                      window.location.pathname.split("/")[2] ==
                        item?.link?.split("/")[2] &&
                      sideBarThemes[theme].menu.active.foreground,
                  }}
                  icon={
                    <Box
                      style={{
                        fontSize: "18px !important",
                        color: isMainMenuActive(item?.link, 2)
                          ? sideBarThemes[theme].menu.active.foreground
                          : sideBarThemes[theme].menu?.inactive?.foreground,
                      }}
                      className="menu-icon"
                    >
                      {item?.icon}
                    </Box>
                  }
                >
                  <Typography
                    variant="bold"
                    className="px-2"
                    sx={{ fontWeight: 600, fontSize: "15px" }}
                    color={
                      window.location.pathname.split("/")[2] ==
                        item?.link?.split("/")[2] &&
                      sideBarThemes[theme].menu?.active?.foreground
                    }
                  >
                    {item.name}
                  </Typography>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </Sidebar>
    </Box>
  );
}
