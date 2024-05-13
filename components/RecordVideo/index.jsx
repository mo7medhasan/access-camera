"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import CustomVideoPlayer from "../VideoComponents";
import VideoPlayer from "../VideoComponents/VideoPlayer";
import { displayTime } from "../VideoComponents/util/CustomFormat";

export default function RecordVideo() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timer = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [devices, setDevices] = React.useState([]);
  const [activeDeviceId, setActiveDeviceId] = React.useState();
  const [urls, setUrls] = React.useState([]);
  const [url, setUrl] = React.useState();
  const [time, setTime] = useState(0); 
   const [endTime, setEndTime] = useState(0);
  const [recording, setRecording] = useState(false);
  const [isRunning, setRunning] = useState(false);
  const [pause, setPause] = useState(false);
  //   const getCameraPermission = async () => {

  //     navigator.getUserMedia({audio:true,video:true}, function(stream) {
  //       stream.getTracks().forEach(x=> x.stats());
  //     }, err=>console.log(err));
  // };

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),

    [setDevices]
  );
 
  React.useEffect(() => {
    // getCameraPermission();
    navigator.mediaDevices.enumerateDevices()
      .then(res=>{  
        handleDevices(res)
      }) // Chain .then() to the Promise
      .catch(error => console.error("Error enumerating devices:", error)); // Handle errors
  }, [handleDevices]);
  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)

  .catch(error => console.error("Error enumerating devices:", error)); // Handle errors
;
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
    setUrls((prev) => [imageSrc, ...prev]);
  }, [webcamRef]);
  const handleStartCaptureClick = useCallback(() => {
    setRecording(true);
    // handleRightButtonPress();
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
      // handleRightButtonPress();
    }
  }, [
    webcamRef,
    recording,
    pause,
    setRecording,
    mediaRecorderRef,
    handleDataAvailable,
  ]);
  const handlePlayAgainRecording = useCallback(() => {
    if (recording && !pause) return;
    setRecording(true);
    setPause(false);
    // handleRightButtonPress();
    const interval = setInterval(() => {
      setTime((previousTime) => previousTime + 1);
    }, 1000);

    timer.current = interval;
    mediaRecorderRef.current.resumeRecording();
  }, [
    webcamRef,
    recording,
    pause,
    setRecording,
    mediaRecorderRef,
    handleDataAvailable,
  ]);
  const handleStopCaptureClick = useCallback(() => {
    setRunning((previousState) => !previousState);
    setRecording(false);
    setPause(false);
    mediaRecorderRef.current.stopRecording(() => {
      const blob = mediaRecorderRef.current.getBlob();
      setRecordedChunks([blob]);
      const blobs = new Blob(recordedChunks, { type: "video" });
      const url = URL.createObjectURL(blob);
      setUrl(url);
      console.log("url", url, blob, blobs);
    });
    // handleRightButtonPress();
    setEndTime(time)
    setTime(0);
    clearInterval(timer.current);
    timer.current = null;

  }, [recording, mediaRecorderRef]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display:none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  const switchCamera = async () => {
    if (!devices.length) {
      console.warn("No cameras available");
      return;
    }

    const nextDeviceId = devices.find(
      (device) => device.deviceId !== activeDeviceId
    )?.deviceId;
    if (nextDeviceId) {
      setActiveDeviceId(nextDeviceId);
    } else {
      // If no other device found, cycle back to the first one
      setActiveDeviceId(devices[0].deviceId);
    }
  };

  useEffect(() => {
    if (isRunning && time > 60 * 3) {
      handleStopCaptureClick();
    }
  }, [isRunning, time]);

  return (
    <div className="gap-10 flex flex-col justify-center">
      <div className="flex justify-between">
        <div className="relative w-[70%] ">
          {" "}
          <Webcam
            height={1000}
            width={1000}
            audio={true}
            mirrored={true}
            ref={webcamRef}
            videoConstraints={{ deviceId: activeDeviceId }}
          />
          {time ? (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2  p-5 flex justify-center items-center  bg-gray-950 text-red-500 rounded-full ">
              {displayTime(time)}
            </div>
          ) : null}
        </div>
        <div className="gap-5 flex flex-col justify-center">
          {urls.length
            ? urls.map((url) => (
                <div key={url} className="relative">
                  <img src={url} width={300} height={300} alt="Screenshot" />
                  <button
                    className="absolute p-2 top-5 right-2 bg-red-600 text-black rounded-full"
                    onClick={() => {
                      setUrls((prev) => prev.filter((Url) => url != Url));
                    }}
                  >
                    X
                  </button>
                </div>
              ))
            : null}

          {url?.length ? (
            <div className="relative">
              <VideoPlayer src={url} autoPlay endTime={endTime} />
              <button
                className="absolute p-2 top-5 right-2 bg-red-600 text-black rounded-full"
                onClick={() => {
                  setUrl(null);
                  setRecordedChunks([]);
                }}
              >
                X
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className=" flex justify-between gap-10">
        {recording || pause ? (
          <>
            <button
              className="w-auto p-10 bg-red-600 text-white rounded-full"
              onClick={handleStopCaptureClick}
            >
              Stop video
            </button>{" "}
          </>
        ) : null}
        {recording && !pause ? (
          <>
            {" "}
            <button
              className="w-auto p-10 bg-red-600 text-white rounded-full"
              onClick={handlePauseRecording}
            >
              pause video
            </button>
          </>
        ) : null}
        {!recording && !pause ? (
          <button
            className="w-auto p-10 bg-red-600 text-white rounded-full"
            onClick={handleStartCaptureClick}
          >
            Start video
          </button>
        ) : null}
        {!recording && pause ? (
          <button
            className="w-auto p-10 bg-red-600 text-white rounded-full"
            onClick={handlePlayAgainRecording}
          >
            Play Again
          </button>
        ) : null}
        {recordedChunks.length > 0 ? (
          <button
            className="w-auto p-10 bg-red-600 text-white rounded-full"
            onClick={handleDownload}
          >
            Download{" "}
          </button>
        ) : null}

        <button
          className="w-auto p-10 bg-red-600 text-white rounded-full"
          onClick={switchCamera}
        >
          Change
        </button>
        <button
          className="w-auto p-10 bg-red-600 text-white rounded-full"
          onClick={capturePhoto}
        >
          take photo{" "}
        </button>
        {/* <button
          className="w-auto p-10 bg-red-600 text-white rounded-full"
          onClick={getCameraPermission}
        >
        get Camera Permission 
        </button> */}
      </div>
    </div>
  );
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
