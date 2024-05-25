import React from "react"; // Use Next.js Link for navigation
import { Linkedin, Facebook, Twitter, MailOutline, Sms } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SnapchatIcon, WhatsAppIcon } from "@/public/Icons";

const icons = {
  LinkedIn: Linkedin,
  Facebook: Facebook,
  Twitter: Twitter,
  Snapchat: SnapchatIcon,
  WhatsApp: WhatsAppIcon,
 
};

const SocialLink = ({ social, isActive, position,id,handleSharePost, ...rest }) => {
  const Icon = icons[social?.outlet];
  const animationClasses = `
    transition duration-200 ${isActive ? "ease-in-out" : ""}`;

  const positionClasses = isActive ? ` ` : "opacity-0 top-0 left-0";


  return (
    <Link 
      href={social.href}
      onClick={()=>handleSharePost(id,social.outlet)}
      {...rest}
      style={{
        right: isActive ? `60px` : "0px",
        top: isActive ? `${calculateLeftPosition(position)}px` : "0px",
        backgroundColor: social.background,
      }}
     
        target="_blank"
      className={cn(
        animationClasses,
        positionClasses,
        isActive ? `transform scale-1 ` : " scale-[0.2] ",
        `
    absolute   items-center justify-center flex
    rounded-full  text-white
    outline-none 
    px-3 py-2  transition-all duration-200 transform hover:bg-gray-200`
      )}
    >
      <Icon />
    </Link>
  );
};
const calculateLeftPosition = (position) => {
  return `${(-1) ** position * Math.ceil(position / 2) * 50}`;
};
export default SocialLink;
