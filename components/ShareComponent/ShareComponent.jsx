"use client"
import React, { useState } from 'react'
import ShareButton from './ShareButton';
import SocialLink from './SocialLink';

// "https://api.whatsapp.com/send?text=GitHub%3A%3A%20http%3A%2F%2Fgithub.com"
export default function ShareComponent({url,title}) {
   const socials = [
  {
    outlet: "LinkedIn",
    href:
      `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`,
    background: "#0a66c2",
    color: "white",
    label: "Share on LinkedIn",
  
  },
  {
    outlet: "Facebook",
    href:
      `https://www.facebook.com/sharer.php?u=${url}`,
    background: "#3b5898",
    color: "white",
    label: "Share on Facebook",

  },
  {
    outlet: "Twitter",
    href:
      `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=dannysasse`,
    background: "#00aced",
    color: "white",
    label: "Share on Twitter",
   
  },
  {
    outlet: "Snapchat",
    href:
      `https://www.snapchat.com/add/snaps?url=${url}&text==${title}&via=dannysasse`,
    background: "#FFFC00",
    color: "white",
    label: "Share on Snapchat",
   
  },
    {
    outlet: "WhatsApp",
    href:
     `https://web.whatsapp.com/send/?text=${url}&text==${title}&via=dannysasse`,
    background: "#23b54e",
    color: "white",
    label: "Share on WhatsApp",
   
  },
];
const [menuActive, setMenuActive] = useState(false);

  const handleToggleMenu = () => {
    setMenuActive((prevActive) => !prevActive);
  };

  const socialLinks = socials.map((social, index) => (
    <SocialLink
      key={index}
      social={social}
      isActive={menuActive}
      position={index}
    />
  ));

  return (
    <div className=" w-12 h-12 rounded-full backdrop-blur-3xl bg-black/30 flex justify-center items-center">
  
      <div className=" flex items-center justify-center">
        <ShareButton isActive={menuActive} onClick={handleToggleMenu} />
      {socialLinks}
      </div>
    </div>
  );
}

