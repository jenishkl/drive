import React, { useEffect } from "react";
import { get, setStorage } from "./Common/helper";
import { SMP, USER } from "../helpers/utils";
import API from "../store/api";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

const NavigationHandler = ({ setFingerPrint }) => {
  const location = window.location;
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const fetchUser = async () => {
    try {
      const print = cookies?.fingerPrint;
      setStorage("fingerPrint", print);
      setFingerPrint(print);
      if (!USER) {
        try {
          const res = await API.put("user/update", { fingerPrint: print });

          if (res?.status == 200 && res?.data) {
            await dispatch(SET_USER(res.data));
            window.location.reload();
            return res.data?.user;
          } else {
            if (window.location.pathname !== "/") {
              const loginUrl = import.meta.env.VITE_APP_MYACCOUNT_LOGIN_URL;
              if (loginUrl) {
                window.location.replace(loginUrl);
              } else {
                console.error(
                  "Login URL is not defined in environment variables."
                );
              }
            }
          }
        } catch (apiError) {
          console.error("API error:", apiError);
        }
      } else {
        return USER;
      }
    } catch (fingerprintError) {
      console.error("Error getting browser fingerprint:", fingerprintError);
    }
  };

  useEffect(() => {
    (async function () {
      const user = await fetchUser();
      console.log("location.pathname", location.pathname);
      // If the path is "/" and the user exists, navigate to "/admin/dashboard"
      if (location.pathname === "/" && user) {
        window.location.replace("/admin/dashboard");
      } else if (location.pathname === "/" || !user) {
        window.location.replace(import.meta.env.VITE_APP_MYACCOUNT_LOGIN_URL);
      }
      // if (location.pathname != "/" && location.pathname != "/admin/dashboard") {
      //   const currentPath = window.location.pathname;
      //   let [, , module, subModule] = currentPath.split("/");

      //   if (module) {
      //     module = module.charAt(0).toUpperCase() + module.slice(1);
      //   }
      //   if (subModule) {
      //     subModule = subModule.charAt(0).toUpperCase() + subModule.slice(1);
      //   }

      //   if (SMP(module, 1) || SMP(subModule, 1)) {
      //     window.location.replace(`/admin/dashboard`);
      //   }
      // }
    })();
  }, [location.pathname]);

  return null;
};

export default NavigationHandler;
