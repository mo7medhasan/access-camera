
import { Disclosure } from "@headlessui/react";
import MobileMenu, { MobileMenuButton } from "./mobileMenu";
import UserDropDownMenu from "./userDropDownMenu";
import ThemeSelector from "./theme-swither";
import { cookies } from "next/headers";
import Navlinks from "./navlinks";
import { userNavigation, navigation } from "./NavSettings";
import LoginButton from "./loginButton";

export default function Navbar() {
   5 
  const theme = cookies().get("theme");
  const user = cookies().get("user");
  const token =  cookies().get("token");
  return (
    <>
      <div className="min-h-full sm:px-1 lg:px-20 sticky top-0 z-[100] 
       w-[100%]   bg-[#f7f1fb]">
        <Disclosure as="nav">
          <>
            <div className="mx-auto   px-4 sm:px-6 lg:px-8 w-[100%]">
              <div className="flex h-16 items-center justify-between ">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-auto">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                </div>
                <Navlinks navigation={navigation}  />
                <div className="hidden md:block w-fit">
                  <div className="ml-4 flex items-center md:ml-6">
                    <ThemeSelector theme={theme?.value} />
                    <UserDropDownMenu  user={user} />
                  <LoginButton user={user} token={token}/>
                    {/* Profile dropdown */}
                  </div>
                </div>

                <MobileMenuButton />
              </div>
            </div>

            <MobileMenu
              navigation={navigation}
               userNavigation={userNavigation}
               user={user} token={token}
            />
          </>
        </Disclosure>
      </div>
    </>
  );
}
