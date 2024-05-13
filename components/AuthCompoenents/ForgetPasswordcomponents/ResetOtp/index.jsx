import React from "react";
import VerifyOtp from "./VerifyOtp";

export default function ResetOtp() {
  return (
    <div className="    h-[100dvh] ">
      <div className="mx-auto  max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg dark:bg-[#1c191e] ">
          <VerifyOtp />
        </div>
      </div>
    </div>
  );
}
