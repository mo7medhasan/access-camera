import { cookies, headers } from "next/headers";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UDO",
  description: "  UDO",
};

export default function RootLayout({ children}) {
  const theme = cookies().get("theme")
 

  return (
    <html lang="en" className={theme?.value}>
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
