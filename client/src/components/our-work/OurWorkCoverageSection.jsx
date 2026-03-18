import { useEffect, useRef, useState } from "react";
import img1 from "../../assets/hero_images/1.PNG";
import img2 from "../../assets/hero_images/2.PNG";
import img3 from "../../assets/hero_images/3.PNG";
import img4 from "../../assets/hero_images/4.PNG";
import img5 from "../../assets/hero_images/5.PNG";
import img6 from "../../assets/hero_images/6.PNG";
import img7 from "../../assets/hero_images/7.PNG";
import img8 from "../../assets/hero_images/8.PNG";
import img9 from "../../assets/hero_images/9.PNG";
import img10 from "../../assets/hero_images/10.png";
import { useOurWorkBreakpoint } from "./useOurWorkBreakpoint";

const carouselSettingsByBreakpoint = {
  desktop: {
    cardWidthPx: 214,
    cardHeightPx: 267,
    gapPx: 90,
    radiusPx: 20,
    popScale: 1.594,
    sideOpacity: 1,
  },
  tablet: {
    cardWidthPx: 184,
    cardHeightPx: 229,
    gapPx: 52,
    radiusPx: 18,
    popScale: 1.42,
    sideOpacity: 0.72,
  },
  mobile: {
    cardWidthPx: 144,
    cardHeightPx: 180,
    gapPx: 18,
    radiusPx: 16,
    popScale: 1.28,
    sideOpacity: 0.24,
  },
};

const sharedCarouselTiming = {
  intervalMs: 2500,
  animationMs: 750,
};

const mod = (value, length) => ((value % length) + length) % length;

const heroSlides = [
  {
    src: img1,
    href: "https://www.wsj.com/tech/ai/theft-of-trade-secrets-is-on-the-riseand-ai-is-making-it-worse-1b36122f",
  },
  {
    src: img2,
    href: "https://www.cnet.com/pictures/ces-2026-these-robots-and-ai-tools-dominated-the-show-floor/",
  },
  {
    src: img3,
    href: "https://www.tomshardware.com/desktops/mini-pcs/minisforum-ms-02-ultra-mini-workstation-hands-on",
  },
  {
    src: img4,
    href: "https://time.com/7296841/dog-sunburn-sunscreen/#",
  },
  {
    src: img5,
    href: "https://www.forbes.com/sites/forbes-personal-shopper/article/best-robotic-pool-cleaner/",
  },
  {
    src: img6,
    href: "https://www.zdnet.com/home-and-office/smart-home/best-smart-home-tech-ces-2026/",
  },
  {
    src: img7,
    href: "https://www.newsweek.com/best-mwc-2025-12-exciting-tech-products-coming-this-year-2042503",
  },
  {
    src: img8,
    href: "https://www.cnet.com/pictures/ces-2026-these-robots-and-ai-tools-dominated-the-show-floor/",
  },
  {
    src: img9,
    href: "https://www.theverge.com/news/850787/narwal-flow-2-robovac-ai-object-recognition-ces-2026",
  },
  {
    src: img10,
    href: "https://www.cnn.com/cnn-underscored/deals/esr-car-phone-holder-sale-2026-01-29",
  },
];

export function OurWorkCoverageSection() {
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
    }, sharedCarouselTiming.intervalMs);

    return () => window.clearInterval(intervalId);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !isAnimating) return;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
      setIsAnimating(false);
    }, sharedCarouselTiming.animationMs);

    return () => window.clearTimeout(timeoutId);
  }, [isAnimating, isVisible]);

  const slots = [
    {
      slot: "slot-buffer-left",
      index: mod(activeIndex + (isAnimating ? -2 : -3), heroSlides.length),
    },
    {
      slot: "slot-exit-left",
      index: mod(activeIndex + (isAnimating ? -1 : -2), heroSlides.length),
    },
    {
      slot: "slot-left",
      index: mod(activeIndex + (isAnimating ? 0 : -1), heroSlides.length),
    },
    {
      slot: "slot-center",
      index: mod(activeIndex + (isAnimating ? 1 : 0), heroSlides.length),
    },
    {
      slot: "slot-right",
      index: mod(activeIndex + (isAnimating ? 2 : 1), heroSlides.length),
    },
    {
      slot: "slot-enter-right",
      index: mod(activeIndex + (isAnimating ? 3 : 2), heroSlides.length),
    },
    {
      slot: "slot-buffer-right",
      index: mod(activeIndex + (isAnimating ? 4 : 3), heroSlides.length),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`our-work-coverage-exact is-${breakpoint}`}
      aria-labelledby="our-work-coverage-title"
    >
      <div className="our-work-coverage-exact__header">
        <h2 id="our-work-coverage-title">Recent Coverage Secured For Our Clients</h2>
        <p>
          A comprehensive archive of our strategic press features, industry commentary,
          and validated media coverage across leading publications.
        </p>
      </div>

      <div className="our-work-coverage-exact__posts">
        <svg
          className="our-work-coverage-exact__blur our-work-coverage-exact__blur--right"
          viewBox="-1 -1 554 856"
          aria-hidden="true"
        >
          <g filter="url(#blur-right)">
            <path
              d="M122.895 456.175L0 4.82204e-05L551.578 0L551.578 853.107L7.4581e-05 853.107L122.895 456.175Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="blur-right"
              x="-220.959"
              y="-220.962"
              width="993.496"
              height="1295.03"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="110.479" />
            </filter>
          </defs>
        </svg>
        <svg
          className="our-work-coverage-exact__blur our-work-coverage-exact__blur--left"
          viewBox="-1 -1 554 856"
          aria-hidden="true"
        >
          <g filter="url(#blur-left)">
            <path
              d="M428.682 396.932L551.578 853.107L0 853.107L0 0L551.578 0L428.682 396.932Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="blur-left"
              x="-220.959"
              y="-220.959"
              width="993.496"
              height="1295.03"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="110.479" />
            </filter>
          </defs>
        </svg>

        <div className="marqo-hero__carousel-wrapper">
          <div className="marqo-hero__carousel">
            <div
              className={`marqo-hero__carousel-track${isAnimating ? " is-animating" : ""}`}
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
                      "--side-opacity": carouselSettings.sideOpacity,
                    }}
                    >
                    <a
                      className="marqo-hero__carousel-link"
                      href={slide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open coverage carousel image ${index + 1} in a new tab`}
                    >
                      <div
                        className="marqo-hero__carousel-image-container"
                        style={{ borderRadius: `${carouselSettings.radiusPx}px` }}
                      >
                        <img
                          className="our-work-coverage-exact__hero-image marqo-hero__carousel-image"
                          src={slide.src}
                          alt={`Coverage carousel image ${index + 1}`}
                        />
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="our-work-coverage-exact__footnote">
        *See where our insights, strategies, and client campaigns have been published.
      </div>
    </section>
  );
}
