
import React from 'react'
import RecordingInMobile from '@/components/RecordingInMobile';
export default function page({  params: { competition,brand}}) {


  return (
    <div className='w-screen h-screen'>
    <RecordingInMobile  competition={competition} brand={brand} />
    </div>
  )
}
