"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BtnBack() {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }
  return (
    <button
      onClick={onDismiss}
      className="fixed  !cursor-pointer top-[5%] text-black left-[5%] z-[9999]"
    >
      <ArrowLeft size={48} color="black" className="!cursor-pointer  " />
    </button>
  );
}
