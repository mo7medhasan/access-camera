import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { GetUserLocation } from "./functions/getUserLocation";
import { Autocomplete } from "@react-google-maps/api";
import { getAddressFromCoords } from "./functions/setUserLocain";
import { GenUserRoute } from "./functions/geuserRoute";

export default function SubmitForm({
  origin,
  SetOrigin,
  center,
  SetDirectionResp,
  mapDirection,
}) {
  const [UserLocation, SetUserLocation] = useState("");
  const Destination = useRef(null);
  useEffect(() => {
    if (origin && UserLocation !== "") {
      (async () => {
        if (origin?.lng !== "" && origin?.lat !== "") {
          const Returing = await getAddressFromCoords(origin?.lng, origin?.lat);
          SetUserLocation(Returing?.split(" ").slice(1).join(" "));
        }
      })();
    } else {
    }
  }, [origin]);
  // GenUserRoute
  const direction = (MapWay) => {
    if (MapWay === "DRIVING") {
      return google.maps.TravelMode?.DRIVING;
    } else if (MapWay === "BICYCLING") {
      return google.maps.TravelMode?.BICYCLING;
    } else if (MapWay === "WALKING") {
      return google.maps.TravelMode?.WALKING;
    }
  };
  useEffect(() => {
    (async () => {
      if (Destination?.current?.value !== "") {
        try {
          const directionService = new google.maps.DirectionsService();
          const DRIVING = await directionService.route({
            origin: UserLocation,
            destination: Destination?.current?.value,
            travelMode: google.maps.TravelMode?.DRIVING,
          });
          console.log(DRIVING, "DRIVING");
          SetDirectionResp(DRIVING);
        } catch (error) {
          console.log(error, "Returninadsadsadsdasg");
        }
      }
    })();
  }, [UserLocation, Destination?.current?.value]);

  return (
    <>
      <div
        className="absolute right-[50%] w-fit top-5  
       translate-x-[50%] translate-y-[50%] bg-white p-3 rounded-2xl
       items-center h-fit
       shadow-[rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px]  "
      >
        <div className="flex flex-col">
          <h6 className="m-3 text-center">Write Review</h6>
          <div className="flex">
            <Autocomplete>
              <input
                placeholder="Origin"
                className=" outline-none b order my-3 ms-3 me-3 p-2 
                        rounded-xl text-xs m-auto"
                value={UserLocation}
                onChange={(e) => SetUserLocation(e.target.value)}
              />
            </Autocomplete>

            <button
              className="rounded-[50%] p-1 h-6 me-3   border-black  m-auto ms-3"
              onClick={() => GetUserLocation(SetOrigin)}
            >
              <Image
                width={50}
                height={50}
                className="w-[15px]"
                src={"/icons/icons8-location-50.png"}
              />
            </button>
          </div>
          <Autocomplete>
            <input
              placeholder="Distance"
              className="  outline-none b 
                      order my-3  
                     border-[#ddd]
                      ms-3 me-3 p-2 
                      rounded-xl text-xs 
                      m-auto "
              ref={Destination}
            />
          </Autocomplete>
          <textarea
            placeholder="Review Discription"
            className="   outline-none b order my-3 border 
                   border-[#ddd] ms-3 me-3 p-2  
                   rounded-xl
                   text-xs
                    m-auto"
          />
          <button className="rounded-[50%] p-1 h-6 me-3   border-black  m-auto ms-3">
            <Image
              width={50}
              height={50}
              className="w-[25px] ms-auto my-3 "
              src={"/icons/icons8-camera-50.png"}
            />
          </button>
          <div className="flex justify-between p-3 h-auto my-3">
            <button className="text-xs bg-[#eee] rounded-lg h-3 flex items-center my-auto text-black p-3">
              close
            </button>
            <button className="text-xs bg-black rounded-lg h-3 flex items-center my-auto text-white p-3">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
