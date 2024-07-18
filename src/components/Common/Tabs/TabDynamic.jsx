'use client'
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

export default function TabDynamic({
  tablist,
  handleChange,
  value,
  size = "high",
  type,
  indicatorColor,
  identifier = "value",
}) {
  return (
    <Box width={"100%"}>
      <Tabs
        value={
          typeof value == "string"
            ? value?.toLowerCase().replaceAll(" ", "-")
            : value
        }
        onChange={handleChange}
        // textColor="#ffff"
        type={type}
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons="auto"
        indicatorColor={indicatorColor ? "primary" : ""}
      >
        {tablist?.map((item, index) => {
          return (
            <Tab
              key={index}
              variant="primary"
              type={type}
              size={size}
              sx={{ textTransform: "unset !important" }}
              // value={typeof(item?.[identifier]) =='string'? (item?.[identifier]).toLowerCase().replaceAll(" ", "-"):item?.[identifier]}
              value={
                item?.[identifier] ??
                (item?.name).toLowerCase().replaceAll(" ", "-")
              }
              label={item?.name}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
