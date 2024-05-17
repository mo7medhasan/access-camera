"use client";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  SwitchCamera,
  Video,
} from "lucide-react";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function RecordVideo() {
  const { toast } = useToast();
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
  const [startCamera, setStartCamera] = useState(false);
  const [recording, setRecording] = useState(false);
  const [isRunning, setRunning] = useState(false);
  const [isDownload, setDownload] = useState(true);
  const [pause, setPause] = useState(false);

  const handleDevices = React.useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
    },

    [setDevices]
  );
  useEffect(() => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(() => setStartCamera(true))
        .catch(() =>
          toast({
            title: "Wrong",
            id: "camera",
            description: `this Camera is not allow  `,
            variant: "destructive",
            swipeDirection: "center",
          })
        );
    }
  }, []);

  useEffect(() => {
    setStartCamera(false);
    setTimeout(() => {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then(() => setStartCamera(true))
          .catch(() => {
            setStartCamera(false);
            toast({
              title: "Wrong",
              id: "camera",
              description: `this Camera is not allow  `,
              variant: "destructive",
              swipeDirection: "center",
            });
          });
      }
    }, 1000);
  }, [activeDeviceId]);
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

        urlImage
          ? (a.download = `image-${Math.ceil(Math.random() * 100)}-A.png`)
          : urlVideo
          ? (a.download = `video-${Math.ceil(Math.random() * 100)}-A.mp4`)
          : null;

        a.click();
        URL.revokeObjectURL(urlDownload);
      }
    },
    [urlImage, urlVideo]
  );

  const switchCamera = async () => {
    setStartCamera(false);
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
      if (file.type?.startsWith("image"))
        setUrlImage(URL.createObjectURL(file));
      else if (file.type?.startsWith("video")) {
        const url = URL.createObjectURL(file);

        setUrlVideo(url);
      } else
        toast({
          title: "Wrong",
          description: `this file not allow to upload `,
          variant: "destructive",
          swipeDirection: "center",
        });
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
    <div className="gap-10 flex flex-col w-full h-screen justify-center">
      <div className="relative flex justify-center items-center w-full h-screen">
        {activeDeviceId ? (
          <Webcam
            height={size.height}
            width={size.width}
            muted={true}
            audio={true}
            mirrored={false}
            ref={webcamRef}
            // audioConstraints={{
            //   deviceId: "default",
            // }}
            videoConstraints={{ deviceId: activeDeviceId, aspectRatio: ratio }}
          />
        ) : null}
        {time ? (
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2  backdrop-blur-lg animate-pulse p-5 flex justify-center items-center  bg-black/30 text-red-500 rounded-full ">
            {displayTime(time)}
          </div>
        ) : null}
        <div className="absolute top-[20%] right-6 ">
          <DropdownMenu>
            <DropdownMenuTrigger className="backdrop-blur-lg  p-5 flex justify-center items-center  bg-black/30 rounded-full ">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {devices.map((device) => (
                <DropdownMenuItem
                  key={device.deviceId}
                  onClick={() => setActiveDeviceId(device.deviceId)}
                >
                  {device.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {urlImage || urlVideo ? (
          <div className=" flex  items-center  justify-center backdrop-blur-xl absolute inset-0 bg-white/50 z-20">
            {urlImage ? (
              <div className="relative rounded-2xl overflow-hidden aspect-[0.55] h-screen  bg-black  ">
                <Image
                  src={urlImage}
                  fill
                  sizes="50vw"
                  alt="Screenshot"
                  className="w-full h-full object-contain object-center aspect-[0.55]"
                />
                <button
                  className="absolute p-2 top-5 right-2 bg-red-600 text-black rounded-full"
                  onClick={() => {
                    setUrlImage(null);
                  }}
                >
                  X
                </button>
                {urlImage && isDownload ? (
                  <button
                    className="  absolute  bottom-10 left-10 bg-white p-5  flex justify-center items-center rounded-full"
                    onClick={() => handleDownload(urlImage)}
                  >
                    <ArrowDownToLine />
                  </button>
                ) : null}
              </div>
            ) : null}

            {urlVideo ? (
              <div className="relative aspect-[0.5] ] h-full max-h-screen  max-w-full">
                <Suspense fallback={<p>Loading video...</p>}>
                  {" "}
                  <VideoPlayer src={urlVideo} autoPlay endTime={endTime} />
                </Suspense>
                <button
                  className="absolute p-2 top-5 right-2 bg-red-600 text-black rounded-full"
                  onClick={() => {
                    setUrlVideo(null);
                    setRecordedChunks([]);
                  }}
                >
                  X
                </button>
                {urlVideo && isDownload ? (
                  <button
                    className="  absolute  bottom-10 left-10 bg-white p-5 m-5 flex justify-center items-center rounded-full"
                    onClick={() => handleDownload(urlVideo)}
                  >
                    <ArrowDownToLine />
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
      {!startCamera?null:
      <div className="fixed  flex h-screen w-screen bg-white items-center justify-center text-center text-blue-700  animate-pulse  text-xl font-semibold">
        Loading Camera...
      </div>
      }
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
//       setImageData(null);
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
