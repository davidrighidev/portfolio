import { useEffect, useRef } from "react";
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const outerContainerRef = useRef(null);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Menu outerRef={outerContainerRef} />

        <div
          ref={outerContainerRef}
          className="relative w-full z-0 h-full will-change-transform origin-top-right"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/connect" element={<Connect />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
