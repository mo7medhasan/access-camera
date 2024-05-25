
import React from 'react'

import Link from 'next/link';
export default function page() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
  <Link href={"/camera/111/5456"} className='w-full text-6xl  text-center'>
    camera
    </Link>  
   <Link href={"/cam-phone/111/5456"} className='w-full text-6xl  text-center'>
    camera+v2
    </Link> </div>
  )
}
