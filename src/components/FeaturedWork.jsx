import React, { useEffect } from "react";
import gsap from "gsap";
import "../style/featured.css";

const FeaturedWork = () => {
  const base = import.meta.env.BASE_URL || "/";

  useEffect(() => {
    if (window.innerWidth < 868) return;

    const imageSources = [
      `${base}assets/images/gallery/img1.jpg`,
      `${base}assets/images/gallery/img2.jpg`,
      `${base}assets/images/gallery/img3.jpg`,
      `${base}assets/images/gallery/img4.jpg`,
      `${base}assets/images/gallery/img5.jpg`,
    ];

    const menuItems = document.querySelectorAll(".menu-item");

    // duplicate <p> for sliding hover text
    menuItems.forEach((item) => {
      const copyElements = item.querySelectorAll(".info, .name, .tag");
      copyElements.forEach((div) => {
        const copy = div.querySelector("p");
        if (copy) {
          const duplicateCopy = document.createElement("p");
          duplicateCopy.textContent = copy.textContent;
          div.appendChild(duplicateCopy);
        }
      });
    });

    const appendImage = (src) => {
      const preview = document.querySelector(".preview-img-1");
      if (!preview) return;

      const img = document.createElement("img");
      img.src = src;
      img.style.position = "absolute";
      img.style.top = 0;
      img.style.left = 0;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"; // start hidden

      preview.appendChild(img);

      gsap.to(img, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)", // reveal
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          removeExtraImages(preview);
        },
      });
    };

    const removeExtraImages = (container) => {
      while (container.children.length > 1) {
        container.removeChild(container.firstChild);
      }
    };

    const mouseOverAnimation = (elem) => {
      gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
        top: "-100%",
        duration: 0.3,
      });
      gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
        top: "0%",
        duration: 0.3,
      });
    };

    const mouseOutAnimation = (elem) => {
      gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
        top: "0%",
        duration: 0.3,
      });
      gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
        top: "100%",
        duration: 0.3,
      });
    };

    menuItems.forEach((item, index) => {
      item.addEventListener("mouseover", () => {
        mouseOverAnimation(item);
        appendImage(imageSources[index]);
      });
      item.addEventListener("mouseout", () => mouseOutAnimation(item));
    });

    const menu = document.querySelector(".menu");
    if (menu) {
      menu.addEventListener("mouseout", () => {
        gsap.to(".preview-img img", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "power3.out",
        });
      });
    }

    document.addEventListener("mousemove", (e) => {
      const preview = document.querySelector(".preview");
      if (!preview) return;
      gsap.to(preview, {
        x: e.clientX + 40,
        y: e.clientY - 30,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <section className="bg-white relative p-10 md:p-15">
      <div className="w-full h-full">
        <div className="uppercase mt-30 mb-10 text-gray-secondary">
          Featured Work
        </div>
        <div className="h-[2px] w-full bg-gray-tertiary mb-10"></div>
        <div className="preview">
          <div className="preview-img preview-img-1"></div>
        </div>
        <div className="menu w-full mb-10">
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
