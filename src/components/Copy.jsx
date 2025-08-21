import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Copy = ({ children, animateOnScroll = true, delay = 0 }) => {
  const containerRef = useRef(null);
  const elementRef = useRef([]);
  const splitRef = useRef([]);
  const lines = useRef([]);
  const triggers = useRef([]); // track triggers we create

  const initSplit = () => {
    if (!containerRef.current) return;

    // cleanup previous splits/triggers
    splitRef.current.forEach((split) => split?.revert());
    triggers.current.forEach((t) => t.kill());
    splitRef.current = [];
    elementRef.current = [];
    lines.current = [];
    triggers.current = [];

    let elements = containerRef.current.hasAttribute("data-copy-wrapper")
      ? Array.from(containerRef.current.children)
      : [containerRef.current];

    elements.forEach((element) => {
      elementRef.current.push(element);

      const split = SplitText.create(element, {
        type: "lines",
        mask: "lines",
        linesClass: "line++",
      });
      splitRef.current.push(split);

      const computedStyle = window.getComputedStyle(element);
      const textIndent = computedStyle.textIndent;
      if (textIndent && textIndent !== "0px" && split.lines.length > 0) {
        split.lines[0].style.paddingLeft = textIndent;
        element.style.textIndent = "0";
      }

      lines.current.push(...split.lines);
    });

    gsap.set(lines.current, { y: "100%" });

    const animationProps = {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      delay: delay,
    };

    if (animateOnScroll) {
      const tween = gsap.to(lines.current, {
        ...animationProps,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
      triggers.current.push(tween.scrollTrigger);
    } else {
      gsap.to(lines.current, animationProps);
    }

    // recalc ScrollTrigger after splitting and animations
    ScrollTrigger.refresh();
  };

  useGSAP(
    () => {
      // wait for fonts to be loaded
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(initSplit);
      } else {
        initSplit();
      }

      // refresh ScrollTrigger again on full window load (images/fonts)
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        splitRef.current.forEach((split) => split?.revert());
        triggers.current.forEach((t) => t.kill());
        triggers.current = [];
        window.removeEventListener("load", onLoad);
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay],
    }
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default Copy;
