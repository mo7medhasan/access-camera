"use client";
import React, { useCallback, useEffect, useState } from "react";
import { operationsServer } from "@/utils/apiUtilies";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadingAssets } from "@/utils/uploadImage";
import CameraFromPhone from "../UploadsFile/CameraFromPhone";
import { ArrowDownToLine, SendHorizontal, X } from "lucide-react";
import VideoPlayer from "../VideoComponents/VideoPlayer";
import UploadsFile from "../UploadsFile";
export default function RecordingInMobile({competition, brand}) {
  const router = useRouter();
  const [urlImage, setUrlImage] = useState(null);
  const [file, setFile] = useState(null);
  const [urlVideo, setUrlVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownload, setDownload] = useState(true);

  const uploadPostToBackend = async (tempPayload) => {
    try {
      let res = await operationsServer({
        endpoint: `/reviews`,
        payload: {
          method: `POST`,
          data: tempPayload,
        },
        revalidation: {
          tags: ["posts"],
        },
      });

      if (res?.status === "error") {
        setIsLoading(false);

        toast.error(res?.error_en, {
          position: "top-center",
        });
      } else {
        setIsLoading(false);

        toast.success(res?.success_en, {
          position: "top-center",
        });
        router.replace("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while submitting the review.", {
        position: "top-center",
      });
    }
  };

  const UploadPost = async (file, type) => {
    setIsLoading(true);
    let tempPayload = { competition, brand };

    if (file) {
      try {
        const url = await uploadingAssets(`/upload/file`, file, type);
        tempPayload.content = url?.fileUrl;
        tempPayload.contentType = type;

        await uploadPostToBackend(tempPayload);
      } catch (error) {
        toast.error("An error occurred while uploading the file.", {
          position: "top-center",
        });
      }
    } else {
      // Handle case where there is no file, if needed
      toast.error("No file provided for upload.", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      if (file.type.startsWith("image")) setUrlImage(url);
      else if (file.type.startsWith("video")) setUrlVideo(url);
      else {
        toast.error("This file is not allowed to upload");
      }
    }
  }, [file]);

  const handleDownload = useCallback(
    (urlDownload) => {
      if (urlImage || urlVideo) {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display:none";
        a.href = urlDownload;
        a.download = urlImage
          ? `image-${Math.ceil(Math.random() * 100)}-A.png`
          : `video-${Math.ceil(Math.random() * 100)}-A.mp4`;
        a.click();
        URL.revokeObjectURL(urlDownload);
      }
    },
    [urlImage, urlVideo]
  );

  return (
    <div className="relative grid grid-cols-1 min-w-full min-h-full">
      {urlImage || urlVideo ? (
        <div className=" flex  items-center  justify-center backdrop-blur-xl absolute inset-0 bg-white/50 z-20">
          {urlImage ? (
            <div className="relative rounded-2xl overflow-hidden aspect-[0.55] h-screen  bg-black  ">
              <img
                src={urlImage}
                alt="Screenshot"
                className="w-full h-full object-contain object-center aspect-[0.55]"
              />
              <button
                className="absolute  p-2 m-5 flex justify-center items-center top-5 right-2 bg-red-600 rounded-full"
                onClick={() => {
                  setUrlImage(null);
                  setDownload(false);
                  setFile(null);
                }}
              >
                <X color="white" />
              </button>
              {urlImage && isDownload ? (
                <button
                  className="  absolute  bottom-10 left-10 bg-white p-5  flex justify-center items-center rounded-full"
                  onClick={() => handleDownload(urlImage)}
                >
                  <ArrowDownToLine />
                </button>
              ) : null}
              {file ? (
                <button
                  className="  absolute  bottom-10 right-10 bg-white p-5  flex justify-center items-center rounded-full"
                  onClick={() => UploadPost(file, file?.type?.split("/")?.[0])}
                >
                  <SendHorizontal />
                </button>
              ) : null}
            </div>
          ) : null}

          {urlVideo ? (
            <div className="relative aspect-[0.5] ] h-full max-h-screen  max-w-full">
              <VideoPlayer src={urlVideo} autoPlay />
              <button
                className="absolute  p-2 flex justify-center items-center  top-5 right-2 bg-red-600 text-black rounded-full"
                onClick={() => {
                  setUrlVideo(null);
                  setFile(null);
                  setDownload(false);
                }}
              >
                <X color="white" strokeWidth={3} />
              </button>
              {/* {urlVideo && isDownload ? (
                    <button
                      className="  absolute  bottom-[30%] left-10 bg-white p-5 m-5 flex justify-center items-center rounded-full"
                      onClick={() => handleDownload(urlVideo)}
                    >
                      <ArrowDownToLine />
                    </button>
                  ) : null} */}

              {file ? (
                <button
                  className="  absolute  bottom-[30%] right-10 bg-white p-5  flex justify-center items-center rounded-full"
                  onClick={() => UploadPost(file, file?.type?.split("/")?.[0])}
                >
                  <SendHorizontal />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {urlImage || urlVideo || file ? null : (
        <div className=" bottom-0 inset-x-0 bg-black/20 sm:py-5 py-3  flex justify-center items-center flex-wrap sm:gap-5 gap-2">
          <UploadsFile onChange={setFile} />

          <CameraFromPhone
            onChange={setFile}
            type={"video"}
            setDownload={setDownload}
          />

          <CameraFromPhone
            onChange={setFile}
            type={"image"}
            setDownload={setDownload}
          />
        </div>
      )}
    </div>
  );
}
