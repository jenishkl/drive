"use client";
import * as React from "react";
import "./themeswitch.css";
import { GlobalContext } from "@/layout/GlobalContextProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
export default function ThemeSwitch() {
  const { themeMode, setThemeMode } = React.useContext(GlobalContext) || {};
  const router = useRouter();
  return (
    <>
      <Stack direction={"row"} alignItems={"center"}>
        <input
          type="checkbox"
          checked={themeMode == "dark" ? true : false}
          id="darkmode-toggle"
          onChange={(e) => {
            setThemeMode(e.target.checked ? "dark" : "light");
            setCookie("theme", e.target.checked ? "dark" : "light", {});
            router.refresh();
          }}
          className="themeinput"
        />
        <label htmlFor="darkmode-toggle" className="themelabel">
          <LightModeIcon sx={{ ml: "3.8px" }} color="warning" />
          {/* <svg
            version="1.1"
            className="sun"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="#ffcc00" d="M256 152c-57.438 0-104 46.562-104 104s46.562 104 104 104 104-46.562 104-104-46.562-104-104-104zm0-80c-11.046 0-20-8.954-20-20V20c0-11.046 8.954-20 20-20s20 8.954 20 20v32c0 11.046-8.954 20-20 20zm0 392c-11.046 0-20 8.954-20 20v32c0 11.046 8.954 20 20 20s20-8.954 20-20v-32c0-11.046-8.954-20-20-20zm229.254-229.254c-11.046 0-20-8.954-20-20V256c0-11.046 8.954-20 20-20h32c11.046 0 20 8.954 20 20s-8.954 20-20 20h-32zm-392 0c-11.046 0-20-8.954-20-20V256c0-11.046 8.954-20 20-20h32c11.046 0 20 8.954 20 20s-8.954 20-20 20h-32zm285.255-177.255c-7.811-7.811-20.474-7.811-28.284 0-7.811 7.811-7.811 20.474 0 28.284l22.627 22.627c7.811 7.811 20.474 7.811 28.284 0 7.811-7.811 7.811-20.474 0-28.284l-22.627-22.627zm-198.51 198.51c-7.811-7.811-20.474-7.811-28.284 0-7.811 7.811-7.811 20.474 0 28.284l22.627 22.627c7.811 7.811 20.474 7.811 28.284 0 7.811-7.811 7.811-20.474 0-28.284l-22.627-22.627zm198.51 198.51c-7.811-7.811-20.474-7.811-28.284 0-7.811 7.811-7.811 20.474 0 28.284l22.627 22.627c7.811 7.811 20.474 7.811 28.284 0 7.811-7.811 7.811-20.474 0-28.284l-22.627-22.627zm-198.51-198.51c-7.811-7.811-20.474-7.811-28.284 0-7.811 7.811-7.811 20.474 0 28.284l22.627 22.627c7.811 7.811 20.474 7.811 28.284 0 7.811-7.811 7.811-20.474 0-28.284l-22.627-22.627z"/>
          </svg> */}
          <svg
            version="1.1"
            className="moon"
            x="0px"
            y="0px"
            viewBox="0 0 49.739 49.739"
            style={{ enableBackground: "new 0 0 49.739 49.739" }}
          >
            <path
              d="M25.068,48.889c-9.173,0-18.017-5.06-22.396-13.804C-3.373,23.008,1.164,8.467,13.003,1.979l2.061-1.129l-0.615,2.268
               c-1.479,5.459-0.899,11.25,1.633,16.306c2.75,5.493,7.476,9.587,13.305,11.526c5.831,1.939,12.065,1.492,17.559-1.258v0
               c0.25-0.125,0.492-0.258,0.734-0.391l2.061-1.13l-0.585,2.252c-1.863,6.873-6.577,12.639-12.933,15.822
               C32.639,48.039,28.825,48.888,25.068,48.889z M12.002,4.936c-9.413,6.428-12.756,18.837-7.54,29.253
               c5.678,11.34,19.522,15.945,30.864,10.268c5.154-2.582,9.136-7.012,11.181-12.357c-5.632,2.427-11.882,2.702-17.752,0.748
               c-6.337-2.108-11.473-6.557-14.463-12.528C11.899,15.541,11.11,10.16,12.002,4.936z"
            />
          </svg>
        </label>
      </Stack>
    </>
  );
}
