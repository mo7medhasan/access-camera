"use client"
 // import { usePathname } from 'next/navigation'
import React from 'react'

import  Link  from 'next/link';
import { usePathname } from 'next/navigation';
export default function Navlinks({navigation}) {
    const pathname = usePathname();
     function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
      }
  return (
    <div className="hidden md:block   ">
    <div className="ml-10 flex  items-baseline space-x-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.href===pathname
              ? "border-b-2 capitalize   border-b-red-500 "
              : "  capitalize   hover:border-b-4  hover:border-b-red-500 hover:text-black",
            "   py-2   uppercase text-[18px] font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </div>
  )
}
