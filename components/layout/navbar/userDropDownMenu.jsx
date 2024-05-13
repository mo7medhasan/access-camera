"use client"
import React ,{Fragment}from 'react'
import {  Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import { usePathname, useRouter } from 'next/navigation'
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
export default function UserDropDownMenu({user}) {
  const router = useRouter();
  const pathname=usePathname();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
   return (
    <Menu as="div" className="relative ml-3">
    <div>
      <MenuButton onClick={()=>user&&user?.value!==""?router.push('/profile'):router.push('/signin') } className={`
      relative flex max-w-xs items-center rounded-full bg-gray-800
       text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
        focus:ring-offset-gray-800  ${pathname==="/profile"?"border  border-black ":""}`}>
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img className="h-8 w-8 rounded-full" src={
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        } alt="" />
      </MenuButton>
    </div>
    {/* <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {userNavigation.map((item) => (
          <MenuItems key={item.name}>
          
               <a
                href={item.href}
                className={classNames(
                  
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                {item.name}
              </a>
          </MenuItems>
        ))}
      </MenuItems>
    </Transition> */}
  </Menu>
  )
}
