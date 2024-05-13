import Image from "next/image";
import React from "react";


const followers = [
  { id: 1, name: 'Francine Williamson', count: 200 },
  { id: 2, name: 'Denise Cook', count: 200 },
  { id: 3, name: 'Johnny Gibson', count: 200 },
  { id: 4, name: 'Marie Willis', count: 200 },
  { id: 5, name: 'Francine Williamson', count: 200 },
  { id: 6, name: 'Denise Cook', count: 200 },
  { id: 7, name: 'Johnny Gibson', count: 200 },
  { id: 8, name: 'Marie Willis', count: 200 },
  { id: 9, name: 'Francine Williamson', count: 200 },
];

export default function PageWinners() {
  return (
    <div className="flex flex-col h-full gap-10 py-20 my-10 ">
      <h1 className="w-full text-center text-6xl font-bold">Top Winners </h1>

      <section className=" my-10  pt-80">
        <div className="relative bg-gradient-to-b from-main/25 to-mainYellow/25 pt-[21rem] py-10">
          <div className="layout-image -translate-y-1/2 top-0 left-1/2    -translate-x-1/2 absolute bg-main/30 p-20 rounded-full  ">
            <div className="layout-image2   bg-main/25 p-20 rounded-full ">
              <div className="layout-image3   bg-main/25 p-20 rounded-full ">
                <div className="layout-image4  relative w-56 h-56">
                  <Image
                    src={"/test/download.png"}
                    fill
                    sizes="1000px"
                    className="rounded-full object-cover object-center"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative  mt-10">
          <div className="absolute top-0  z-0 -left-1/3 h-28 w-[150vw] bg-main/40"/>
            <div className="z-50 sticky top-0 flex flex-col w-[90%]  mx-auto">

            {followers.map(follower=>( <div key={follower.id} className=" flex gap-10 items-center h-28 text-4xl font-medium text-white ">
                <span>{follower.id}</span>
                <div className="layout-image1  relative w-16 h-16">
                  <Image
                    src={"/test/user.jpg"}
                    fill
                    sizes="1000px"
                    className="rounded-full object-cover object-center border-2 border-mainYellow"
                    alt="user"
                  />
                </div>
                <span className="text-black">{follower.name}</span>
                <span className="flex-1 text-end flex justify-end">{follower.count}</span>
              </div>)) }
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
