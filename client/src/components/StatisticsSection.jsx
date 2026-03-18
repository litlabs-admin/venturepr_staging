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
  const cardRefs = useRef([]);
  const frameRefs = useRef([]);
  const descriptionRefs = useRef([]);
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

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    const frames = frameRefs.current.filter(Boolean);
    const descriptions = descriptionRefs.current.filter(Boolean);

    if (!cards.length || !frames.length || !descriptions.length) {
      return undefined;
    }

    let frameId = 0;

    const clearHeights = () => {
      cards.forEach((card) => {
        card.style.minHeight = "";
      });

      frames.forEach((frame) => {
        frame.style.minHeight = "";
      });

      descriptions.forEach((description) => {
        description.style.minHeight = "";
      });
    };

    const measure = () => {
      clearHeights();

      if (window.matchMedia("(max-width: 809px)").matches) {
        return;
      }

      const maxFrameHeight = Math.max(
        ...frames.map((frame) => Math.ceil(frame.getBoundingClientRect().height))
      );
      const maxDescriptionHeight = Math.max(
        ...descriptions.map((description) =>
          Math.ceil(description.getBoundingClientRect().height)
        )
      );

      frames.forEach((frame) => {
        frame.style.minHeight = `${maxFrameHeight}px`;
      });

      descriptions.forEach((description) => {
        description.style.minHeight = `${maxDescriptionHeight}px`;
      });

      const maxCardHeight = Math.max(
        ...cards.map((card) => Math.ceil(card.getBoundingClientRect().height))
      );

      cards.forEach((card) => {
        card.style.minHeight = `${maxCardHeight}px`;
      });
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measure);
    };

    scheduleMeasure();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            scheduleMeasure();
          })
        : null;

    [...cards, ...frames, ...descriptions].forEach((node) => {
      resizeObserver?.observe(node);
    });

    window.addEventListener("resize", scheduleMeasure);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleMeasure);
      resizeObserver?.disconnect();
      clearHeights();
    };
  }, [isVisible]);

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
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="stats-card"
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
            >
              <div
                className="stats-card__frame"
                ref={(node) => {
                  frameRefs.current[index] = node;
                }}
              >
                <StatValue
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
                <h3 className="stats-card__label">{stat.label}</h3>
              </div>
              <p
                className="stats-card__description"
                ref={(node) => {
                  descriptionRefs.current[index] = node;
                }}
              >
                {stat.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
