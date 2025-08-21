import React, { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import Copy from "../components/Copy";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative w-full bg-white h-full px-[1em] md:px-20 pt-40">
        <div className="w-full grid md:grid-cols-5 gap-10 mb-30">
          {/* Text Column */}
          <div className="flex flex-col col-span-5 w-full md:col-span-3 gap-6 text-xl">
            <Copy delay={0.8} animateOnScroll={false}>
              <h1 className="text-5xl md:text-7xl font-[500] tracking-tight">
                A short intro,
                <br />
                who am I?
              </h1>
            </Copy>
            <Copy delay={0.8} animateOnScroll={false}>
              <p>
                I am a self-taught hobby photographer and graphic designer based
                in the heart of the Dolomites in Italy. I discovered my passion
                for graphic design a few years ago, and since then, I’ve been
                exploring the endless possibilities of creativity through
                digital art, photo editing, and visual storytelling.
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
                waters or spiking a volleyball on the court. Feel free to
                explore my website and all of the moments I’ve captured through
                my lens – they’re a snapshot of my creativity!
              </p>
            </Copy>

            <button
              className="btn w-fit mt-4"
              onClick={() => navigate("/connect")}
            >
              <span>Contact</span>
            </button>
          </div>

          <div className="flex col-span-5 md:col-span-2 justify-center md:justify-end">
            <img
              src="/assets/images/about.webp"
              alt="About"
              className="w-48 h-48 md:w-64 md:h-64 object-cover"
            />
          </div>
        </div>

        {/* Cards Section */}
        <div className="stacking-cards">
          <div className="w-full h-full grid grid-cols-2 mb-10">
            <div className="h-[2px] col-span-2 bg-gray-tertiary mb-10"></div>
            <div className="uppercase text-gray-secondary">Personal Skills</div>
            <div className="flex flex-col gap-2 text-black ">
              <Copy>
                <div>Creativity</div>
                <div>Teamwork</div>
                <div>Communication</div>
                <div>Responsability</div>
              </Copy>
            </div>
          </div>

          <div className="w-full h-full grid grid-cols-2 mb-10">
            <div className="h-[2px] col-span-2 bg-gray-tertiary mb-10"></div>
            <div className="uppercase text-gray-secondary">Languages</div>
            <div className="flex flex-col gap-2 text-black ">
              <Copy>
                <div>German</div>
                <div>Italian</div>
                <div>English</div>
              </Copy>
            </div>
          </div>

          <div className="w-full h-full grid grid-cols-2 mb-10">
            <div className="h-[2px] col-span-2 bg-gray-tertiary mb-10"></div>
            <div className="uppercase text-gray-secondary">
              Technical Skills
            </div>
            <div className="flex flex-col gap-2 text-black ">
              <Copy>
                <div>Adobe Illustrator</div>
                <div>Adobe Photoshop</div>
                <div>Adobe InDesign</div>
                <div>Adobe Premiere</div>
                <div>Adobe After Effects</div>
              </Copy>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
