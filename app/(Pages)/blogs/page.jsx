import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PageBlogs() {
  return (
   
      <div className="flex flex-col h-full gap-10 py-20 mt-10">
        <h1 className="w-full text-center text-6xl font-bold">Blogs </h1>
        <p className="text-3xl font-normal">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy
        </p>
        <section className="w-full h-full relative  grid lg:grid-cols-4 sm:grid-cols-2   gap-12 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <Link
              href={"/"}
              key={index}
              className={
                "  relative w-full  h-[31rem] first:!col-span-2 last:!col-span-2"
              }
            >
              <Image
                src={
                  index == 0 || index == 5
                    ? "/test/blog1.jpg"
                    : "/test/blog2.jpg"
                }
                className="object-cover object-center rounded-3xl shadow "
                sizes="800px"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Link>
          ))}
        </section>
      </div>
   
  );
}
