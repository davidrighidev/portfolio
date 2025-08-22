import gsap from "gsap";
import Copy from "../components/Copy";
import { useNavigate } from "react-router-dom";

const Quote = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black w-screen min-h-[55vh] md:min-h-[800px] flex flex-col justify-center items-center p-10 md:p-15">
      <div className="max-w-[1200px]">
        <Copy>
          <p className="text-white text-3xl font-[400] md:text-5xl lg:text-8xl">
            I create visual experiences that connect, inspire, and tell stories
            through photography and design.
          </p>
        </Copy>
      </div>
      <button
        className="btn-light sm:mt-20 mt-10 text-[0.75rem] sm:text-[1rem]"
        onClick={() => navigate("/about")}
      >
        <span>Explore more About me</span>
      </button>
    </section>
  );
};

export default Quote;
