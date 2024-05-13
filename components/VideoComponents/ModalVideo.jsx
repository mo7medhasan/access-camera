import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import CustomVideoPlayer from ".";
import { ArrowLeft } from "lucide-react";
export default function ModalVideo({
  src,
  autoPlay = false,
  muted,
  Loop,
  ...props
}) {
  return (
    <Dialog className="!bg-transparent">
      <DialogTrigger asChild>
        <div className="absolute z-10 inset-0 cursor-pointer hover:bg-white/20 " />
      </DialogTrigger>
      <DialogPortal className="!bg-transparent relative">
        <DialogOverlay className="backdrop-blur-xl !bg-white/30 !cursor-pointer " />
   
        <DialogContent className="!w-auto   !bg-none grid content-center justify-center border-none h-full max-w-fit  !p-0">
       
          <div className="n">
            <CustomVideoPlayer src={src} showPopup={false} />
          </div>
        </DialogContent><DialogClose
            asChild
            className="fixed  !cursor-pointer top-20 text-black left-28 z-50"
          ><div className="!cursor-pointer z-50">
            <ArrowLeft size={100} color="black" className="!cursor-pointer z-50" /></div>
          </DialogClose>
      </DialogPortal>
    </Dialog>
  );
}
