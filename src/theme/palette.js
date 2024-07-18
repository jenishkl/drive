import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS
const forLight = () => ({
  primary: {
    //   lighter: '#D0ECFE',
    // light: "#0038FF",
    main: "#0038FF",
    dark: "#0038FF",
    background2: "#F1F1F1",
    //   darker: '#042174',
    //   contrastText: '#FFFFFF',
  },
  secondary: {
    //   lighter: '#EFD6FF',
    // light: '#F6F6F6',
    main: "#8E33FF",
    // dark: '#5119B7',
    header: "#f6f6f6",
    textColor: "#000",
    //   darker: '#27097A',
    //   contrastText: '#FFFFFF',
  },
  info: {
    lighter: "#CAFDF5",
    light: "#61F3F3",
    main: "#00B8D9",
    dark: "#006C9C",
    darker: "#003768",
    contrastText: "#FFFFFF",
    vlight: grey[200],
  },

  success: {
    lighter: "#C8FAD6",
    light: "#5BE49B",
    main: "#00A76F",
    dark: "#007867",
    darker: "#004B50",
    contrastText: "#FFFFFF",
  },

  warning: {
    lighter: "#FFF5CC",
    light: "#FFD666",
    main: "#FFAB00",
    dark: "#B76E00",
    darker: "#7A4100",
    contrastText: grey[800],
  },

  error: {
    lighter: "#FFE9D5",
    light: "#FFAC82",
    main: "#FF5630",
    dark: "#B71D18",
    darker: "#7A0916",
    contrastText: "#FFFFFF",
  },

  invert: {
    light: "#000000",
    dark: "#ffff",
  },
  grey: {
    0: "#FFFFFF",
    100: "#F9FAFB",
    200: "#F4F6F8",
    300: "#DFE3E8",
    400: "#C4CDD5",
    500: "#919EAB",
    600: "#637381",
    700: "#454F5B",
    800: "#212B36",
    900: "#161C24",
  },

  common: {
    dark: "#000000",
    light: "#ffff",
  },

  action: {
    hover: alpha(grey[500], 0.08),
    selected: alpha(grey[500], 0.16),
    disabled: alpha(grey[500], 0.8),
    disabledBackground: alpha(grey[500], 0.24),
    focus: alpha(grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  card: {
    light: "#fff",
    dark: "#13171b",
  },
  background: {
    light: "#F1F1F1",
    dark: "#000",
  },
  background1: "#fff",
  background2: "#F1F1F1",
  dialog: {
    light: "#fff",
    dark: "#13171b",
  },
  border: {
    paper: {
      dark: "none",
      light: "1px solid var(--Input-Box-Stroke-Colour, #CFCFCF)",
    },
  },
  smsBox: {
    to: "#FFECE1",
    from: "#DBE6F5",
    input: "#efefef",
    header: "#EBF0FF",
  },
  logoColor: {
    color: "#0038ff",
  },
  borderColor: {
    color: "#CFCFCF",
  },
  input: {
    background: "#fff",
    border: "#C4C4C4",
    search_hover: grey[300],
    search: grey[200],
  },
  tab: {
    background: "#fff",
  },
  opposite: {
    color: "#000",
  },
  qualityBlue: {
    color: "#ABCFFF",
  },
  addlfilter: {
    background: "#d3ddff",
  },
  previewForm: {
    background: "#ECF0FF",
  },
  billing: {
    header: "#E3E9FF",
  },
  statuses: {
    expedited: "#FF93CE",
  },
  billBox: {
    bg: "#F2F5FF",
  },
  chart: {
    primary: "#0038FF",
    secondary: "#4A72FF",
    ternary: "#809CFF",
  },
  calender: {
    hover: "#E7F0FE",
  },
});

const forDark = () => ({
  primary: {
    //   lighter: '#D0ECFE',
    //   light: '#73BAFB',
    main: "#1a73e8",
    dark: "#1E1E1E",
    //   darker: '#042174',
    //   contrastText: '#FFFFFF',
  },

  secondary: {
    //   lighter: '#EFD6FF',
    // light: '#F6F6F6',
    main: "#8E33FF",
    // dark: '#5119B7',
    header: "#1E1E1E",
    textColor: "#fff",
    //   darker: '#27097A',
    //   contrastText: '#FFFFFF',
  },
  info: {
    lighter: "#CAFDF5",
    light: "#61F3F3",
    main: "#00B8D9",
    dark: "#006C9C",
    darker: "#003768",
    contrastText: "#FFFFFF",
    vlight: grey[800],
  },

  success: {
    lighter: "#C8FAD6",
    light: "#5BE49B",
    main: "#00A76F",
    dark: "#007867",
    darker: "#004B50",
    contrastText: "#FFFFFF",
  },

  warning: {
    lighter: "#FFF5CC",
    light: "#FFD666",
    main: "#FFAB00",
    dark: "#B76E00",
    darker: "#7A4100",
    contrastText: grey[800],
  },

  error: {
    lighter: "#FFE9D5",
    light: "#FFAC82",
    main: "#FF5630",
    dark: "#B71D18",
    darker: "#7A0916",
    contrastText: "#FFFFFF",
  },

  invert: {
    light: "#000000",
    dark: "#ffff",
  },
  grey: {
    0: "#FFFFFF",
    100: "#F9FAFB",
    200: "#F4F6F8",
    300: "#DFE3E8",
    400: "#C4CDD5",
    500: "#919EAB",
    600: "#637381",
    700: "#454F5B",
    800: "#212B36",
    900: "#161C24",
  },

  common: {
    dark: "#000000",
    light: "#ffff",
  },

  action: {
    hover: alpha(grey[500], 0.08),
    selected: alpha(grey[500], 0.16),
    disabled: alpha(grey[500], 0.8),
    disabledBackground: alpha(grey[500], 0.24),
    focus: alpha(grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  card: {
    light: "#fff",
    dark: "#13171b",
  },
  background: {
    light: "#F1F1F1",
    dark: "#000",
  },
  background1: "#000",
  background2: "#000",
  dialog: {
    light: "#fff",
    dark: "#13171b",
  },
  border: {
    paper: {
      dark: "1px solid lightgray",
      light: "1px solid var(--Input-Box-Stroke-Colour, #CFCFCF)",
    },
  },
  smsBox: {
    to: "#484848",
    from: "#333333",
    input: "#484848",
    header: "#484848",
  },
  logoColor: {
    color: "#fff",
  },
  borderColor: {
    color: "#DFDFDF",
  },
  input: {
    background: "#1E1E1E",
    border: "#4D4E4F",
    search_hover: grey[700],
    search: grey[800],
  },
  tab: {
    background: "#464646",
  },
  opposite: {
    color: "#fff",
  },
  qualityBlue: {
    color: "#333333",
  },
  addlfilter: {
    background: "rgba(255, 255, 255, 0.08)",
  },
  previewForm: {
    background: "#333333",
  },
  billing: {
    header: "#333333",
  },
  statuses: {
    expedited: "#FF93CE",
  },
  billBox: {
    bg: "#13171b",
  },
  chart: {
    primary: "#0038FF",
    secondary: "#4A72FF",
    ternary: "#809CFF",
  },
  calender: {
    hover: "#13171b",
  },
});

const base = (TM) => (TM == "light" ? { ...forLight() } : { ...forDark() });

// ----------------------------------------------------------------------
const grey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};
const card = {
  light: "#fff",
  dark: "#13171b",
};
const background = {
  light: "#fff",
  dark: "#000",
};
export function palette(themeMode, context) {
  return {
    ...base(themeMode),
    mode: themeMode,
    // text: {
    //   primary: grey[800],
    //   secondary: grey[600],
    //   disabled: grey[500],
    // },
    background: {
      paper: card[themeMode],
      default: `${background[themeMode]} !important`,
      //   neutral: grey[200],
    },
    action: {
      ...base.action,
      active: grey[600],
    },
  };
}
