'use client'
import { useContext, useMemo } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import { palette } from "./palette";
import { overrides } from "./overrides";
import { GlobalContext } from "../layout/GlobalContextProvider";

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const { themeMode='light', setThemeMode } = useContext(GlobalContext) || {};

  const memoizedValue = useMemo(
    () => ({
      palette: palette(themeMode),
      mode: themeMode,
      typography: {
        fontFamily:"__Montserrat_dbdb17,__Montserrat_Fallback_dbdb17",
      },
      //   shape: { borderRadius: 8 },
    }),
    [themeMode]
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme, themeMode);

  return (
    <>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
