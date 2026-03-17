import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";

const steps = [
  {
    number: "1",
    title: "Discovery & Strategy",
    description:
      "We learn your brand, study your competitive landscape, and build your Electronic Press Kit the foundation every great PR campaign needs. We align with your team on media targets, key messages, and the angles that will make journalists stop and pay attention. We start pitching within the first 30 days."
  },
  {
    number: "2",
    title: "Pitch & Place",
    description:
      "Our veteran publicists pitch your story to the right journalists, at the right publications, at the right time. We write compelling pitches, leverage our media relationships, and pursue multiple angles simultaneously product reviews, thought leadership, news hooks, and announcements."
  },
  {
    number: "3",
    title: "Build Momentum",
    description:
      "Two to five guaranteed media placements per month for B2B clients more for consumer electronics brands. We don't stop at one win. We stack coverage, build journalist relationships, and turn every placement into a springboard for the next one."
  },
  {
    number: "4",
    title: "Report & Refine",
    description:
      "We track every placement, share transparent reporting, and adapt your strategy monthly. Our AI-powered Venture Edge platform gives you real-time visibility into your coverage performance and competitive landscape."
  }
];

export function ProcessSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
      id="process"
      ref={sectionRef}
      className={`process-section reveal${isVisible ? " is-visible" : ""}`}
      aria-label="Process"
    >
      <div className="process-section__container">
        <div className="process-section__heading">
          <div className="process-section__badge">
            <span className="process-section__badge-icon">
              <PhosphorIcon
                name="LineSegments"
                className="process-section__badge-star"
              />
            </span>
            <span className="process-section__badge-label">Our Work Process</span>
          </div>
          <h2>From first brief to front page our process is built for results from day one.</h2>
        </div>

        <div className="process-steps" role="list">
          {steps.map((step, index) => {
            const isOpen = activeIndex === index;

            return (
              <button
                key={step.number}
                type="button"
                className={`process-step${isOpen ? " is-open" : " is-collapsed"}`}
                onClick={() => setActiveIndex(index)}
                role="listitem"
              >
                <span className="process-step__background" aria-hidden="true" />
                <span className="process-step__number">{step.number}</span>
                <span className="process-step__body">
                  <span className="process-step__title">{step.title}</span>
                  <span className="process-step__description">{step.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
