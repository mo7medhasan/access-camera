
import React from 'react'
import dynamic from 'next/dynamic';
export default function page() {
    const VideoRecordingDialog = dynamic(() => import('@/components/RecordVideo'), { ssr: false });
  return (
    <div>
      <VideoRecordingDialog />
    </div>
  )
}
