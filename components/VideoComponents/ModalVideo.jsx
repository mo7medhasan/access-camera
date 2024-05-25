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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
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
   
        <DialogContent className="sm:!w-auto !w-screen   !bg-none grid content-center justify-center border-none h-full sm:max-w-fit  !p-0">
       
          <div className="n">
            <CustomVideoPlayer src={src} showPopup={false} />
          </div>
          <DialogClose
            
            className="fixed md:hidden block  !cursor-pointer top-[5%] text-black right-[5%] z-[99999999999]"
          > 
          <div> <Button type="button" variant="ghost" className="!cursor-pointer ">
           <ArrowRight size={48} color="black" className="!cursor-pointer  " />
            </Button></div>
          
          </DialogClose>
        </DialogContent>
        <DialogClose
            
            className="fixed hidden md:block  !cursor-pointer top-[5%] text-black left-[5%] z-[99999999999]"
          > 
          <div>
           <ArrowLeft size={48} color="black" className="!cursor-pointer  " />
            </div>
          
          </DialogClose>
      </DialogPortal>
    </Dialog>
  );
}
