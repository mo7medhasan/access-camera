
import { Camera, Upload, Video } from "lucide-react";
import { useRef } from "react";

export default function CameraFromPhone({ onChange, type,setDownload }){


    const imageRef = useRef(null);
   
    const HandleUpload = (e) => {

      const file = e.target.files[0];
   setDownload(true)
      onChange(file)
    };
  
    return (
      <button className="bg-white p-5  flex justify-center items-center rounded-full"
        onClick={() => {
          imageRef.current?.click();
        }}
     
      >
        <input
          className="hidden"
          type="file"
          multiple={false}
          ref={imageRef}
      
          name={type=="video"?'video':"picture"} accept={type=="video"?"video/*":"image/*"} capture="environment" 
          onChange={HandleUpload}
        />
         {type=="video"? <Video />:
<Camera /> }
      </button>
    );
 
}