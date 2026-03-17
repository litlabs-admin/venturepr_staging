import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";

const services = [
  {
    id: "service-1",
    title: "Earned Media & Press Coverage",
    words: ["Earned Media & Press Coverage"],
    description:
      "Your brand story is only as powerful as the outlets telling it. At Venture PR, we pitch your story to the journalists who matter — securing earned coverage in tier-1 tech and consumer publications, not paid placements.",
    items: [
      { label: "Media Strategy & Pitching" },
      { label: "Press Releases & Announcements" },
      { label: "Product Reviews & Unboxings" },
      { label: "Journalist Relationship Management" },
      { label: "Trade & Consumer Media Targeting" },
      { label: "Funding & Launch Announcements" }
    ]
  },
  {
    id: "service-2",
    title: "Thought Leadership",
    words: ["Thought Leadership"],
    description:
      "Position your executives as the go-to experts in your field. Our team of former WSJ, TechCrunch, and Forbes journalists ghost-writes op-eds, bylines, and commentary that get published — and get noticed.",
    items: [
      { label: "Ghostwritten Op-Eds & Bylines" },
      { label: "Executive Positioning Strategy" },
      { label: "Expert Commentary Placement" },
      { label: "Industry Trend Articles" },
      { label: "Podcast & Speaking Opportunities" },
      { label: "LinkedIn & Social Thought Leadership" }
    ]
  },
  {
    id: "service-3",
    title: "Product Launches & Events",
    words: ["Product Launches & Events"],
    description:
      "Big moments require big planning. Whether it's a CES debut, a funding announcement, or a new product drop, we build the launch strategy, manage press outreach, and get your product in front of the journalists and influencers that drive buying decisions.",
    items: [
      { label: "Launch Strategy & Timeline" },
      { label: "CES & Trade Show PR" },
      { label: "Press Briefings & Events" },
      { label: "Influencer & KOL Outreach" },
      { label: "Event Production Management" },
      { label: "Embargo Strategy" }
    ]
  },
  {
    id: "service-4",
    title: "Brand Strategy & Messaging",
    words: ["Brand Strategy & Messaging"],
    description:
      "Before you pitch, you need a story. We help you find the angles that make journalists stop scrolling, craft the differentiated narrative that sets you apart from the noise, and develop the messaging that resonates with your market.",
    items: [
      { label: "Narrative Development" },
      { label: "Competitive Differentiation" },
      { label: "Media Training & Spokesperson Prep" },
      { label: "Electronic Press Kit (EPK) Build" },
      { label: "Crisis Communications" },
      { label: "Messaging Architecture" }
    ]
  }
];

const SERVICE_ITEM_ICONS = {
  "Media Strategy & Pitching": "Megaphone",
  "Press Releases & Announcements": "Pen",
  "Product Reviews & Unboxings": "Video",
  "Journalist Relationship Management": "UsersFour",
  "Trade & Consumer Media Targeting": "Globe",
  "Funding & Launch Announcements": "Rocket",
  "Ghostwritten Op-Eds & Bylines": "Pen",
  "Executive Positioning Strategy": "Lightbulb",
  "Expert Commentary Placement": "ChatCircleText",
  "Industry Trend Articles": "ChartBarHorizontal",
  "Podcast & Speaking Opportunities": "Video",
  "LinkedIn & Social Thought Leadership": "LinkedinLogo",
  "Launch Strategy & Timeline": "LineSegments",
  "CES & Trade Show PR": "Devices",
  "Press Briefings & Events": "Megaphone",
  "Influencer & KOL Outreach": "UsersFour",
  "Event Production Management": "Toolbox",
  "Embargo Strategy": "CheckSquareOffset",
  "Narrative Development": "ChatCircleText",
  "Competitive Differentiation": "ChartBarHorizontal",
  "Media Training & Spokesperson Prep": "UsersFour",
  "Electronic Press Kit (EPK) Build": "Cards",
  "Crisis Communications": "Megaphone",
  "Messaging Architecture": "LineSegments"
};

export function ServicesSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(services[0].id);

  // Reveal animation observer
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
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Sidebar highlight observer
  useEffect(() => {
    const sectionElements = services.map(s => document.getElementById(s.id)).filter(Boolean);
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveServiceId(entry.target.id);
        }
      });
    }, observerOptions);

    sectionElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveServiceId(id);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section"
      aria-label="Services"
    >
      <div className="services-section__heading">
        <div className="services-section__badge">
          <span className="services-section__badge-icon" aria-hidden="true">
            <PhosphorIcon
              name="Wrench"
              className="services-section__badge-star"
            />
          </span>
          <span className="services-section__badge-label">Our services</span>
        </div>
        <h2>PR services designed to earn your brand the coverage it deserves.</h2>
      </div>

      <div className="services-section__content">
        <aside className="services-sidebar" aria-label="Services navigation">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className={`services-sidebar__link${activeServiceId === service.id ? " is-active" : ""}`}
              onClick={(e) => handleLinkClick(e, service.id)}
            >
              <span className="services-sidebar__icon" aria-hidden="true">
                <PhosphorIcon name="CaretRight" />
              </span>
              <span className="services-sidebar__label">{service.title}</span>
            </a>
          ))}
        </aside>

        <div className="services-list">
          {services.map((service) => {
            return (
              <article
                key={service.id}
                id={service.id}
                className="service-card"
              >
                <div className="service-card__content">
                  <div className="service-card__copy">
                    <h3>
                      {service.words.map((word, wordIndex) => (
                        <span
                          key={`${service.id}-${word}`}
                          className={`service-card__word${isVisible ? " is-visible" : ""}`}
                          style={{ transitionDelay: `${160 + wordIndex * 45}ms` }}
                        >
                          {word}
                          {wordIndex < service.words.length - 1 ? " " : ""}
                        </span>
                      ))}
                    </h3>
                    <p>{service.description}</p>
                  </div>

                  <div className="service-card__tags">
                    {service.items.map((item) => (
                      <span key={item.label} className="service-card__tag">
                        <span className="service-card__tag-icon" aria-hidden="true">
                          <PhosphorIcon
                            name={SERVICE_ITEM_ICONS[item.label] ?? "Wrench"}
                          />
                        </span>
                        <span>{item.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
