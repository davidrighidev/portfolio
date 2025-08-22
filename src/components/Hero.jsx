import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { asset } from "../utils/assets";

const Hero = forwardRef(({ loaderDone }, ref) => {
  const titleRef = useRef(null);
  const splitRefs = useRef({ h1: null, p: [] });

  // Prepare split and initial GSAP state immediately
  useEffect(() => {
    if (!titleRef.current) return;

    // Split the H1
    splitRefs.current.h1 = new SplitText(
      titleRef.current.querySelector("#title"),
      {
        type: "chars",
      }
    );
    gsap.set(splitRefs.current.h1.chars, { y: "100%", opacity: 0 });

    // Split all P tags
    splitRefs.current.p = Array.from(
      titleRef.current.querySelectorAll("p")
    ).map((p) => {
      const split = new SplitText(p, { type: "chars" });
      gsap.set(split.chars, { y: "100%", opacity: 0 });
      return split;
    });

    return () => {
      splitRefs.current.h1?.revert();
      splitRefs.current.p.forEach((s) => s.revert());
    };
  }, []);

  // Function to trigger the animation when loader is done
  const animateTitle = () => {
    if (!splitRefs.current.h1) return;

    // Animate H1 chars
    gsap.to(splitRefs.current.h1.chars, {
      y: "0%",
      opacity: 1,
      duration: 1,
      delay: 0.42,
      ease: "power4.out",
      stagger: 0.03,
    });

    // Animate P tags chars after H1
    splitRefs.current.p.forEach((split, index) => {
      gsap.to(split.chars, {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        delay: 0.42 + 0.5 + index * 0.2, // slightly after H1
        ease: "power4.out",
        stagger: 0.02,
      });
    });
  };

  // Trigger animation after loader is done
  useEffect(() => {
    if (loaderDone) animateTitle();
  }, [loaderDone]);

  // Expose manual trigger if needed
  useImperativeHandle(ref, () => ({
    triggerAnimation: () => animateTitle(),
  }));

  return (
    <section className="bg-black z-[-2] relative w-full h-[50vh] md:h-svh flex justify-center overflow-hidden">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <img
          src={asset("/assets/images/hero.webp")}
          className="object-cover object-center opacity-80"
        />
      </div>

      <div
        ref={titleRef}
        style={{ overflow: "hidden" }}
        className="absolute bottom-5 text-white w-[90vw] flex-col flex justify-center items-center"
      >
        <div
          id="title"
          className="flex font-[500] text-[12vw] leading-none justify-between w-full"
        >
          <h1 style={{ display: "inline-block" }}>DAVID</h1>
          <h1 style={{ display: "inline-block" }}>RIGHI</h1>
        </div>
        <div className="w-full -mt-2 flex text-gray-300 sm:text-sm text-[0.75rem] justify-between">
          <p className="sm:ml-3 ml-1">PHOTOGRAPHER</p>
          <p className="sm:mr-3 mr-1">GRAPHIC DESIGNER</p>
        </div>
      </div>
    </section>
  );
});

export default Hero;
