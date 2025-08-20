import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

const Hero = () => {
  const titleRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // erst warten, bis Fonts geladen sind
    document.fonts.ready.then(() => {
      if (!titleRef.current) return;

      const split = new SplitText(titleRef.current, { type: "lines, words" });
      const lines = split.lines;

      gsap.from(lines, {
        autoAlpha: 0,
        y: 15,
        rotationX: 3,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.06,
      });

      return () => split.revert();
    });
  }, []);

  return (
    <section className="bg-black z-[-2] relative w-full h-[50vh] md:h-svh overflow-hidden">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <img
          src="/assets/images/hero.webp"
          className="object-cover object-center opacity-80"
        />
      </div>
      <div
        ref={titleRef}
        className="text-white w-full h-full font-[500] shadow-xl text-[12vw] flex justify-center items-end"
      >
        DAVID RIGHI
      </div>
    </section>
  );
};

export default Hero;
