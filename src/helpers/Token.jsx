"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const TOKEN = () => {
  return cookies().get("fingerPrint")?.value;
};
export const REDIRECT = (url) => {
  return redirect(`${url}`);
};
