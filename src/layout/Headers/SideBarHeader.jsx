"use client";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { LogoIcon } from "../../helpers/icons";
import { RiMenu2Fill } from "react-icons/ri";
import { useTheme } from "@emotion/react";
import { GlobalContext } from "../GlobalContextProvider";

const StyledSidebarHeader = styled.div`
  min-height: 57px;
  display: flex;
  align-items: center;
  // border-bottom: 1px solid rgb(223, 223, 223);
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.div`
  width: 35px;
  min-width: 35px;
  //   height: 35px;
  //   min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  font-weight: 700;
  //   background-color: blue;
  //   background: blue;
  ${({ rtl = false }) =>
    rtl
      ? `
      margin-left: 10px;
      margin-right: 4px;
      `
      : `
     margin-right:-3px;
      margin-left: 4px;
      `}
`;

export const SidebarHeader = ({ children, rtl, ...rest }) => {
  const theme = useTheme();
  const { themeMode } = useContext(GlobalContext) || {};
  return (
    <Box className="pointer-hand">
      <StyledSidebarHeader {...rest}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <StyledLogo rtl={false}>{LogoIcon(themeMode)}</StyledLogo> */}
          <Box component={"div"} width={"200px"} overflow={"hidden"}>
            <Typography
              component={"div"}
              sx={{ fontFamily: "Jost !important" }}
              width={"200px"}
              variant="subtitle1"
              fontWeight={700}
              fontSize={23}
              ml={1}
              textTransform={"uppercase"}
              color={theme?.palette?.logoColor?.color}
            >
              Drive
            </Typography>
          </Box>
        </div>
      </StyledSidebarHeader>
    </Box>
  );
};
