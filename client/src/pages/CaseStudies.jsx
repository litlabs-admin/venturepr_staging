import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import {
  caseStudies,
  caseStudiesBySlug,
  defaultCaseStudySlug,
} from "../data/caseStudies";
import { useOurWorkBreakpoint } from "../components/our-work/useOurWorkBreakpoint";

const carouselSettingsByBreakpoint = {
  desktop: {
    cardWidthPx: 427,
    cardHeightPx: 319,
    panelWidthPx: 382,
    gapPx: 25.7824,
  },
  tablet: {
    cardWidthPx: 360,
    cardHeightPx: 269,
    panelWidthPx: 320,
    gapPx: 22,
  },
  mobile: {
    cardWidthPx: 286,
    cardHeightPx: 214,
    panelWidthPx: 286,
    gapPx: 16,
  },
};

const carouselTiming = {
  intervalMs: 2500,
  animationMs: 750,
};

const mod = (value, length) => ((value % length) + length) % length;

function getGridCropStyle(study) {
  return {
    "--grid-frame-color": study.gridFrameColor,
    "--grid-crop-width-ratio": `${study.gridImageCrop.widthRatio}`,
    "--grid-crop-height-ratio": `${study.gridImageCrop.heightRatio}`,
    "--grid-crop-top-ratio": `${study.gridImageCrop.topRatio}`,
    "--grid-crop-left-ratio": `${study.gridImageCrop.leftRatio}`,
    "--grid-crop-fit": study.gridImageCrop.objectFit,
  };
}

export function CaseStudiesPage() {
  const { slug } = useParams();
  const caseStudy = slug ? caseStudiesBySlug[slug] : caseStudiesBySlug[defaultCaseStudySlug];
  const resolvedCaseStudy = caseStudy ?? caseStudiesBySlug[defaultCaseStudySlug];
  const breakpoint = useOurWorkBreakpoint();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const carouselSettings = carouselSettingsByBreakpoint[breakpoint];
  const relatedCaseStudies = useMemo(
    () => caseStudies.filter((study) => study.slug !== resolvedCaseStudy.slug),
    [resolvedCaseStudy.slug]
  );

  const conclusionSection =
    resolvedCaseStudy.overviewSections[resolvedCaseStudy.overviewSections.length - 1] ?? null;
  const mainSections = conclusionSection
    ? resolvedCaseStudy.overviewSections.slice(0, -1)
    : resolvedCaseStudy.overviewSections;
  const relatedCount = relatedCaseStudies.length;

  useEffect(() => {
    setActiveIndex(0);
    setIsAnimating(false);
  }, [resolvedCaseStudy.slug]);

  useEffect(() => {
    if (relatedCount < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setIsAnimating((prev) => (prev ? prev : true));
    }, carouselTiming.intervalMs);

    return () => window.clearInterval(intervalId);
  }, [relatedCount]);

  useEffect(() => {
    if (!isAnimating || relatedCount < 2) return undefined;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((prev) => mod(prev + 1, relatedCount));
      setIsAnimating(false);
    }, carouselTiming.animationMs);

    return () => window.clearTimeout(timeoutId);
  }, [isAnimating, relatedCount]);

  const relatedSlots = useMemo(() => {
    if (relatedCount === 0) return [];
    if (relatedCount === 1) {
      return [{ slot: "slot-center", study: relatedCaseStudies[0] }];
    }

    if (breakpoint === "mobile") {
      if (isAnimating) {
        return [
          {
            slot: "slot-center-current",
            study: relatedCaseStudies[mod(activeIndex, relatedCount)],
          },
          {
            slot: "slot-center-next",
            study: relatedCaseStudies[mod(activeIndex + 1, relatedCount)],
          },
        ];
      }

      return [
        {
          slot: "slot-center",
          study: relatedCaseStudies[mod(activeIndex, relatedCount)],
        },
      ];
    }

    return [
      {
        slot: "slot-buffer-left",
        study:
          relatedCaseStudies[mod(activeIndex + (isAnimating ? -2 : -3), relatedCount)],
      },
      {
        slot: "slot-exit-left",
        study:
          relatedCaseStudies[mod(activeIndex + (isAnimating ? -1 : -2), relatedCount)],
      },
      {
        slot: "slot-left",
        study: relatedCaseStudies[mod(activeIndex + (isAnimating ? 0 : -1), relatedCount)],
      },
      {
        slot: "slot-center",
        study: relatedCaseStudies[mod(activeIndex + (isAnimating ? 1 : 0), relatedCount)],
      },
      {
        slot: "slot-right",
        study: relatedCaseStudies[mod(activeIndex + (isAnimating ? 2 : 1), relatedCount)],
      },
      {
        slot: "slot-enter-right",
        study: relatedCaseStudies[mod(activeIndex + (isAnimating ? 3 : 2), relatedCount)],
      },
      {
        slot: "slot-buffer-right",
        study: relatedCaseStudies[mod(activeIndex + (isAnimating ? 4 : 3), relatedCount)],
      },
    ];
  }, [activeIndex, breakpoint, isAnimating, relatedCaseStudies, relatedCount]);

  if (!caseStudy) {
    return <Navigate replace to={`/case-studies/${defaultCaseStudySlug}`} />;
  }

  return (
    <div className="page-exact-shell">
      <FloatingNav />
      <main className="case-studies-page-exact">
        <div className="case-detail-exact">
          <div className="case-detail-exact__intro">
            <div className="case-detail-exact__hero">
              <div className="case-detail-exact__hero-media">
                <img
                  src={resolvedCaseStudy.heroImage}
                  alt={resolvedCaseStudy.heroImageAlt}
                />
              </div>
            </div>

            <div className="case-detail-exact__stack">
              <div className="case-detail-exact__title">
                <h1>{resolvedCaseStudy.title}</h1>
                <p>{resolvedCaseStudy.headline}</p>
              </div>

              {mainSections.map((section, index) => (
                <div key={section.title} className="case-detail-exact__block">
                  <h2>{section.title}</h2>
                  {section.body.map((paragraph, paragraphIndex) => {
                    const text = typeof paragraph === "string" ? paragraph : paragraph.text;
                    const weight =
                      typeof paragraph === "object" && paragraph.weight === "bold"
                        ? "bold"
                        : "normal";

                    return (
                      <p
                        key={`${section.title}-${paragraphIndex}`}
                        className={`case-detail-exact__paragraph case-detail-exact__paragraph--${weight}`}
                      >
                        {text}
                      </p>
                    );
                  })}
                  {index < mainSections.length - 1 && (
                    <div className="case-detail-exact__divider" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="case-detail-exact__closing">
            <div className="case-detail-exact__publication">
              <h2>Publication highlights</h2>
              <p>{resolvedCaseStudy.publicationIntro}</p>
            </div>

            {conclusionSection ? (
              <div className="case-detail-exact__block case-detail-exact__block--closing">
                <h2>{conclusionSection.title}</h2>
                {conclusionSection.body.map((paragraph, paragraphIndex) => {
                  const text = typeof paragraph === "string" ? paragraph : paragraph.text;
                  const weight =
                    typeof paragraph === "object" && paragraph.weight === "bold"
                      ? "bold"
                      : "normal";

                  return (
                    <p
                      key={`${conclusionSection.title}-${paragraphIndex}`}
                      className={`case-detail-exact__paragraph case-detail-exact__paragraph--${weight}`}
                    >
                      {text}
                    </p>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <section className="case-studies-grid-exact">
          <div className="case-studies-grid-exact__eyebrow">/ Our Work</div>
          <div className="case-studies-grid-exact__header">
            <h2>Performance Audits &amp; Client Scenarios</h2>
            <p>
              Step-by-step analyses of our operational execution. We dissect the initial
              problem, the exact strategies deployed, and the raw, unedited data that
              defined the final outcome.
            </p>
          </div>

          <div className="case-studies-grid-exact__carousel">
            <div
              className={`case-studies-grid-exact__row${isAnimating ? " is-animating" : ""}`}
              style={{
                "--case-studies-card-width": `${carouselSettings.cardWidthPx}px`,
                "--case-studies-card-height": `${carouselSettings.cardHeightPx}px`,
                "--case-studies-panel-width": `${carouselSettings.panelWidthPx}px`,
                "--case-studies-slot-step": `${
                  carouselSettings.cardWidthPx + carouselSettings.gapPx
                }px`,
              }}
            >
              {relatedSlots.map(({ slot, study }) => (
                <div
                  key={study.slug}
                  className={`case-studies-grid-exact__carousel-item case-studies-grid-exact__carousel-item--${slot}`}
                >
                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="case-studies-grid-exact__card"
                  >
                    <div
                      className="case-studies-grid-exact__frame"
                      style={getGridCropStyle(study)}
                    >
                      <img
                        className="case-studies-grid-exact__image"
                        src={study.gridImage}
                        alt=""
                      />
                    </div>
                    <div className="case-studies-grid-exact__panel">
                      <h3>{study.name}</h3>
                      <p>{study.headline}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
