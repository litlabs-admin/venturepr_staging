import { useState } from "react";
import roborockImage from "../../assets/our-work/featured/roborock.png";
import beatbotImage from "../../assets/our-work/featured/beatbot.png";
import narwalImage from "../../assets/our-work/featured/narwal.png";

export function OurWorkFeaturedSection() {
  const [activeId, setActiveId] = useState("roborock");
  const cards = [
    {
      id: "roborock",
      name: "Roborock",
      description:
        "Top tier coverage, awards, product reviews, and thought leadership for leading robot vacuum mop brand",
      image: roborockImage,
    },
    {
      id: "beatbot",
      name: "Beatbot",
      description:
        "Award-winning coverage and launch visibility for AI-powered pool robotics.",
      image: beatbotImage,
    },
    {
      id: "narwal",
      name: "Narwal",
      description:
        "Premium placement and reviews for smart cleaning innovation and design.",
      image: narwalImage,
    },
  ];

  return (
    <section className="our-work-featured-exact" aria-labelledby="our-work-featured-title">
      <div className={`our-work-featured-exact__surface is-active-${activeId}`}>
        {cards.map((card) => {
          const isActive = activeId === card.id;
          const showLarge = isActive;
          return (
            <div
              key={card.id}
              className={`our-work-featured-exact__card our-work-featured-exact__card--${card.id}${
                isActive ? " is-active" : " is-inactive"
              }`}
              role="button"
              tabIndex={0}
              onClick={() => setActiveId(card.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveId(card.id);
                }
              }}
            >
              <img
                className={`our-work-featured-exact__img our-work-featured-exact__img--${card.id}`}
                src={card.image}
                alt=""
              />
              {showLarge ? (
                <>
                  <div className="our-work-featured-exact__overlay our-work-featured-exact__overlay--roborock" />
                  <p className="our-work-featured-exact__desc">{card.description}</p>
                  <h3 className="our-work-featured-exact__name">{card.name}</h3>
                </>
              ) : (
                <>
                  <div className="our-work-featured-exact__overlay our-work-featured-exact__overlay--tall" />
                  <div
                    className={`our-work-featured-exact__rotated our-work-featured-exact__rotated--${card.id}`}
                  >
                    {card.name}
                  </div>
                </>
              )}
            </div>
          );
        })}

        <span className="our-work-featured-exact__dot" aria-hidden="true" />
        <svg
          className="our-work-featured-exact__line our-work-featured-exact__line--long"
          viewBox="0 0 16 4"
          aria-hidden="true"
        >
          <line x1="0" y1="2" x2="16" y2="2" stroke="#FF844E" strokeWidth="1.31211" />
        </svg>
        <svg
          className="our-work-featured-exact__line our-work-featured-exact__line--diag-up"
          viewBox="0 0 9 9"
          aria-hidden="true"
        >
          <line x1="1" y1="1" x2="8" y2="8" stroke="#FF844E" strokeWidth="1.31211" />
        </svg>
        <svg
          className="our-work-featured-exact__line our-work-featured-exact__line--diag-down"
          viewBox="0 0 9 9"
          aria-hidden="true"
        >
          <line x1="8" y1="1" x2="1" y2="8" stroke="#FF844E" strokeWidth="1.31211" />
        </svg>

        <h2 id="our-work-featured-title" className="our-work-featured-exact__heading">
          Executed campaigns. Verified results.
        </h2>
        <p className="our-work-featured-exact__subtext">
          Transparent look at the strategies, media secured, and business impact we
          deliver.
        </p>
      </div>
    </section>
  );
}
