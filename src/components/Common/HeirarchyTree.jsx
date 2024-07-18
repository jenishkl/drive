import * as React from "react";
import Box from "@mui/material/Box";
import { useSpring, animated } from "@react-spring/web";
import SvgIcon from "@mui/material/SvgIcon";
import Collapse from "@mui/material/Collapse";
import { alpha, styled } from "@mui/material/styles";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { PiMinusSquare } from "react-icons/pi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Typography } from "@mui/material";

function MinusSquare(props) {
  return (
    <Typography component={"h5"} variant="small" className="m-0">
      <PiMinusSquare size={20} />
    </Typography>
  );
}

function PlusSquare(props) {
  return (
    <Typography component={"h5"} variant="small" className="m-0">
      <CgAddR size={19} />
    </Typography>
  );
}

function CloseSquare(props) {
  return (
    <Typography component={"h5"} variant="small" className="m-0">
      {/* <AiOutlineCloseSquare size={20} /> */}
    </Typography>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const CustomTreeItem = React.forwardRef((props, ref) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
));

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      // opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export default function HeirarchyTree(props) {
  const [showOptions, setShowOptions] = useState(false);

  const Label = (item) => (
    <Box className="d-flex align-items-center">
      <Typography
        variant="small"
        component={"p"}
        className="my-0 pointer-hand"
        onClick={() => {
          props.setRoleDetails(item);
          props.setRoleDetailsCopy(item);
          props.setShowRoleDetail(true);
        }}
      >
        {item.name}
      </Typography>
      {console.log("props?.deletePriv", props?.deletePriv, item.id)}
      {item.id == showOptions &&  (
        <Box className="blue-link-text m-0 col d-flex align-items-center font-size-m">
          <RiAddCircleLine
            size={16}
            className="ml-1"
            onClick={() => {
              props.setRoleDetailsCopy(item);
              props.resetState();
              props.handleAddNewRoleModal(true, "New Role");
            }}
          />
          {!props?.deletePriv?.includes(item.id) && <> <i
            className="fas fa-edit px-1"
            onClick={() => {
              props.setRoleDetailsCopy(item);
              props.handleAddNewRoleModal(true, "Edit Role", item);
            }}
          ></i>
            <RiDeleteBin6Line
              size={16}
              className="ml-1"
              onClick={() => {
                props.setRoleDetailsCopy(item);
                props.handleAddNewRoleModal(true, "Delete Role", item);
              }}
            />
          </>}
        </Box>
      )}
    </Box>
  );

  function renderTree(data, parent_role_id) {
    return (
      <Box>
        {data
          .filter((item) => item.parent_role_id === parent_role_id)
          .map((item, index) => (
            <Box
              onMouseLeave={() => setShowOptions(null)}
              className="row w-100 m-auto"
              key={index}
            >
              {data.filter((each) => each.parent_role_id == item.id).length ==
              0 ? (
                <Box className="border-container position-relative px-0">
                  <Box className="border-horizontal"></Box>
                  <StyledTreeItem
                    nodeId={item.id}
                    label={Label(item)}
                    onMouseEnter={() => setShowOptions(item.id)}
                  />
                  <Box
                    className={`${
                      data.filter(
                        (item) => item.parent_role_id === parent_role_id
                      )?.length ==
                      index + 1
                        ? "hide-border"
                        : ""
                    }`}
                  ></Box>
                </Box>
              ) : (
                <Box className="border-container px-0 position-relative">
                  <Box className="border-horizontal ">
                    <Box
                      className={`${
                        data.filter(
                          (item) => item.parent_role_id === parent_role_id
                        )?.length ==
                        index + 1
                          ? "hide-inside-border"
                          : ""
                      }`}
                    ></Box>
                  </Box>

                  <StyledTreeItem
                    key={item.id}
                    onMouseEnter={() => setShowOptions(item.id)}
                    nodeId={item.id}
                    label={Label(item)}
                  >
                    {renderTree(data, item.id)}
                  </StyledTreeItem>
                </Box>
              )}
            </Box>
          ))}
      </Box>
    );
  }
  const rootNodes = props?.data.filter((item) => item.parent_role_id === 0);
  return (
    <Box>
      <TreeView
        aria-label="customized"
        defaultExpanded={["1"]}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<CloseSquare />}
      >
        {rootNodes.map((item, index) => (
          <Box key={index}>
            <StyledTreeItem nodeId={item.id} label={item.name}>
              {renderTree(props.data, item.id)}
            </StyledTreeItem>
          </Box>
        ))}
      </TreeView>
    </Box>
  );
}
