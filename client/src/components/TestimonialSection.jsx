import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";

import carollogo from "../assets/agencie/testimonials/carol.svg";
import fivetranlogo from "../assets/agencie/testimonials/fivetran.svg";
import basepawslogo from "../assets/agencie/testimonials/basepaws.svg";
import cheflinglogo from "../assets/agencie/testimonials/chefling.svg";
import fourthwalllogo from "../assets/agencie/testimonials/fourthwall.svg";
import fivestudioslogo from "../assets/agencie/testimonials/fivestudios.svg";
import satellailogo from "../assets/agencie/testimonials/satellai_logo.png";

const testimonials = [
  {
    quote:
      "\u201cWe got so much great coverage with Venture PR, that I hired them again at my next company.\u201d",
    name: "Kris Altiere",
    role: "Carol",
    logo: carollogo
  },
  {
    quote:
      "\u201cVenture Public Relations was our first PR company and helped us through our Series B, on the way to becoming a unicorn!\u201d",
    name: "Katie Chin",
    role: "Fivetran",
    logo: fivetranlogo
  },
  {
    quote:
      "\u201cWorking with VenturePR played a crucial role in the launch of my groundbreaking app. Their team was responsive, creative, and landed huge stories for us in national press outlets. Cannot wait to work with them again!\u201d",
    name: "Nancy Baker",
    role: "4th Wall",
    logo: fourthwalllogo
  },
  {
    quote:
      "\u201cWe hired Venture Public Relations to get press at the Consumer Electronics Show and they exceeded our expectations coverage in Fortune, CBS, ABC, Gizmodo, CNET and quickly got meetings with important buyers and partners. Highly recommend!\u201d",
    name: "Anna Skaya",
    role: "Basepaws",
    logo: basepawslogo
  },
  {
    quote:
      "\u201cIt\u2019s been great working with Ben and the Venture PR team! They generated great ideas and got my company Chefling press coverage in leading publications in a short amount of time. Venture PR\u2019s creativity and flexibility sets them apart.\u201d",
    name: "Nancy Tu",
    role: "Chefling",
    logo: cheflinglogo
  },
  {
    quote:
      "\u201cMy company, 5518 Studios was looking for PR and we got introduced to Venture PR we are glad we did. Ben was able to get us in top gaming publications as well as magazines. Looking forward to continuing this partnership.\u201d",
    name: "Michael Casalino",
    role: "5518 Studios",
    logo: fivestudioslogo
  },
  {
    quote:
      "\u201cWorking with Venture has been phenomenal. The whole team has been supportive, professional, and highly motivated in every interaction. From product launches to industry events, they’ve helped us make plans and achieve goals in ways that resonate with media outlets, industry professionals, and investors.\u201d",
    name: "David Teaster",
    role: "Satellai",
    logo: satellailogo
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

export function TestimonialSection() {
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
    if (!track) return;

    const firstCard = track.querySelector(".testimonial-card");
    const cardWidth = firstCard instanceof HTMLElement ? firstCard.offsetWidth : 417;
    const gap = 15;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth"
    });
  };

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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onPointerDown = (event) => {
      dragStateRef.current = {
        isDragging: true,
        startX: event.clientX,
        startScrollLeft: track.scrollLeft
      };
      track.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!dragStateRef.current.isDragging) return;
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
      id="reviews"
      className={`testimonial-section reveal${isVisible ? " is-visible" : ""}`}
      aria-label="Testimonials"
    >
      <div className="testimonial-section__container">
        <div className="testimonial-section__heading-wrap">
          <div className="testimonial-section__eyebrow">
            <span className="testimonial-section__eyebrow-icon" aria-hidden="true">
              <PhosphorIcon
                name="ChatCircleText"
                className="testimonial-section__eyebrow-star"
              />
            </span>
            <span className="testimonial-section__eyebrow-label">Client Stories</span>
          </div>
          <div className="testimonial-section__heading-copy">
            <h2>Hear it from the founders and CMOs who earned their spotlight.</h2>
          </div>
        </div>

        <div className="testimonial-carousel-wrap">
          <div className="testimonial-carousel__controls" aria-label="Testimonial navigation">
            <button
              type="button"
              className="testimonial-carousel__arrow"
              aria-label="Previous testimonials"
              onClick={() => scrollCarousel(-1)}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className="testimonial-carousel__arrow"
              aria-label="Next testimonials"
              onClick={() => scrollCarousel(1)}
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
          <div ref={trackRef} className="testimonial-carousel" aria-label="Testimonials">
            {testimonials.map((testimonial) => (
              <article
                key={`${testimonial.name}-${testimonial.role}`}
                className="testimonial-card"
              >
                <div className="testimonial-card__body">
                  <p className="testimonial-card__quote">{testimonial.quote}</p>
                </div>
                <div className="testimonial-card__client">
                  {testimonial.logo && (
                    <span className="testimonial-card__logo">
                      <img src={testimonial.logo} alt="" />
                    </span>
                  )}
                  <div className="testimonial-card__meta">
                    <p className="testimonial-card__name">{testimonial.name}</p>
                    <p className="testimonial-card__role">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
