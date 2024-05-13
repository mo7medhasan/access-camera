import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPassword } from "@/Schemea/AuthSchema/ForgetPasswordSChema";
  
export default function ResetPasswordForm() {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(

    {
      resolver:yupResolver(ResetPassword)
    }
  );
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
         Reset Your Password
        </h1>
        <div className="relative">
            <input
              type="password"
              className="w-full rounded-xl
             
            border border-[#ddd]  dark:bg-transparent dark:border-[#434044]   p-4 pe-12 text-sm   pl-11"
              placeholder="Enter password"
              {...register('password')}

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
            <Image
                src={"/AuthIcons/eye.svg"}
                width={16}
                height={16}
              />
            </span>
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
