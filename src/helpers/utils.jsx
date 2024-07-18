import { deepOrange } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { Children } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Pusher from "pusher-js";
import CryptoJS from "crypto-js";

//ICONS
import { FaFilePdf } from "react-icons/fa6";
import { BiSolidFileJpg } from "react-icons/bi";
import ImageIcon from "@mui/icons-material/Image";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import _ from "lodash";
import { _approvals, _entries, _timesheet } from "./moduleLinks";
import dayjs from "dayjs";
import { BUCKETURL, PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from "./envis";
import { a_to_z_colors } from "./colors";
import { getCookie } from "cookies-next";
export const Each = ({ render, of }) =>
  Children.toArray(of?.map((item, index) => render(item, index)));

export const setSessionStorage = (name, data) => {
  if (typeof window != "undefined")
    return localStorage.setItem(name, JSON.stringify(data));
};
export const getSessionStorage = (name) => {
  try {
    if (typeof window != "undefined") {
      let data = JSON.parse(localStorage.getItem(name));
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const removeSessionStorage = (name) => {
  if (typeof window != "undefined") return localStorage.removeItem(name);
};
export const clearSessionStorage = (name) => {
  if (typeof window != "undefined") return localStorage.clear();
};

let colors = ["#0038FF", "#07893B", "violet", deepOrange[500]];
export const randomColor = (name = "Je") => {
  let n = String(name)?.charAt(0).toUpperCase();
  let color = Object.entries(a_to_z_colors).find((it) => it[0]?.charAt(0) == n);
  return color;
};
export const imageurl = (image) => {
  return BUCKETURL?.replaceAll("2.0//", "2.0/") + image;
};
export const imageTypes = [
  "jpg",
  "jpeg",
  "png",
  "PNG",
  "gif",
  "bmp",
  "tiff",
  "webp",
  "svg",
  "jfif",
];

// export function get(object, path, defaultValue = undefined) {
//   const keys = Array.isArray(path)
//     ? path
//     : path.replace(/\[(\d+)\]/g, ".$1").split(".");
//   let result = object;

//   for (let key of keys) {
//     result = result[key];

//     if (result === undefined) {
//       return defaultValue;
//     }
//   }

//   return result;
// }

export const USER = JSON?.parse(getCookie("user_data", {}) ?? "{}");
export const TM = getCookie("theme", {}) ?? "";
export const TOKEN = getCookie("fingerPrint", {}) ?? "{}";
export const PROFILE_IMG = JSON?.parse(
  getCookie("user_data", {}) ?? "{}"
)?.profile_img;

export const file_icon = (file_type, size = 50) => {
  switch (file_type) {
    case "pdf":
      return <FaFilePdf size={size} color="#890104" />;
    case "jpg":
      return <ImageIcon size={size} />;
    case "png":
      return <ImageIcon size={size} />;
    case "zip":
      return (
        <FolderZipIcon
          // sx={{ fontSize: "100px", }}
          color="warning"
        />
      );
    default:
      return <InsertDriveFileIcon size={size} />;
  }
};

export const lastseen = (date) => {
  try {
    dayjs.extend(relativeTime);

    const lastSeenTime = dayjs(date);
    const currentTime = dayjs();

    const timeAgo = lastSeenTime.from(currentTime);
    return timeAgo;
  } catch (error) {
    console.log(error);
  }
};

// Pusher.logToConsole = true;
export const pusher = new Pusher(PUSHER_APP_KEY, {
  cluster: PUSHER_APP_CLUSTER,
  wsHost: "",
  wsPort: "",
  forceTLS: false,
  encrypted: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
});

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const MHH = "57px";
export const SHH = "57px";
export const SHT = "57px";

export const dateFormate = ({ mask = "-", time = false }) => {
  switch (USER?.country) {
    case "us":
      return `MM${mask}DD${mask}YYYY ${time && "hh:mm:ss"}`;
    case "ca":
      return `MM${mask}DD${mask}YYYY ${time && "hh:mm:ss"}`;
    case "in":
      return `DD${mask}MM${mask}YYYY ${time && "hh:mm:ss"}`;
    default:
      return `DD${mask}MM${mask}YYYY ${time && "hh:mm:ss"}`;
  }
};

export const encode = (text) => {
  return window.btoa(text);
};
export const decode = (text) => {
  return text && window.atob(text);
};

function base64ToBase64url(base64) {
  let base64url = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, ""); // Base64 to Base64URL
  base64url = base64url.replace(/#/g, "").replace(/&/g, "").replace(/\?/g, ""); // Remove #, &, ?
  return base64url;
}

export function encriptData(data) {
  try {
    let ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.NEXT_PUBLIC_CRYPTO_KEY
    ).toString();
    const encryptedUrlSafe = base64ToBase64url(ciphertext);
    return encryptedUrlSafe;
  } catch (error) {
    return "";
  }
}

function base64urlToBase64(base64url) {
  base64url = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64url.length % 4) {
    base64url += "=";
  }
  return base64url;
}
export function decriptData(data) {
  try {
    // let bytes = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_CRYPTO_KEY);
    // let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const encryptedBase64 = base64urlToBase64(data);
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedBase64,
      process.env.NEXT_PUBLIC_CRYPTO_KEY
    );
    const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    return "";
  }
}
export const folder = (id, drive) => {
  
  return id + "_" + drive;
};
