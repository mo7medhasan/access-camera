import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgetPasswordSchema } from "@/Schemea/AuthSchema/ForgetPasswordSchemas";

export default function VerifyEmailForm() {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
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
          Enter Your Email
        </h1>
        <div>
          <label for="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg
            border border-[#ddd]
             p-4 pe-12 text-sm shadow-sm pl-11
             dark:bg-transparent dark:border-[#434044] "
              placeholder="Enter email"
              {...register("email")}
            />

            <span className="absolute inset-y-0 start-0 grid place-content-center px-4">
              <Image
                src={"/AuthIcons/email-svgrepo-com.svg"}
                width={20}
                height={20}
              />
            </span>
          </div>
        </div>
        {errors?.email && (
          <p className="text-red-600 p-1">{errors.email.message}</p>
        )}

        <button
          type="submit"
          className="block w-full rounded-lg light:bg-[#eee]  
            px-5 py-3 text-sm font-medium   dark:bg-[#3a3939] "
        >
          Send Verification Code
        </button>
      </form>
    </div>
  );
}
