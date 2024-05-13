import Image from "next/image";
import React from "react";
import { GetUserLocation } from "./functions/getUserLocation";

export default function Distanceicons({ mapDirection, SetMapDirection ,
  setOrigin}) {
  // useEffect(() => {
  //   if (origin ) {
  //     (async () => {
  //       if (origin?.lng !== "" && origin?.lat !== "") {
  //         const Returing = await getAddressFromCoords(origin?.lng, origin?.lat);
  //         SetUserLocation(Returing?.split(" ").slice(1).join(" "));
  //       }
  //     })();
  //   } else {
  //   }
  // }, [origin]);
  return (
    <div className="fixed h-[300px] w-fit p-10 bottom-[10%]">
      <div className="">
      <div 
            className={`
            rounded-3xl 
            m-2 p-2 
             flex flex-col 
            align-center justify-center
            cursor-pointer          
            `}
            >     
                <Image
            width={60}
            className="  w-[20px] m-auto mb-1"
            bg-white
            height={60}
            src={"/locationIcons/icons8-location-50.png"}
            onClick={() => GetUserLocation(setOrigin)}

          />
         </div>
        <div
          className={`
            rounded-3xl 
            m-2 p-2 
             flex flex-col 
            align-center justify-center
            hover:bg-blue-600
            ${mapDirection === "DRIVING" ? "bg-blue-600" : "bg-white"}
            ${mapDirection === "DRIVING" ? "text-white" : "bg-black"}
            curosr-pointer
            `}
           onClick={() => SetMapDirection("DRIVING")}
        >
          <Image
            width={50}
            className="  w-[20px] m-auto mb-1"
            height={50}
            src={"/locationIcons/icons8-pedicure-99.png"}
          />
          <span className="font-sans text-xs">15mins</span>
        </div>
        <div 
            className={`
            rounded-3xl 
            m-2 p-2 
             flex flex-col 
            align-center justify-center
            hover:bg-blue-600
            ${mapDirection === "BICYCLING" ? "bg-blue-600" : "bg-white"}
            ${mapDirection === "BICYCLING" ? "text-white" : "bg-black"}
            curosr-pointer
            `}
           onClick={() => SetMapDirection("BICYCLING")}>
          <Image
            width={50}
            className="  w-[20px] m-auto mb-1"
            height={50}
            src={"/locationIcons/icons8-bike-50.png"}
          />
          <span className="font-sans text-xs">15mins</span>
        </div>
        <div 
            className={`
            rounded-3xl 
            m-2 p-2 
             flex flex-col 
            align-center justify-center
            hover:bg-blue-600
            ${mapDirection === "WALKING" ? "bg-blue-600" : "bg-white"}
            ${mapDirection === "WALKING" ? "text-white" : "bg-black"}
            curosr-pointer
            `}
           onClick={() => SetMapDirection("WALKING")}>     
                <Image
            width={50}
            className="  w-[20px] m-auto mb-1"
            bg-white
            height={50}
            src={"/locationIcons/icons8-car-50.png"}
          />
          <span className="font-sans text-xs">15mins</span>
        </div>
     
      </div>
    </div>
  );
}
