import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";
import { testimonials } from "../data/testimonials";

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
    startScrollLeft: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollState, setScrollState] = useState({
    canScrollPrev: false,
    canScrollNext: testimonials.length > 1,
  });

  const getCards = () =>
    Array.from(trackRef.current?.querySelectorAll(".testimonial-card") ?? []).filter(
      (card) => card instanceof HTMLElement
    );

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;

    const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
    const nextScrollState = {
      canScrollPrev: track.scrollLeft > 1,
      canScrollNext: track.scrollLeft < maxScrollLeft - 1,
    };

    setScrollState((currentState) => {
      if (
        currentState.canScrollPrev === nextScrollState.canScrollPrev &&
        currentState.canScrollNext === nextScrollState.canScrollNext
      ) {
        return currentState;
      }

      return nextScrollState;
    });
  };

  const scrollCarousel = (direction) => {
    const track = trackRef.current;
    const cards = getCards();
    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(track.scrollLeft - card.offsetLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        currentIndex = index;
      }
    });

    const targetIndex = Math.min(
      Math.max(currentIndex + direction, 0),
      cards.length - 1
    );

    if (targetIndex === currentIndex) return;

    track.scrollTo({
      left: cards[targetIndex].offsetLeft,
      behavior: "smooth",
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

    updateScrollState();

    const onPointerDown = (event) => {
      dragStateRef.current = {
        isDragging: true,
        startX: event.clientX,
        startScrollLeft: track.scrollLeft,
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

    const onScroll = () => {
      updateScrollState();
    };

    const onResize = () => {
      updateScrollState();
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(onResize);

    if (resizeObserver) {
      resizeObserver.observe(track);
      getCards().forEach((card) => resizeObserver.observe(card));
    } else {
      window.addEventListener("resize", onResize);
    }

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("scroll", onScroll);

      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", onResize);
      }
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
              disabled={!scrollState.canScrollPrev}
              onClick={() => scrollCarousel(-1)}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className="testimonial-carousel__arrow"
              aria-label="Next testimonials"
              disabled={!scrollState.canScrollNext}
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
