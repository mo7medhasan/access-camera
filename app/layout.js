"use client"
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";



export default function RootLayout({ children}) {
  

  return (
    <html lang="en" >
      <body className="
        bg-[#f7f1fb]
        text-black
        dark:bg-black
        dark:text-white
        transition
        duration-700
        overflow-x-hidden
     
        "
      >
                <Toaster swipeDirection="top" />

     <main >  {children}</main> </body>
    </html>
  );
}
