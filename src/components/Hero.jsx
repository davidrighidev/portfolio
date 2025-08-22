import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { asset } from "../utils/assets";

const Hero = forwardRef(({ loaderDone }, ref) => {
  const titleRef = useRef(null);
  const splitRef = useRef(null);

  // Prepare split and initial GSAP state immediately
  useEffect(() => {
    if (!titleRef.current) return;

    splitRef.current = new SplitText(titleRef.current.querySelector("h1"), {
      type: "chars",
    });

    // Set all chars hidden initially
    gsap.set(splitRef.current.chars, { y: "100%", opacity: 0 });

    return () => splitRef.current?.revert();
  }, []);

  // Function to trigger the animation when loader is done
  const animateTitle = () => {
    if (!splitRef.current) return;

    gsap.to(splitRef.current.chars, {
      y: "0%",
      opacity: 1,
      duration: 1,
      delay: 0.42,
      ease: "power4.out",
      stagger: 0.03,
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
    <section className="bg-black z-[-2] relative w-full h-[50vh] md:h-svh overflow-hidden">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <img
          src={asset("/assets/images/hero.webp")}
          className="object-cover object-center opacity-80"
        />
      </div>

      <div
        ref={titleRef}
        style={{ overflow: "hidden" }}
        className="text-white w-full h-full font-[500] shadow-xl text-[12vw] flex justify-center items-end"
      >
        <h1 style={{ display: "inline-block" }}>DAVID RIGHI</h1>
      </div>
    </section>
  );
});

export default Hero;
