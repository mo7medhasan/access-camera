
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import CustomVideoPlayer from '../VideoComponents'
  
export default function SliderVideos() {
  return (
    <Carousel
    opts={{
      align: "start",
    }}
    className="w-full "
  >
    <CarouselContent>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3 px-6">
        <CustomVideoPlayer src={"/test.mp4"} />
        </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious   />
      <CarouselNext />
    </Carousel>
    
  )
}
