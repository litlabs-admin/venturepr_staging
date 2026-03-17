import { useEffect, useRef, useState } from "react";
import post1Main from "../../assets/our-work/coverage/post1-main.png";
import post1Logo from "../../assets/our-work/coverage/post1-logo.png";
import post1Thumb from "../../assets/our-work/coverage/post1-thumb.png";
import post1Brand from "../../assets/our-work/coverage/post1-brand.png";
import post2Logo from "../../assets/our-work/coverage/post2-logo.png";
import post2Main from "../../assets/our-work/coverage/post2-main.png";
import post2Brand from "../../assets/our-work/coverage/post2-brand.png";
import post3Logo from "../../assets/our-work/coverage/post3-logo.png";
import post3Main from "../../assets/our-work/coverage/post3-main.png";
import post3BrandLeft from "../../assets/our-work/coverage/post3-brand-left.png";
import post3BrandRight from "../../assets/our-work/coverage/post3-brand-right.png";
import post4Logo from "../../assets/our-work/coverage/post4-logo.png";
import post4Main from "../../assets/our-work/coverage/post4-main.png";
import post4Brand from "../../assets/our-work/coverage/post4-brand.png";
import post5Logo from "../../assets/our-work/coverage/post5-logo.png";
import post5Main from "../../assets/our-work/coverage/post5-main.png";
import post5Brand from "../../assets/our-work/coverage/post5-brand.png";

const carouselSettings = {
  cardWidthPx: 214,
  cardHeightPx: 267,
  gapPx: 90,
  radiusPx: 20,
  popScale: 1.594,
  intervalMs: 2500,
  animationMs: 750,
};

const mod = (value, length) => ((value % length) + length) % length;

export function OurWorkCoverageSection() {
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
      setActiveIndex((prev) => (prev + 1) % 5);
      setIsAnimating(false);
    }, carouselSettings.animationMs);

    return () => window.clearTimeout(timeoutId);
  }, [isAnimating, isVisible]);

  const posts = [
    {
      id: "1",
      node: (
        <article className="our-work-coverage-exact__post our-work-coverage-exact__post--1">
          <img className="owc-image owc-image--post1-main" src={post1Main} alt="" />
          <h3 className="owc-text owc-text--post1-title">
            The 13 most useful smart home devices I've seen at CES 2026 (and would buy if
            I could)
          </h3>
          <p className="owc-text owc-text--post1-desc">
            We've seen robot vacuums go upstairs before with a prototype carrier, but
            we've never seen a robot vacuum seemingly grow legs and climb stairs.
          </p>
          <div className="owc-badge owc-badge--post1">
            <img className="owc-image owc-image--post1-logo" src={post1Logo} alt="" />
          </div>
          <img className="owc-image owc-image--post1-thumb" src={post1Thumb} alt="" />
          <img className="owc-image owc-image--post1-brand" src={post1Brand} alt="" />
        </article>
      ),
    },
    {
      id: "2",
      node: (
        <article className="our-work-coverage-exact__post our-work-coverage-exact__post--2">
          <h3 className="owc-text owc-text--post2-title">
            CES 2026: These Robots and AI Tools Dominated the Show Floor
          </h3>
          <p className="owc-text owc-text--post2-desc">
            From robot butlers to AI-powered bartenders, intuitive movement throughout our
            world is where tech is heading.
          </p>
          <img className="owc-image owc-image--post2-logo" src={post2Logo} alt="" />
          <img className="owc-image owc-image--post2-main" src={post2Main} alt="" />
          <img className="owc-image owc-image--post2-brand" src={post2Brand} alt="" />
        </article>
      ),
    },
    {
      id: "3",
      node: (
        <article className="our-work-coverage-exact__post our-work-coverage-exact__post--3">
          <div className="owc-frame owc-frame--post3-logo">
            <img className="owc-image owc-image--post3-logo" src={post3Logo} alt="" />
          </div>
          <img className="owc-image owc-image--post3-main" src={post3Main} alt="" />
          <p className="owc-text owc-text--post3-desc">
            Making it easier to keep your pets safe is an important mission for a lot of
            tech companies, and SATELLAI has made it a goal to make knowing where your pets
            are a breeze.
          </p>
          <img
            className="owc-image owc-image--post3-brand-left"
            src={post3BrandLeft}
            alt=""
          />
          <img
            className="owc-image owc-image--post3-brand-right"
            src={post3BrandRight}
            alt=""
          />
          <div className="owc-text owc-text--post3-tag">SATELLAI Tracker</div>
        </article>
      ),
    },
    {
      id: "4",
      node: (
        <article className="our-work-coverage-exact__post our-work-coverage-exact__post--4">
          <h3 className="owc-text owc-text--post4-title">
            Narwal's Flow 2 robovac might help you find that earring you lost
          </h3>
          <img className="owc-image owc-image--post4-logo" src={post4Logo} alt="" />
          <img className="owc-image owc-image--post4-main" src={post4Main} alt="" />
          <p className="owc-text owc-text--post4-desc">
            Narwal's successor to its edge-mopping Flow robovac is here, and it sports a
            refreshed design along with a new cleaning mode that can scan your floor to
            tag valuables............
          </p>
          <img className="owc-image owc-image--post4-brand" src={post4Brand} alt="" />
        </article>
      ),
    },
    {
      id: "5",
      node: (
        <article className="our-work-coverage-exact__post our-work-coverage-exact__post--5">
          <div className="owc-post5-scale">
            <h3 className="owc-text owc-text--post5-title">
              The 8 Best Robotic Pool Cleaners Of 2025, Recommended By Home And Pool Experts
            </h3>
            <p className="owc-text owc-text--post5-desc">
              Itâ€™s no secret that outdoor pools require considerable upkeep. To spend more
              of your time swimming and less of it skimming &amp; scooping
            </p>
            <img className="owc-image owc-image--post5-logo" src={post5Logo} alt="" />
            <img className="owc-image owc-image--post5-main" src={post5Main} alt="" />
            <img className="owc-image owc-image--post5-brand" src={post5Brand} alt="" />
          </div>
        </article>
      ),
    },
  ];

  const slots = [
    {
      slot: "slot-exit-left",
      index: mod(activeIndex + (isAnimating ? -1 : -2), posts.length),
    },
    {
      slot: "slot-left",
      index: mod(activeIndex + (isAnimating ? 0 : -1), posts.length),
    },
    {
      slot: "slot-center",
      index: mod(activeIndex + (isAnimating ? 1 : 0), posts.length),
    },
    {
      slot: "slot-right",
      index: mod(activeIndex + (isAnimating ? 2 : 1), posts.length),
    },
    {
      slot: "slot-enter-right",
      index: mod(activeIndex + (isAnimating ? 3 : 2), posts.length),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="our-work-coverage-exact"
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
                const post = posts[index];
                return (
                  <div
                    key={post.id}
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
                      className="marqo-hero__carousel-image-container marqo-hero__carousel-image"
                      style={{ borderRadius: `${carouselSettings.radiusPx}px` }}
                    >
                      {post.node}
                    </div>
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
