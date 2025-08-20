import { useRef, useState, useCallback } from "react";
import logo from "/assets/images/logo.svg";
import "../style/menu.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = ({ outerRef }) => {
  gsap.registerPlugin(useGSAP);

  const menuToggleRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const menuPreviewImgRef = useRef(null);
  const menuOpenTextRef = useRef(null);
  const menuCloseTextRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Cleanup extra preview images if more than 3
  const cleanupPreviewImages = useCallback(() => {
    const previewImages = menuPreviewImgRef.current.querySelectorAll("img");
    if (previewImages.length > 3) {
      for (let i = 0; i < previewImages.length - 3; i++) {
        menuPreviewImgRef.current.removeChild(previewImages[i]);
      }
    }
  }, []);

  // Reset preview image to default
  const resetPreviewImage = useCallback(() => {
    menuPreviewImgRef.current.innerHTML = "";
    const defaultPreviewImg = document.createElement("img");
    defaultPreviewImg.src = "/assets/images/menu/img-1.jpg";
    menuPreviewImgRef.current.appendChild(defaultPreviewImg);
  }, []);

  // Animate "Menu" <-> "Close" text switch
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

  // Open menu animation
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

  // Close menu animation
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
          {
            y: "120%",
          }
        );
        resetPreviewImage();
      },
    });
  }, [isAnimating, isOpen, animateToggle, outerRef, resetPreviewImage]);

  // Toggle menu state
  const handleToggleClick = useCallback(() => {
    if (!isOpen) openMenu();
    else closeMenu();
  }, [isOpen, openMenu, closeMenu]);

  // Handle preview image change on hover
  const handleLinkHover = useCallback(
    (imgSrc) => {
      if (!isOpen || isAnimating) return;
      if (!imgSrc) return;

      const previewImages = menuPreviewImgRef.current.querySelectorAll("img");

      // Avoid adding the same image twice in a row
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

  return (
    <>
      <nav className="">
        <div className="logo mix-blend-difference">
          <a href="#">
            <span className="text-[1rem] sm:text-[2rem] text-white font-[500]">
              DAVID RIGHI
            </span>
            <span className="text-white text-[0.5rem] sm:text-[1rem]">©</span>
          </a>
        </div>
        <div
          ref={menuToggleRef}
          className="menu-toggle mix-blend-difference"
          onClick={handleToggleClick}
        >
          <p ref={menuOpenTextRef} id="menu-open">
            Menu
          </p>
          <p ref={menuCloseTextRef} id="menu-close">
            Close
          </p>
        </div>
      </nav>

      <div ref={menuOverlayRef} className="menu-overlay">
        <div ref={menuContentRef} className="menu-content">
          <div className="menu-items">
            <div className="col-lg">
              <div ref={menuPreviewImgRef} className="menu-preview-img">
                <img src="/assets/images/menu/img-0.jpg" alt="" />
              </div>
            </div>
            <div className="col-sm">
              <div className="menu-links">
                <div className="link">
                  <a
                    href="#"
                    data-img="/assets/images/menu/img-1.jpg"
                    onMouseOver={() =>
                      handleLinkHover("/assets/images/menu/img-1.jpg")
                    }
                  >
                    About
                  </a>
                </div>
                <div className="link">
                  <a
                    href="#"
                    data-img="/assets/images/menu/img-2.jpg"
                    onMouseOver={() =>
                      handleLinkHover("/assets/images/menu/img-2.jpg")
                    }
                  >
                    Archive
                  </a>
                </div>
                <div className="link">
                  <a
                    href="#"
                    data-img="/assets/images/menu/img-3.jpg"
                    onMouseOver={() =>
                      handleLinkHover("/assets/images/menu/img-3.jpg")
                    }
                  >
                    Gallery
                  </a>
                </div>
                <div className="link">
                  <a
                    href="#"
                    data-img="/assets/images/menu/img-4.jpg"
                    onMouseOver={() =>
                      handleLinkHover("/assets/images/menu/img-4.jpg")
                    }
                  >
                    Connect
                  </a>
                </div>
              </div>
              <div className="menu-socials">
                <div className="social">
                  <a href="#">Instagram</a>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-footer">
            <div className="col-lg">
              <a href="#">Run Sequence</a>
            </div>
            <div className="col-sm">
              <a href="#">Origin</a>
              <a href="#">Join Signal</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
