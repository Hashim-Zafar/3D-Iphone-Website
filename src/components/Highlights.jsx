import gsap from "gsap";
import { useEffect, useState } from "react";
import { watchImg, rightImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

function Highlights() {
  useEffect(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      stagger: 0.25,
      duration: 1,
    });
  }, []);

  return (
    <section className="bg-zinc h-full w-screen overflow-hidden common-padding">
      <div className="screen-max-width">
        <div className="w-full mb-12 md:flex items-end justify-between">
          <h1 id="title" className="section-heading">
            Get the Highlight
          </h1>

          <div className="flex flex-wrap items-end gap-5 ">
            <p className="link">
              Watch the film{" "}
              <img src={watchImg} alt="watchImg" className="ml-2" />
            </p>

            <p className="link">
              Watch the film{" "}
              <img src={rightImg} alt="rightImg" className="ml-2" />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
}

export default Highlights;
