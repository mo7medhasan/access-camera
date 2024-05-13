"use client"
import Image from "next/image";
import React, { useState } from "react";

export default function Profile() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [user,setUser]=useState({

  })
  return (
    <div className="mx-auto  max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-lg dark:bg-[#1c191e] ">
       <div className="box h-{100%}   " >
        <div className="user flex items-center justify-center">
          <div className="relative w-[170px]  overflow-hidden  gap-1 flex flex-col items-center ">
            <Image
              src="/test/smile.jpeg"
              className="rounded-[50%] h-[190px] w-[170px] "
              width={300}
              height={300}
            />
            <Image
              src="/test/cameratest.svg"
              className="rounded-[50%] bg-[#ff1193] p-2  text-white  absolute bottom-[60px] right-10"
              width={39}
              height={39}
            />
            <p>User Name</p>

            <div className="flex w-[100%] justify-between">
              <p>achivements</p>

              <p>2video</p>
            </div>
          </div>
        </div>

        <div className="Form  flex justify-center flex-col">
          <form>
            <div className=" gap-5 flex flex-col">
              <p>Full Name</p>
              <input className="p-4 bg-transparent border border-xl rounded-md   outline-none  " placeholder="Full Name" />
            </div>
            <div className=" gap-5 flex flex-col">
              <p className="mt-3">User Name</p>
              <input className="p-4 bg-transparent border border-xl rounded-md   outline-none  " placeholder="User name" />
            </div>
            <div className=" gap-5 flex flex-col">
              <p className="mt-3">Phone number</p>
              <input className="p-4 bg-transparent border border-xl rounded-md   outline-none  " placeholder="Phone number" />
            </div>
            <div className=" gap-5 flex flex-col">
              <p className="mt-3">Email address</p>
              <input className="p-4 bg-transparent border border-xl rounded-md    outline-none " placeholder="Email address" />
            </div>
            <div className=" gap-5 flex flex-col">
              <p className="mt-3">Date of Birth</p>
              <input type="date" className="p-4 bg-transparent border border-xl rounded-md  outline-none  " placeholder="Date of Birth" />
            </div>


            <div className="buttons flex justify-between mt-4 gap-2 ">
              <button className="p-2 h-[40px] md:h-[50px] lg:h-[65px] rounded-md border border-md w-[80%]">
                Cancel
              </button>
              <button className="p-2 h-[40px] md:h-[50px] lg:h-[65px] rounded-md border border-md w-[80%] bg-[#ff1193] text-white">
                save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
   );
}
