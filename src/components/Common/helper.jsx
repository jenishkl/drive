'use client'
import { useEffect, useRef } from "react";
import { _billing, _customerAdvance } from "../../helpers/moduleLinks";
import { isEqual } from "lodash";
import axios from "axios";

export const filterOnlyActive = (data = []) => {
  return data.filter((item) => item.is_active == 1);
};

export const getCSRFToken = async () => {
  // Fetch the CSRF token from your server
  try {
    const response = await axios.get("/get-csrf-token");
    return response.data.csrf_token;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export function underscoreToCamelCase(value) {
  if (typeof value == "string") {
    return value.replace(/_([a-z])/g, function (match, letter) {
      return letter.toUpperCase();
    });
  }
  if (typeof value !== "object" || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => underscoreToCamelCase(item)); //recursion to handle array
  }

  const camelCaseObj = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, function (match, letter) {
        return letter.toUpperCase();
      });
      camelCaseObj[camelCaseKey] = underscoreToCamelCase(value[key]); //recursion to handle object
    }
  }
  return camelCaseObj;
}

export const get = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export function setStorage(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}

export const removeStorage = (name) => {
  return localStorage.removeItem(name);
};
export function spaceToCamelCaseString(inputString) {
  const words = inputString.split(" ").map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  return words.join("");
}

export function camelCaseToNormal(inputString) {
  console.log("inputString", inputString);
  const words = inputString.split(/(?=[A-Z])/);

  return words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function optionsForSelect(data = [], label, value) {
  console.log("watch data", data);
  return data.map((item) => {
    return {
      label: item?.[label],
      value: item?.[value],
    };
  });
}

export function underscoreToCapitalCase(str) {
  if (!str) return;
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function getInitials(str, maxLength = 2) {
  if (!str) return;
  let initials = str
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0])
    .join("");

  if (maxLength !== undefined && maxLength < initials.length) {
    return initials.substring(0, maxLength);
  }

  return initials;
}

export function findOption(id, data) {
  if (!id || !data) return;
  return data.find((item) => item.value == id);
}

export const deepCopy = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
};
export function convertFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " Bytes";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
}

export function deepClean(input) {
  const cleanObject = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      } else if (Array.isArray(obj[key])) {
        obj[key] = deepClean(obj[key]);
      } else if (typeof obj[key] === "object") {
        obj[key] = deepClean(obj[key]);
      }
    });
    return obj;
  };

  if (Array.isArray(input)) {
    return input
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          return deepClean(item);
        }
        return item;
      })
      .filter((item) => item !== null && item !== undefined);
  } else if (typeof input === "object" && input !== null) {
    return cleanObject(input);
  }

  return input;
}
export function addOrRemoveUnderscore(objects = [], type, parentValue = "") {
  return objects.map((obj) => {
    const newObj = { ...obj };

    if (parentValue && type === "add") {
      newObj.value = parentValue + "_" + obj.value;
    } else if (parentValue && type === "remove") {
      const parts = obj.value.split("_");
      newObj.value = parts[parts.length - 1];
    }

    if (obj.children && obj.children.length > 0) {
      newObj.children = addOrRemoveUnderscore(
        obj.children,
        type,
        type === "add" ? newObj.label : ""
      );
    }

    return newObj;
  });
}

export function getExtensionFromMimeType(mimeType) {

  const mimeMap = {
    "application/pdf": ".pdf",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "text/plain": ".txt",
    "text/html": ".html",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "application/vnd.ms-excel": ".xls",
    "application/vnd.google-apps.document":'.doc',
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      ".xlsx",
    "application/vnd.ms-powerpoint": ".ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      ".pptx",
    "application/zip": ".zip",
    "application/x-rar-compressed": ".rar",
    "audio/mpeg": ".mp3",
    "audio/ogg": ".ogg",
    "video/mp4": ".mp4",
    "video/mpeg": ".mpeg",

  };

  return mimeMap[mimeType] || "";
}


export const currencyFormat = (num, currencySymbol = "$") => {
  if (!num) return "$";
  let formattedNumber;
  num = parseInt(num);
  if (num < 1e3) {
    formattedNumber = `${currencySymbol}${num.toFixed(2)}`;
  } else if (num < 1e6) {
    formattedNumber = `${currencySymbol}${(num / 1e3).toFixed(2)}K`;
  } else if (num < 1e9) {
    formattedNumber = `${currencySymbol}${(num / 1e6).toFixed(2)}M`;
  } else {
    formattedNumber = `${currencySymbol}${(num / 1e9).toFixed(2)}B`;
  }
  return formattedNumber;
};

export function useDeepCompareEffect(callback, dependencies) {
  const currentDependenciesRef = useRef();

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  // Use the ref's current value as the dependencies of useEffect
  useEffect(callback, [currentDependenciesRef.current]);
}

export const priceTypeExtension = (pageType, priceTypeId, quantity = 0) => {
  console.log('pageType', pageType, quantity)
  if (!quantity) return;
  const currentPageType = pageType?.replace(/ /g, "")?.toLowerCase();
  console.log("quantity", quantity);
  let ext = "";

  if (priceTypeId == 1) {
    const quantityString = quantity?.toString();
    const decimalParts = quantityString?.split(":");
    const hours = parseFloat(decimalParts[0]) || 0;
    const minutes = parseFloat(decimalParts[1]) || 0;
    const seconds = parseFloat(decimalParts[2]) || 0;

    if (hours > 0) {
      return hours > 1 ? "Hrs" : "Hr";
    } else if (minutes > 0) {
      return minutes > 1 ? "Mins" : "Min";
    } else if (seconds > 0) {
      return seconds > 1 ? "Secs" : "Sec";
    }
  }

  ext =
    currentPageType === "flat"
      ? "Flat"
      : priceTypeId === 2
      ? quantity <= 1
        ? "Report"
        : "Reports"
      : priceTypeId === 3
      ? quantity <= 1
        ? "Chart"
        : "Charts"
      : priceTypeId === 4
      ? quantity <= 1
        ? "Page"
        : "Pages"
      : "";

  return ext;
};

export function checkDivisionIds(arr = []) {
  let hasReview = false;
  let hasRetrieval = false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].service?.division_id === 1) {
      hasReview = true;
    } else if (arr[i].service?.division_id === 2) {
      hasRetrieval = true;
    }
  }

  if (hasReview && hasRetrieval) {
    return "both";
  } else if (hasReview) {
    return "review";
  } else if (hasRetrieval) {
    return "retrieval";
  }
}

export const calculateCost = (amount, time) => {
  // Split the time into hours, minutes, and seconds
  if(!amount || !time) return;
  const amountNum = amount ? parseFloat(amount) : amount;
  const timeParts = time?.toString()
    .split(":")
    .map((item) => parseFloat(item) || 0);

  const hours = timeParts[0] || 0;
  const minutes = timeParts[1] || 0;
  const seconds = timeParts[2] || 0;

  console.log("hours, minutes, seconds", hours, minutes, seconds);

  // Convert minutes and seconds to decimal hours
  const decimalTime = hours + minutes / 60 + seconds / 3600;

  // Calculate the cost
  const cost = amountNum * decimalTime;

  return cost?.toFixed(2);
};

