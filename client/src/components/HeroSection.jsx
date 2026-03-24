import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useOurWorkBreakpoint } from "./our-work/useOurWorkBreakpoint";

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

const heroSlides = [
  {
    src: img1,
    href: "https://www.wsj.com/tech/ai/theft-of-trade-secrets-is-on-the-riseand-ai-is-making-it-worse-1b36122f",
    alt: "Wall Street Journal article about rising trade secret theft in AI, featuring Google Cloud's office entrance and employees.",
  },
  {
    src: img2,
    href: "https://www.cnet.com/pictures/ces-2026-these-robots-and-ai-tools-dominated-the-show-floor/",
    alt: "CNET coverage of CES 2026 featuring a white LG robot butler folding laundry on a table at the show.",
  },
  {
    src: img3,
    href: "https://www.tomshardware.com/desktops/mini-pcs/minisforum-ms-02-ultra-mini-workstation-hands-on",
    alt: "Hands-on review of Minisforum MS-02 Ultra mini workstation with 24-core Arrow Lake CPU next to a large desktop PC.",
  },
  {
    src: img4,
    href: "https://time.com/7296841/dog-sunburn-sunscreen/#",
    alt: "TIME magazine article \"Yes, Your Dog Can Get Sunburned\" featuring a Golden Retriever rolling on green grass in summer.",
  },
  {
    src: img5,
    href: "https://www.forbes.com/sites/forbes-personal-shopper/article/best-robotic-pool-cleaner/",
    alt: "Forbes guide to the 8 best robotic pool cleaners of 2025, showing an automated teal cleaner underwater in a pool.",
  },
  {
    src: img6,
    href: "https://www.zdnet.com/home-and-office/smart-home/best-smart-home-tech-ces-2026/",
    alt: "ZDNET article showcasing a Roborock stair-climbing robot vacuum prototype with unique leg-like wheels at CES 2026.",
  },
  {
    src: img7,
    href: "https://www.newsweek.com/best-mwc-2025-12-exciting-tech-products-coming-this-year-2042503",
    alt: "Newsweek feature on the SATELLAI Tracker, showing a man with a black Lab and Golden Retriever wearing GPS collars.",
  },
  {
    src: img8,
    href: "https://www.cnet.com/pictures/ces-2026-these-robots-and-ai-tools-dominated-the-show-floor/",
    alt: "CNET reporter interviewing an AI-powered robot butler folding towels, highlighting top robot and AI trends at CES 2026.",
  },
  {
    src: img9,
    href: "https://www.theverge.com/news/850787/narwal-flow-2-robovac-ai-object-recognition-ces-2026",
    alt: "The Verge article about Narwal Flow 2 robovac, showing two sleek gray robot vacuum units with floor-scanning technology.",
  },
  {
    src: img10,
    href: "https://www.cnn.com/cnn-underscored/deals/esr-car-phone-holder-sale-2026-01-29",
    alt: "CNN Underscored product feature showing a black ESR smartphone car mount with blue LED ring light at a discount.",
  },
];
const baseImageCount = heroSlides.length;
const HERO_CARD_SIZE_MULTIPLIER = 1.3;

const carouselSettingsByBreakpoint = {
  desktop: {
    cardWidthPx: Math.round(214 * HERO_CARD_SIZE_MULTIPLIER),
    cardHeightPx: Math.round(267 * HERO_CARD_SIZE_MULTIPLIER),
    gapPx: 72,
    radiusPx: 20,
    popScale: 1.594,
  },
  tablet: {
    cardWidthPx: Math.round(184 * HERO_CARD_SIZE_MULTIPLIER),
    cardHeightPx: Math.round(229 * HERO_CARD_SIZE_MULTIPLIER),
    gapPx: 12,
    radiusPx: 18,
    popScale: 1.42,
  },
  mobile: {
    cardWidthPx: Math.round(144 * HERO_CARD_SIZE_MULTIPLIER),
    cardHeightPx: Math.round(180 * HERO_CARD_SIZE_MULTIPLIER),
    gapPx: 8,
    radiusPx: 16,
    popScale: 1.28,
  },
};

const carouselTiming = {
  intervalMs: 2500,
  animationMs: 750,
};

const mod = (value, length) => ((value % length) + length) % length;

export function HeroSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const breakpoint = useOurWorkBreakpoint();
  const carouselSettings = carouselSettingsByBreakpoint[breakpoint];

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
    }, carouselTiming.intervalMs);

    return () => window.clearInterval(intervalId);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !isAnimating) return;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % baseImageCount);
      setIsAnimating(false);
    }, carouselTiming.animationMs);

    return () => window.clearTimeout(timeoutId);
  }, [isAnimating, isVisible]);

  const slots = [
    {
      slot: "slot-buffer-left",
      index: mod(activeIndex + (isAnimating ? -2 : -3), baseImageCount),
    },
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
    {
      slot: "slot-buffer-right",
      index: mod(activeIndex + (isAnimating ? 4 : 3), baseImageCount),
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
          <Link
            className="marqo-button marqo-button--green marqo-appear marqo-appear--delay-3"
            to="/contact-us"
          >
            See what's possible
          </Link>
          <Link
            className="marqo-button marqo-button--outline marqo-appear marqo-appear--delay-4"
            to="/our-work"
          >
            See our work
          </Link>
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
                "--pop-scale": carouselSettings.popScale,
              }}
            >
            {slots.map(({ slot, index }) => {
              const slide = heroSlides[index];

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
                    "--side-opacity": 0.85,
                  }}
                >
                  <a
                    className="marqo-hero__carousel-link"
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open press coverage ${index + 1} in a new tab`}
                  >
                    <div
                      className="marqo-hero__carousel-image-container"
                      style={{ borderRadius: `${carouselSettings.radiusPx}px` }}
                    >
                      <img
                        className="marqo-hero__carousel-image"
                        src={slide.src}
                        alt={slide.alt}
                      />
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
