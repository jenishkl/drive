import React from "react";
import { Dropdown } from "react-bootstrap";
import {
  Box,
  Tooltip,
  TextField,
  ClickAwayListener,
  Typography,
  Card,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

function RecursiveDropdown({ data, onSelect, index }) {
  const theme = useTheme();
  return (
    <Dropdown
      className="w-100 cascade-menu-container"
      drop="end"
      id={index}
      color={theme?.palette?.secondary?.textColor}
    >
      <Dropdown.Toggle
        as="div"
        style={{ cursor: "pointer" }}
        className="cascade-menu"
        onClickCapture={() => onSelect(data)}
      >
        <Typography variant="bold" size="small">
          {data?.label}
          <IconButton>
            <IoMdArrowDropright />
          </IconButton>
        </Typography>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {data?.children?.map((child, index) =>
          child?.children ? (
            <RecursiveDropdown data={child} onSelect={onSelect} index={index} />
          ) : (
            <Dropdown.Item
              key={index}
              onClick={() => onSelect(child)}
              className="cascade-menu"
            >
              <Typography variant="bold" size="small">
                {child?.label}
              </Typography>
            </Dropdown.Item>
          )
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function CommonCascader({ options, onSelect, inputValue = "Select" }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box className="w-100">
        <Tooltip
          title={
            <Box>
              {options?.map((option, index) => (
                <RecursiveDropdown
                  key={option.value}
                  data={option}
                  onSelect={onSelect}
                  index={index}
                />
              ))}
            </Box>
          }
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          interactive
        >
          <Button
            className="mui-date-small"
            value={inputValue}
            onClick={() => setOpen(!open)}
            sx={{ width: "150px" }}
            fullWidth
            variant=""
            endIcon={
              <IconButton>
                <IoMdArrowDropdown />
              </IconButton>
            }
          >
            <Typography variant="bold" size="small">
              {inputValue}
            </Typography>
          </Button>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
}

export default CommonCascader;
