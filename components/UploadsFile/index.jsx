import { Upload } from "lucide-react";
import { useRef } from "react";

export default function UploadsFile({ onChange, image }){


    const imageRef = useRef(null);
   
    const HandleUpload = (e) => {
      const file = e.target.files[0];
   
      onChange(file)
    };
  
    return (
      <button className="bg-white p-5 flex justify-center items-center rounded-full"
        onClick={() => {
          imageRef.current?.click();
        }}
     
      >
        <input
          className="hidden"
          type="file"
          multiple={false}
          ref={imageRef}
          accept="image/*,video/*"
          onChange={HandleUpload}
        />
        <Upload />
      </button>
    );
 
}