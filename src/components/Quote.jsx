import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import React, { useRef, useEffect } from "react";

const Quote = () => {
  const quoteRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // erst warten, bis Fonts geladen sind
    document.fonts.ready.then(() => {
      if (!quoteRef.current) return;

      const split = new SplitText(quoteRef.current, { type: "lines, words" });
      const lines = split.lines;

      gsap.from(lines, {
        autoAlpha: 0,
        y: 15,
        rotationX: 3,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });

      return () => split.revert();
    });
  }, []);

  return (
    <section className="bg-white w-screen h-[55vh] md:min-h-[800px] flex justify-center items-center p-10 md:p-15">
      <div
        ref={quoteRef}
        className="max-w-[1200px] text-3xl font-[400] md:text-5xl lg:text-8xl"
      >
        I create visual experiences that connect, inspire, and tell stories
        through photography and design.
      </div>
    </section>
  );
};

export default Quote;
