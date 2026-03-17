import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";
import benefitImage1 from "../assets/agencie/benefits/benefit-1.png";
import benefitImage2 from "../assets/agencie/benefits/benefit-2.png";
import benefitImage3 from "../assets/agencie/benefits/benefit-3.png";
import benefitImage4 from "../assets/agencie/benefits/benefit-4.png";

const benefits = [
  {
    text: "We earn your media coverage you focus on building your product. We pitch, they publish, you grow.",
    image: benefitImage1
  },
  {
    text: "Senior publicists on your account always. We never hand you off to account coordinators or interns.",
    image: benefitImage2
  },
  {
    text: "Our team includes former journalists from Wall Street Journal, TechCrunch, Forbes, and Business Insider. We don't just pitch we write like journalists think.",
    image: benefitImage3
  },
  {
    text: "Start getting coverage in 30 days, not 90. Most agencies take months to ramp up  we hit the ground running with your pilot program.",
    image: benefitImage4
  }
];

function ArrowIcon({ direction }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={
          direction === "left"
            ? "M14.75 5.5 8.25 12l6.5 6.5"
            : "M9.25 5.5 15.75 12l-6.5 6.5"
        }
      />
    </svg>
  );
}

export function BenefitsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  const scrollCarousel = (direction) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector(".benefit-card");
    const cardWidth = firstCard instanceof HTMLElement ? firstCard.offsetWidth : 417;
    const gap = 10;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth"
    });
  };

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

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const onPointerDown = (event) => {
      dragStateRef.current = {
        isDragging: true,
        startX: event.clientX,
        startScrollLeft: track.scrollLeft
      };

      track.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!dragStateRef.current.isDragging) {
        return;
      }

      const deltaX = event.clientX - dragStateRef.current.startX;
      track.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
    };

    const endDrag = (event) => {
      if (dragStateRef.current.isDragging) {
        dragStateRef.current.isDragging = false;
      }

      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className={`benefits-section reveal${isVisible ? " is-visible" : ""}`}
      aria-label="Benefits"
    >
      <div className="benefits-section__container">
        <div className="benefits-section__heading-wrap">
          <div className="benefits-section__eyebrow">
            <span className="benefits-section__eyebrow-icon" aria-hidden="true">
              <PhosphorIcon
                name="Star"
                className="benefits-section__eyebrow-star"
              />
            </span>
            <span className="benefits-section__eyebrow-label">Benefits</span>
          </div>
          <div className="benefits-section__heading-copy">
            <h2>See why high-growth brands trust Venture PR to earn their spotlight.</h2>
          </div>
        </div>

        <div className="benefits-carousel-wrap">
          <div className="benefits-carousel__controls" aria-label="Benefits navigation">
            <button
              type="button"
              className="benefits-carousel__arrow"
              aria-label="Previous benefits"
              onClick={() => scrollCarousel(-1)}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className="benefits-carousel__arrow"
              aria-label="Next benefits"
              onClick={() => scrollCarousel(1)}
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
          <div ref={trackRef} className="benefits-carousel" aria-label="Benefits">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.text}
                className="benefit-card"
              >
                <div className="benefit-card__text-wrap">
                  <p>{benefit.text}</p>
                </div>
                <div className="benefit-card__image-wrap">
                  <img src={benefit.image} alt="" draggable="false" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
