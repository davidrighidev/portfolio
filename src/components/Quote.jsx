import gsap from "gsap";
import Copy from "../components/Copy";

const Quote = () => {
  return (
    <section className="bg-white w-screen h-[55vh] md:min-h-[800px] flex justify-center items-center p-10 md:p-15">
      <div className="max-w-[1200px]">
        <Copy>
          <p className="text-3xl font-[400] md:text-5xl lg:text-8xl">
            I create visual experiences that connect, inspire, and tell stories
            through photography and design.
          </p>
        </Copy>
      </div>
    </section>
  );
};

export default Quote;
