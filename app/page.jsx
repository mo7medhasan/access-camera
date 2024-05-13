
import React from 'react'

import Link from 'next/link';
export default function page() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
    <Link href={"/camera"} className='w-full text-6xl  text-center'>
    camera
    </Link>
    </div>
  )
}
