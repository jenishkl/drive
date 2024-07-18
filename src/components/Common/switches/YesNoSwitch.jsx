import { Stack, Switch, Typography } from "@mui/material";
import React from "react";

export default function YesNoSwitch() {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Off</Typography>
        <Switch defaultChecked inputProps={{ "aria-label":'Switch demo'}} />
        <Typography>On</Typography>
      </Stack>
    </>
  );
}
