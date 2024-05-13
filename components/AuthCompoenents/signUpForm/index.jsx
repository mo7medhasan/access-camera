"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUPformSchema } from "@/Schemea/AuthSchema/signupschema";
import { RegisterUser } from "@/serverActions/registeruser";
import { useToast } from "@/components/ui/use-toast";

export default function SignUpForm() {
  const [show, setShow] = useState(false);
  const { toast } = useToast();

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUPformSchema),
  });
  const onSubmit = async (data) => {
    const isuser = await RegisterUser(data);

    console.log(isuser, "isuser");
    if (isuser?.status === "error" && !isuser?.loading) {
      toast({
        title: "Wrong",
        description: isuser?.error_en,
        variant: "destructive",
        swipeDirection: "center",
      });
    } else {
      toast({
        title: "Successfully sign in ",
        varient: "success",
      });
    }
  };
  return (
    <div>
      <form
        className="mb-0 mt-6
         space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <p className="text-center text-lg font-medium">Sign in to your account</p> */}
        <h1 className="text-center text-2xl font-bold text-[#000] sm:text-3xl">
          {" "}
          Sign Up
        </h1>

        <div>
          <label for="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border border-[#ddd] p-4 
              pe-12 text-sm shadow-sm pl-11"
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
          {errors?.email && (
            <p className="text-red-600 p-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label for="email" className="sr-only">
            User name
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border border-[#ddd] p-4 pe-12 text-sm
               shadow-sm pl-11"
              placeholder="User name"
              {...register("username")}
            />

            <span className="absolute inset-y-0 start-0 grid place-content-center px-4">
              <Image
                src={"/AuthIcons/user-svgrepo-com.svg"}
                width={20}
                height={20}
              />
            </span>
          </div>
        </div>
        {errors?.username && (
          <p className="text-red-600 p-1">{errors.username.message}</p>
        )}
        <div>
          <label for="email" className="sr-only">
            Phone number (optional)
          </label>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border border-[#ddd] p-4 pe-12 text-sm shadow-sm pl-11"
              placeholder="Phone number (optional)"
              {...register("phone")}
            />

            <span className="absolute inset-y-0 start-0 grid place-content-center px-4">
              <Image
                src={"/AuthIcons/phone-rounded-svgrepo-com.svg"}
                width={20}
                height={20}
              />
            </span>
          </div>
        </div>
        {errors?.phone && (
          <p className="text-red-600 p-1">{errors.phone.message}</p>
        )}
        <div>
          <label for="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="w-full rounded-xl border border-[#ddd] p-4 pe-12 text-sm   pl-11"
              placeholder="Enter password"
              {...register("password")}
            />

            <span className="absolute inset-y-0 start-0 grid place-content-center px-4">
              <Image
                src={"/AuthIcons/lock-keyhole-svgrepo-com.svg"}
                width={16}
                height={16}
              />
            </span>

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <Image
                src={"/AuthIcons/eye.svg"}
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={() => setShow(!show)}
              />
            </span>
          </div>
          {errors?.password && (
            <p className="text-red-600 p-1">{errors.password.message}</p>
          )}
          <div className="flex justify-between my-3 px-3">
            <label
              for="Option3"
              className="flex cursor-pointer  justify-start items-center gap-1"
            >
              <div className="flex items-center">
                &#8203;
                <input
                  type="checkbox"
                  className="size-[15px]  
                  rounded border-gray-300
                    accent-black"
                  {...register("checkbox")}
                />
              </div>

              <p className=" text-[11px]">
                {" "}
                i agree to the Terms & conditions{" "}
              </p>
            </label>
          </div>
          {console.log(errors.checkbox, "dassssscheck")}
          {errors?.checkbox && (
            <p className="text-red-600 p-1">{errors.checkbox.message}</p>
          )}
          <div className="flex items-center justify-between my-3 px-3">
            <div className="  h-[1px]   bg-black w-[45%] "></div>
            <p className="text-[11px]">or</p>
            <div className="h-[1px] bg-black w-[45%]"></div>
          </div>
        </div>

        <button
          type="submit"
          className="block w-full rounded-lg bg-[#eee] px-5 py-3 text-sm font-medium  text-black"
        >
          Continue with Google
        </button>
        <button
          type="submit"
          className="block w-full rounded-lg bg-[#eee] px-5 py-3 text-sm font-medium  text-black"
        >
          Continue with Facebook
        </button>
        <button
          type="submit"
          className="block w-full rounded-lg bg-[#333] px-5 py-3 text-sm font-medium  text-white"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-500 flex justify-center">
          Already Have Account?
          <Link
            className=" strong text-[#000] font-bold text-xs my-auto"
            href="/signin"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
