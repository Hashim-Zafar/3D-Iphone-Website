import { hightlightsSlides } from "../constants";
import { useState, useRef, useEffect } from "react";
import { playImg, pauseImg, replayImg } from "../utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function VideoCarousel() {
  //Refs and states declaration
  const videoRef = useRef([]);
  const spanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    isPlaying: false,
    startPlay: false,
    videoId: 0,
    islastVideo: false,
  });

  const { isEnd, isPlaying, startPlay, islastVideo } = video;
  let { videoId } = video;

  const [loadedData, setloadedData] = useState([]);

  useEffect(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.out",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          isPlaying: true,
          startPlay: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  //****Handles carousel dots animations
  useEffect(() => {
    let curProgress = 0;
    let span = spanRef.current;

    if (span[videoId]) {
      //gets the current span element
      let anim = gsap.to(span[videoId], {
        //When the animation changes
        onUpdate: () => {
          let progress = Math.ceil(anim.progress() * 100); //gets the cur progress of the animation
          if (progress != curProgress) {
            curProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });
            //Animation to handle slowly filling of the dot container
            gsap.to(span[videoId], {
              width: `${curProgress}%`,
              background: "white",
            });
          }
        },
        onComplete: () => {
          //guard clause to check to see if the whole video was watched then set the width back
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });

            gsap.to(span[videoId], {
              backgroundColor: "#99a1af",
            });
          }
        },
      });
      if (videoId === 0) anim.restart();
      //To make the animation last as long as the video
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [startPlay, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetaData = (i, e) => setloadedData((pre) => [...pre, e]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({
          ...pre,
          isEnd: true,
          videoId: i + 1,
        }));
        break;

      case "video-last":
        setVideo((pre) => ({
          ...pre,
          islastVideo: true,
        }));
        break;

      case "video-reset":
        setVideo((pre) => ({
          ...pre,
          islastVideo: false,
          videoId: 0,
        }));
        break;

      case "play":
        setVideo((pre) => ({
          ...pre,
          isPlaying: !pre.isPlaying,
        }));
        break;

      case "pause":
        setVideo((pre) => ({
          ...pre,
          isPlaying: !pre.isPlaying,
        }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center ">
        {hightlightsSlides.map((list, index) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container ">
              <div className="w-full h-full flex flex-center rounded-3xl bg-black overflow-hidden">
                <video
                  id="video"
                  src={list.video}
                  muted
                  playsInline={true}
                  preload="auto"
                  ref={(el) => {
                    videoRef.current[index] = el;
                  }}
                  onEnded={() => {
                    index !== 3
                      ? handleProcess("video-end", index)
                      : handleProcess("video-last");
                  }}
                  onPlay={() =>
                    setVideo((pre) => ({
                      ...pre,
                      isPlaying: true,
                    }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                ></video>
              </div>

              <div className="absolute top-12 left-[5%]">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl ">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel buttons and pause/play/referesh button */}
      <div className="relative mt-10 flex-center">
        <div className="flex-center bg-gray-600 backdrop:blur rounded-full px-7 py-5 ">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="h-3 w-3 mx-3 rounded-full relative cursor-pointer bg-gray-400"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full "
                ref={(el) => (spanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn cursor-pointer">
          <img
            src={islastVideo ? replayImg : isPlaying ? pauseImg : playImg}
            alt={islastVideo ? "Replay" : isPlaying ? "Pause" : "Play"}
            onClick={
              islastVideo
                ? () => handleProcess("video-reset")
                : isPlaying
                ? () => handleProcess("pause")
                : () => handleProcess("play")
            }
          />
        </button>
      </div>
    </>
  );
}

export default VideoCarousel;
