"use client";
import Image from "next/image";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerF,
} from "@react-google-maps/api";
import Distanceicons from "./distanceicons";
import SubmitForm from "./SubmitForm";
import { useState, useEffect, useRef } from "react";
import { GetUserLocation } from "./functions/getUserLocation";
import { findNearestLocation } from "./functions/calculateDistance";
export default function MapM() {
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };
   const [center, Setcenter] = useState({ lat: '', lng:''  });
  const [directionResp, SetDirectionResp] = useState(null);
  const [distenation,setDistantion]=useState({ lat: '', lng:''  })
  const [markers,setMarkers]=useState([
      {
        title: "1",
        lat: 30.02875199631896,
        lng: 31.1864279396832,
        description: "location 1",
      },
    {
        title: "0",
        lat: 30.046597773813346,
        lng: 31.194218080490828,
        description: "location 0",
      },
      {
        title: "2",
        lat: 30.048595019223164,
        lng: 31.194957699626684,
        description: "location 2",
      },
      { 
        title: "3",
        lat: 30.04970519427453,
        lng: 31.192080359905958,
        description: "location 3",
      },
    // ... add more markers as needed
  ])
   const zoom = 15;
 
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCP0_tqmPq6vtAnbrTJnKFvCls9OagH3G4",
    libraries: ["places"],
  });
  useEffect(() => {
    GetUserLocation(Setcenter)
    console.log(center,'center')

  }, [isLoaded]);
  useEffect(() => {
  
    if (center?.lat !== "" && center?.lng !== "") {
        console.log(center,markers,'center')
    const nearestLocation = findNearestLocation(center?.lat, center?.lng, markers);
    setDistantion(nearestLocation)
 
}
  }, [center,isLoaded]);
  useEffect(()=>{
    (async () => {

        try {
          const directionService = new google.maps.DirectionsService();
          const DRIVING = await directionService.route({
            origin:{ lat: center?.lat, lng: center?.lng } ,
            destination:distenation ,
            travelMode: google.maps.TravelMode?.DRIVING,
          });
          console.log(DRIVING, "DRIVING");
          SetDirectionResp(DRIVING);

        } catch (error) {
          console.log(error, "Returninadsadsadsdasg");
        }
  
    })();
  },[distenation])
  if (!isLoaded) {
    return <>loading google map</>;
  }
  return (
    <div className="  h-full w-full">
      <div className="  bg-slate-600" style={{ width: "100%", height: "100%" }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          options={{
            controlSize: false,
            zoomControl: false,
            mapTypeControl: false,
          }}
        >
            {
                console.log(directionResp,'directionResp')
            }
          {directionResp && <DirectionsRenderer  directions={directionResp} />}
          {/* <MarkerF position={origin} /> */}
          {markers?.map((marker,index) => {
            return    <Marker
            key={marker?.lat+marker.lng}
            onClick={() => {
                console.log(index,'indasex press')
                setDistantion(markers[index])

            //   getLocation();
            //   setCurrentRoute(index);
            }}
            position={marker}
            title={marker.title}
            // description={item.description}
          />
          })}
        
        </GoogleMap>
      </div>
      {/* <SubmitForm
        center={center}
        SetDirectionResp={SetDirectionResp}
        origin={origin}
        SetOrigin={SetOrigin}
        mapDirection={mapDirection}
      /> */}
      {/* <Distanceicons
        origin={center}
        setOrigin={Setcenter}
        SetMapDirection={SetMapDirection}
        mapDirection={mapDirection}
      /> */}
    </div>
  );
}
