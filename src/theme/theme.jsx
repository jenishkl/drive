import { createTheme } from "@mui/material/styles";

// import { createTheme } from "@mui/material";
let theme = createTheme();
export const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0038FF",
    },
    secondary: {
      main: "#0038FF",
    },
    invertX: {
      main: "black",
    },
    invertY: {
      main: "white",
    },
    text: {
      primary: "#000000",
      fontFamily: "Montserrat",
    },
    background: {
      paper: "#ffffff",
      // default: "#ffffff",
    },
    typography: {
      fontFamily: "Montserrat !important",
      fontColor: "#000",
    },
  },
  typography: {
    fontFamily: "Montserrat !important",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
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
        root: {
          background: "#222222",
        },
        paper: {},
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "red",
          background: "red",
        },
        tooltip: {
          background: "white",
          boxShadow: [1],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "16px",
        },
      },
    },
    MuiTabs: {
      variants: [
        {
          props: { variant: "eclipse" },
          style: {
            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
            borderRadius: "50px",
            "": {
              backgroundColor: "#DFE6FF; !important",
              borderRadius: "50px",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontFamily: "Montserrat !important",
        },
      },
    },
    MuiTab: {
      variants: [
        {
          props: { variant: "eclipse" },
          style: {
            borderRadius: "50px",
          },
        },
      ],
      styleOverrides: {
        root: {
          fontFamily: "Montserrat !important",
          fontWeight: "600",
          color: "#000",
          textTransform: "unset",
          fontSize: "18px !important",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", size: "small" },

          style: {
            background: "#0038FF",
            fontSize: "18px",
            fontWeight: "500",
            borderRadius: "5px",
            height: "35px",
            textTransform: "unset",
            // lineHeight: "normal",
          },
        },
        {
          props: { variant: "save" },
          style: {
            background: "#0038FF",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "5px",
            minWidth: "130px",
            // height: "43px",
            color: "white",
            textTransform: "unset",
            // lineHeight: "normal",
            ":hover": {
              background: "#0038FF",
            },
          },
        },
        {
          props: { variant: "cancel" },
          style: {
            // background: "#0038FF",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "5px",
            minWidth: "130px",
            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
            textTransform: "unset",
            // lineHeight: "normal",
          },
        },
        {
          props: { variant: "nonebg" },
          style: {
            // background: "#0038FF",
            color: "#000",
            fontSize: "16px",
            fontWeight: "500",
            height: "35px",
            borderRadius: "5px",
            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
            textTransform: "unset",
            // lineHeight: "normal",
          },
        },
      ],
    },
    MuiPopover: {},
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          "$.MuiSelect": "",
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "bold", size: "large" },

          style: {
            fontSize: "20px",
            [theme.breakpoints.down("md")]: { fontSize: "15px" },
            fontWeight: "600",
          },
        },
        {
          props: { variant: "light", size: "large" },
          style: {
            fontSize: "20px",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "bold", size: "high" },
          style: {
            fontSize: "18px",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "light", size: "high" },
          style: {
            fontSize: "18px",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "bold", size: "medium" },
          style: {
            fontSize: "16px",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "light", size: "medium" },
          style: {
            fontSize: "16px",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "bold", size: "small" },
          style: {
            fontSize: "14px",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "light", size: "small" },
          style: {
            fontSize: "14px",
            fontWeight: "500",
          },
        },
      ],
      styleOverrides: {
        root: {
          color: "#000",
        },
      },
      // styleOverrides: {
      //   root: ({ ownerState }) => ({
      //     ...(ownerState.variant === "medium"
      //       ? {
      //           fontSize: "18px",
      //           fontWeight: "700",
      //         }
      //       : ownerState.variant === "small"
      //       ? {
      //           fontSize: "14px",
      //           fontWeight: "500",
      //           color: "#000",
      //         }
      //       : ownerState.variant === "high"
      //       ? {
      //           fontSize: "20px",
      //           fontWeight: "600",
      //         }
      //       : ownerState.variant === "normal"
      //       ? {
      //           fontSize: "16px",
      //           fontWeight: "500",
      //         }
      //       : ownerState.variant === "xs"
      //       ? {
      //           fontSize: "12px",
      //           fontWeight: "500",
      //         }
      //       : ""),
      //   }),
      // },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => ({
    //       ...(ownerState.variant !== "primaryy"
    //         ? {
    //             background: "none",
    //             border: "none !important",
    //             borderRadius: 3,
    //             textTransform: "unset",
    //             // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    //             color: "black",
    //             // height: 48,
    //             fontSize: "17px",
    //             // boxShadow: " 0px 0px 4px 0px #00000040",
    //           }
    //         : ""),
    //     }),
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
  },
});
