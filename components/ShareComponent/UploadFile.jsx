import { imageBaseUrl } from "@/helpers/baseUrl";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const UploadFile = ({
  className,
  photo,
  setPhoto,
  sizes,
  itemImage,
  label,
  error,
  setValue,
  setError,
}) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setValue("image", "test");
      setError("image", "");
    } else {
      setPhoto(undefined);
      setValue("image", "");
    }
  };
  const [showIcon, setShowIcon] = useState(false);
  return (
    <div className="overflow-hidden">
      {label && <label className={className?.label}>{label}</label>}
      <div
        className={`relative flex flex-col items-center  justify-center ${sizes.container} ${className.container}`}
        onMouseOver={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        <Image
          className={`absolute  top-0 left-0 ${sizes.container}`}
          src={
            photo ? URL.createObjectURL(photo) : imageBaseUrl + `/${itemImage}`
          }
          alt={"sdsad"}
          height={300}
          width={300}
        />
        <input
          type="file"
          onChange={handleUpload}
          className={`${className.icon} z-10 opacity-0`}
        />
        <Camera
          className={`absolute ${className.icon} ${sizes.icon} transition-all ${
            !photo ? "opacity-1" : showIcon ? "opacity-1" : "opacity-0"
          }`}
        />
      </div>
      {error && <p className="text-dangerous">{error}</p>}
    </div>
  );
};

export default UploadFile;
