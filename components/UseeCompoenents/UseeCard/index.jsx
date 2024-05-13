import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UseeCard() {
  return (
    <div className="relative rounded-[15px] h-fit overflow-hidden ">
      <div className="restaurant text-white absolute flex align-center text-[22px] justify-start top-3 left-3">
        <Image
          src="/test/download.png"
          className=" rounded-[50%] w-[60px] h-[60px] shadow-sm shadow-black"
          width={100}
          height={100}
        />

        <span className="m-auto ml-2">Restaurant Name</span>
      </div>

      <div className="relative z-[-1]">
        <Image
          src="/test/restaurant.jpg"
          width={1000}
          height={1000}
          className="h-[200px] lg:h-[300px] xl:h-[500px] w-[100%] "
        />
        <div class="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-white/90 to-transparent flex flex-col items-start justify-start p-3"></div>
      </div>
      <div
        className="user z-20 flex flex-col items-center justify-center 
 absolute right-7 z-2  top-[40%]   lg:top-[50%] xl:top-[65%]"
      >
        <div className="p-1 bg-white  dark:bg-black w-fit h-fit rounded-[50%]">
          <Image
            src={"/test/user.jpg"}
            width={100}
            height={100}
            className="rounded-[50%] w-[60px] lg:w-[80px] xl:w-[100px] h-[60px] lg:h-[80px] xl:h-[100px]"
          />
        </div>
        <span className="text-sm lowercase">Person Name</span>
      </div>

      <div className=" rounded-[20px] my  z-10 bg-white  dark:bg-black mt-[-20px] p-10">
        <h4 className="font-bold text-[rgba(0,0,0,0.74)] text-xl">
          Lorem ipsum
        </h4>
        <p className="w-[70%] font-sans text-[10px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing obcaecati
          quibusdam magni do i
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="likes">20 likes</div>
          <Link href={"/winners"}
            className="
    button border border-[#ddd]
     p-2 rounded-lg px-6"
          >
            Top Winners
          </Link>
        </div>
      </div>
    </div>
  );
}
