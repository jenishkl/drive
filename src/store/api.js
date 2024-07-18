import { REDIRECT, TOKEN } from "@/helpers/Token";
import { MYACCOUNT_LOGIN_URL } from "@/helpers/envis";
import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
// import { toast } from "sonner";

async function getToken() {
  // Your logic to get the token
  const token = await TOKEN(); // Assume TOKEN is an async function that returns the token
  return token;
}
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,
  // https://api.staging-casedrivetwo.lezdotechmed.com/api
  withCredentials: true,
});

API.interceptors.request.use(async function (config) {
  // console.log('first', first)
  if (await TOKEN()) {
    config.headers["Authorization"] = `Bearer ${await TOKEN()}`;
  }
  return config;
});

API.interceptors.response.use(
  //
  // unwrap response dataN
  ({ data }) => data,

  // catch statusCode != 200 responses and format error
  async (error) => {
    if (error.response) {
      console.log(error);
      const errorData = {
        error: error.response.data,
        status: error.response.status,
        message: error.message,
      };
      if (error.response.status === 401) {
        // unsetSessionStorage();
        toast.error("Session expired please login again");

        // await REDIRECT(`${MYACCOUNT_LOGIN_URL}`);
      }
      if (error.response.status === 403) {
        // if (!isRefreshing) {
        //   isRefreshing = true;
        //   refetchToken();
        // }
        toast.error("Session expired please login again");
        // await REDIRECT(`${MYACCOUNT_LOGIN_URL}`);
      }
      if (error.response.status === 400) {
        toast.error(errorData.error?.message);
      }
      if (error.response.status == 422) {
        toast.error(error?.message);
        toast.error(`${error?.response.data.message}`);
        // toast.error("jvwbduvihywbvuiyw");
      }
      if (error.response.status === 500) {
        // toast.error(errorData.error?.message);
      }
      // else toast.error(errorData.message);
      return Promise.reject(errorData);
    }

    return Promise.reject({ message: error.message });
  }
);

export default API;
