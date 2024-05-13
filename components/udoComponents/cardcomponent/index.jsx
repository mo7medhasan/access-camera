import { Slider } from '@/components/ui/slider'
import { LocationIcon, RestaurntIcon } from '@/public/Icons'
import { CameraIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { MapModal } from '../Map Location'


  
export default function Card() {
  return (
    <div className='border relative border-gray w-fit flex flex-col  rounded-3xl'>
 
      <div className="flex items-center gap-5 justify-between p-2">
        <div className="restaurant_bage">
          <RestaurntIcon className="
            w-[20px]
          "/>
        </div>

      <div className="restaurantLogo">
        <Image src={'/test/respng.png'} width={100} height={100}/>
      </div>



      <div className="progressBarDate flex flex-col items-start">
        <span className='perc'> 90%</span>
        <Slider   defaultValue={[50]} max={100} step={1} />
      <span className=''>show time</span>
      <span className=''>22/12/2022</span>
      </div>
      <div className="withIcon flex items-center flex-col mx-3 gap-2 text-[#969595] ">
        <span className='text-xs xl:text-md'>U Take</span>
<MapModal/>


      </div>
      <div className="withIcon flex items-center flex-col mx-3 gap-2 text-[#969595]">
      <span className='text-xs xl:text-md'>Branches</span>

      <Image width={44} height={44} src={'/test/cameratest.svg'} className=' rounded-3xl border-b border-black border-b-xxl      p-1'/>
      </div>
    

      </div>
      

      <button className='w-[90%] mx-auto my-8 rounded-3xl p-4 shadow-sm   
       inset-0 border-[3px] border-gradient-to-r from-green-[100%] via-yellow-[100%] to-purple-[100%] 
      '>
        Today
      </button>

    </div>
  )
}
