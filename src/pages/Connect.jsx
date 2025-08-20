import React from "react";
import Footer from "../components/Footer";

const Connect = () => {
  const [result, setResult] = React.useState("Send Message");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "43d015df-3044-4ebc-aef0-65b5abea2c55");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Thank you!");
      event.target.reset();
      setTimeout(() => {
        setResult("Send Message");
      }, 3000);
    } else {
      console.log("Error", data);
      setResult("Error");
      setTimeout(() => {
        setResult("Send Message");
      }, 3000);
    }
  };

  return (
    <>
      <section className="relative bg-white w-full min-h-screen overflow-hidden px-5 sm:px-20 pt-40">
        <div className="max-w-[1800px]">
          <div className="text-black tracking-tight font-medium text-5xl md:text-8xl flex flex-col gap-2">
            <p>Let's make</p>
            <p>it happen</p>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-2">
              <form onSubmit={onSubmit} className="w-full bg-gray-tertiary p-7">
                <div className="mt-7">
                  <input
                    type="text"
                    name="name"
                    required
                    className="text-xl py-2 w-full bg-transparent border-b-2 border-gray-200 focus:border-gray-400 outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mt-7">
                  <input
                    type="email"
                    name="email"
                    required
                    className="text-xl py-2 w-full bg-transparent border-b-2 border-gray-200 focus:border-gray-400 outline-none"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mt-7">
                  <textarea
                    placeholder="Your Message"
                    name="message"
                    required
                    className="text-xl py-2 w-full h-32 bg-transparent border-b-2 border-gray-200 focus:border-gray-400 outline-none resize-none"
                  ></textarea>
                </div>
                <button className="text-xl btn mt-7" type="submit">
                  <span>{result}</span>
                </button>
              </form>
            </div>

            <div className="flex-1">
              <p className="text-2xl">
                Let’s stay in touch and create incredible things together,
                turning ideas into reality with passion, creativity, and
                innovation
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Connect;
