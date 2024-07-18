import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box } from "@mui/material";
export default function PagePricePopOver({ data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <VisibilityIcon />
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {!data?.[0] && <Typography m={2}>Plaese Add pages</Typography>}
        {data?.map((item) => {
          return (
            <>
              <Box display={"flex"} p={2}>
                <Typography>
                  {item.start_page}-{item?.end_page}
                </Typography>
                <Typography>{item.std_price}</Typography>
                <Typography>{item.exp_price}</Typography>
              </Box>
            </>
          );
        })}
      </Popover>
    </div>
  );
}
