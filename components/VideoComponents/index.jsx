import { FlagIcon, ShareIcon, StarIcon } from "@/public/Icons";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import ModalVideo from "./ModalVideo";

const ActionButton=[{
  id:"flag",icon:FlagIcon,action:()=>{}
},
{
  id:"Share",icon:ShareIcon,action:()=>{}
},
{
  id:"Star",icon:StarIcon,action:()=>{}
}]
export default function CustomVideoPlayer({
  src,
  autoPlay = false,
  muted,
  Loop,showPopup=true,
  ...props
}) {
  return (
    <div className="relative w-full max-w-[30rem]">
      <VideoPlayer
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        Loop={Loop}
        {...props}
      />
      <Image
        src={"/test/download.png"}
        className="absolute w-16 h-16 rounded-full top-7 left-7   z-30 shadow-sm shadow-black"
        height={500}
        width={500}
        alt="logo"
      />
   {showPopup?   <ModalVideo src={src}/>:null}
      <div className="absolute z-30 right-2 bottom-[10%]  text-white flex flex-col gap-6">
      {ActionButton.map((buttonItem)=>( <button  key={buttonItem.id} onClick={buttonItem.action()} className="w-12 h-12 rounded-full backdrop-blur-3xl bg-black/30 flex justify-center items-center">
          <buttonItem.icon  className="fill-white w-6 h-6" />
        </button>))}
      </div>
    </div>
  );
}
