import Link from "next/link";
import React from "react";
import { FooterSettings } from "./settings";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-10 md:gap-2 p-10">
        <div className="logo">Logo</div>

        <div className="appstore">
          <div className="socials flex gap-3  ">
          <div className="
              bg-white
                rounded-[50%]
                p-[5px]
                flex
                items-center
                h-[30px]
                w-[30px]
                "
                >
            <Image
              src={FooterSettings.social.facebook.src}
              width={25}
              height={25}
             
            />
            </div>
            <div className="
              bg-white
                rounded-[50%]
                p-[5px]
                flex
                items-center
                h-[30px]
                w-[30px]
                "
                >
            <Image
              src={FooterSettings.social.twitter.src}
              width={25}
              height={25}
         
            />
                 
                 </div>
                 <div className="
              bg-white
                rounded-[50%]
                p-[5px]
                flex
                items-center
                h-[30px]
                w-[30px]
                "
                >
            <Image
              src={FooterSettings.social.instgram.src}
              width={25}
              height={25}
           
            />
            </div>
            <div className="
               bg-white
               rounded-[50%]
               p-[5px]
               flex
               items-center
               h-[30px]
               w-[30px]
               
               "
                >


            <Image
              src={FooterSettings.social.linkedIn.src}
              width={22}
              height={22}
              
              />
              </div>
          </div>
        </div>

        <div className="contact">
          <div className="withlogo">{FooterSettings?.contact?.phone}</div>
          <div className="withlogo">{FooterSettings?.contact?.email}</div>
          <div className="withlogo">
            <Link href={FooterSettings?.contact?.location} target="_blank">
              {FooterSettings?.contact?.location}
            </Link>
          </div>
        </div>

        <div className="page flex flex-col gap-5">
          {FooterSettings?.pages.map((link) => {
            return <Link href={"#"} key={link.title}>{link.title}</Link>;
          })}
        </div>
      </div>
    </>
  );
}
