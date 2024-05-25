"use client";
import React, { useState, useCallback, forwardRef, useRef, useEffect } from "react";
import "./style.css";
import Progress from "./Progress";
import { useTimeout } from "./hooks/timer-hook";
import Playback from "./Playback";
import { displayTime } from "./util/CustomFormat";
// import useSingleActiveVideo from './hooks/useSingleActiveVideo';

const VideoPlayer = forwardRef(
  ({ src, autoPlay = true, muted,id,index, Loop = false, endTime = false, ...props }, ref) => {
    const videoRef = useRef(null);
    const LastVideoRef = useRef(null);
   // Use the custom hook

    const [isLoaded, setLoaded] = useState(false);
    const [displayControls, setDisplayControls] = useState(true);
    const [playbackState, setPlaybackState] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [bufferProgress, setBufferProgress] = useState(0);
    const [seekProgress, setSeekProgress] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [seekTooltip, setSeekTooltip] = useState("00:00");
    const [seekTooltipPosition, setSeekTooltipPosition] = useState("");
    const [currentTimeUI, setCurrentTimeUI] = useState("00:00");
    const [remainedTimeUI, setRemainedTimeUI] = useState("00:00");
    const [pipState, setPipState] = useState(false);
    const [fullscreenState, setFullscreenState] = useState(false);
    const [displayLoader, setDisplayLoader] = useState(true);
    const [volumeKeyAction, setvolumeKeyAction] = useState(false);
    const [videoError, setVideoError] = useState(null);

    const videoContainerRef = useRef(null);
    const videoKeyActionRef = useRef(null);
    const playPromise = useRef();

    const [setControlsTimeout] = useTimeout();
    const [setKeyActionVolumeTimeout] = useTimeout();
    const [setLoaderTimeout, clearLoaderTimeout] = useTimeout();

    const hideControlsHandler = useCallback(() => {
      const video = videoRef.current;

      if (video.paused) {
        return;
      }

      setDisplayControls(false);
    }, []);

    const showControlsHandler = useCallback(() => {
      const video = videoRef.current;

      setDisplayControls(true);

      if (video.paused) {
        return;
      }

      setControlsTimeout(() => {
        hideControlsHandler();
      }, 2000);
    }, [hideControlsHandler, setControlsTimeout]);

    const togglePlayHandler = useCallback(() => {
      const video = videoRef.current;

      if (video.paused || video.ended) {
        playPromise.current = video.play();
        return;
      }

      if (!playPromise.current) {
        return;
      }

      playPromise.current.then(() => {
        video.pause();
      });
    }, []);

    const videoPlayHandler = useCallback(() => {
      setPlaybackState(true);
      // useSingleActiveVideo({videoRef,LastVideoRef,src ,id,index}); 
      showControlsHandler();
    }, [showControlsHandler]);

    const videoPauseHandler = useCallback(() => {
      setPlaybackState(false);
      showControlsHandler();
    }, [showControlsHandler]);

    const showLoaderHandler = useCallback(() => {
      setLoaderTimeout(() => setDisplayLoader(true), 300);
    }, [setLoaderTimeout]);

    const hideLoaderHandler = useCallback(() => {
      clearLoaderTimeout();
      setDisplayLoader(false);
    }, [clearLoaderTimeout]);

    const timeChangeHandler = useCallback(() => {
      const video = videoRef.current;

      const duration = video.duration || 0;
      const currentTime = video.currentTime || 0;
      const buffer = video.buffered;

      setCurrentProgress((currentTime / duration) * 100);
      setSeekProgress(currentTime);

      if (duration > 0) {
        for (let i = 0; i < buffer.length; i++) {
          if (
            buffer.start(buffer.length - 1 - i) === 0 ||
            buffer.start(buffer.length - 1 - i) < video.currentTime
          ) {
            setBufferProgress(
              (buffer.end(buffer.length - 1 - i) / duration) * 100
            );
            break;
          }
        }
      }

      const formattedCurrentTime = displayTime(Math.round(currentTime));
      const formattedRemainedTime = displayTime(
        Math.round(duration) - Math.round(currentTime)
      );

      setCurrentTimeUI(formattedCurrentTime);
      setRemainedTimeUI(formattedRemainedTime);
    }, []);

    const seekMouseMoveHandler = useCallback((event) => {
      const video = videoRef.current;

      const rect = event.currentTarget.getBoundingClientRect();
      const skipTo = (event.nativeEvent.offsetX / rect.width) * video.duration;

      let formattedTime;

      if (skipTo > video.duration) {
        formattedTime = displayTime(video.duration);
      } else if (skipTo < 0) {
        formattedTime = "00:00";
      } else {
        formattedTime = displayTime(skipTo);
        setSeekTooltipPosition(`${event.nativeEvent.offsetX}px`);
      }

      setSeekTooltip(formattedTime);
    }, []);

    const seekInputHandler = useCallback((event) => {
      const video = videoRef.current;

      const skipTo = +event.target.value;

      video.currentTime = skipTo;
      setCurrentProgress((skipTo / video.duration) * 100);
      setSeekProgress(skipTo);
    }, []);

    const rewindHandler = useCallback(() => {
      const video = videoRef.current;

      video.currentTime -= 10;

      const rewindContainer = videoKeyActionRef.current.rewind;
      const rewindElement = rewindContainer.firstElementChild;

      rewindContainer.animate(
        [{ opacity: 0 }, { opacity: 1 }, { opacity: 1 }, { opacity: 0 }],
        {
          duration: 1000,
          easing: "ease-out",
          fill: "forwards",
        }
      );
      rewindElement.animate(
        [
          { opacity: 1, transform: "translateX(0)" },
          { opacity: 0, transform: `translateX(-20%)` },
        ],
        {
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );
    }, []);

    const skipHandler = useCallback(() => {
      const video = videoRef.current;

      video.currentTime += 10;

      const forwardContainer = videoKeyActionRef.current.skip;
      const forwardElement = forwardContainer.firstElementChild;

      forwardContainer.animate(
        [{ opacity: 0 }, { opacity: 1 }, { opacity: 1 }, { opacity: 0 }],
        {
          duration: 1000,
          easing: "ease-out",
          fill: "forwards",
        }
      );
      forwardElement.animate(
        [
          { opacity: 1, transform: "translateX(0)" },
          { opacity: 0, transform: `translateX(20%)` },
        ],
        {
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );
    }, []);

    const pipEnterHandler = useCallback(() => {
      setPipState(true);
    }, []);

    const pipExitHandler = useCallback(() => {
      setPipState(false);
    }, []);

    const toggleFullscreenHandler = useCallback(() => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.current.requestFullscreen();
      }
    }, []);

    const fullscreenChangeHandler = useCallback(() => {
      if (document.fullscreenElement) {
        setFullscreenState(true);
      } else {
        setFullscreenState(false);
      }
    }, []);

    const keyEventHandler = useCallback(
      (event) => {
        const video = videoRef.current;
        const activeElement = document.activeElement;

        if (
          !activeElement ||
          (activeElement.localName === "input" &&
            activeElement.type !== "range") ||
          activeElement.localName === "textarea"
        ) {
          return;
        }

        const { key } = event;

        switch (key) {
          case "ArrowLeft":
            event.preventDefault();
            rewindHandler();
            break;
          case "ArrowRight":
            event.preventDefault();
            skipHandler();
            break;
          case "ArrowUp":
            event.preventDefault();
            if (video.volume + 0.05 > 1) {
              video.volume = 1;
            } else {
              video.volume = +(video.volume + 0.05).toFixed(2);
            }

            setvolumeKeyAction(true);
            setKeyActionVolumeTimeout(() => {
              setvolumeKeyAction(false);
            }, 1500);

            break;
          case "ArrowDown":
            event.preventDefault();
            if (video.volume - 0.05 < 0) {
              video.volume = 0;
            } else {
              video.volume = +(video.volume - 0.05).toFixed(2);
            }

            setvolumeKeyAction(true);
            setKeyActionVolumeTimeout(() => {
              setvolumeKeyAction(false);
            }, 1500);

            break;
          case " ":
            event.preventDefault();
            togglePlayHandler();
            break;
        }
      },
      [togglePlayHandler, rewindHandler, skipHandler, setKeyActionVolumeTimeout]
    );

    const videoLoadedHandler = useCallback(() => {
      const video = videoRef.current;

      setVideoDuration(video?.duration);
      timeChangeHandler();

      video.addEventListener("enterpictureinpicture", pipEnterHandler);
      video.addEventListener("leavepictureinpicture", pipExitHandler);
      document.addEventListener("keydown", keyEventHandler);
      document.addEventListener("fullscreenchange", fullscreenChangeHandler);

      autoPlay && (playPromise.current = video.play());
    }, [
      autoPlay,
      videoRef,
      videoRef.current,
      isLoaded,
      timeChangeHandler,
      pipEnterHandler,
      pipExitHandler,
      keyEventHandler,
      fullscreenChangeHandler,
    ]);

    const errorHandler = useCallback(() => {
      const video = videoRef.current;

      video.error && setVideoError(video.error);
    }, []);

    useEffect(() => {
      return () => {
        document.removeEventListener(
          "fullscreenchange",
          fullscreenChangeHandler
        );
        document.removeEventListener("keydown", keyEventHandler);
      };
    }, [fullscreenChangeHandler, keyEventHandler]);

    return (
      <div dir="ltr" className="relative rounded-2xl overflow-hidden min-h-[70vh]  max-h-[80vh] w-full max-w-[30rem] bg-black">
        <div className="bg-black w-full h-full">
          <video
            className="w-full h-full object-contain object-center !aspect-[0.55]"
            src={src}
            muted={muted}
            preload="none"
            ref={videoRef}
            onLoadedMetadata={() => {
              setLoaded(true);
              videoLoadedHandler();
            }}
            controls={false}
            onClick={togglePlayHandler}
            onPlay={videoPlayHandler}
            onPause={videoPauseHandler}
            onTimeUpdate={timeChangeHandler}
            onDoubleClick={toggleFullscreenHandler}
            onSeeking={showLoaderHandler}
            onSeeked={hideLoaderHandler}
            onWaiting={showLoaderHandler}
            onCanPlay={hideLoaderHandler}
            onError={errorHandler}
          />
        </div>
        <div className="playerBtns items-end gap-3 px-3">
          <Playback isPlaying={playbackState} onToggle={togglePlayHandler} />
          <Progress
            className="flex-1"
            bufferProgress={bufferProgress}
            currentProgress={currentProgress}
            videoDuration={endTime ? endTime : videoDuration}
            seekProgress={seekProgress}
            seekTooltip={seekTooltip}
            seekTooltipPosition={seekTooltipPosition}
            currentTimeUI={currentTimeUI}
            onHover={seekMouseMoveHandler}
            onSeek={seekInputHandler}
          />
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default React.memo(VideoPlayer);
