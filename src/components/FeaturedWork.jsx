import React, { useEffect } from "react";
import gsap from "gsap";
import "../style/featured.css";

const FeaturedWork = () => {
  useEffect(() => {
    const imageSources = [
      "/portfolio/assets/images/gallery/img1.jpg",
      "/portfolio/assets/images/gallery/img2.jpg",
      "/portfolio/assets/images/gallery/img3.jpg",
      "/portfolio/assets/images/gallery/img4.jpg",
      "/portfolio/assets/images/gallery/img5.jpg",
    ];

    const menuItems = document.querySelectorAll(".menu-item");

    // Duplicate <p> only once per column (guards StrictMode double-run)
    menuItems.forEach((item) => {
      const copyElements = item.querySelectorAll(".info, .name, .tag");
      copyElements.forEach((div) => {
        const ps = div.querySelectorAll("p");
        if (ps.length === 1) {
          const duplicate = document.createElement("p");
          duplicate.textContent = ps[0].textContent || "";
          div.appendChild(duplicate);
        }
      });
    });

    const appendImages = (src) => {
      const preview1 = document.querySelector(".preview-img-1");
      const preview2 = document.querySelector(".preview-img-2");
      if (!preview1 || !preview2) return;

      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      img1.src = src;
      img2.src = src;

      // start closed
      img1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
      img2.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

      preview1.appendChild(img1);
      preview2.appendChild(img2);

      gsap.to([img1, img2], {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 0.9,
        ease: "power3.out",
        onComplete: function () {
          removeExtraImages(preview1);
          removeExtraImages(preview2);
        },
      });
    };

    function removeExtraImages(container) {
      while (container.children.length > 10) {
        container.removeChild(container.firstChild);
      }
    }

    const mouseOverAnimation = (elem) => {
      gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
        top: "-100%",
        duration: 0.28,
        ease: "power3.out",
      });
      gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
        top: "0%",
        duration: 0.28,
        ease: "power3.out",
      });
    };

    const mouseOutAnimation = (elem) => {
      gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
        top: "0%",
        duration: 0.28,
        ease: "power3.out",
      });
      gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
        top: "100%",
        duration: 0.28,
        ease: "power3.out",
      });
    };

    // bind listeners (and keep references for cleanup)
    const handlers = [];
    menuItems.forEach((item, idx) => {
      const over = () => {
        mouseOverAnimation(item);
        appendImages(imageSources[idx % imageSources.length]);
      };
      const out = () => mouseOutAnimation(item);
      item.addEventListener("mouseover", over);
      item.addEventListener("mouseout", out);
      handlers.push({ item, over, out });
    });

    const menu = document.querySelector(".menu");
    const hideImages = () => {
      gsap.to(".preview-img img", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power3.out",
      });
    };
    menu?.addEventListener("mouseout", hideImages);

    const movePreview = (e) => {
      const preview = document.querySelector(".preview");
      if (!preview) return;
      gsap.to(preview, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4, // a bit snappier; reduce lag feeling
        ease: "power3.out",
      });
    };
    document.addEventListener("mousemove", movePreview);

    // cleanup to avoid multiple bindings in dev
    return () => {
      handlers.forEach(({ item, over, out }) => {
        item.removeEventListener("mouseover", over);
        item.removeEventListener("mouseout", out);
      });
      menu?.removeEventListener("mouseout", hideImages);
      document.removeEventListener("mousemove", movePreview);
    };
  }, []);

  return (
    <section className="bg-white">
      <div className="uppercase text-gray-secondary">Featured Work</div>
      <div className="container w-full h-full">
        <div className="preview">
          <div className="preview-img preview-img-1"></div>
          <div className="preview-img preview-img-2"></div>
        </div>

        <div className="menu w-full my-[20em]">
          <div className="menu-item w-full px-[2em] flex cursor-pointer">
            <div className="info">
              <p>Dolomia Yachts</p>
            </div>
            <div className="name">
              <p>Brand Redesign</p>
            </div>
            <div className="tag">
              <p>Creative Design</p>
            </div>
          </div>

          <div className="menu-item w-full px-[2em] flex cursor-pointer">
            <div className="info">
              <p>Puma POV</p>
            </div>
            <div className="name">
              <p>Breathtaking Lorem Ipsum</p>
            </div>
            <div className="tag">
              <p>Creative Design</p>
            </div>
          </div>

          <div className="menu-item w-full px-[2em] flex cursor-pointer">
            <div className="info">
              <p>Another Project</p>
            </div>
            <div className="name">
              <p>Stunning Identity</p>
            </div>
            <div className="tag">
              <p>Creative Design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
