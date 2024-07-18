import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
export default function Actions({
  label,
  menuItems,
  endIcon,
  icon = <MoreVertIcon />,
  variant = "nonebg",
  startIcon,
  row = true,
}) {
  const N = useRouter();
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          {!label ? (
            <IconButton {...bindTrigger(popupState)}>{icon}</IconButton>
          ) : (
            <Button
              variant={variant}
              size="small"
              sx={{
                display: "flex",
                flexDirection: row ? "row" : "column",
                height: "50px",
              }}
              {...bindTrigger(popupState)}
              endIcon={<>{endIcon}</>}
            >
              {startIcon}
              {label}
            </Button>
          )}
          <Menu {...bindMenu(popupState)}>
            {menuItems}
            {/* <MenuItem onClick={() => N(`/client/crm/tags`)}>
              Manage Tags
            </MenuItem>
            <MenuItem onClick={() => N(`/client/crm/client-types`)}>
              Client Types
            </MenuItem> */}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
