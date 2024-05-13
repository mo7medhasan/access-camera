import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPassword } from "@/Schemea/AuthSchema/ForgetPasswordSChema";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export default function VerifyOtp() {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPassword),
  });
  const onSubmit = (data) => {};
  return (
    <div>
      <form
        action="#"
        className="mb-0 mt-6   
         space-y-4 rounded-lg  p-4 shadow-lg sm:p-6 lg:p-8 "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <p className="text-center text-lg font-medium">Sign in to your account</p> */}
        <h1
          className="text-center text-2xl font-bold
         light:text-[#333] sm:text-3xl dark:text-[#434044] mb-10"
        >
          {" "}
          Verification Code
        </h1>
        <div className="flex items-center justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {errors?.password && (
          <p className="text-red-600 p-1">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="block w-full rounded-lg light:bg-[#eee]  
            px-5 py-3 text-sm font-medium   dark:bg-[#3a3939] "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
