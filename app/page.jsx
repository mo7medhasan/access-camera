
import React from 'react'

import Link from 'next/link';
import CustomVideoPlayer from '@/components/VideoComponents';
import ProductCard from '@/components/ProductCard';
export default function page() {
  return (
    <div className='w-full nim-h-screen h-screen gap-10 flex justify-center items-center bg-black'>
 <ProductCard />
    </div>
  )
}
