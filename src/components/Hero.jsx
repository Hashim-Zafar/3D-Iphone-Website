import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState } from "react";
import gsap from "gsap";

function Hero() {
  const [srcVideo, setsrcVideo] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );
  //Animation to handle the animation
  useEffect(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 1.5,
    });
    //Animation for buy button
    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 2,
    });
  }, []);

  // Function to handle resizing of the window
  const handlesrcVideoSet = function () {
    if (window.innerWidth < 760) {
      setsrcVideo(smallHeroVideo);
    } else {
      setsrcVideo(heroVideo);
    }
  };
  //Event Listener for the resizing of the window
  useEffect(() => {
    console.log(window.innerHeight);
    window.addEventListener("resize", handlesrcVideoSet);

    return () => {
      window.removeEventListener("resize", handlesrcVideoSet);
    };
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="w-full flex-center flex-col h-5/6">
        {/* Title */}
        <p id="hero" className="hero-title">
          iphone 15 Pro
        </p>
        {/* Video  */}
        <div className="md:w-10/12 w-9/12">
          <video
            src={srcVideo}
            playsInline={true}
            autoPlay
            muted
            className="pointer-events-none select-none"
          />
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn px-[20px]">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
}

export default Hero;
