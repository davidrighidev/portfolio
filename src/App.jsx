import { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Connect from "./pages/Connect";
import Loader from "./components/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollToTopAndRefresh() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

function App() {
  const outerContainerRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);

  const triggerHeroAnimation = () => {
    setLoaderDone(true);
  };

  return (
    <Router basename="/portfolio">
      <Loader onComplete={triggerHeroAnimation} />
      <ScrollToTopAndRefresh />
      <Menu outerRef={outerContainerRef} />

      <div
        ref={outerContainerRef}
        className="relative w-screen z-0 h-screen will-change-transform origin-top-right"
      >
        <Routes>
          <Route path="/" element={<Home loaderDone={loaderDone} />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
