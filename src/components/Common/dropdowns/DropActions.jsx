import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";

export default function DropActions({ label, menuItems, module }) {
  const N = useNavigate();
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="nonebg" {...bindTrigger(popupState)} endIcon={<></>}>
            Actions
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => N(`/admin/crm/${module}/tags`)}>
              Manage Tags
            </MenuItem>
            <MenuItem onClick={() => N(`/admin/crm/${module}/category`)}>
              Category
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
