import { FlagIcon, ShareIcon, StarIcon } from "@/public/Icons";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { Suspense } from "react";
import ShareComponent from "../ShareComponent/ShareComponent";
import Flag from "@/public/Icons/flag.svg";
let url ="https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig";
let title="Beginner's%20Guide%20to%20Jest%20Testing%20in%20React"

export default function CustomVideoPlayer({
  src,
  autoPlay = false,
  muted,
  Loop,showPopup=true,
  ...props
}) {
  return (
    <div className="relative w-full max-w-[30rem]">
      <Suspense fallback={<p>Loading video...</p>}>
        <VideoPlayer
          src={src}
          autoPlay={autoPlay}
          muted={muted}
          Loop={Loop}
          {...props}
        />
      </Suspense>
      <Image
        src={"/test/download.png"}
        className="absolute w-16 h-16 rounded-full top-7 left-7   z-30 shadow-sm shadow-black"
        height={500}
        width={500}
        alt="logo"
      />
   
   <div className="absolute z-30 right-2 bottom-[10%]  text-white flex flex-col gap-6">
       
       <button className=" w-12 h-12 rounded-full backdrop-blur-3xl bg-black/30 flex justify-center items-center">
        <Image src={Flag} alt="" width={80} height={80} className="w-4 h-4 mx-auto" />
       </button>
       <ShareComponent  url={url}
title={title} />
       <button className=" w-12 h-12 rounded-full backdrop-blur-3xl bg-black/30 flex justify-center items-center">
         <StarIcon className="fill-[#DEDEDECC] w-4 h-4 mx-auto" />
       </button>
     </div>
    </div>
  );
}
