"use client";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { Suspense } from "react";
import ShareComponent from "../ShareComponent/ShareComponent";

import Link from "next/link";
import { StarIcon } from "./Icons";
// import { imageBaseUrl } from "@/helpers/baseUrl";

export default function CustomVideoPlayer({
  UserName,
  type,
  src,
  autoPlay = false,
  muted,
  index,
  page,
  // ImageBrand,
  Loop,
  showPopup = true,
  // postsData,
  // setOpenModal,
  // setId,
  
  ...props
}) {

  let url = `https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig`;
  let title = "postsData?.competition?.name_en";
  // const handleOpenModal = (id) => {
  //   setOpenModal(true);
  //   setId(id);
  // };
  return (
    <div
      className="relative w-full rounded-2xl h-full max-w-[30rem] !aspect-[0.55] min-h-[70vh]  max-h-[80vh]"
      dir={"ltr"}
    >
      {type == "video" ? (
        <Suspense fallback={<p>Loading video...</p>}>
          <VideoPlayer
            src={src}
            autoPlay={autoPlay}
            muted={muted}
            Loop={Loop}
            index={index}
            id={4564}
            {...props}
          />
        </Suspense>
      ) : (
        <div className="relative rounded-2xl overflow-hidden !aspect-[0.55]  w-full max-w-[30rem] min-h-[70vh]  max-h-[80vh] bg-black ">
          <div className=" bg-black w-full h-full ">
            <Image
              src={src}
              fill
              className="object-contain object-center !aspect-[0.55] max-w-[30rem] min-h-[70vh]  max-h-[80vh] w-full h-full"
              sizes="100vw"
            />{" "}
          </div>
        </div>
      )}
      <Image
        src={"/default.png"}
        className="absolute  rounded-full top-7 left-7   z-30 shadow-sm shadow-black"
        height={64}
        width={64}
        alt="logo"
      />
  
      <div className="absolute bottom-[10%] z-5 inset-x-0 text-sm rounded-2xl backdrop-blur-sm flex flex-col gap-1 bg-black/5 p-1 text-white  pr-[20%] px-6">
      
      <span className="font-medium">{"postsData?.user?.nam"}</span>
      <p className="font-light truncate	">{"postsData?.competition?.description_en"}</p>
      </div>
      <div className="absolute z-30 right-2 bottom-[10%]  text-white flex flex-col gap-6">
        <Link
          href={`/winners/${"postsData?.competition?._id"}`}
          className=" w-12 h-12 gap-px flex-col  rounded-full backdrop-blur-3xl bg-black/30 flex justify-center items-center"
        >
          <Image
            src={"/Icons/comments-button.svg"}
            alt=""
            width={80}
            height={80}
            title="comment"
            className="w-5 h-5"
          />
        </Link>

        <button
          onClick={() => {}}
          className=" w-12 h-12 gap-px flex-col rounded-full backdrop-blur-3xl bg-black/30 flex justify-center items-center"
        >
          {true? (
            <StarIcon className="fill-mainYellow w-4 h-4 mx-auto" />
          ) : (
            <StarIcon className="fill-white w-4 h-4 mx-auto" />
          )}
          <span className="text-xs text-white ">
       
          </span>
        </button>

        <button
          onClick={() => {}}
          className=" w-12 h-12 gap-px flex-col  rounded-full backdrop-blur-3xl bg-black/30 flex justify-center items-center"
        >
          <Image
            src={"/Icons/comments-button.svg"}
            alt=""
            width={80}
            height={80}
            title="comment"
            className="w-5 h-5"
          />

          <span className="text-xs text-white">
            {" "}
          </span>
        </button>
        <ShareComponent
          url={url}
          title={title}
          id={212}
          totalComments={2 }
          handleSharePost={()=>{}}
        />
        <button
          onClick={() =>{}}
          className=" w-12 h-12 gap-px flex-col rounded-full backdrop-blur-3xl bg-black/30 flex justify-center items-center"
        >
          <Image
            src={"/Icons/flag.svg"}
            alt=""
            width={80}
            height={80}
            className="w-4 h-4 mx-auto"
          />
          <span className="text-xs text-white">]
          </span>
        </button>
      </div>
      {showPopup ? (
        <div className="absolute z-10 inset-0">
          <Link
            className="z-[19] hover:bg-white/20 "
            href={`/videos/${index}`}
            passHref
          >
            <div className="absolute z-[19]  hover:bg-white/50 inset-0" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
