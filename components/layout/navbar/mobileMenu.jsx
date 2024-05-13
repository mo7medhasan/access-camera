"use client"
import { DisclosureButton, DisclosurePanel } from '@headlessui/react'
import React from 'react'
import { usePathname } from 'next/navigation';
function MobileMenu({userNavigation,navigation,user,token}) {
  const isUser =
  user && user.value === "user" && token && token.value !== "" ? true : false;  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const pathname = usePathname();
  const handleUser = async () => {
    if (isUser) {
      await Logout();
    } else {
      router.push("/signin");
    }
  };
  return (
    <DisclosurePanel className="md:hidden">
    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
      {navigation.map((item) => (
        <DisclosureButton
          key={item.name}
          as="a"
          href={item.href}
          className={classNames(
            item.href===pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.name}
        </DisclosureButton>
      ))}
    </div>
    <div className="border-t border-gray-700 pb-3 pt-4">
      <div className="flex items-center px-5">
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          } alt="" />
        </div>
        <div className="ml-3">
          {/* <div className="text-base font-medium leading-none text-white">{user.name}</div>
          <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div> */}
        </div>
         
      </div>
      <div className="mt-3 space-y-1 px-2">
        
        
      <button className='p-3' onClick={handleUser}>{!isUser?"Login":"logout"}</button>


        {/* {userNavigation.map((item) => (
          // <DisclosureButton
          //   key={item.name}
          //   as="a"
          //   href={item.href}
          //   className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          // >
          //   {item.name}
          // </DisclosureButton>
        ))} */}
      </div>
    </div>
  </DisclosurePanel>
  )
}



export default MobileMenu


export const MobileMenuButton=()=>{
    return(
        <div className="-mr-2 flex md:hidden">
        {/* Mobile menu button */}
        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open main menu</span>
          {/* {open ? (
            <></>
            // <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <></>
            // <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
          )} */}
        </DisclosureButton>
      </div>
    )
}