import { useState } from "react";
import roborockImage from "../../assets/our-work/featured/roborock.png";
import beatbotImage from "../../assets/our-work/featured/beatbot.png";
import narwalImage from "../../assets/our-work/featured/narwal.png";
import { useOurWorkBreakpoint } from "./useOurWorkBreakpoint";

export function OurWorkFeaturedSection() {
  const [activeId, setActiveId] = useState("roborock");
  const breakpoint = useOurWorkBreakpoint();
  const isDesktop = breakpoint === "desktop";
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

  if (!isDesktop) {
    return (
      <section
        className={`our-work-featured-exact our-work-featured-exact--responsive our-work-featured-exact--${breakpoint}`}
        aria-labelledby="our-work-featured-title"
      >
        <div className="our-work-featured-exact__responsive-surface">
          <div className="our-work-featured-exact__responsive-copy">
            <h2 id="our-work-featured-title" className="our-work-featured-exact__responsive-heading">
              Executed campaigns. Verified results.
            </h2>
            <p className="our-work-featured-exact__responsive-subtext">
              Transparent look at the strategies, media secured, and business impact we
              deliver.
            </p>
          </div>

          <div className="our-work-featured-exact__responsive-cards">
            {cards.map((card) => {
              const isActive = activeId === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  className={`our-work-featured-exact__responsive-card${
                    isActive ? " is-active" : " is-inactive"
                  }`}
                  onClick={() => setActiveId(card.id)}
                >
                  <img
                    className="our-work-featured-exact__responsive-image"
                    src={card.image}
                    alt=""
                  />
                  <div className="our-work-featured-exact__responsive-overlay" />
                  <div className="our-work-featured-exact__responsive-content">
                    <h3 className="our-work-featured-exact__responsive-name">{card.name}</h3>
                    {isActive ? (
                      <p className="our-work-featured-exact__responsive-desc">
                        {card.description}
                      </p>
                    ) : (
                      <span className="our-work-featured-exact__responsive-label">
                        View campaign
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

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
