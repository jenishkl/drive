"use server";
import { cookies } from "next/headers";

export const USER = () => {
  return JSON.parse(cookies().get("user_data")?.value);
};
