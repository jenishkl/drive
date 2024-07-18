import {
  Box,
  Button,
  Card,
  ClickAwayListener,
  MenuItem,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { DateRange, DefinedRange } from "react-date-range";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

export default function AddlFilter({ dispatchDate, onChange }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);


  const handleTooltip = () => {
    setOpen(!open);
  };
  

  const handleChange = (val) => {
    setDateRange([val.selection]);
    typeof dispatchDate == "function" && dispatch(dispatchDate(val));
   typeof onChange == "function" &&
     onChange({
       ...val.selection,
       startDate: dayjs(val.selection?.startDate).format("YYYY-MM-DD"),
       endDate: dayjs(val.selection?.endDate).format("YYYY-MM-DD"),
     });
  };
  const resetState = () => {
    setDateRange([{ startDate: new Date(), endDate: null, key: "selection" }]);
    typeof dispatchDate == "function" && dispatch(dispatchDate());
    onChange("");
  };
  const filters = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card className="py-3 px-2">
          <Box className="flex-row-reverse d-flex">
            <Box>
              <Button onClick={resetState} variant="cancel">
                Reset
              </Button>
            </Box>
          </Box>

          <Box className="d-flex align-items-center justify-content-around my-3 date-picker-container">
            <Box className="date-range-bg d-flex">
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
                rangeColors={[theme?.palette?.calender?.hover]}

                // months={2}
                // direction="horizontal"
              />
            </Box>
          </Box>
        </Card>
      </LocalizationProvider>
    );
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box>
          <Tooltip
            title={filters()}
            PopperProps={{}}
            onClose={handleTooltip}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            arrow
          >
            <Box
              sx={{ background: theme.palette.addlfilter.background }}
              className="bg-lightBlue pointer-hand"
              onClick={handleTooltip}
            >
              <IoMdAddCircle
                size={20}
                color={theme.palette.primary.main}
                className="filter-icon ml-1"
              />
              <Typography variant="bold" size="small" className="py-2 px-1">
                Add Filter
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </ClickAwayListener>
    </>
  );
}
