"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Slider() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleAdd = (cat) => {
    console.log(cat ,'catasdd')
    params.set("catasdds", cat);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div
      className="
    flex
    items-center
    justify-center
   "
    >
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full  my-3"
      >
        <CarouselContent>
          {Array.from({ length: 20 }).map((_, index) => (
            <CarouselItem
              key={index}
              className=" 
          basis-[100px] lg:basis-[100px] "
            >
              <button
                onClick={() => handleAdd("adsdsssssss")}
                className="p-3 rounded-2xl  
               bg-[#fccbe1] h-[35px] flex items-center 
                 justify-center    "
              >
                All
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
