import { usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";

const useSingleActiveVideo = ({videoRef, LastVideoRef, src, id, index}) => {
  const pathname = usePathname();
  console.log("pathName", pathname);
  useEffect(() => {
    const videoElement = videoRef.current;

    let lastVideoSrc, lastVideoId, lastVideoIndex, lastPath;
    const handlePlay = () => {
      if (
        videoElement &&
        lastVideoId &&
        LastVideoRef &&
        lastVideoSrc &&
        lastVideoIndex
      ) {
        if (
          lastVideoSrc != src ||
          lastVideoId != id ||
          lastVideoIndex != index ||
          pathname != lastPath
        ) {
          LastVideoRef.current.pause();
        }
      } else {
        LastVideoRef.current = videoElement;
        lastVideoSrc = src;
        lastVideoId = id;
        lastVideoIndex = index;
        lastPath = pathname;
      }
    };

    videoElement.addEventListener("play", handlePlay);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
    };
  }, [videoRef, LastVideoRef]);
};

export default useSingleActiveVideo;
