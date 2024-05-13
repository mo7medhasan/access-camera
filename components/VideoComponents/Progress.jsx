import { displayTime } from "./util/CustomFormat";



const Progress = ({
  bufferProgress,
  currentProgress,
  videoDuration,
  seekProgress,
  seekTooltipPosition,
  seekTooltip,
  onHover,
  onSeek,currentTimeUI
}) => {
  return (
    <div className="vp-progress bottom-2 space-y-3"> 
   <div className=" flex justify-between text-white text-[0.5rem]"  > <span
       
        style={{ left: seekTooltipPosition }}
      >
        {currentTimeUI}
      </span>
      <span
     
        style={{ right: seekTooltipPosition }}
      >
      {displayTime(videoDuration)}
      </span>
      
      </div>
      <div className="vp-progress__range">
        <div className="vp-progress__range--background" />
        <div
          className="vp-progress__range--buffer"
          style={{ width: bufferProgress + '%' }}
        />
        <div
          className="vp-progress__range--current"
          style={{ width: currentProgress + '%' }}
        >
          <div className="vp-progress__range--current__thumb" />
        </div>
        <input
          className="vp-progress__range--seek"
          type="range"
          step="any"
          max={videoDuration}
          value={seekProgress}
          onMouseMove={onHover}
          onChange={onSeek}
          color='yellow'
        />
      </div>

   
    </div>
  );
};

export default Progress
