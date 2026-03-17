import lexImage from "../../assets/our-work/case-studies/lex-machina.png";
import guruImage from "../../assets/our-work/case-studies/guru.png";
import audyenceImage from "../../assets/our-work/case-studies/audyence.png";
import loomlyImage from "../../assets/our-work/case-studies/loomly.png";
import rabbitImage from "../../assets/our-work/case-studies/rabbit.png";
import roborockImage from "../../assets/our-work/case-studies/roborock.png";
import narwalImage from "../../assets/our-work/case-studies/narwal.png";
import beatbotImage from "../../assets/our-work/case-studies/beatbot.png";

const caseStudies = [
  {
    name: "Lex Machina",
    description: "Building Global Visibility for a Leading Legal Analytics Platform",
    image: lexImage,
    frameClass: "lex",
  },
  {
    name: "GuRu",
    description: "Driving Media Attention Around Breakthrough Wireless Technology",
    image: guruImage,
    frameClass: "guru",
  },
  {
    name: "Audyence",
    description: "Redefining B2B Demand Generation with Programmatic Innovation",
    image: audyenceImage,
    frameClass: "audyence",
  },
  {
    name: "Loomly",
    description: "Sustained Media Coverage for a Social Media Management Platform",
    image: loomlyImage,
    frameClass: "loomly",
  },
  {
    name: "Rabbit",
    description:
      "Rabbit r1 is a personal assistant by Rabbit Inc, designed with Teenage Engineering. It offers smart functions like browsing and music.",
    image: rabbitImage,
    frameClass: "rabbit",
  },
  {
    name: "Roborock",
    description: "Top Tier Product Reviews and Media Awards for Roborock.",
    image: roborockImage,
    frameClass: "roborock",
  },
  {
    name: "Narwal",
    description:
      "Elevating Smart Cleaning Through Top-Tier Technology Media and Industry Recognition",
    image: narwalImage,
    frameClass: "narwal",
  },
  {
    name: "Beatbot",
    description:
      "Beatbot announces the AquaSense 2 Series alongside new partnership with U.S. SailGP team.",
    image: beatbotImage,
    frameClass: "beatbot",
  },
];

export function OurWorkCaseStudiesSection() {
  return (
    <section
      className="our-work-case-studies-exact"
      aria-labelledby="our-work-case-studies-title"
    >
      <div className="our-work-case-studies-exact__eyebrow">/ Case Studies</div>
      <div className="our-work-case-studies-exact__header">
        <h2 id="our-work-case-studies-title">
          Performance Audits &amp; Client Scenarios
        </h2>
        <p>
          Step-by-step analyses of our operational execution. We dissect the initial
          problem, the exact strategies deployed, and the raw, unedited data that defined
          the final outcome.
        </p>
      </div>

      <div className="our-work-case-studies-exact__grid">
        {caseStudies.map((study) => (
          <article
            key={study.name}
            className={`our-work-case-studies-exact__card our-work-case-studies-exact__card--${study.frameClass}`}
          >
            <div
              className={`our-work-case-studies-exact__frame our-work-case-studies-exact__frame--${study.frameClass}`}
            >
              <img
                className={`our-work-case-studies-exact__image our-work-case-studies-exact__image--${study.frameClass}`}
                src={study.image}
                alt=""
              />
            </div>
            <div className="our-work-case-studies-exact__panel">
              <h3>{study.name}</h3>
              <p>{study.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
