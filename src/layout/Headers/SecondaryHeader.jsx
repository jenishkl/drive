import { Box, Tabs, Tab, Typography, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Each } from "../../helpers/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import SkeletonCaseCard from "../../pages/cases/essential/caseId/caseDetails/SkeletonCaseCard";

export default function SecondaryHeader({
  data,
  active,
  setState,
  subModule,
  compareValue,
  valueKey = "nav",
  size,
  tableFormat = null,
  variant,
  position = "sticky",
  top = "117px",
  height = "max-content",
  zIndex = 5,
  url = false,
  onClick = () => {},
  RightSideComponent = () => {},
  loading,
  btn_height = "55px",
  secondary = true,
  minWidth = "55px",
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleChange = (e, v) => {
    if (url) {
      var dt = data?.find((item) => item[valueKey] == v);
      setState(v);
      navigate(dt?.url);
    } else {
      setState(v);
    }
  };
  useEffect(() => {
    if (url && pathname && secondary) {
      const pathSegment = pathname.split("/")[3];
      if (pathSegment) {
        const item = data?.find((item) => item.url?.includes(pathSegment));
        if (item) {
          setState(item[valueKey]);
        }
      }
    }
  }, [pathname, url, data]);
  const theme = useTheme();
  return (
    <Card
      className={`${
        tableFormat && theme?.palette?.mode == "light" && "table-modal-header"
      } d-flex justify-content-between align-items-center w-100 mobile-buttons border-color `}
      sx={{
        boxShadow: "none",
        borderTop: "none",
        borderLeft: "none",
        borderRadius: 0,
        position: { position },
        top: { top },
        height: { height },
        zIndex: { zIndex },
      }}
    >
      {loading ? (
        <SkeletonCaseCard SkeleFor={7} />
      ) : (
        <Tabs
          value={active}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor={tableFormat && "primary"}
          allowScrollButtonsMobile
        >
          {data.map((item, index) => {
            if (!item[compareValue] || item?.[compareValue] == subModule) {
              return (
                <Tab
                  style={{ height: tableFormat ? btn_height : "50px" }}
                  variant={variant}
                  onClick={onClick}
                  size={size}
                  sx={{
                    textTransform: "unset !important",
                    minWidth: { minWidth },
                  }}
                  value={
                    valueKey == "index" ? index : item[valueKey] ?? item?.name
                  }
                  label={item?.name}
                  className={`${tableFormat && "right-border"} header-pad`}
                ></Tab>
              );
            }
            return null;
          })}
        </Tabs>
      )}
      <RightSideComponent />
    </Card>
  );
}
