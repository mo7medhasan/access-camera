import UseeCard from '@/components/UseeCompoenents/UseeCard';
import React from 'react'

export default function PageUSee() {
  return (
    <div className="flex flex-col h-full gap-10 py-20 my-10 ">
      <h1 className="w-full text-center text-6xl font-bold">U See</h1>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
      {Array.from({ length: 6 }).map((_, index) => ( <UseeCard key={index} />
      ))}
          </div>
      
    </div>
  )
}
