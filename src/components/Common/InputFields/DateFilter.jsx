import { Box, Button, ClickAwayListener, Tooltip } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { DateRange, DefinedRange } from "react-date-range";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function DateFilter({ onChange }) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleChange = (val) => {
    console.log("val", val);
    setDateRange([
      {
        ...val.selection,
        startDate: dayjs(val.selection?.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(val.selection?.endDate).format("YYYY-MM-DD"),
      },
    ]);
    onChange({
      ...val.selection,
      startDate: dayjs(val.selection?.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(val.selection?.endDate).format("YYYY-MM-DD"),
    });
  };
  console.log("dateRange", dateRange);
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box className="w-100">
        <Tooltip
          open={open}
          title={
            <Box className="d-flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DefinedRange
                  ranges={dateRange}
                  onChange={(item) => handleChange(item)}
                />
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => handleChange(item)}
                  moveRangeOnFirstSelection={true}
                  ranges={dateRange}
                  dragSelectionEnabled={true}
                  showSelectionPreview={true}
                  // months={2}
                  // direction="horizontal"
                />
              </LocalizationProvider>
            </Box>
          }
        >
          <Button
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            sx={{
              borderColor: "darkgray",
              color: "#000",
              "&:hover": {
                borderColor: "ActiveBorder",
              },
              width: "100%",
            }}
            onClick={() => setOpen(!open)}
          >
            Modified By
          </Button>{" "}
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
}
