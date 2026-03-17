import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";

const faqItems = [
  {
    question: "What types of companies do you work with?",
    answer:
      "We specialize in US-based tech companies B2B SaaS, AI, robotics, consumer electronics, and smart home brands. We also work with venture-backed companies in adjacent industries, including healthcare and professional services. Our sweet spot is innovative, high-growth brands with a story worth telling."
  },
  {
    question: "How quickly can you start getting us coverage?",
    answer:
      "We start pitching within your first 30 days not 90. Month one is strategy, press kit, and outreach. Most clients see their first placements in months 1-2."
  },
  {
    question: "Do you guarantee media placements?",
    answer:
      "Yes. Unlike most PR agencies, we believe a firm should only take a client if they can get results. We guarantee earned media coverage meaning real journalists, real publications, not paid placements or wire services."
  },
  {
    question: "What is the pilot program and how does it work?",
    answer:
      "Our standard starting engagement is a 4-month pilot three months of work plus a 30-day cancellation notice period. It's designed to be a low-commitment, high-value way to start. After the pilot, clients typically go month-to-month."
  },
  {
    question: "What publications can you get us into?",
    answer:
      "It depends on your story and your market. For tech clients, we regularly secure coverage in TechCrunch, VentureBeat, Wired, Forbes, Business Insider, and the Wall Street Journal. For consumer electronics, add top reviewer outlets and influencer channels. For trade verticals, we target the publications your buyers actually read."
  },
  {
    question: "How is Venture PR different from larger agencies?",
    answer:
      "Senior publicists on every account, always. No hand-offs to junior staff. A team that includes former journalists who understand how newsrooms actually work. And a pilot program that makes it easy to start without a 12-month commitment."
  },
  {
    question: "Do you work with companies outside the US?",
    answer:
      "Our primary focus is US-based companies, but we also work with European tech and VC-backed brands. We've represented clients in the UK, Germany, and across Asia-Pacific. Geography works if the time zone is workable for regular calls."
  },
  {
    question: "How do you measure PR success?",
    answer:
      "We track every published placement publication tier, readership, domain authority, and relevance to your target market. You'll receive a monthly report with all coverage, plus context on what it means for your brand's momentum. We use our proprietary Venture Edge platform for real-time tracking."
  },
  {
    question: "What does a typical month look like?",
    answer:
      "Week 1: Strategy sync + new pitches. Week 2: Active outreach + journalist follow-up. Week 3: Coverage tracking + any thought leadership article work. Week 4: Monthly report review + planning for the next cycle. You'll always know where things stand."
  }
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <article className={`faq-section__item${isOpen ? " is-open" : ""}`}>
      <button
        className="faq-section__question"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-section__question-text">{item.question}</span>
        <span className="faq-section__icon" aria-hidden="true">
          <PhosphorIcon name="X" />
        </span>
      </button>
      <div className="faq-section__answer" aria-hidden={!isOpen}>
        <div className="faq-section__answer-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </article>
  );
}

export function FaqSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);

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
      id="faq"
      ref={sectionRef}
      className={`faq-section reveal${isVisible ? " is-visible" : ""}`}
      aria-label="FAQ"
    >
      <div className="faq-section__container">
        <div className="faq-section__intro">
          <div className="faq-section__badge">
            <span className="faq-section__badge-icon">
              <PhosphorIcon
                name="Question"
                className="faq-section__badge-star"
              />
            </span>
            <span className="faq-section__badge-label">
              Frequently Asked Questions
            </span>
          </div>
          <div className="faq-section__copy">
            <h2>
              Everything you want to know about working with Venture PR.
            </h2>
            <p>
              We've gathered all the important info right here. Explore our FAQs
              and find the answers you need.
            </p>
          </div>
        </div>

        <div className="faq-section__list" role="list">
          {faqItems.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? -1 : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
