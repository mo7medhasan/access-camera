
import Hero from "@/components/HomeComponents/Hero";
import UseeCard from "@/components/UseeCompoenents/UseeCard";
import SliderVideos from "@/components/HomeComponents/SliderVideos";

export default function Home() {
 
  return (
   
      <main className="flex flex-col justify-center items-center h-full gap-5 p-10">
      
        <Hero />
       <SliderVideos/>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
            {Array.from([0, 1, 2, 3]).map((item) => {
              return <UseeCard />;
            })}
          </div>
        </div>
      </main>
    
  );
}
