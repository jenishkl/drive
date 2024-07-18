import { useState, useEffect } from "react";

function usePrefersColorScheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    // const isChrome =
    //   navigator.userAgentData &&
    //   navigator.userAgentData.brands[1].brand.includes("Chrome");

    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    handleChange(matchMedia); // Set the initial theme
    matchMedia.addEventListener("change", handleChange); // Listen for changes

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  });
  console.log("preferredTheme2", theme);
  return theme;
}

export default usePrefersColorScheme;
