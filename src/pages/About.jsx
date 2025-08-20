import React, { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full bg-white h-full px-5 sm:px-20 pt-40"
      >
        <div className="w-full grid md:grid-cols-5 gap-10 mb-30">
          {/* Text Column */}
          <div className="flex flex-col col-span-3 gap-6 text-xl">
            <h1 className="text-5xl md:text-7xl font-[500] tracking-tight">
              A short intro,
              <br />
              who am I?
            </h1>
            <p>
              I am a self-taught hobby photographer and graphic designer based
              in the heart of the Dolomites in Italy. I discovered my passion
              for graphic design a few years ago, and since then, I’ve been
              exploring the endless possibilities of creativity through digital
              art, photo editing, and visual storytelling.
            </p>
            <p>
              I have a passion for capturing those special moments that make
              life so beautiful. I really enjoy traveling to different places,
              meeting new people, and sharing their stories through my photos.
              Every trip is a rewarding experience, and that's exactly why I
              find traveling and exploring the world so beautiful.
            </p>
            <p>
              When I’m not behind the lens, you’ll find me sailing the open
              waters or spiking a volleyball on the court. Feel free to explore
              my website and all of the moments I’ve captured through my lens –
              they’re a snapshot of my creativity!
            </p>

            <button className="btn w-fit mt-4">
              <span>Contact</span>
            </button>
          </div>

          {/* Pinned Image Column */}
          <div className="flex col-span-2 justify-center md:justify-end">
            <img
              ref={imgRef}
              src="/assets/images/about.webp"
              alt="About"
              className="w-48 h-48 md:w-64 md:h-64 object-cover shadow-lg"
            />
          </div>
        </div>
        <div className="stacking-cards">
          <div className="card w-full h-full flex flex-col mb-10">
            <div className="h-[2px] bg-gray-tertiary mb-10"></div>
            <div className="uppercase text-gray-secondary flex mb-2">
              Personal Skills
            </div>
            <div className="flex flex-col gap-2 text-black justify-center">
              <div>Creativity</div>
              <div>Teamwork</div>
              <div>Communication</div>
              <div>Responsability</div>
            </div>
          </div>

          <div className="card w-full h-full flex flex-col mb-10">
            <div className="h-[2px] bg-gray-tertiary mb-10"></div>
            <div className="uppercase text-gray-secondary flex mb-2">
              Languages
            </div>
            <div className="flex flex-col gap-2 text-black justify-center">
              <div>German</div>
              <div>Italian</div>
              <div>English</div>
            </div>
          </div>

          <div className="card w-full h-full flex flex-col mb-10">
            <div className="h-[2px] bg-gray-tertiary mb-10"></div>
            <div className="uppercase text-gray-secondary flex mb-2">
              Technical Skills
            </div>
            <div className="flex flex-col gap-2 text-black justify-center">
              <div>Adobe Illustrator</div>
              <div>Adobe Photoshop</div>
              <div>Adobe InDesign</div>
              <div>Adobe Premiere</div>
              <div>Adobe After Effects</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
