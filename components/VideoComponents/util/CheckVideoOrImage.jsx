const videoExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".ogv",
    ".avi",
    ".mov",
    ".qt",
    ".flv",
    ".wmv",
    ".mkv",
    ".avchd",
    ".mpg",
    ".mpeg",
    ".mp2",
    ".m4v",
    ".m4p",
  ]; 
 const CheckVideoOrImage = (file) => {
    return videoExtensions.find((ex) => file?.endsWith(ex))?"video" : "image";
  };
  export  default CheckVideoOrImage;