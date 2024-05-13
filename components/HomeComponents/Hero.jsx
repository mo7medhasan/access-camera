import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full rounded-2xl aspect-[4/1] bg-[url(https://img.freepik.com/premium-vector/vector-design-starlight-light-effect-starry-sky-light-effect-star-night-sky_437689-143.jpg?w=996)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex  lg:items-center lg:px-8">
        <div className="max-w-xl  ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl space-y-6 text-white sm:text-5xl">
           <span>Lorem ipsum dolor</span> 
            <strong className="block text-main font-extrabold">
              
              dolor sit.
            </strong>
          </h1>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="#"
              className="block w-full rounded-xl bg-main px-12 py-3 text-sm font-medium text-white shadow hover:bg-main focus:outline-none focus:ring active:bg-main sm:w-auto"
            >
              See More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
