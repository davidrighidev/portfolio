import { useRef } from "react";
import Menu from "./components/Menu";
import Hero from "./components/Hero";
import Quote from "./components/Quote";

function App() {
  const outerContainerRef = useRef(null);

  return (
    <>
      <Menu outerRef={outerContainerRef} />
      <div
        ref={outerContainerRef}
        className="relative w-full h-full will-change-transform origin-top-right"
      >
        <Hero />
        <Quote />
        <div className="min-h-screen bg-[#5858b0]"></div>
      </div>
    </>
  );
}

export default App;
