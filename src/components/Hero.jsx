import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Copy from "../components/Copy";

const Hero = () => {
  return (
    <section className="bg-black z-[-2] relative w-full h-[50vh] md:h-svh overflow-hidden">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <img
          src="/assets/images/hero.webp"
          className="object-cover object-center opacity-80"
        />
      </div>
      <div className="text-white w-full h-full font-[500] shadow-xl text-[12vw] flex justify-center items-end">
        <Copy delay={0.3} animateOnScroll={false}>
          <h1>DAVID RIGHI</h1>
        </Copy>
      </div>
    </section>
  );
};

export default Hero;
