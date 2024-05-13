import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import MapM from "./Map";

export function MapModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          width={44}
          height={44}
          src={"/test/location.svg"}
          className="rounded-3xl border-b
       border-black border-b-xxl p-1 cursor-pointer  "
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[100%]">
        <DialogHeader>
          <DialogTitle>Branch Location</DialogTitle>
          <DialogDescription>
            Please Allow Your Location To Be Able To Review
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
 
          <MapM />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
