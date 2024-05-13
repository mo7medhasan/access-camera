"use client";
import VerifyEmail from "@/components/AuthCompoenents/ForgetPasswordcomponents/VerifyEmail";
import React from "react";
import ResetOtp from "@/components/AuthCompoenents/ForgetPasswordcomponents/ResetOtp";
import ResetPassword from "@/components/AuthCompoenents/ForgetPasswordcomponents/ResetPassword";

export default function ForgetPasswordStep({ params: { step } }) {
  if (+step === 1) return <VerifyEmail />;
  if (+step === 2) return <ResetOtp />;
  if (+step === 3) return <ResetPassword />;
}
