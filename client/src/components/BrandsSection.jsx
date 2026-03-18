import { useEffect, useRef, useState } from "react";
import logo1 from "../assets/agencie/brands/forbes.svg";
import logo2 from "../assets/agencie/brands/theverge.svg";
import logo3 from "../assets/agencie/brands/tomshardware.svg";
import logo4 from "../assets/agencie/brands/cnet.svg";
import logo5 from "../assets/agencie/brands/thewallstreetjournal.svg";
import logo6 from "../assets/agencie/brands/techcrunch.svg";
import logo7 from "../assets/agencie/brands/bloomberg_Logo.png";
import logo8 from "../assets/agencie/brands/ft_logo.png";
import logo9 from "../assets/agencie/brands/nytimes_logo.png";
import logo10 from "../assets/agencie/brands/bbc_logo.png";

const brandWords = [
  { text: "As", accent: false },
  { text: "Featured", accent: false },
  { text: "In", accent: false }
];

const logos = [
  { src: logo1, alt: "Brand logo 1" },
  { src: logo2, alt: "Brand logo 2" },
  { src: logo3, alt: "Brand logo 3" },
  { src: logo4, alt: "Brand logo 4" },
  { src: logo5, alt: "Brand logo 5" },
  { src: logo6, alt: "Brand logo 6" },
  { src: logo7, alt: "Bloomberg logo" },
  { src: logo8, alt: "Financial Times logo" },
  { src: logo9, alt: "New York Times logo" },
  { src: logo10, alt: "BBC logo" },
];

export function BrandsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`brands-section reveal${isVisible ? " is-visible" : ""}`}
      aria-label="Brands"
    >
      <div className="brands-section__heading-wrap">
        <h2 className="brands-section__heading">
          {brandWords.map((word, index) => (
            <span
              key={`${word.text}-${index}`}
              className={`brands-section__word${word.accent ? " brands-section__word--accent" : ""}${
                isVisible ? " is-visible" : ""
              }`}
              style={{ transitionDelay: `${index * 55}ms` }}
            >
              {word.text}
            </span>
          ))}
        </h2>
      </div>

      <div className="brands-section__container">
        <div className="brands-section__logos">
          {logos.map((logo, index) => (
            <article
              key={logo.src}
              className="brand-tile"
              style={{ transitionDelay: `${120 + index * 45}ms` }}
            >
              <div className="brand-tile__surface">
                <div className="brand-tile__logo">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
