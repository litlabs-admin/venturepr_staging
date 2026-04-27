import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Import logos for the coverage feed
import theVergeLogo from "../assets/agencie/brands/theverge.svg";
import techCrunchLogo from "../assets/agencie/brands/techcrunch.svg";
import cnetLogo from "../assets/agencie/brands/cnet.svg";
import forbesLogo from "../assets/agencie/brands/forbes.svg";
import tomsHardwareLogo from "../assets/agencie/brands/tomshardware.svg";

const coverageFeed = [
  {
    time: "09:41 PT",
    logo: theVergeLogo,
    alt: "The Verge",
    title: "Inside the AI gadget that actually made CES worth watching.",
    badge: "LIVE",
    href: "https://www.theverge.com/news/850787/narwal-flow-2-robovac-ai-object-recognition-ces-2026",
  },
  {
    time: "08:17 PT",
    logo: techCrunchLogo,
    alt: "TechCrunch",
    title: "How Audyence quietly became the ad-tech platform to watch.",
    badge: "+14",
    href: "https://techcrunch.com",
  },
  {
    time: "07:02 PT",
    logo: cnetLogo,
    alt: "CNET",
    title: "Fivetran hits unicorn status — here's why enterprises are buying.",
    badge: "TV",
    href: "https://www.cnet.com/pictures/ces-2026-these-robots-and-ai-tools-dominated-the-show-floor/",
  },
  {
    time: "06:45 PT",
    logo: forbesLogo,
    alt: "Forbes",
    title: "Narwal's Freo X Ultra is the robot vacuum that finally delivers.",
    badge: "PRINT",
    href: "https://www.forbes.com/sites/forbes-personal-shopper/article/best-robotic-pool-cleaner/",
  },
  {
    time: "05:30 PT",
    logo: tomsHardwareLogo,
    alt: "Tom's Hardware",
    title: "The 30 companies redefining enterprise AI in 2026.",
    badge: "LIST",
    href: "https://www.tomshardware.com/desktops/mini-pcs/minisforum-ms-02-ultra-mini-workstation-hands-on",
  },
];

export function HeroSection2() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="hero-2"
      ref={sectionRef}
      className={`hero-2-section${isVisible ? " is-visible" : ""}`}
      aria-label="Hero Option 2"
    >
      <div className="hero-2-container">
        {/* Left Column */}
        <div className="hero-2-left">
          <div className="hero-2-eyebrow marqo-appear marqo-appear--delay-1">
            <span className="hero-2-eyebrow-line"></span>
            DISPATCH / APR 19, 2026
          </div>
          
          <h1 className="hero-2-title marqo-appear marqo-appear--delay-2">
            Be the brand <br />
            <span className="hero-2-title-accent">everyone's</span> <br />
            talking about.
          </h1>
          
          <p className="hero-2-subtitle marqo-appear marqo-appear--delay-3">
            VenturePR turns disruptive tech into the story the press actually wants to print. Since 2017, we've put our clients on the front page of WIRED, TechCrunch, Forbes, CNBC, Bloomberg and beyond — by engineering the narrative, not pitching into the void.
          </p>

          <div className="hero-2-actions marqo-appear marqo-appear--delay-4">
            <Link className="hero-2-button hero-2-button--primary" to="/contact-us">
              START THE CONVERSATION <span>&rarr;</span>
            </Link>
            <Link className="hero-2-button hero-2-button--outline" to="/our-work">
              VIEW THE CASE FILES <span>&darr;</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Coverage Feed */}
        <div className="hero-2-right marqo-appear marqo-appear--delay-5">
          <div className="coverage-feed-card">
            <div className="coverage-feed-header">
              <div className="coverage-feed-header-left">
                <span className="coverage-feed-dot"></span>
                COVERAGE FEED
              </div>
              <div className="coverage-feed-header-right">
                <span className="coverage-feed-dot-small"></span>
                <span className="coverage-feed-dot-small"></span>
                <span className="coverage-feed-dot-small"></span>
              </div>
            </div>

            <div className="coverage-feed-list">
              {coverageFeed.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coverage-feed-row"
                >
                  <div className="coverage-feed-time">{item.time}</div>
                  <div className="coverage-feed-content">
                    <div className="coverage-feed-logo">
                      <img src={item.logo} alt={item.alt} />
                    </div>
                    <p className="coverage-feed-headline">{item.title}</p>
                  </div>
                  <div className="coverage-feed-badge-wrap">
                    <span className="coverage-feed-badge">{item.badge}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
