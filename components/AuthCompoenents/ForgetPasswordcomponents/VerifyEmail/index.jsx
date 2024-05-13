"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import VerifyEmailForm from './verifyEmail'

export default function VerifyEmail() {
  const router = useRouter()
  return (
    <div className="    h-[100dvh] ">
    <div className="mx-auto  max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg dark:bg-[#1c191e] ">
      <VerifyEmailForm/>
    </div>
    </div>
    </div>
  )
}
