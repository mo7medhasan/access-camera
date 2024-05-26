"use client"
import React, { useState } from 'react'
import CustomVideoPlayer from '.';
import ModalComment from './ModalComment';
// import CheckVideoOrImage from './util/CheckVideoOrImage';
import toast from 'react-hot-toast';
// import { operationsServer } from '@/utils/apiUtilies';
// import { imageBaseUrl } from '@/helpers/baseUrl';

export default function VideoContainer({post}) {


  return (
    <>
{/*     
         <CustomVideoPlayer          
            index={post?._id}
            UserName={post?.name}
            type={post?.contentType||CheckVideoOrImage(post?.content)}
            actions={actions}
            src={post?.content?.startsWith("http") ?post?.content:imageBaseUrl + "/" + post?.content}
            postsData={post} showPopup={false}
            setOpenModal={setOpen}
            setId={setId} />
         
      <ModalComment open={open} setOpen={setOpen} setId={setId} id={id} handleCommentPost={handleCommentPost} /> */}

    </>
  )
}
