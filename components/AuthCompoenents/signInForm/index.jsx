import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignINformSchema } from "@/Schemea/AuthSchema/signinschema";
import { userLogin } from "@/serverActions/loginUser";
import { useToast } from "@/components/ui/use-toast";

export default function SignInForm() {
  const { toast } = useToast();

  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SignINformSchema),
  });
  const onSubmit = async (data) => {
    const isuser = await userLogin(data);

    console.log(isSubmitting, "isuser");
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
        action="#"
        className="mb-0 mt-6   
         space-y-4 rounded-lg  p-4 shadow-lg sm:p-6 lg:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <p className="text-center text-lg font-medium">Sign in to your account</p> */}
        <h1
          className="text-center text-2xl font-bold
         light:text-[#333] sm:text-3xl dark:text-[#434044] mb-10"
        >
          {" "}
          Sign in
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
        <div>
          <label for="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type="password"
              className="w-full rounded-xl
             
            border border-[#ddd]  dark:bg-transparent dark:border-[#434044]   p-4 pe-12 text-sm   pl-11"
              placeholder="Enter password"
              {...register("password")}
            />

            <span
              className="absolute inset-y-0 start-0 
            grid place-content-center px-4"
            >
              <Image
                src={"/AuthIcons/lock-keyhole-svgrepo-com.svg"}
                width={16}
                height={16}
              />
            </span>

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <Image src={"/AuthIcons/eye.svg"} width={16} height={16} />
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
                  className="size-[15px]  rounded border-gray-300  accent-black"
                />
              </div>

              <p className=" text-[11px]"> Remember Me </p>
            </label>

            <Link className="text-[13px]" href={"/forgetPassword/1"}>
              Forgot Password ?
            </Link>
          </div>

          <div className="flex items-center justify-between my-3 px-3">
            <div className="  h-[1px]   light:bg-blackdark:bg-white w-[45%] "></div>
            <p className="text-[11px]">or</p>
            <div className="h-[1px] light:bg-black w-[45%]"></div>
          </div>
        </div>

        <button
          type="submit"
          className="block w-full rounded-lg light:bg-[#eee]  
            px-5 py-3 text-sm font-medium   dark:bg-[#3a3939] "
        >
          Continue with Google
        </button>
        <button
          type="submit"
          className="block w-full rounded-lg 
          dark:bg-[#3a3939] light:bg-[#eee] 
          px-5 py-3 text-sm font-medium   "
        >
          Continue with Facebook
        </button>
        <button
          type="submit"
          className="block w-full rounded-lg light:bg-[#333]
           px-5 py-3 text-sm font-medium  dark:bg-[#3a3939] "
        >
          Sign in
        </button>

        <p className="text-center text-sm light:text-gray-500 flex justify-center">
          No Account?
          <Link
            className=" strong light:text-[#000] font-bold text-xs my-auto"
            href="/signup"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
