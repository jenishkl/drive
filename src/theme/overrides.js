"use client";
import { createTheme } from "@mui/material";

let theme = createTheme();
const fontWeight = (variant) => {
  switch (variant) {
    case "bold":
      return 600;
    case "light":
      return 500;
  }
};

const fontSize = (size) => {
  switch (size) {
    case "xlsmall":
      return {
        [theme.breakpoints.up("md")]: { fontSize: "12px" },
        [theme.breakpoints.down("md")]: { fontSize: "8px" },
      };
    case "vsmall":
      return {
        [theme.breakpoints.up("md")]: { fontSize: "13px" },
        [theme.breakpoints.down("md")]: { fontSize: "9px" },
      };
    case "small":
      return {
        [theme.breakpoints.up("md")]: { fontSize: "14px" },
        [theme.breakpoints.down("md")]: { fontSize: "10px" },
      };
    case "medium":
      return {
        [theme.breakpoints.up("md")]: { fontSize: "16px" },
        [theme.breakpoints.down("md")]: { fontSize: "14px" },
      };
    case "high":
      return {
        [theme.breakpoints.up("md")]: { fontSize: "18px" },
        [theme.breakpoints.down("md")]: { fontSize: "16px" },
      };
    case "large":
      return {
        [theme.breakpoints.up("md")]: { fontSize: "20px" },
        [theme.breakpoints.down("md")]: { fontSize: "18px" },
      };
  }
};

export function overrides(th, thM) {
  const { palette } = th;
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          // fontFamily: "Mont",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
          // background:palette.common[thM]
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        //   input: {
        //     '&[type=number]': {
        //       MozAppearance: 'textfield',
        //       '&::-webkit-outer-spin-button': {
        //         margin: 0,
        //         WebkitAppearance: 'none',
        //       },
        //       '&::-webkit-inner-spin-button': {
        //         margin: 0,
        //         WebkitAppearance: 'none',
        //       },
        //     },
        //   },
        //   img: {
        //     maxWidth: '100%',
        //     display: 'inline-block',
        //     verticalAlign: 'bottom',
        //   },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: `${palette.dialog[thM]} !important`,
          borderRadius: "4px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "18px !important",
          fontWeight: "600 !important",
        },
      },
    },

    MuiPaper: {
      variants: [
        {
          props: { variant: "header" },
          style: {
            borderTop: "unset",
            borderRight: "unset",
            borderLeft: "unset",
          },
        },
      ],
      variants: [
        {
          props: { variant: "secondary" },
          style: {
            borderTop: "unset",
            borderRight: "unset",
            borderLeft: "unset",
            background: theme?.palette?.secondary?.header,
          },
        },
      ],
      styleOverrides: {
        root: {
          border: palette?.border.paper[thM],
          zIndex: 2,
          borderRadius: "unset",
          // boxShadow: "none",
          boxShadow: "0px 3px 4px 0px #00000008",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid var(--Input-Box-Stroke-Colour, #CFCFCF)",
          boxShadow: "0px 3px 4px 0px #00000008",
          borderRadius: "5px",
          zIndex: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: palette.primary.dark,
        },
      },
    },
    MuiTabs: {
      variants: [
        {
          props: { variant: "eclipse" },
          style: {
            padding: "0px !important",
            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
            borderRadius: "50px",
            minHeight: "34px !important",
            fontSize: "16px !important",
            background: palette.card[thM],
            ".Mui-selected ": {
              backgroundColor: "#DFE6FF; !important",
              borderRadius: "50px",
            },
            ".Mui-selected span": {
              background: "none",
              position: "absolute",
            },
          },
        },
        {
          props: { variant: "rounded" },
          style: {
            padding: "5px",
            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.15)",
            borderRadius: "50px",
            minHeight: "34px !important",
            fontSize: "16px !important",
            background: palette?.tab?.background,
            ".Mui-selected ": {
              backgroundColor: "#0038ff; !important",
              borderRadius: "50px",
            },
            ".Mui-selected span": {
              background: "none",
              position: "absolute",
              color: "#FFFFFF",
            },
          },
        },
        {
          props: { type: "secondary" },
          style: {
            // background: "#F6F6F6",
          },
        },
      ],
      styleOverrides: {
        root: {
          fontFamily: "Montserrat !important",
        },
      },
    },
    MuiGrid: {
      variants: [
        {
          props: { variant: "with-card" },
          style: {
            background: palette.primary?.background2,
            height: "100%",
          },
        },
      ],
    },
    MuiTab: {
      variants: [
        {
          props: { variant: "eclipse" },
          style: {
            borderRadius: "50px",
            fontSize: "16px !important",
            fontWeight: "500 !important",
            minHeight: "34px !important",
            "&.Mui-selected": {
              fontWeight: "600 !important",
              color: "#000",
            },
          },
        },
        {
          props: { variant: "rounded" },
          style: {
            borderRadius: "50px",
            fontSize: "16px !important",
            fontWeight: "500 !important",
            minHeight: "34px !important",
            "&.Mui-selected": {
              fontWeight: "600 !important",
              color: "#fff",
            },
          },
        },
        {
          props: { type: "secondary" },
          style: {
            fontSize: "16px !important",
            fontWeight: "500 !important",
            // borderRight: "1px solid grey  !important",
            borderRight: "1px solid lightgray !important",
            "&.Mui-selected": {
              fontWeight: "600 !important",
              color: palette.secondary.textColor,
              // borderRight: "1px solid black  !important",
            },
          },
        },
        {
          props: { color: "primary" },
          style: {
            "&.Mui-selected": {
              fontWeight: "600 !important",
              color: palette.primary.main,
            },
          },
        },
      ],
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...fontSize(ownerState.size),
          display: "grid",
          fontFamily: "Montserrat !important",
          fontWeight: "600 !important",
          // alignItems:"flex-start",
          color: palette.invert[thM],
          textTransform: "unset",
          // justifyContent: "flex-start",
          "&.Mui-selected": {
            fontWeight: "600 !important",
            // color: palette.invert[thM],
          },
        }),
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          zIndex: 1,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // "&.MuiChip-label": {
          //   color: `${palette.invert[thM]} important`,
          // },
          // background: "#262626",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          lineHeight: "1.45rem",
          "& .MuiInputBase-input::placeholder": {
            fontSize: "13px",
            fontWeight: 600,
            fontColor: "#808080",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: "14px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: "600",
          fontSize: "12px",
        },
      },
    },
    // MuiOutlinedInput:{
    //   styleOverrides:{
    //     root:{
    //       '&:hover fieldset': {
    //         borderColor: '#C4C4C4 !important',
    //         outline:"none !important"
    //       },
    //       // "&:hover":{
    //       //   borderColor: 'white !important',
    //       //   outline:"none !important"
    //       // }
    //     }
    //   }
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          position: "relative",
          textTransform: "unset !important",
        },
      },
      variants: [
        {
          props: { size: "small" },
          style: {
            padding: "0px 5px !important",
            fontSize: "14px !important",
            textTransform: "unset",
            // height:"22px"
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderColor: "darkgrey",
            // height:"22px"
          },
        },
        {
          props: { variant: "orange" },
          style: {
            background: "#FA7B17",
            color: "#fff",
            "&:hover": {
              background: "#df8741",
            },
          },
        },
        {
          props: { variant: "iconBtn" },
          style: {
            color: "#fff",
          },
        },
        {
          props: { variant: "contained", size: "small" },
          style: {
            background: "#0038FF",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "5px",
            height: "35px",
            padding: "4px 5px !important",
            textTransform: "unset",

            // lineHeight: "normal",
            "&::after": {
              backgroundColor: "#2552ec",
            },
            "&:hover": {
              color: "#fff",
            },
          },
        },
        {
          props: { variant: "save" },
          style: {
            background: "#0038FF",
            fontSize: "14px !important",
            fontWeight: "600",
            borderRadius: "5px",
            minWidth: "100px",

            // height: "43px",
            color: "white",
            padding: "4px 5px !important",
            textTransform: "unset",
            boxShadow: "none !important",
            transition: "all 0.3s ease",
            zIndex: 0,
            "&::after": {
              position: "absolute",
              content: '""',
              width: 0,
              height: "100%",
              top: 0,
              right: 0,
              zIndex: -1,
              borderRadius: "5px",
              backgroundColor: "#2552ec",
              boxShadow:
                "inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            },

            "&:hover:after": {
              left: 0,
              width: "100%",
            },
            // lineHeight: "normal",

            "&:hover": {
              color: "#fff",
              backgroundColor: "#0038FF",
            },
          },
        },

        {
          props: { variant: "cancel" },
          style: {
            // background: "#0038FF",
            background: "#e0e6ff",
            color: "#000",
            fontSize: "14px",
            fontWeight: "600",
            padding: "4px 5px !important",
            borderRadius: "5px",
            minWidth: "100px",
            // boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
            border: "1px solid #e3e9ff !important",
            textTransform: "unset",
            boxShadow: "none !important",
            transition: "all 0.3s ease",
            zIndex: 0,
            "&::after": {
              position: "absolute",
              content: '""',
              width: 0,
              height: "100%",
              top: 0,
              right: 0,
              zIndex: -1,
              borderRadius: "5px",
              backgroundColor: "#e3e9ff",
              boxShadow:
                "inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            },

            "&:hover:after": {
              left: 0,
              width: "100%",
            },
            // lineHeight: "normal",

            "&:hover": {
              color: "#000",
              background: "#e3e9ff",
            },
          },
        },
        {
          props: { variant: "rounded" },
          style: {
            // background: "#0038FF",
            background: "#e0e6ff",
            color: "#000",
            fontSize: "14px",
            fontWeight: "600",
            padding: "4px 5px !important",
            borderRadius: "20px",
            minWidth: "100px",
            // boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
            border: "1px solid #e3e9ff !important",
            textTransform: "unset",
            boxShadow: "none !important",
            transition: "all 0.3s ease",
            zIndex: 0,
            "&::after": {
              position: "absolute",
              content: '""',
              width: 0,
              height: "100%",
              top: 0,
              right: 0,
              zIndex: -1,
              borderRadius: "20px",
              backgroundColor: "#e3e9ff",
              boxShadow:
                "inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            },

            "&:hover:after": {
              left: 0,
              width: "100%",
            },
            // lineHeight: "normal",

            "&:hover": {
              color: "#000",
              background: "#e3e9ff",
            },
          },
        },
        {
          props: { variant: "nonebg" },
          style: {
            background: "#fff",
            color: "#000",
            fontSize: "16px",
            fontWeight: "500",
            height: "35px",
            borderRadius: "5px",
            border: "1px solid #e3e9ff !important",
            // boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25) !important",
            textTransform: "unset",
            // lineHeight: "normal",
            "&::after": {
              backgroundColor: "lightgrey",
            },
            "&:hover": {
              color: "#000",
            },
          },
        },
        {
          props: { variant: "edit" },
          style: {
            background: "#0038FF",
            fontSize: "14px !important",
            fontWeight: "500",
            borderRadius: "5px",
            height: "30px",
            color: "white",
            padding: "4px 5px !important",
            textTransform: "unset",
            boxShadow: "none !important",
            transition: "all 0.3s ease",
            zIndex: 0,
            "&::after": {
              position: "absolute",
              content: '""',
              width: 0,
              height: "100%",
              top: 0,
              right: 0,
              zIndex: -1,
              borderRadius: "5px",
              backgroundColor: "#2552ec",
              boxShadow:
                "inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            },

            "&:hover:after": {
              left: 0,
              width: "100%",
            },
            // lineHeight: "normal",

            "&:hover": {
              color: "#fff",
              backgroundColor: "#0038FF",
            },
          },
        },
        {
          props: { variant: "action" },
          style: {
            padding: "0px 5px !important",
            fontSize: "14px !important",
            textTransform: "unset",
            minWidth: "100px",
            boxShadow:
              "inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)",
            // transition: "all 0.3s ease",

            // height:"22px"
          },
        },
        {
          props: {
            variant: "tictak",
          },
          style: ({ ownerState: { backgroundColor } }) => ({
            background: `${backgroundColor} !important`,
            color: "white",
            padding: "0px 10px !important",
            borderRadius: "19px ",
            maxWidth: "fit-content",
            // minHeight:"10px !important"
          }),
        },
        {
          props: { variant: "secondary" },
          style: {
            // background: "#0038FF",
            background: "#858585",
            color: "#fff",
            fontSize: "13px !important",
            fontWeight: "500",
            padding: "4px 5px !important",
            borderRadius: "5px",
            minWidth: "100px",
            // boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
            // border: "1px solid #858585 !important",
            textTransform: "unset",
            boxShadow: "none !important",
            transition: "all 0.3s ease",
            zIndex: 0,
            "&::after": {
              position: "absolute",
              content: '""',
              width: 0,
              height: "100%",
              top: 0,
              right: 0,
              zIndex: -1,
              borderRadius: "5px",
              backgroundColor: "#6c6c6c",
              boxShadow:
                "inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            },

            "&:hover:after": {
              left: 0,
              width: "100%",
            },
            // lineHeight: "normal",

            "&:hover": {
              color: "#fff",
              background: "#6c6c6c",
            },
          },
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { size: "large" },
          style: ({ ownerState: { variant } }) => ({
            // fontSize: "20px",
            [theme.breakpoints.up("md")]: { fontSize: "20px" },
            [theme.breakpoints.down("md")]: { fontSize: "17px" },
            [theme.breakpoints.down("sm")]: { fontSize: "14px" },
            fontWeight: fontWeight(variant),
          }),
        },
        {
          props: { size: "high" },
          style: ({ ownerState: { variant } }) => {
            return {
              [theme.breakpoints.up("md")]: { fontSize: "18px" },
              [theme.breakpoints.down("md")]: { fontSize: "15px" },
              [theme.breakpoints.down("sm")]: { fontSize: "12px" },
              fontWeight: fontWeight(variant),
            };
          },
        },

        {
          props: { size: "medium" },
          style: ({ ownerState: { variant } }) => ({
            [theme.breakpoints.up("md")]: { fontSize: "16px" },
            [theme.breakpoints.down("md")]: { fontSize: "13px" },
            [theme.breakpoints.down("sm")]: { fontSize: "10px" },
            fontWeight: fontWeight(variant),
          }),
        },

        {
          props: { size: "small" },
          style: ({ ownerState: { variant } }) => ({
            [theme.breakpoints.up("md")]: { fontSize: "14px" },
            [theme.breakpoints.down("md")]: { fontSize: "11px" },
            [theme.breakpoints.down("sm")]: { fontSize: "8px" },
            fontWeight: fontWeight(variant),
          }),
        },

        {
          props: { size: "vsmall" },
          style: ({ ownerState: { variant } }) => ({
            [theme.breakpoints.up("md")]: { fontSize: "12px" },
            [theme.breakpoints.down("md")]: { fontSize: "10px" },
            fontWeight: fontWeight(variant),
          }),
        },
        {
          props: { size: "xlsmall" },
          style: ({ ownerState: { variant } }) => ({
            [theme.breakpoints.up("md")]: { fontSize: "10px" },
            [theme.breakpoints.down("md")]: { fontSize: "9px" },
            fontWeight: fontWeight(variant),
          }),
        },
      ],
      styleOverrides: {
        root: {
          color: palette.invert[thM],
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "white",
          "&::before": {
            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.15)",
          },
        },
        tooltip: {
          background: "white",
          boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.15)",
          maxWidth: "max-content",
          minWidth: "max-content",
          color: "black",
          zIndex: "10 !important",
          padding: 0,
        },
      },
    },
    // MuiDateCalendar: {
    //   styleOverrides: {
    //     root: {
    //       zIndex: 3000,
    //       "&.MuiPickersPopper-root": {
    //         zIndex: "3000 !important",
    //       },
    //     },
    //   },
    // },
    // MuiPickersLayout: {
    //   styleOverrides: {
    //     root: {
    //       marginTop: "50px",
    //       position: "fixed",
    //     },
    //   },
    // },
    MuiBadge: {
      variants: [
        // {
        //   props:{color:"error"},
        //   style:{
        //     color:"black"
        //   }
        // }
      ],
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette?.secondary.textColor,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
  };
}
