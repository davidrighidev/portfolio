import React from "react";
import Hero from "../components/Hero";
import Quote from "../components/Quote";
import Footer from "../components/Footer";
import FeaturedWork from "../components/FeaturedWork";

const Home = ({ loaderDone }) => {
  return (
    <>
      <Hero loaderDone={loaderDone} />
      <Quote />
      <FeaturedWork />
      <Footer />
    </>
  );
};

export default Home;
