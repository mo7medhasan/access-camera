"use client";
import { Logout } from "@/serverActions/logoutuser";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginButton({ user, token }) {
  const isUser =
    user && user.value === "user" && token && token.value !== "" ? true : false;
  const router = useRouter();

  const handleUser = async () => {
    if (isUser) {
      await Logout();
    } else {
      router.push("/signin");
    }
  };
  return (
    <button
      type="button"
      onClick={handleUser}
      className="relative rounded-lg
                                text-[14px]
                                px-8
                                ml-3
                                h-[40px]
                               capitalize
                                font-semibold
                             bg-[#ff1193]  p-1 text-white
                              hover:text-white focus:outline-none focus:ring-2
                               focus:ring-white focus:ring-offset-2
                               focus:ring-offset-gray-800"
    >
      {isUser ? " log out" : "log in"}
    </button>
  );
}
