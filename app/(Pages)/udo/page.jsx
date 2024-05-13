import { MapModal } from '@/components/udoComponents/Map Location'
import Card from '@/components/udoComponents/cardcomponent'
import SearchBar from '@/components/udoComponents/searchbar.jsx'
import Slider from '@/components/udoComponents/slider'
import React from 'react'

export default function Udo({searchParams}) {
  console.log(searchParams)
  return (
    <div className='h-screen  '>
        

        <SearchBar/>
        <Slider/>
        <Card/>

       
    </div>
  )
}
