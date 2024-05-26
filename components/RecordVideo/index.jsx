"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import VideoPlayer from "../VideoComponents/VideoPlayer";
import { displayTime } from "../VideoComponents/util/CustomFormat";
import UploadsFile from "../UploadsFile";
import {
  ArrowDownToLine,
  Camera,
  CircleStop,
  Disc,
  OctagonPause,
  SendHorizontal,
  SwitchCamera,
  Video,
  X,
} from "lucide-react";

import toast from "react-hot-toast";
// import { uploadingAssets } from "@/utils/uploadImage";
// import { operationsServer } from "@/utils/apiUtilies";
import { useRouter } from "next/navigation";

export default function RecordVideo({ competition, brand }) {
  const router = useRouter();
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timer = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState();
  const [urlImage, setUrlImage] = useState(null);
  const [file, setFile] = useState(null);
  const [urlVideo, setUrlVideo] = useState(null);
  const [time, setTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [recording, setRecording] = useState(false);
  const [isRunning, setRunning] = useState(false);
  const [isDownload, setDownload] = useState(true);
  const [pause, setPause] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uploadPostToBackend = async (tempPayload) => {
    // try {
    //   let res = await operationsServer({
    //     endpoint: `/reviews`,
    //     payload: {
    //       method: `POST`,
    //       data: tempPayload,
    //     },
    //     revalidation: {
    //       tags: ["posts"],
    //     },
    //   });

    //   if (res?.status === "error") {
    //     setIsLoading(false);

    //     toast.error(res?.error_en, {
    //       position: "top-center",
    //     });
    //   } else {
    //     setIsLoading(false);

    //     toast.success(res?.success_en, {
    //       position: "top-center",
    //     });
    //     router.replace("/");
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   toast.error("An error occurred while submitting the review.", {
    //     position: "top-center",
    //   });
    // }
  };

  const UploadPost = async (file, type) => {
    setIsLoading(true);
    let tempPayload = { competition, brand };

    // if (file) {
    //   try {
    //     const url = await uploadingAssets(`/upload/file`, file, type);
    //     tempPayload.content = url?.fileUrl;
    //     tempPayload.contentType = type;

    //     await uploadPostToBackend(tempPayload);
    //   } catch (error) {
    //     toast.error("An error occurred while uploading the file.", {
    //       position: "top-center",
    //     });
    //   }
    // } else {
    //   // Handle case where there is no file, if needed
    //   toast.error("No file provided for upload.", {
    //     position: "top-center",
    //   });
    // }
  };

  const handleDevices = React.useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
    },

    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  React.useEffect(() => {
    if (devices.length) setActiveDeviceId(devices[0].deviceId);
  }, [devices]);
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setUrlImage(imageSrc);
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        // Create a new File object
        const file = new File([blob], `photo-${Date.now()}.png`, {
          type: "image/png",
        });
        setFile(file);
      });
  }, [webcamRef]);
  const handleStartCaptureClick = useCallback(() => {
    setRecording(true);
    const interval = setInterval(() => {
      setTime((previousTime) => previousTime + 1);
    }, 1000);

    timer.current = interval;
    mediaRecorderRef.current = RecordRTC(webcamRef.current.stream, {
      type: "video",
    });
    mediaRecorderRef.current.startRecording();
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
  }, [webcamRef, setRecording, mediaRecorderRef, handleDataAvailable]);
  const handlePauseRecording = useCallback(() => {
    if (recording) {
      mediaRecorderRef.current.pauseRecording();
      setRecording(false);
      setPause(true);
      clearInterval(timer.current);
      timer.current = null;
    }
  }, [recording, mediaRecorderRef]);
  const handlePlayAgainRecording = useCallback(() => {
    if (recording && !pause) return;
    setRecording(true);
    setPause(false);

    const interval = setInterval(() => {
      setTime((previousTime) => previousTime + 1);
    }, 1000);

    timer.current = interval;
    mediaRecorderRef.current.resumeRecording();
  }, [recording, pause, mediaRecorderRef]);
  const handleStopCaptureClick = useCallback(() => {
    setRunning((previousState) => !previousState);
    setRecording(false);
    setPause(false);
    mediaRecorderRef.current.stopRecording(() => {
      const blob = mediaRecorderRef.current.getBlob();
      setRecordedChunks([blob]);

      const url = URL.createObjectURL(blob);
      setUrlVideo(url);
      const file = new File([blob], `video-${Date.now()}.mp4`, {
        type: "video/mp4",
      });
      setFile(file);
    });

    setEndTime(time);
    setTime(0);
    clearInterval(timer.current);
    timer.current = null;
  }, [time, recordedChunks, mediaRecorderRef]);

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

  const switchCamera = async () => {
    if (!devices.length) {
      alert("No cameras available");
      return;
    }

    const index = devices.findIndex(
      (device) => device.deviceId == activeDeviceId
    );
    if (index < devices.length - 1) {
      setActiveDeviceId(devices[+index + 1].deviceId);
    } else {
      // If no other device found, cycle back to the first one
      setActiveDeviceId(devices[0].deviceId);
    }
  };
  useEffect(() => {
    if (file) {
      setDownload(false);
      const url = URL.createObjectURL(file);
      if (file.type.startsWith("image")) setUrlImage(url);
      else if (file.type.startsWith("video")) setUrlVideo(url);
      else {
        toast.error("This file is not allowed to upload");
      }
    }
  }, [file]);
  useEffect(() => {
    if (isRunning && time > 60 * 3) {
      handleStopCaptureClick();
    }
  }, [handleStopCaptureClick, isRunning, time]);
  // console.log("file", file);
  const size = useWindowSize();
  const isLandscape = size.height <= size.width;
  const ratio = isLandscape
    ? size.width / size.height
    : size.height / size.width;
  return (
    <div className="gap-10 flex flex-col justify-center">
      <div className="flex justify-between flex-wrap">
        <div className="relative flex justify-center items-center w-full h-screen">
          <Webcam
            height={size.height}
            width={size.width}
            muted={true}
            audio={true}
            mirrored={true}
            ref={webcamRef}
            audioConstraints={{
              deviceId: "default",
            }}
            videoConstraints={{ deviceId: activeDeviceId, aspectRatio: ratio }}
          />
          {time ? (
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2  backdrop-blur-lg animate-pulse p-5 flex justify-center items-center  bg-black/30 text-red-500 rounded-full ">
              {displayTime(time)}
            </div>
          ) : null}

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
                    className="absolute p-2 flex justify-center items-center  top-5 right-2 bg-red-600  rounded-full"
                    onClick={() => {
                      setUrlImage(null);
                    }}
                  >
                    <X color="white" strokeWidth={3} />
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
                      onClick={() =>
                        UploadPost(file, file?.type?.split("/")?.[0])
                      }
                    >
                      <SendHorizontal />
                    </button>
                  ) : null}
                </div>
              ) : null}

              {urlVideo ? (
                <div className="relative aspect-[0.5] ] h-full max-h-screen  max-w-full">
                  <VideoPlayer src={urlVideo} autoPlay endTime={endTime} />
                  <button
                    className="absolute  p-2  flex justify-center items-center top-5 right-2 bg-red-600 text-black rounded-full"
                    onClick={() => {
                      setUrlVideo(null);
                      setRecordedChunks([]);
                    }}
                  >
                    <X color="white" strokeWidth={3} />
                  </button>
                  {urlVideo && isDownload ? (
                    <button
                      className="  absolute  bottom-10 left-10 bg-white p-5 m-5 flex justify-center items-center rounded-full"
                      onClick={() => handleDownload(urlVideo)}
                    >
                      <ArrowDownToLine />
                    </button>
                  ) : null}

                  {file ? (
                    <button
                      className="  absolute  bottom-10 right-10 bg-white p-5  flex justify-center items-center rounded-full"
                      onClick={() =>
                        UploadPost(file, file?.type?.split("/")?.[0])
                      }
                    >
                      <SendHorizontal />
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="absolute bottom-0 inset-x-0 bg-black/20 sm:py-5 py-3  flex justify-center items-center flex-wrap sm:gap-5 gap-2">
            {!recording && !pause ? (
              <>
                <UploadsFile onChange={setFile} />
                <button
                  className="bg-white p-5  flex justify-center items-center rounded-full"
                  onClick={handleStartCaptureClick}
                >
                  <Video />
                </button>
                <button
                  className="bg-white p-5  flex justify-center items-center rounded-full"
                  onClick={capturePhoto}
                >
                  <Camera />
                </button>
                <button
                  className="bg-white p-5  flex justify-center items-center rounded-full"
                  onClick={switchCamera}
                >
                  <SwitchCamera />
                </button>
              </>
            ) : null}
            {recording || pause ? (
              <div className="flex items-center  gap-4  h-auto py-2 px-4 rounded-full bg-black/20 ">
                {recording || pause ? (
                  <>
                    <button
                      className="bg-white  p-5   flex justify-center items-center rounded-full"
                      onClick={handleStopCaptureClick}
                    >
                      <CircleStop />
                    </button>
                  </>
                ) : null}
                {recording && !pause ? (
                  <>
                    <button
                      className="bg-white p-5  flex justify-center items-center rounded-full"
                      onClick={handlePauseRecording}
                    >
                      <OctagonPause />
                    </button>
                  </>
                ) : null}
                {!recording && pause ? (
                  <button
                    className="bg-white  p-5   flex justify-center items-center rounded-full"
                    onClick={handlePlayAgainRecording}
                  >
                    <Disc />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
// const uploadImage = async (imageData) => {

//   try {
//       const formData = new FormData();
//       formData.append('image', imageData);

//       const response = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//       });

//       const data = await response.json();

//       if (data.success) {
//           // Handle successful upload (e.g., display confirmation)
//           console.log('Image uploaded successfully!');
//       } else {
//           // Handle upload errors (e.g., display error message)
//           console.error('Error uploading image:', data.error);
//       }
//   } catch (error) {
//       console.error('Error:', error);
//   } finally {
//       // Optionally, clear captured image data after upload
//       // setImageData(null);
//   }
// };

// const handleLikePost = async (id) => {
//   if (id !== "") {
//     await operationsServer({
//       endpoint: `/reviews/like/${id}`,
//       payload: {
//         method: "PUT",
//       },
//       revalidation: {
//         tags: ["like"],
//       },
//     })
//       .then((res) => {
//         toast.success(res.success_en);
//       })
//       .catch((err) => {
//         toast.success(err.error_en);
//       });
//   }
// };

// const handleUpload = async () => {
//   const formData = new FormData();
//   formData.append('video', recordedVideo);

//   // Replace with your backend API endpoint
//   const response = await fetch('/api/upload-video', {
//     method: 'POST',
//     body: formData,
//   });

//   if (response.ok) {
//     console.log('Video uploaded successfully!');
//     // Handle successful upload (e.g., clear video)
//   } else {
//     console.error('Error uploading video!');
//   }
// };

// const uploadImage = async(data)=> {
//   const formData = new FormData();
//   formData.append('file', imageData);

//   try {
//     const response = await axios.post(`${baseUrl}/upload/file`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     if(response?.data?.fileUrl!=undefined&&response?.data?.fileUrl!=null){
//       trigger({
//       "competition": contestId,
//       "brand": brandId,
//       "content": response?.data?.fileUrl
//     }).then((res)=>{
//         if(res?.data?.status=='success'){
//           getAlbums()
//         }else{
//           if(res.error){
//             setErrorMessage((language
//               ? res.error?.data?.error_ar
//               : res.error?.data?.error_en) ||
//               (language
//                 ? "حصل خطأ. الرجاء المحاوله مرة اخرى"
//                 : "An error has occured please try again later"))
//           }
//         }
//       })

//     }
//   } catch (error) {
//     console.error('Error uploading image:', error);
//   }
// };
