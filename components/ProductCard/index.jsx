import Image from "next/image";
import React from "react";
import AddToWishlist from "./AddToWishlist";
import AddToCart from "./AddToCart";

export default function ProductCard() {
  return (
    <div className="relative max-w-[330px] rounded-[8px] border w-full h-full max-h-[617px] overflow-hidden ">
      <Image
        src={"/test2.jpeg"}
        alt=""
        sizes="100vw"
        fill
        className="object-cover origin-center "
      />
      <div className="relative z-10 inset-0 h-[617px]">
      <div className="absolute right-0 bg-white top-[10%] text-[#92846E] py-1.5 px-3 text-lg font-semibold  border-[#92846E] border-2 border-e-0 ">
      30% sale
      </div>
        <div className="absolute inset-x-0 text-white rounded-t-[40px] bottom-0 p-4 pt-6 bg-[#8D8D8D80]  grid grid-cols-1 gap-2 ">
          <div className="flex w-full gap-2 items-center ">
            <div className="flex-1 flex flex-col ">
              <h3 className="font-semibold text-base">hair dresser</h3>
              <p className="text-[10px] font-light line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </div>
            <AddToWishlist />
          </div>
          <div className=" flex justify-center font-medium gap-4 items-center">
            <p className="text-lg ">100 SAR</p>
            <p className="text-base ">
              <s> 100 SAR </s>
            </p>
          </div>

          <AddToCart />
        </div>
      </div>
    </div>
  );
}
