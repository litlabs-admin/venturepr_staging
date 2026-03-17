import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";

import benImage from "../assets/agencie/about/ben_withbg.png";

const teamMembers = [
  {
    name: "Ben Bloch",
    role: "Founder & CEO",
    image: benImage
  }
];


function TeamCard({ name, role, image }) {
  return (
    <article className="about-team-card">
      <div className="about-team-card__image-wrap">
        <div className="about-team-card__image">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="about-team-card__content">
        <div className="about-team-card__text">
          <h3>{name}</h3>
          <p>{role}</p>
        </div>
      </div>
    </article>
  );
}

export function AboutSection() {
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
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about-section reveal${isVisible ? " is-visible" : ""}`}
      aria-label="About"
    >
      <div className="about-section__container">
        <div className="about-section__top">
          <div className="about-section__badge">
            <span className="about-section__badge-icon">
              <PhosphorIcon
                name="UsersFour"
                className="about-section__badge-star"
              />
            </span>
            <span className="about-section__badge-label">About us</span>
          </div>
          <div className="about-section__content">
            <div className="about-section__copy">
              <p>
                Venture PR was founded in 2017 by Ben Bloch a former CMO and Fortune 1000 marketing executive with one non-negotiable principle: every client deserves senior-level attention, senior-level strategy, and senior-level results.
              </p>
              <p>
                {" "}
                <span className="about-section__copy-muted">
                  What began as a lean boutique has grown into a trusted PR partner for over 100 high-growth tech brands from pre-launch startups to publicly traded companies. Our team includes veteran publicists and former journalists from The Wall Street Journal, TechCrunch, Forbes, and Business Insider.
                </span>
              </p>
              <p>
                {" "}
                <span className="about-section__copy-strong">
                  Our mission is simple: earn the coverage your brand deserves. Not because we're paying for it. Because we know how to get it.
                </span>
              </p>
            </div>
            <div className="about-section__main-card">
              <TeamCard {...teamMembers[0]} />
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
