
import BtnBack from "@/components/VideoComponents/BtnBack";
import VideoContainer from "@/components/VideoComponents/VideoContainer";
import { getOperation } from "";

export default async function VideosPage({
  params: { id:VideoID },
}) {
  const data = await getOperation(`/reviews/${VideoID}?populate=brand,competition,user`,{
    next:{
      revalidate:1,
      tags:['posts']
    }
  });

  return <div className="min-h-screen w-screen content-center flex items-center justify-center ">
   <div className='backdrop-blur-xl !bg-white/30 !cursor-pointer  fixed inset-0   flex justify-center items-center  ' />
    <BtnBack />
         
<VideoContainer post={data?.data }/>
  
  </div>;
}
