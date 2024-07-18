"use client";
import React, { useContext, useMemo, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { SidebarHeader, StyledLogo } from './SideBarHeader'
import {
  Box,
  Button,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { CiFileOn } from "react-icons/ci";
import styled from "@emotion/styled";
// import { menuClasses } from "../../helpers/utils";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { sideBarThemes } from "../../theme/sidebarTheme";
import { SidebarHeader } from "../Headers/SideBarHeader";
import _, { get } from "lodash";
import { GlobalContext } from "../GlobalContextProvider";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArchiveIcon from "@mui/icons-material/Archive";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import TopicIcon from "@mui/icons-material/Topic";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePathname } from "next/navigation";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { TiCloudStorageOutline, TiHomeOutline } from "react-icons/ti";
import { PiFolderUserBold } from "react-icons/pi";
import { MdOutlineArchive } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import CreateNew from "@/components/Drive/CreateNew";
import { CiFolderOn } from "react-icons/ci";
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

export default function MainSideBar({
  grand_folder_details,
  drive,
  folder_id,
}) {
  const {
    sideBarOpen,
    setSideBarOpen,
    themeMode: theme,
    setThemeMode,
  } = useContext(GlobalContext) || {};
  // hex to rgba converter
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const pathName = usePathname();
  let module = pathName?.split("/")[1];
  const { toggle, setToggle, collapsed, setCollapsed, broken, setBroken } =
    useContext(GlobalContext) || {};
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
      backgroundColor: sideBarThemes[theme]?.menu?.subMenuContainer?.background,
    }),
    button: {
      // paddingLeft: "7px !important",
      [`&.${menuClasses.disabled}`]: {
        color: sideBarThemes[theme]?.menu?.color,
      },
      [`&.${menuClasses.active}`]: {
        background: sideBarThemes[theme]?.menu?.active?.background,
        color: "000 !important",
        "&:hover": {
          backgroundColor: sideBarThemes[theme]?.menu?.active?.background,
          color: "#0000",
        },
      },
      "&:hover": {
        backgroundColor: sideBarThemes[theme]?.menu?.hover?.backgroundColor,
        color: "#0000",
      },
      alignItems: "center",
    },

    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
      marginTop: "6px",
    }),
  };
  const StyledLogo = styled.div`
    width: 20px;
    min-width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const is_active = (m) => {
    if (module == m) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Sidebar
        collapsed={sideBarOpen}
        // breakPoint={"900px"}
        // toggled={true}
        backgroundColor={sideBarThemes[theme]?.sidebar?.backgroundColor}
        rootStyles={{
          color: sideBarThemes[theme]?.sidebar?.color,
          border: "none",
          zIndex: "1000",
          overflow: "unset !important",
          transition: "ease-in-out 0.5s",
          borderRight: "1px solid rgb(223, 223, 223)",
          background: "#000",
        }}
      >
        {/* <SidebarHeader /> */}
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          my={2}
        >
          <CreateNew
            drive={drive}
            folder_id={folder_id}
            grand_folder_details={grand_folder_details}
          />
        </Stack>

        <Box height={"90vh"} overflow={"auto"}>
          <Menu
            menuItemStyles={menuItemStyles}
            style={{ gap: "89px" }}
            transitionDuration={500}
            closeOnClick={true}
          >
            <MenuItem
              icon={<TiHomeOutline />}
              style={{
                color: is_active("home")
                  ? "#fff"
                  : sideBarThemes[theme]?.menu?.color,
              }}
              component={<Link href="/home" />}
              active={module == "home"}
            >
              {" "}
              Home
            </MenuItem>
            <MenuItem
              icon={<PiFolderUserBold />}
              style={{
                color: is_active("my-drive")
                  ? "#fff"
                  : sideBarThemes[theme]?.menu?.color,
              }}
              component={<Link href="/my-drive" />}
              active={module == "my-drive"}
            >
              {" "}
              My Drive
            </MenuItem>
            <MenuItem
              icon={<CiFolderOn />}
              style={{
                color: is_active("work-drive")
                  ? "#fff"
                  : sideBarThemes[theme]?.menu?.color,
              }}
              component={<Link href="/work-drive" />}
              active={module == "work-drive"}
            >
              {" "}
              Work Drive
            </MenuItem>
            <MenuItem
              icon={<IoPeopleOutline />}
              style={{
                color: is_active("shared-files")
                  ? "#fff"
                  : sideBarThemes[theme]?.menu?.color,
              }}
              component={<Link href="/shared-files" />}
              active={module == "shared-files"}
            >
              {" "}
              Shared With Me
            </MenuItem>
            <MenuItem
              icon={<CiFileOn />}
              style={{
                color: is_active("file-request")
                  ? "#fff"
                  : sideBarThemes[theme]?.menu?.color,
              }}
              component={<Link href="/file-request" />}
              active={module == "file-request"}
            >
              {" "}
              File Request
            </MenuItem>
            {/* <MenuItem
              icon={<MdOutlineArchive />}
              style={{
                color: is_active("archived")
                  ? "#fff"
                  : sideBarThemes[theme]?.menu?.color,
              }}
              component={<Link href="/archived" />}
              active={module == "archived"}
            >
              {" "}
              Archived
            </MenuItem> */}
            <MenuItem
              icon={<RiDeleteBin6Line />}
              style={{
                color: is_active("bin")
                  ? "#fff"
                  : sideBarThemes[theme]?.menu?.color,
              }}
              component={<Link href="/bin" />}
              active={module == "bin"}
            >
              Bin
            </MenuItem>
            <MenuItem
              icon={<TiCloudStorageOutline />}
              style={{
                color: is_active("storage")
                  ? "#fff"
                  : sideBarThemes[theme]?.menu?.color,
              }}
              component={<Link href="/storage" />}
              active={module == "storage"}
            >
              Storage
            </MenuItem>
          </Menu>
        </Box>
      </Sidebar>
    </>
  );
}
