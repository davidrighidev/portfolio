import { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/menu.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Menu = ({ outerRef }) => {
  gsap.registerPlugin(useGSAP);

  const navRef = useRef(null);
  const menuToggleRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const menuPreviewImgRef = useRef(null);
  const menuOpenTextRef = useRef(null);
  const menuCloseTextRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [useWhite, setUseWhite] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ---------- brightness helpers ----------
  const parseRGB = (rgbStr) => {
    const m = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return { r: 255, g: 255, b: 255 };
    return { r: +m[1], g: +m[2], b: +m[3] };
  };

  const brightness = ({ r, g, b }) => 0.299 * r + 0.587 * g + 0.114 * b;

  const getEffectiveBgColor = (el) => {
    while (el && el !== document.documentElement) {
      const bg = getComputedStyle(el).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
      el = el.parentElement;
    }
    return (
      getComputedStyle(document.body).backgroundColor || "rgb(255,255,255)"
    );
  };

  const sampleUnderNav = () => {
    const nav = navRef.current;
    if (!nav) return;

    const rect = nav.getBoundingClientRect();
    const points = [
      { x: rect.left + rect.width * 0.2, y: rect.top + rect.height / 2 },
      { x: rect.left + rect.width * 0.5, y: rect.top + rect.height / 2 },
      { x: rect.left + rect.width * 0.8, y: rect.top + rect.height / 2 },
    ];

    const prev = nav.style.pointerEvents;
    nav.style.pointerEvents = "none";

    const brights = points.map((p) => {
      const under = document.elementFromPoint(p.x, p.y);
      const bg = getEffectiveBgColor(under || document.body);
      return brightness(parseRGB(bg));
    });

    nav.style.pointerEvents = prev;

    const avg = brights.reduce((a, b) => a + b, 0) / brights.length;

    const threshold = 160;
    setUseWhite(avg < threshold);
  };

  useEffect(() => {
    const interval = setInterval(sampleUnderNav, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let t = setTimeout(sampleUnderNav, 120);
    return () => clearTimeout(t);
  }, [isOpen]);

  const textTone = `transition-colors duration-500 delay-100 ${
    useWhite ? "text-white" : "text-black"
  }`;

  const cleanupPreviewImages = useCallback(() => {
    const previewImages = menuPreviewImgRef.current.querySelectorAll("img");
    if (previewImages.length > 3) {
      for (let i = 0; i < previewImages.length - 3; i++) {
        menuPreviewImgRef.current.removeChild(previewImages[i]);
      }
    }
  }, []);

  const resetPreviewImage = useCallback(() => {
    menuPreviewImgRef.current.innerHTML = "";
    const defaultPreviewImg = document.createElement("img");
    defaultPreviewImg.src = "/assets/images/hero.webp";
    menuPreviewImgRef.current.appendChild(defaultPreviewImg);
  }, []);

  const animateToggle = useCallback((isOpening) => {
    gsap.to(isOpening ? menuOpenTextRef.current : menuCloseTextRef.current, {
      x: isOpening ? -5 : 5,
      y: isOpening ? -10 : 10,
      rotation: isOpening ? -5 : 5,
      opacity: 0,
      delay: 0.25,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(isOpening ? menuCloseTextRef.current : menuOpenTextRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const openMenu = useCallback(() => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);

    gsap.to(outerRef.current, {
      rotation: 10,
      x: 300,
      y: 450,
      scale: 1.5,
      duration: 1.25,
      ease: "power4.inOut",
    });

    animateToggle(true);

    gsap.to(menuContentRef.current, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to(menuOverlayRef.current.querySelectorAll(".link a, .social a"), {
      y: "0%",
      opacity: 1,
      duration: 1,
      delay: 0.75,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.to(menuOverlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        setIsOpen(true);
        setIsAnimating(false);
      },
    });
  }, [isAnimating, isOpen, animateToggle, outerRef]);

  const closeMenu = useCallback(() => {
    if (isAnimating || !isOpen) return;
    setIsAnimating(true);

    gsap.to(outerRef.current, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    animateToggle(false);

    gsap.to(menuContentRef.current, {
      rotation: -15,
      x: -100,
      y: -100,
      scale: 1.5,
      opacity: 0.25,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to(menuOverlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        setIsOpen(false);
        setIsAnimating(false);

        gsap.set(
          menuOverlayRef.current.querySelectorAll(".link a, .social a"),
          { y: "120%" }
        );
        resetPreviewImage();

        ScrollTrigger.refresh(true);
      },
    });
  }, [isAnimating, isOpen, animateToggle, outerRef, resetPreviewImage]);

  const handleToggleClick = useCallback(() => {
    if (!isOpen) openMenu();
    else closeMenu();
  }, [isOpen, openMenu, closeMenu]);

  const handleLinkHover = useCallback(
    (imgSrc) => {
      if (!isOpen || isAnimating) return;
      if (!imgSrc) return;

      const previewImages = menuPreviewImgRef.current.querySelectorAll("img");

      if (
        previewImages.length > 0 &&
        previewImages[previewImages.length - 1].src.endsWith(imgSrc)
      ) {
        return;
      }

      const newPreviewImg = document.createElement("img");
      newPreviewImg.src = imgSrc;
      newPreviewImg.style.opacity = "0";
      newPreviewImg.style.transform = "scale(1.25) rotate(2deg)";

      menuPreviewImgRef.current.appendChild(newPreviewImg);
      cleanupPreviewImages();

      gsap.to(newPreviewImg, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    [isOpen, isAnimating, cleanupPreviewImages]
  );

  // Content-Change
  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (isAnimating) return;

    // react router
    navigate(path);

    closeMenu();
  };
  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full px-4 py-3 flex justify-between items-center z-50"
      >
        <div className="logo">
          <a href="#">
            <span
              className={`text-[1rem] sm:text-[1.5rem] font-[500] ${textTone}`}
            >
              DR
            </span>
            <span className={`text-[0.5rem] sm:text-[0.75rem] ${textTone}`}>
              ©
            </span>
          </a>
        </div>
        <div
          ref={menuToggleRef}
          className="menu-toggle cursor-pointer"
          onClick={handleToggleClick}
        >
          <p ref={menuOpenTextRef} id="menu-open" className={textTone}>
            Menu
          </p>
          <p ref={menuCloseTextRef} id="menu-close" className="">
            Close
          </p>
        </div>
      </nav>

      <div ref={menuOverlayRef} className="menu-overlay">
        <div ref={menuContentRef} className="menu-content">
          <div className="menu-items">
            <div className="col-lg">
              <div ref={menuPreviewImgRef} className="menu-preview-img">
                <img src="/assets/images/hero.webp" alt="" />
              </div>
            </div>
            <div className="col-sm">
              <div className="menu-links">
                <div className="link">
                  <a
                    href="/"
                    onClick={(e) => handleNavClick(e, "/")}
                    onMouseOver={() =>
                      handleLinkHover("/assets/images/hero.webp")
                    }
                    className={
                      location.pathname === "/" ? "text-gray-500" : "text-white"
                    }
                  >
                    Index
                  </a>
                </div>
                <div className="link">
                  <a
                    href="/about"
                    onClick={(e) => handleNavClick(e, "/about")}
                    onMouseOver={() =>
                      handleLinkHover("/assets/images/cartoon.png")
                    }
                    className={
                      location.pathname === "/about"
                        ? "text-gray-500"
                        : "text-white"
                    }
                  >
                    About
                  </a>
                </div>
                <div className="link">
                  <a
                    href="/gallery"
                    onClick={(e) => handleNavClick(e, "/gallery")}
                    onMouseOver={() =>
                      handleLinkHover("/assets/images/menu/img-3.jpg")
                    }
                    className={
                      location.pathname === "/gallery"
                        ? "text-gray-500"
                        : "text-white"
                    }
                  >
                    Gallery
                  </a>
                </div>
                <div className="link">
                  <a
                    href="/connect"
                    onClick={(e) => handleNavClick(e, "/connect")}
                    onMouseOver={() =>
                      handleLinkHover("/assets/images/menu/img-4.jpg")
                    }
                    className={
                      location.pathname === "/connect"
                        ? "text-gray-500"
                        : "text-white"
                    }
                  >
                    Connect
                  </a>
                </div>
              </div>
              <div className="menu-socials">
                <div className="social">
                  <a href="https://instagram.com/david_righi">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
