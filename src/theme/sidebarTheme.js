export const menuClasses = {
  root: "ps-menu-root",
  menuItemRoot: "ps-menuitem-root",
  subMenuRoot: "ps-submenu-root",
  button: "ps-menu-button",
  prefix: "ps-menu-prefix",
  suffix: "ps-menu-suffix",
  label: "ps-menu-label",
  icon: "ps-menu-icon",
  subMenuContent: "ps-submenu-content",
  SubMenuExpandIcon: "ps-submenu-expand-icon",
  disabled: "ps-disabled",
  active: "ps-active",
  open: "ps-open",
};
export const sideBarThemes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#000",
      color: "#000",
      icon: "#0098e",
      hover: {
        backgroundColor: "#f1f1f1cf",
        color: "#0000",
      },
      disabled: {
        color: "#9fb6cf",
      },
      subMenuContainer: {
        background: "#F6F6F6",
      },
      active: {
        foreground: "#fff",
        background: "#0038FF",
        subMenuForeground: "#0038FF",
      },
      inactive: {
        foreground: "#000",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#1E1E1E",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      color: "#fff",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#3D3D3D",
      },
      disabled: {
        color: "#3e5e7e",
      },
      subMenuContainer: {
        background: "#262728",
      },
      active: {
        foreground: "#fff",
        background: "#1a73e8",
      },
      inactive: {
        foreground: "#fff",
      },
    },
  },
};
