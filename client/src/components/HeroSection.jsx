import { useEffect, useRef, useState } from "react";

// Import all 9 hero images
import img1 from "../assets/hero_images/1.PNG";
import img2 from "../assets/hero_images/2.PNG";
import img3 from "../assets/hero_images/3.PNG";
import img4 from "../assets/hero_images/4.PNG";
import img5 from "../assets/hero_images/5.PNG";
import img6 from "../assets/hero_images/6.PNG";
import img7 from "../assets/hero_images/7.PNG";
import img8 from "../assets/hero_images/8.PNG";
import img9 from "../assets/hero_images/9.PNG";
import img10 from "../assets/hero_images/10.png";

const heroImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
const baseImageCount = heroImages.length;

const carouselSettings = {
  cardWidthPx: 193.5,
  cardHeightPx: 241.89,
  gapPx: 48,
  radiusPx: 32,
  popScale: 1.594,
  intervalMs: 2500,
  animationMs: 750,
};

const mod = (value, length) => ((value % length) + length) % length;

export function HeroSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const intervalId = window.setInterval(() => {
      setIsAnimating((prev) => (prev ? prev : true));
    }, carouselSettings.intervalMs);

    return () => window.clearInterval(intervalId);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !isAnimating) return;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % baseImageCount);
      setIsAnimating(false);
    }, carouselSettings.animationMs);

    return () => window.clearTimeout(timeoutId);
  }, [isAnimating, isVisible]);

  const slots = [
    {
      slot: "slot-exit-left",
      index: mod(activeIndex + (isAnimating ? -1 : -2), baseImageCount),
    },
    {
      slot: "slot-left",
      index: mod(activeIndex + (isAnimating ? 0 : -1), baseImageCount),
    },
    {
      slot: "slot-center",
      index: mod(activeIndex + (isAnimating ? 1 : 0), baseImageCount),
    },
    {
      slot: "slot-right",
      index: mod(activeIndex + (isAnimating ? 2 : 1), baseImageCount),
    },
    {
      slot: "slot-enter-right",
      index: mod(activeIndex + (isAnimating ? 3 : 2), baseImageCount),
    },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`marqo-hero marqo-hero--new${isVisible ? " is-visible" : ""}`}
      aria-label="Hero"
    >
      <div className="marqo-hero__container">
        <div className="marqo-hero__heading">
          <h1 className="marqo-hero__title marqo-appear marqo-appear--delay-1">
            Be the <span className="marqo-hero__title-accent">brand</span>{" "}
            everyone's talking about.
          </h1>
          <p className="marqo-hero__subtitle marqo-appear marqo-appear--delay-2">
            Strategic PR that's earned billions of impressions for the world's most ambitious brands.
          </p>
        </div>

        <div className="marqo-hero__actions">
          <a
            className="marqo-button marqo-button--green marqo-appear marqo-appear--delay-3"
            href="./waitlist"
          >
            See what's possible
          </a>
          <a
            className="marqo-button marqo-button--outline marqo-appear marqo-appear--delay-4"
            href="./#features"
          >
            See our work
          </a>
        </div>
      </div>

      <div className="marqo-hero__carousel-wrapper marqo-appear marqo-appear--delay-5">
        <div className="marqo-hero__carousel">
          <div
            className={`marqo-hero__carousel-track${
              isAnimating ? " is-animating" : ""
            }`}
            style={{
              "--slot-step": `${carouselSettings.cardWidthPx + carouselSettings.gapPx}px`,
              "--track-height": `${carouselSettings.cardHeightPx * carouselSettings.popScale}px`,
            }}
          >
            {slots.map(({ slot, index }) => {
              const img = heroImages[index];

              return (
                <div
                  key={index}
                  className={`marqo-hero__carousel-item marqo-hero__carousel-item--${slot}`}
                  style={{
                    flex: `0 0 ${carouselSettings.cardWidthPx}px`,
                    width: `${carouselSettings.cardWidthPx}px`,
                    height: `${carouselSettings.cardHeightPx}px`,
                    borderRadius: `${carouselSettings.radiusPx}px`,
                    "--pop-scale": carouselSettings.popScale,
                  }}
                >
                  <div
                    className="marqo-hero__carousel-image-container"
                    style={{ borderRadius: `${carouselSettings.radiusPx}px` }}
                  >
                    <img
                      className="marqo-hero__carousel-image"
                      src={img}
                      alt={`Press coverage ${index + 1}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
