"use client";
import Box from "@mui/material/Box";

import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import * as React from "react";
import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { IconButton, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TTTypography from "../Common/ToolTipComponents/TTTypography";
import Link from "next/link";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useParams, usePathname } from "next/navigation";
import { GlobalContext } from "@/layout/GlobalContextProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HeaderDynamic from "../Common/headers/HeaderDynamic";
import { encriptData, folder } from "@/helpers/utils";
import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { folderRoot } from "@/store/drive/driveActions";
import { driveSelector } from "@/store/drive/driveSlice";
export default function FolderRootView({
  folder_root,
  drive,
  folder_id,
  grand_parent_id,
  grand_folder_details,
}) {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const { tabValue, setTabValue } = React.useContext(GlobalContext)||{};
  const params = useParams();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { folderRootData } = useSelector(driveSelector) || {};
  React.useEffect(() => {
    dispatch(
      folderRoot({ grand_parent_id: grand_folder_details?.id, type: 1 })
    );
  }, []);
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ["1", "5", "6", "7"] : []
    );
  };

  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0
        ? ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        : []
    );
  };
  const FolderData = folder_root;
  console.log("FolderData", FolderData);

  const FolderTree = ({ folder, index: i }) => (
    <TreeItem
      itemId={i + Math.random(19)}
      id={i + "SSS"}
      key={i}
      nodeId={folder?.folder_path}
      label={
        <TTTypography content={folder?.name} variant={"bold"} size={"small"} />
      }
    >
      {folder?.children &&
        folder?.children?.map((subfolder, index) => (
          <FolderTree key={index} folder={subfolder} index={index + i} />
        ))}
    </TreeItem>
  );

  const nestSubModules = (items) => {
    return items.map((item, index, array) => {
      if (index < array.length - 1) {
        return { ...item, subModule: nestSubModules(array.slice(index + 1)) };
      } else {
        return { ...item, subModule: [] };
      }
    });
  };
  const FolderTreeView = ({ FolderDatas = [] }) => {

    return folderRootData?.map((folder, i) => {
      return (
        // i == 0 && (
        <TreeView
          key={i}
          aria-label="customized"
          defaultExpanded={["1"]}
          defaultCollapseIcon={<MdKeyboardArrowDown />}
          defaultExpandIcon={<MdOutlineKeyboardArrowRight />}
        >
          <FolderTree folder={folder} index={i} />
        </TreeView>
        // )
      );
    });
  };
  return (
    <HeaderDynamic
      sticky={true}
      top={"57px"}
      height={"41px"}
      left={
        <Stack direction={"row"} px={1}>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <IconButton
                  variant="nonebg"
                  {...bindTrigger(popupState)}
                  endIcon={<></>}
                >
                  <AccountTreeIcon />
                </IconButton>
                <Menu {...bindMenu(popupState)} sx={{ pr: 1 }}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      maxWidth: 300,
                      pr: 2,
                      maxHeight: "300px",
                    }}
                  >
                    {/* <Box sx={{ mb: 1 }}>
                <Button onClick={handleExpandClick}>
                  {expanded.length === 0 ? "Expand all" : "Collapse all"}
                </Button>
              </Box> */}
                    {/* <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
                multiSelect
              > */}
                    {/* <TreeItem nodeId="0" label="My drive"> */}
                    {/* {folder_root &&
                [...folder_root]?.reverse()?.map((it, i) => {
                  let name = it?.path?.split("/").pop();
                  let id = it?.id;
                  return (
                    <>
                      <TTTypography
                        sx={{ ml: i !== 0 ? i + 2 : 2 }}
                        content={
                          <>
                            <ExpandMoreIcon />
                            {name}
                          </>
                        }
                      />
                    </>
                  );
                })} */}
                    {folderRootData?.[0] && (
                      <FolderTreeView FolderDatas={FolderData} />
                    )}
                    {/* 
                  <TreeItem nodeId="6" label="MUI">
                    <TreeItem nodeId="7" label="src">
                      <TreeItem nodeId="8" label="index.js" />
                      <TreeItem nodeId="9" label="tree-view.js" />
                    </TreeItem> */}
                    {/* </TreeItem> */}
                    {/* </TreeItem> */}
                    {/* </TreeView> */}
                  </Box>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Link
              href={`/${
                ([
                  "my-drive",
                  "home",
                  "work-drive",
                  "shared-files",
                  "file-requests",
                  "archived",
                  "bin",
                ].includes(pathName?.split("/")[1]) &&
                  pathName?.split("/")[1]) ||
                tabValue
              }`}
            >
              <TTTypography
                content={
                  ([
                    "my-drive",
                    "home",
                    "work-drive",
                    "shared-files",
                    "file-requests",
                    "archived",
                    "bin",
                  ].includes(pathName?.split("/")[1]) &&
                    pathName?.split("/")[1]) ||
                  tabValue
                }
                size={"small"}
                variant={"light"}
              />
            </Link>
            <NavigateNextIcon />
            {folder_root &&
              [...folder_root]?.reverse()?.map((it, i) => {
                let name = it?.path?.split("/").pop();
                let id = it?.id;
                return (
                  <>
                    <Link
                      key={i}
                      href={`/drive/${encriptData(folder(id, drive))}/`}
                    >
                      <TTTypography
                        content={name}
                        size={"small"}
                        sx={{
                          color:
                            i == folder_root?.length - 1 && "blue !important",
                        }}
                        variant={"light"}
                      />
                    </Link>
                    {i == folder_root?.length - 1 ? (
                      <KeyboardArrowDownIcon
                        sx={{ color: i == folder_root?.length - 1 && "blue" }}
                      />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </>
                );
              })}
            {/* <Link>
</Link> */}
          </Stack>
        </Stack>
      }
    />
  );
}
