"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const endpoint = `/auth/login`;
const baseUrl = "https://dresscodesa.com:8080/api/v1";

export const userLogin = async (payload) => {
  console.log(payload);
  // return
  let loading = true;
  const response = await fetch(baseUrl + endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ ...payload, registrationType: "email" }),
  });
  const data = await response.json();
  loading = false;
  if (response?.ok) {
    cookies().set("user", data?.data.role);
    cookies().set("token", data?.token);
    redirect('/')
  }
  return { ...data, loading };
};
