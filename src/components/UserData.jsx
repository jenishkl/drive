"use client";
import { USER } from "@/helpers/utils";
import API from "@/store/api";
import { setCookie } from "cookies-next";
import React, { useEffect } from "react";

export default function UserData({ token }) {
  useEffect(() => {
    if (!USER?.id) {
      API.put("user/update", { fingerPrint: token })
        .then((data2) => {
          let data = data2?.data;
          if (data2?.status == 200 && data2?.data) {
            setCookie(
              "user_data",
              JSON.stringify({
                name: data?.user?.display_name,
                id: data?.user?.id,
                email: data?.user?.email,
                roleName: data?.user?.roleName,
                is_client: data?.user?.is_client,
                profile_img: data?.user?.profile_img,
                profile_id: data?.user?.profile_id,
              })
            );
          }
        })
        .catch(() => {});
    }
  }, [token]);
  return <></>;
}
