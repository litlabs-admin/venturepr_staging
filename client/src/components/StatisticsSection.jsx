import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 8,
    suffix: "+",
    label: "Years, Delivering PR for tech brands since 2017",
    description:
      "Since 2017, we've built coverage campaigns for B2B SaaS, consumer electronics, robotics, AI companies, and more."
  },
  {
    value: "2-5",
    suffix: "x",
    label: "Guaranteed monthly media placements per client",
    description:
      "We commit to delivering results, not excuses. Our pilot clients see placements begin in month one."
  },
  {
    value: 100,
    suffix: "%",
    label: "Senior publicist on every account, always",
    description:
      "Unlike big agencies that hand you off to juniors, your account always has a senior publicist leading the charge."
  }
];

const headingWords = [
  { text: "Earning", accent: true },
  { text: "coverage,", accent: false },
  { text: "building", accent: true },
  { text: "credibility,", accent: false },
  { text: "and", accent: false },
  { text: "amplifying", accent: true },
  { text: "your", accent: false },
  { text: "brand's", accent: false },
  { text: "story.", accent: false, dark: true },
  { text: "Let's", accent: false },
  { text: "get", accent: false },
  { text: "you", accent: false },
  { text: "noticed", accent: false },
  { text: "together.", accent: false }
];

function StatValue({ value, suffix, isVisible }) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const durationMs = 1200;
    const start = performance.now();
    let frameId = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (typeof value === "string" && value.includes("-")) {
        const [min, max] = value.split("-").map(Number);
        const currentMin = Math.round(min * eased);
        const currentMax = Math.round(max * eased);
        setDisplayValue(`${currentMin}-${currentMax}`);
      } else {
        setDisplayValue(Math.round(Number(value) * eased).toString());
      }

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isVisible, value]);

  return (
    <div className="stats-card__value-wrap" aria-label={`${value}${suffix}`}>
      <span className="stats-card__value">{displayValue}</span>
      <span className="stats-card__suffix">{suffix}</span>
    </div>
  );
}

export function StatisticsSection() {
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
      ref={sectionRef}
      className={`stats-section reveal${isVisible ? " is-visible" : ""}`}
      aria-label="Statistics"
    >
      <div className="stats-section__container">
        <h2 className="stats-section__heading">
          {headingWords.map((word, index) => (
            <span
              key={`${word.text}-${index}`}
              className={[
                "stats-section__word",
                word.accent ? "stats-section__word--accent" : "",
                word.dark ? "stats-section__word--dark" : "",
                isVisible ? "is-visible" : ""
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {word.text}
            </span>
          ))}
        </h2>

        <div className="stats-grid">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="stats-card"
            >
              <div className="stats-card__frame">
                <StatValue
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
                <h3 className="stats-card__label">{stat.label}</h3>
              </div>
              <p className="stats-card__description">{stat.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
