 import React from 'react'
import Navbar from './navbar'
import Footer from './Footer'
import { headers, } from 'next/headers';
 
export default function Layout({children} ) {
     return (
   <>
   
    <Navbar/>
{
    children
}
<Footer/>
   </>
  )
}
