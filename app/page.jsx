
import React from 'react'

import Link from 'next/link';
import CustomVideoPlayer from '@/components/VideoComponents';
export default function page() {
  return (
    <div className='w-full nim-h-[100vh]  flex flex-col justify-center items-center'>
  <Link href={"/camera/111/5456"} className='w-full text-6xl  text-center'>
    camera
    </Link>  
   <Link href={"/cam-phone/111/5456"} className='w-full text-6xl  text-center'>
    camera+v2
    </Link>
    
    <CustomVideoPlayer          
            index={1}
            UserName={"fdfdasf d fa"}
            type={"video"}
           
            src={"/test.mp4"}
            postsData={post} showPopup={false}
            setId={1} />
    
    </div>
  )
}
