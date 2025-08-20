import React, { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Hero = () => {
  return (
    <section className="relative w-full h-[50vh] md:h-svh overflow-hidden">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <img
          src="/assets/images/hero.webp"
          className="object-cover object-center"
        />
      </div>
      <div className="text-white w-full h-full font-[500] shadow-xl text-[12vw] flex justify-center items-end">
        DAVID RIGHI
      </div>
    </section>
  );
};

export default Hero;
