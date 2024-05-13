import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <div  >
      <div className="image h-[400px] relative">
        <div
          className=" bg-gradient-to-b from-[#58233b] to-[#604d20] absolute top-0 left-0 h-[100%] w-[100%] 
        flex items-center justify-center text-[40px] font-bold text-white  font-mono uppercase opacity-[0.9]"
        >
          Who We Are?
        </div>
        <Image
          src={"/test/about.jpg"}
          className="w-[100%] h-[400px] object-cover"
          width={300}
          height={300}
        />
      </div>
      {/* <Image /> */}
      <p>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like). It is a
        long established fact that a reader will be distracted by the readable
        content of a page when looking at its layout. The point of using Lorem
        Ipsum is that it has a more-or-less normal distribution of letters, as
        opposed to using 'Content here, content here', making it look like
        readable English. Many desktop publishing packages and web page editors
        now use Lorem Ipsum as their default model text, and a search for 'lorem
        ipsum' will uncover many web sites still in their infancy. Various
        versions have evolved over the years, sometimes by accident, sometimes
        on purpose (injected humour and the like). It is a long established fact
        that a reader will be distracted by the readable content of a page when
        looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using
        'Content here, content here', making it look like readable English. Many
        desktop publishing packages and web page editors now use Lorem Ipsum as
        their default model text, and a search for 'lorem ipsum' will uncover
        many web sites still in their infancy. Various versions have evolved
        over the years, sometimes by accident, sometimes on purpose (injected
        humour and the like). It is a long established fact that a reader will
        be distracted by the readable content of a page when looking at its
        layout. The point of using Lorem Ipsum is that it has a more-or-less
        normal distribution of letters, as opposed to using 'Content here,
        content here', making it look like readable English. Many desktop
        publishing packages and web page editors now use Lorem Ipsum as their
        default model text, and a search for 'lorem ipsum' will uncover many web
        sites still in their infancy. Various versions have evolved over the
        years, sometimes by accident, sometimes on purpose (injected humour and
        the like). It is a long established fact that a reader will be
        distracted by the readable content of a page when looking at its layout.
        The point of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English. Many desktop publishing
        packages and web page editors now use Lorem Ipsum as their default model
        text, and a search for 'lorem ipsum' will uncover many web sites still
        in their infancy. Various versions have evolved over the years,
        sometimes by accident, sometimes on purpose (injected humour and the
        like). It is a long established fact that a reader will be distracted by
        the readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like). It is a
        long established fact that a reader will be distracted by the readable
        content of a page when looking at its layout. The point of using Lorem
        Ipsum is that it has a more-or-less normal distribution of letters, as
        opposed to using 'Content here, content here', making it look like
        readable English. Many desktop publishing packages and web page editors
        now use Lorem Ipsum as their default model text, and a search for 'lorem
        ipsum' will uncover many web sites still in their infancy. Various
        versions have evolved over the years, sometimes by accident, sometimes
        on purpose (injected humour and the like). It is a long established fact
        that a reader will be distracted by the readable content of a page when
        looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using
        'Content here, content here', making it look like readable English. Many
        desktop publishing packages and web page editors now use Lorem Ipsum as
        their default model text, and a search for 'lorem ipsum' will uncover
        many web sites still in their infancy. Various versions have evolved
        over the years, sometimes by accident, sometimes on purpose (injected
        humour and the like). It is a long established fact that a reader will
        be distracted by the readable content of a page when looking at its
        layout. The point of using Lorem Ipsum is that it has a more-or-less
        normal distribution of letters, as opposed to using 'Content here,
        content here', making it look like readable English. Many desktop
        publishing packages and web page editors now use Lorem Ipsum as their
        default model text, and a search for 'lorem ipsum' will uncover many web
        sites still in their infancy. Various versions have evolved over the
        years, sometimes by accident, sometimes on purpose (injected humour and
        the like).
      </p>
    </div>
  );
}
