
import React from 'react'
import dynamic from 'next/dynamic';
export default function page({  params: { competition,brand}}) {


    const VideoRecordingDialog = dynamic(() => import('@/components/RecordVideo'), { ssr: false });
  return (
    <div>
      <VideoRecordingDialog competition={competition} brand={brand} />
    </div>
  )
}
