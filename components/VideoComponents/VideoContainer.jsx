"use client"
import React, { useState } from 'react'
import CustomVideoPlayer from '.';
import ModalComment from './ModalComment';
import CheckVideoOrImage from './util/CheckVideoOrImage';
import toast from 'react-hot-toast';
import { operationsServer } from '@/utils/apiUtilies';
import { imageBaseUrl } from '@/helpers/baseUrl';

export default function VideoContainer({post}) {

  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const handleLikePost = async (id) => {
    if (id !== "") {
      await operationsServer({
        endpoint: `/reviews/like/${id}`,
        payload: {
          method: "PUT",
        },
        revalidation: {
          tags: ["posts"],
        },
      })
        .then((res) => {
          toast.success(res.success_en);
        })
        .catch((err) => {
          toast.success(err.error_en);
        });
    }
  };

  const handleSharePost = async (id,site) => {
    if (id !== "") {
      await operationsServer({
        endpoint: `/reviews/share/${id}`,
        payload: {
          method: "PUT",
          data: {
           site:site
          },
        },
        revalidation: {
          tags: ["posts"],
        },
      })
        .then((res) => {
          toast.success(res.success_en);
        })
        .catch((err) => {
          toast.success(err.error_en);
        });
    }

  };   
   const handleReportPost = async (id) => {
      if (id !== "") {
        await operationsServer({
          endpoint: `/reviews/report/${id}`,
          payload: {
            method: "PUT",
          },
          revalidation: {
            tags: ["posts"],
          },
        })
          .then((res) => {
            toast.success(res.success_en);
          })
          .catch((err) => {
            toast.success(err.error_en);
          });
      }
    };

    const handleCommentPost = async (id,commentData,setData) => {
      if (id !== "") {
        await operationsServer({
          endpoint: `/reviews/comment/${id}`,
          payload: {
            method: "PUT",
            data: {
              subject: commentData,
            },
          },
          revalidation: {
            tags: ["posts"],
          },
        })
          .then((res) => {
            toast.success(res.success_en);
            setData(prev=>[...prev,{...prev[prev.length-1],
              subject:commentData}]);
             
          })
          .catch((err) => {
            toast.success(err.error_en);
          });
      }
  
    };   
  const actions = { handleLikePost,handleSharePost,handleReportPost };
  return (
    <>
    
         <CustomVideoPlayer          
            index={post?._id}
            UserName={post?.name}
            type={post?.contentType||CheckVideoOrImage(post?.content)}
            actions={actions}
            src={post?.content?.startsWith("http") ?post?.content:imageBaseUrl + "/" + post?.content}
            postsData={post} showPopup={false}
            setOpenModal={setOpen}
            setId={setId} />
         
      <ModalComment open={open} setOpen={setOpen} setId={setId} id={id} handleCommentPost={handleCommentPost} />

    </>
  )
}
