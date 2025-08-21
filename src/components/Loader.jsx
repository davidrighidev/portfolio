import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const startAnimation = () => {
      const counter = { value: 0 };

      // Animate 0 → 99
      gsap.to(counter, {
        value: 99,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.floor(counter.value)
              .toString()
              .padStart(2, "0");
          }
        },
        onComplete: () => {
          gsap.delayedCall(0.3, () => {
            if (numberRef.current) numberRef.current.innerText = "100";

            // Smooth clip-path collapse
            gsap.to(loaderRef.current, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: 1.5,
              ease: "power4.inOut",
              onComplete: () => {
                if (onComplete) onComplete(); // trigger Hero animation
              },
            });
          });
        },
      });
    };

    if (document.readyState === "complete") {
      startAnimation();
    } else {
      window.addEventListener("load", startAnimation);
      return () => window.removeEventListener("load", startAnimation);
    }
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        fontSize: "4rem",
        zIndex: 9999,
        overflow: "hidden",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        willChange: "clip-path",
      }}
    >
      <span ref={numberRef} style={{ color: "#fff" }}>
        00
      </span>
    </div>
  );
};

export default Loader;
