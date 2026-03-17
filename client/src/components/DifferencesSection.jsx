import { useEffect, useRef, useState } from "react";
import { PhosphorIcon } from "./PhosphorIcon";

import differences_logo from "../assets/logo/differences_logo.png";
import chartBarSvg from "../assets/agencie/differences/icons/chart-bar.svg?raw";
import chatTeardropTextSvg from "../assets/agencie/differences/icons/chat-teardrop-text.svg?raw";
import crownSvg from "../assets/agencie/differences/icons/crown.svg?raw";
import handshakeSvg from "../assets/agencie/differences/icons/handshake.svg?raw";
import heartSvg from "../assets/agencie/differences/icons/heart.svg?raw";
import lightningSvg from "../assets/agencie/differences/icons/lightning.svg?raw";
import puzzlePieceSvg from "../assets/agencie/differences/icons/puzzle-piece.svg?raw";
import rocketSvg from "../assets/agencie/differences/icons/rocket.svg?raw";
import smileySadSvg from "../assets/agencie/differences/icons/smiley-sad.svg?raw";
import tagSvg from "../assets/agencie/differences/icons/tag.svg?raw";
import toolboxSvg from "../assets/agencie/differences/icons/toolbox.svg?raw";

const iconSvgs = {
  SmileySad: smileySadSvg,
  PuzzlePiece: puzzlePieceSvg,
  ChatTeardropText: chatTeardropTextSvg,
  Rocket: rocketSvg,
  ChartBar: chartBarSvg,
  Handshake: handshakeSvg,
  Tag: tagSvg,
  Lightning: lightningSvg,
  Toolbox: toolboxSvg,
  Crown: crownSvg,
  Heart: heartSvg
};

const othersPoints = [
  { label: "Junior account execs run your campaign", icon: "SmileySad" },
  { label: "90-day ramp-up before first pitch", icon: "SmileySad" },
  { label: "No coverage guarantees", icon: "SmileySad" },
  { label: "Cookie-cutter pitch templates", icon: "SmileySad" },
  { label: "One-size-fits-all strategy", icon: "SmileySad" },
  { label: "Jargon-heavy, confusing reports", icon: "SmileySad" },
  { label: "Paid placements disguised as PR", icon: "SmileySad" },
  { label: "Spray-and-pray email blasts", icon: "SmileySad" },
  { label: "No journalism expertise in-house", icon: "SmileySad" },
  { label: "Just another client on their roster", icon: "SmileySad" }
];

const brandPoints = [
  { label: "Senior publicists on every account, always", icon: "PuzzlePiece" },
  { label: "First pitches go out within 30 days", icon: "ChatTeardropText" },
  { label: "Guaranteed earned media coverage", icon: "Rocket" },
  { label: "Journalist-quality, tailored pitches", icon: "ChartBar" },
  { label: "Strategy built for your brand's market", icon: "Handshake" },
  { label: "Plain-English reporting you actually use", icon: "Tag" },
  { label: "Earned media only — no pay-to-play", icon: "Lightning" },
  { label: "Precision-targeted, relationship-driven outreach", icon: "Toolbox" },
  { label: "Former WSJ, TechCrunch & Forbes writers on staff", icon: "Crown" },
  { label: "Your brand is our mission", icon: "Heart" }
];

function BadgeStarIcon() {
  return (
    <PhosphorIcon
      name="Scales"
      className="differences-section__badge-star"
    />
  );
}

function DifferenceIcon({ icon }) {
  return (
    <span
      className="differences-pill__icon-svg"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: iconSvgs[icon] }}
    />
  );
}

export function DifferencesSection() {
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
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`differences-section reveal${isVisible ? " is-visible" : ""}`}
      aria-label="Differences"
    >
      <div className="differences-section__heading">
        <div className="differences-section__badge">
          <span className="differences-section__badge-icon">
            <BadgeStarIcon />
          </span>
          <span className="differences-section__badge-label">Our differences</span>
        </div>
        <h2>
          While other agencies hand your account to interns, we give you senior-level attention every campaign, every time.
        </h2>
      </div>

      <div className="differences-section__content">
        <div className="differences-column">
          <h3 className="differences-column__title">Others</h3>
          <div className="differences-column__points differences-column__points--light">
            {othersPoints.map((point) => (
              <div className="differences-pill differences-pill--light" key={point.label}>
                <span className="differences-pill__icon">
                  <DifferenceIcon icon={point.icon} />
                </span>
                <span className="differences-pill__label">{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="differences-column">
          <div className="differences-column__brand">
            <img src={differences_logo} alt="Venture PR" className="differences-logo-img" />
          </div>
          <div className="differences-column__points differences-column__points--dark">
            {brandPoints.map((point) => (
              <div className="differences-pill differences-pill--dark" key={point.label}>
                <span className="differences-pill__icon">
                  <DifferenceIcon icon={point.icon} />
                </span>
                <span className="differences-pill__label">{point.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
