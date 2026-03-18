import { Link } from "react-router-dom";
import { caseStudies } from "../../data/caseStudies";

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
          <Link
            key={study.slug}
            to={`/case-studies/${study.slug}`}
            className={`our-work-case-studies-exact__card our-work-case-studies-exact__card--${study.frameClass}`}
            aria-label={`View ${study.name} case study`}
          >
            <div
              className={`our-work-case-studies-exact__frame our-work-case-studies-exact__frame--${study.frameClass}`}
            >
              <img
                className={`our-work-case-studies-exact__image our-work-case-studies-exact__image--${study.frameClass}`}
                src={study.listingImage}
                alt=""
              />
            </div>
            <div className="our-work-case-studies-exact__panel">
              <h3>{study.name}</h3>
              <p>{study.headline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
