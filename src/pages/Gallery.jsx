import React from "react";
import Footer from "../components/Footer";
import Copy from "../components/Copy";
import ImageGrid from "../components/ImageGrid";

const Gallery = () => {
  return (
    <>
      <section className="relative bg-white w-full min-h-screen overflow-hidden px-5 sm:px-20 pt-40">
        <div className="max-w-[1800px]">
          <div className="text-black tracking-tight font-medium text-5xl md:text-8xl flex flex-col gap-2">
            <Copy delay={0.8} animateOnScroll={false}>
              <p>My Visual</p>
              <p>Diary</p>
            </Copy>
            <ImageGrid />
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Gallery;
