import React from "react";
import Hero from "../components/Hero";
import Quote from "../components/Quote";
import Footer from "../components/Footer";

const Home = ({ loaderDone }) => {
  return (
    <>
      <Hero loaderDone={loaderDone} />
      <Quote />
      <Footer />
    </>
  );
};

export default Home;
