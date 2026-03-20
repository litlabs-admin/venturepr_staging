import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";

import rabbitaiImage from "../assets/agencie/projects/rabbit_thumbnail.png";
import lexmachinaImage from "../assets/agencie/projects/lexmachina_thumbnail.png";
import loomlyImage from "../assets/agencie/projects/loomly_thumbnail.png";
import narwalImage from "../assets/agencie/projects/narwal.png";
import beatbotImage from "../assets/agencie/projects/beatbot.png";
import audyenceImage from "../assets/agencie/projects/audyence.png";

const projects = [
  {
    title: "Narwal",
    image: narwalImage,
    services: [
      "CONSUMER ELECTRONICS",
      "SMART HOME",
      "GLOBAL PR",
      "CES STRATEGY"
    ],
    detailsLabel: "Expand Details",
    hideLabel: "Hide Details",
    detailsContent: (
      <div className="projects-card__expanded-content">
        <h4>
          <strong>
            Elevating Narwal’s Global Presence Through Strategic Media, CES Launches, and Award Wins
          </strong>
        </h4>
        <p>
          Narwal partnered with Venture PR to amplify its position as a leader in intelligent cleaning robotics across the US and international markets. We led integrated media strategies for major product launches including the Flow Series, Freo Z10, Freo Pro, and S30, combining compelling product narratives with hands-on media experiences at CES 2025.
        </p>
        <p>
          Our approach focused on securing top-tier coverage, coordinating impactful launch events, and driving global recognition through prestigious award programs. We engaged leading technology and business publications across regions while positioning Narwal’s innovations at the forefront of smart home and robotics conversations.
        </p>

        <h4><strong>Result:</strong></h4>
        <p>
          Extensive top-tier media coverage across Time, Forbes, TechCrunch, Engadget, CNET, and WIRED, alongside major award wins including Red Dot Design Award, CES Innovation Award 2025, and Edison Gold Award. Narwal achieved strong global visibility, consistent product sell-outs post-launch, and reinforced its position as a leading innovator in the smart cleaning category.
        </p>
      </div>
    )
  },
  {
    title: "Audyence",
    image: audyenceImage,
    services: [
      "B2B SAAS",
      "DEMAND GENERATION",
      "PRODUCT LAUNCH",
      "THOUGHT LEADERSHIP"
    ],
    detailsLabel: "Expand Details",
    hideLabel: "Hide Details",
    detailsContent: (
      <div className="projects-card__expanded-content">
        <h4>
          <strong>
            Launching Audyence and Defining a New Category in B2B Demand Generation
          </strong>
        </h4>
        <p>
          Audyence partnered with Venture PR to introduce its Real-Time Demand (RTD) platform, the first programmatic solution enabling cost-per-lead (CPL) campaigns in B2B marketing. Our strategy focused on positioning the company as a category creator, emphasizing its unique approach to automation, transparency, and performance-driven demand generation.
        </p>
        <p>
          We executed a comprehensive launch campaign combining product storytelling, thought leadership, and early customer success narratives. Through bylined articles, executive interviews, and targeted media outreach, we established Audyence’s leadership voice across marketing and technology ecosystems.
        </p>

        <h4><strong>Result:</strong></h4>
        <p>
          Over 40 million media impressions and widespread coverage across Business Wire, Marketing Dive, AdExchanger, MarTech Series, Adweek, and USA Today. Achieved a 100% post-beta renewal rate with early seven-figure revenue projections, while positioning Audyence as a leading innovator in programmatic B2B demand generation and a go-to voice for industry insights.
        </p>
      </div>
    )
  },
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
    title: "Beatbot",
    image: beatbotImage,
    services: [
      "CONSUMER ELECTRONICS",
      "ROBOTICS",
      "PRODUCT LAUNCH",
      "CES STRATEGY"
    ],
    detailsLabel: "Expand Details",
    hideLabel: "Hide Details",
    detailsContent: (
      <div className="projects-card__expanded-content">
        <h4>
          <strong>
            Launching Beatbot’s AquaSense Series and Driving Global Recognition in AI-Powered Robotics
          </strong>
        </h4>
        <p>
          Beatbot partnered with Venture PR to elevate its global brand presence and introduce the AquaSense, AquaSense Pro, and AquaSense 2 Ultra through high-impact product launches and CES 2025 activations. Our strategy positioned Beatbot as a leader in consumer robotics by highlighting its innovation in AI-powered pool cleaning, user experience, and sustainability.
        </p>
        <p>
          We executed a comprehensive global media campaign, combining targeted outreach, hands-on demos, and strategic storytelling to engage top-tier technology and robotics publications. Award submissions and industry recognition programs further reinforced Beatbot’s credibility and product excellence.
        </p>

        <h4><strong>Result:</strong></h4>
        <p>
          Extensive coverage across CNET, ZDNet, TechCrunch, and IEEE Spectrum, alongside features in Fast Company and Robotics Business Review. Secured major accolades including the Red Dot Design Award, CES Innovation Award, and multiple “Best of CES” recognitions. Drove strong retailer and consumer demand, rapid adoption, and established Beatbot as a category leader in smart pool cleaning and AI robotics.
        </p>
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

function ProjectCard({ project }) {
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
      </div>

      <div className="projects-card__content">
        <div className="projects-card__body">
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
          {projects.map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
