import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";
import "./BenefitsGrid.css";
import benefitImage1 from "../assets/agencie/benefits/image1.png";
import benefitImage2 from "../assets/agencie/benefits/image2.png";
import benefitImage3 from "../assets/agencie/benefits/image3.png";
import benefitImage4 from "../assets/agencie/benefits/image4.png";

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

export function BenefitsSection() {
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
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
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

        <div className="benefits-grid">
          {/* Item 01 */}
          <div className="benefits-item benefits-item-1">
            <div className="benefits-line benefits-line-1-to-2"></div>
            <div className="benefits-image-placeholder img-1" style={{ backgroundImage: `url(${benefits[0].image})` }}></div>
            <div className="benefits-step-marker">
              <div className="benefits-circle">01</div>
            </div>
            <div className="benefits-text">
              {benefits[0].text}
            </div>
          </div>

          {/* Item 02 */}
          <div className="benefits-item benefits-item-2">
            <div className="benefits-line benefits-line-2-down"></div>
            <div className="benefits-image-placeholder img-2" style={{ backgroundImage: `url(${benefits[1].image})` }}></div>
            <div className="benefits-step-marker">
              <div className="benefits-circle">02</div>
            </div>
            <div className="benefits-text">
              {benefits[1].text}
            </div>
          </div>

          {/* Item 04 (visually left, but DOM order can match visual or logical) */}
          <div className="benefits-item benefits-item-4">
            <div className="benefits-image-placeholder img-4" style={{ backgroundImage: `url(${benefits[3].image})` }}></div>
            <div className="benefits-step-marker">
              <div className="benefits-circle">04</div>
            </div>
            <div className="benefits-text">
              {benefits[3].text}
            </div>
          </div>

          {/* Item 03 */}
          <div className="benefits-item benefits-item-3">
            <div className="benefits-line benefits-line-3-up"></div>
            <div className="benefits-line benefits-line-3-to-4"></div>
            <div className="benefits-image-placeholder img-3" style={{ backgroundImage: `url(${benefits[2].image})` }}></div>
            <div className="benefits-step-marker">
              <div className="benefits-circle">03</div>
            </div>
            <div className="benefits-text">
              {benefits[2].text}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
