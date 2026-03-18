import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";

import rabbitaiImage from "../assets/agencie/projects/rabbitai_thumbnail.png";
import roborockImage from "../assets/agencie/projects/roborock_thumbnail.png";
import lexmachinaImage from "../assets/agencie/projects/lexmachina_thumbnail.png";
import loomlyImage from "../assets/agencie/projects/loomly_thumbnail.png";

const projects = [
  {
    title: "Rabbit R1",
    image: rabbitaiImage,
    services: ["PRODUCT LAUNCH", "CONSUMER TECH", "CES STRATEGY", "VIRAL PR"],
    detailsLabel: "Expand Details",
    hideLabel: "Hide Details",
    detailsContent: (
      <div className="projects-card__expanded-content">
        <h4><strong>How the Rabbit r1 Became CES's Most-Talked-About Device Without Being on the Show Floor</strong></h4>
        <p>Rabbit AI came to us ahead of CES with a bold product and a tight timeline. Rather than follow the traditional booth-and-press-release playbook, we devised a strategy that generated outsized press by going off the floor creating a sense of exclusivity and editorial intrigue that drove journalists to seek us out.</p>

        <h4><strong>Result:</strong></h4>
        <p>Insane press coverage across tier-1 publications. The r1 became one of the most-covered devices from CES that year.</p>
      </div>
    )
  },
  {
    title: "Roborock",
    image: roborockImage,
    services: [
      "CONSUMER ELECTRONICS",
      "SMART HOME",
      "LONG-TERM PR",
      "PRODUCT REVIEWS"
    ],
    detailsLabel: "Expand Details",
    hideLabel: "Hide Details",
    detailsContent: (
      <div className="projects-card__expanded-content">
        <h4><strong>3.5 Years of Building Roborock Into a Household Name in Smart Home Tech</strong></h4>
        <p>Roborock was already a quality product when they came to us. Our job was to make the world know it. Over 3.5 years, we built a sustained earned media engine securing product reviews, thought leadership placements, and brand coverage that established Roborock as the go-to name in robot vacuums.</p>

        <h4><strong>Result:</strong></h4>
        <p>Consistent top-tier coverage, ongoing journalist relationships, and a brand that could compete with global giants on earned media alone.</p>
      </div>
    )
  },
  {
    title:
      "Lex Machina",
    image: lexmachinaImage,
    services: [
      "B2B SAAS",
      "THOUGHT LEADERSHIP",
      "LEGAL TECH",
      "LONG-TERM",
      "RETAINER"
    ],
    detailsLabel: "Expand Details",
    hideLabel: "Hide Details",
    detailsContent: (
      <div className="projects-card__expanded-content">
        <h4><strong>5+ Years of Thought Leadership in Legal Analytics Building the Lex Machina Brand in B2B</strong></h4>
        <p>Lex Machina is a legal analytics platform serving law firms and corporate legal departments. We helped them find the narratives that made non-obvious technology compelling ghostwriting executive articles, securing expert commentary placements, and building a thought leadership profile that positioned their team as the authority in litigation analytics.</p>

        <h4><strong>Result:</strong></h4>
        <p>5+ year engagement with consistent coverage in legal, tech, and business media.</p>
      </div>
    )
  },
  {
    title:
      "Loomly",
    image: loomlyImage,
    services: [
      "MEDIA RELATIONS",
      "PR STRATEGY",
      "THOUGHT LEADERSHIP",
      "BRAND VISIBILITY"
    ],
    detailsLabel: "Expand Details",
    hideLabel: "Hide Details",
    detailsContent: (
      <div className="projects-card__expanded-content">
        <h4><strong>How Loomly Turned Ongoing Media Coverage Into a Competitive Advantage in Social Media Management</strong></h4>
        <p>The Loomly team wanted to keep their modern, feature-rich social media management platform in the news to fuel growth and maintain a competitive edge. Through a long-term collaboration, we built a systematic approach to press coverage and commentary, ensuring brand marketers consistently saw Loomly across multiple outlets.</p>

        <h4><strong>Result:</strong></h4>
        <p>Loomly secured 231 feature stories, reaching an audience of 4.34 billion, generating widespread exposure and consistent attention across top-tier publications.</p>
      </div>
    )
  }
];

function getProjectLogoPlaceholder(title) {
  const baseTitle = title.split("-")[0].trim();
  const words = baseTitle.split(/\s+/).filter(Boolean);

  if (words.length === 1) {
    return words[0];
  }

  return words.slice(0, 2).join(" ");
}

function ArrowIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function MinusIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure content height when expanded toggles
  useEffect(() => {
    if (contentRef.current) {
      // Small timeout ensures that the DOM has updated and measured correctly
      const timeoutId = setTimeout(() => {
        setContentHeight(contentRef.current.scrollHeight);
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [isExpanded, project.detailsContent]);

  // Re-measure on window resize to keep it responsive
  useEffect(() => {
    const handleResize = () => {
      if (isExpanded && contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <article className={`projects-card ${isExpanded ? "is-expanded" : ""}`} key={project.title}>
      <div className="projects-card__media">
        <img src={project.image} alt="" />
        <div className="projects-card__logo" aria-hidden="true">
          <span className="projects-card__logo-text">
            {getProjectLogoPlaceholder(project.title)}
          </span>
        </div>
      </div>

      <div className="projects-card__content">
        <div className="projects-card__meta">
          <div className="projects-card__tags">
            {project.services.map((service) => (
              <span className="projects-card__tag" key={service}>
                {service}
              </span>
            ))}
          </div>
          <h3 className="projects-card__title">{project.title}</h3>
        </div>

        <div className="projects-card__actions">
          {project.primaryLabel && (
            <a
              className="projects-card__link"
              href={project.primaryHref}
              target="_blank"
              rel="noopener"
            >
              <span>{project.primaryLabel}</span>
              <ArrowIcon className="projects-card__link-icon" />
            </a>
          )}
          {project.detailsLabel && (
            <button
              className="projects-card__button"
              type="button"
              onClick={toggleExpand}
            >
              <span>{isExpanded ? project.hideLabel : project.detailsLabel}</span>
              {isExpanded ? (
                <MinusIcon className="projects-card__button-icon" />
              ) : (
                <PlusIcon className="projects-card__button-icon" />
              )}
            </button>
          )}
        </div>

        <div
          className="projects-card__expanded-wrapper"
          style={{ height: isExpanded ? `${contentHeight}px` : "0px" }}
        >
          <div className="projects-card__expanded-inner" ref={contentRef}>
            {project.detailsContent}
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
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
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`projects-section reveal${isVisible ? " is-visible" : ""}`}
      aria-label="Projects"
    >
      <div className="projects-section__container">
        <div className="projects-section__heading">
          <div className="projects-section__badge">
            <span className="projects-section__badge-icon">
              <PhosphorIcon
                name="PaintBrush"
                className="projects-section__badge-star"
              />
            </span>
            <span className="projects-section__badge-label">Our Portfolio</span>
          </div>
          <h2>
            Real campaigns. Real coverage. Real results.
          </h2>
        </div>

        <div className="projects-section__list">
          {projects.map((project, i) => (
            <ProjectCard project={project} index={i} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
