import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function DougnutChart(props) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    // if (true) {
    //   setInterval(() => {
        setValue(props.value);
    
    //   }, 1000);
    // }
  }, []);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" size={"100px"} value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="bold" size="medium" component="div">{`${Math.round(
          props?.points
        )}`}</Typography>
      </Box>
    </Box>
  );
}
