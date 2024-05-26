"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Trash2 } from "lucide-react";
// import { getOperation } from "@/utils/apiUtilies";
import toast from "react-hot-toast";

export default function ModalComment({
  open,
  setOpen,
  id,
  handleCommentPost,
  lang,
}) {
  const [data, setData] = useState([]);
  const comment = useRef(null);
  const cancelButtonRef = useRef(null);

  // useEffect(() => {
  //   if (open && id) {
  //     (async (id) => {
  //       try {
  //         const res = await getOperation(
  //           `/comments/review/${id}?populate=user`,
  //           {
  //             method: "GET",
  //             next: {
  //               revalidate: 1,
  //               tags: ["posts"],
  //             },
  //           }
  //         );
  //         if (res?.status === "error") {
  //           setData([]);
  //         } else {
  //           setData(res?.data);
  //         }
  //         console.log("res", res);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     })(id);
  //   }
  // }, [id, open]);

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const commentData = comment.current.value.trim();

  //   if (commentData.length <= 3) {
  //     toast.error("Comment must be at least 3 characters");
  //     return;
  //   }
  //   handleCommentPost(id, commentData, setData);
  //   comment.current.value = "";
  // };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          className="relative z-[999] "
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child as={Fragment}>
            <div className="fixed inset-0 bg-black/50 bg-opacity-75 backdrop-blur-lg z-[999]  transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[99999] w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative transform 
              rounded-2xl backdrop-blur-3xl  text-left bg-[#DEDEDE80] space-y-5 p-4 text-white font-medium shadow-xl transition-all  w-full max-w-96 z-[999] "
                >
                  <div className="overflow-y-auto max-h-[40vh] flex flex-col gap-5 z-[999]">
                    {data?.map((item) => (
                      <div className="bg-[#DEDEDE33] rounded-[20px] p-3" key={item._id}>
                        
                          <div className=" flex gap-2 items-center  ">
                     
 <div className=" flex gap-2 items-center flex-1 ">
                           <div className="w-[4rem] h-[4rem] relative  rounded-full"><Image
                              src={item?.user?.imageUrl}
                              alt={item?.user?.name}
                              sizes="100px"
                              fill
                              className="rounded-full object-cover object-center "
                            /></div> 
                            <p className="truncate	 ...">
                            {item?.user?.name}
                             
                            </p>
                            </div>
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 flex justify-between p-3 text-white"
                            >
                              {item?.subject}
                              {/* <Trash2 color="#fff" /> */}
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                {/* Additional content can go here */}
                              </p>
                            </div>
                         
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className=" max-w-2xl bg-[#DEDEDE33] rounded-[20px]  p-5">
                    <form
                      onSubmit={onSubmit}
                      className=" space-y-6  "
                    >
                      <textarea
                        className="w-full p-4 mb-4 border border-gray-300 rounded-lg text-white bg-[#DEDEDE33]  focus:outline-none focus:ring-2 focus:ring-main"
                        ref={comment}
                        rows="2"
                        placeholder={
                          lang === "en" ? "Write a comment" : "أكتب تعليق"
                        }
                      ></textarea>
                      <button className="w-full bg-main text-white py-2 rounded-lg hover:bg-main/80 focus:outline-none focus:ring-2 focus:ring-main">
                        {lang === "en" ? "Send" : "إرسال"}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
