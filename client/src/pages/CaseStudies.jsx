import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import {
  caseStudies,
  caseStudiesBySlug,
  defaultCaseStudySlug,
} from "../data/caseStudies";
import { useOurWorkBreakpoint } from "../components/our-work/useOurWorkBreakpoint";
import { usePageTitle } from "../hooks/usePageTitle";

const carouselTiming = {
  intervalMs: 2500,
  animationMs: 750,
};

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

function renderBulletItem(
  item,
  sectionTitle,
  index,
  level = 0,
  { hasNestedGroups = false } = {}
) {
  const text = typeof item === "string" ? item : item.text;
  const children = typeof item === "object" && Array.isArray(item.children) ? item.children : null;
  const isLeadingFlatBullet = level === 0 && index === 0 && !hasNestedGroups;
  const weight =
    typeof item === "object" && item.weight === "bold" && !isLeadingFlatBullet
      ? "bold"
      : "normal";

  return (
    <li
      key={`${sectionTitle}-${level}-${index}`}
      className={`case-detail-exact__paragraph case-detail-exact__paragraph--${weight} case-detail-exact__paragraph--level-${level}`}
    >
      {text}
      {children && children.length > 0 ? (
        <ul className="case-detail-exact__list case-detail-exact__list--nested">
          {children.map((child, childIndex) =>
            renderBulletItem(child, sectionTitle, `${index}-${childIndex}`, level + 1, {
              hasNestedGroups,
            })
          )}
        </ul>
      ) : null}
    </li>
  );
}

function renderSectionBody(sectionBody, sectionTitle, listClassName = "case-detail-exact__list") {
  const hasNestedGroups = sectionBody.some(
    (item) => typeof item === "object" && Array.isArray(item.children) && item.children.length > 0
  );

  if (sectionBody.length === 1) {
    const paragraph = sectionBody[0];
    const text = typeof paragraph === "string" ? paragraph : paragraph.text;
    const weight = typeof paragraph === "object" && paragraph.weight === "bold" ? "bold" : "normal";

    return (
      <p className={`case-detail-exact__paragraph case-detail-exact__paragraph--${weight}`}>
        {text}
      </p>
    );
  }

  return (
    <ul className={listClassName}>
      {sectionBody.map((paragraph, paragraphIndex) =>
        renderBulletItem(paragraph, sectionTitle, paragraphIndex, 0, { hasNestedGroups })
      )}
    </ul>
  );
}

export function CaseStudiesPage() {
  const { slug } = useParams();
  const caseStudy = slug ? caseStudiesBySlug[slug] : caseStudiesBySlug[defaultCaseStudySlug];
  usePageTitle(caseStudy ? `${caseStudy.title} - Venture PR` : null);
  const breakpoint = useOurWorkBreakpoint();
  const cardsPerView = breakpoint === "mobile" ? 1 : 3;
  const carouselViewportRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [carouselLayout, setCarouselLayout] = useState(() => ({
    cardWidthPx: breakpoint === "mobile" ? 286 : 360,
    gapPx: breakpoint === "mobile" ? 16 : 24,
  }));
  const relatedCaseStudies = useMemo(
    () => caseStudies.filter((study) => study.slug !== caseStudy?.slug),
    [caseStudy?.slug]
  );

  const conclusionSection = caseStudy
    ? caseStudy.overviewSections[caseStudy.overviewSections.length - 1] ?? null
    : null;
  const mainSections = conclusionSection
    ? caseStudy.overviewSections.slice(0, -1)
    : (caseStudy?.overviewSections ?? []);
  const relatedCount = relatedCaseStudies.length;
  const isLooping = relatedCount > cardsPerView;

  useEffect(() => {
    const viewportNode = carouselViewportRef.current;
    if (!viewportNode) return undefined;

    const measureLayout = () => {
      const viewportWidth = viewportNode.clientWidth;
      if (!viewportWidth) return;

      const nextGapPx =
        cardsPerView === 1 ? 16 : Math.min(26, Math.max(16, viewportWidth * 0.02));
      const nextCardWidthPx =
        cardsPerView === 1
          ? viewportWidth
          : (viewportWidth - nextGapPx * (cardsPerView - 1)) / cardsPerView;

      setCarouselLayout((current) => {
        if (
          Math.abs(current.cardWidthPx - nextCardWidthPx) < 0.5 &&
          Math.abs(current.gapPx - nextGapPx) < 0.5
        ) {
          return current;
        }

        return {
          cardWidthPx: nextCardWidthPx,
          gapPx: nextGapPx,
        };
      });
    };

    measureLayout();

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(measureLayout);
      resizeObserver.observe(viewportNode);
    }

    window.addEventListener("resize", measureLayout);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureLayout);
    };
  }, [cardsPerView]);

  useEffect(() => {
    setTrackIndex(isLooping ? cardsPerView : 0);
    setIsTransitionEnabled(isLooping);
  }, [cardsPerView, isLooping, caseStudy?.slug]);

  useEffect(() => {
    if (!isLooping || !isTransitionEnabled) return undefined;

    const intervalId = window.setInterval(() => {
      setTrackIndex((current) => current + 1);
    }, carouselTiming.intervalMs);

    return () => window.clearInterval(intervalId);
  }, [isLooping, isTransitionEnabled]);

  useEffect(() => {
    if (!isLooping || isTransitionEnabled) return undefined;

    let firstFrameId = 0;
    let secondFrameId = 0;

    firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, [isLooping, isTransitionEnabled]);

  const carouselItems = useMemo(() => {
    if (!isLooping) {
      return relatedCaseStudies.map((study, index) => ({
        key: `${study.slug}-real-${index}`,
        study,
      }));
    }

    const leadingClones = relatedCaseStudies.slice(-cardsPerView).map((study, index) => ({
      key: `${study.slug}-leading-${index}`,
      study,
    }));
    const realItems = relatedCaseStudies.map((study, index) => ({
      key: `${study.slug}-real-${index}`,
      study,
    }));
    const trailingClones = relatedCaseStudies.slice(0, cardsPerView).map((study, index) => ({
      key: `${study.slug}-trailing-${index}`,
      study,
    }));

    return [...leadingClones, ...realItems, ...trailingClones];
  }, [cardsPerView, isLooping, relatedCaseStudies]);

  const trackOffsetPx = isLooping
    ? trackIndex * (carouselLayout.cardWidthPx + carouselLayout.gapPx)
    : 0;

  const handleTrackTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || !isLooping) return;

    if (trackIndex >= relatedCount + cardsPerView) {
      setIsTransitionEnabled(false);
      setTrackIndex(cardsPerView);
    }
  };

  if (!caseStudy) {
    return <Navigate replace to="/not-found" />;
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
                  src={caseStudy.heroImage}
                  alt={caseStudy.heroImageAlt}
                />
              </div>
            </div>

            <div className="case-detail-exact__stack">
              <div className="case-detail-exact__title">
                <h1>{caseStudy.title}</h1>
                <p>{caseStudy.headline}</p>
              </div>

              {mainSections.map((section, index) => (
                <div
                  key={section.title}
                  className={`case-detail-exact__block${
                    index > 0 ? " case-detail-exact__block--with-divider" : ""
                  }`}
                >
                  <h2>{section.title}</h2>
                  {renderSectionBody(section.body, section.title)}
                </div>
              ))}
            </div>
          </div>

          <div className="case-detail-exact__closing">
            <div className="case-detail-exact__publication">
              <h2>Publication highlights</h2>
              <p className="case-detail-exact__paragraph">{caseStudy.publicationIntro}</p>
            </div>

            {conclusionSection ? (
              <div className="case-detail-exact__block case-detail-exact__block--closing case-detail-exact__block--with-divider">
                <h2>{conclusionSection.title}</h2>
                {renderSectionBody(
                  conclusionSection.body,
                  conclusionSection.title,
                  "case-detail-exact__list case-detail-exact__list--nested"
                )}
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
              ref={carouselViewportRef}
              className="case-studies-grid-exact__viewport"
              style={{
                "--case-studies-card-width": `${carouselLayout.cardWidthPx}px`,
                "--case-studies-carousel-gap": `${carouselLayout.gapPx}px`,
              }}
            >
              <div
                className={`case-studies-grid-exact__row${
                  !isLooping ? " is-static" : ""
                }${!isTransitionEnabled ? " is-transition-disabled" : ""}`}
                onTransitionEnd={handleTrackTransitionEnd}
                style={{
                  transform: `translateX(-${trackOffsetPx}px)`,
                  transitionDuration:
                    isLooping && isTransitionEnabled
                      ? `${carouselTiming.animationMs}ms`
                      : "0ms",
                }}
              >
                {carouselItems.map(({ key, study }, index) => {
                  const isVisible =
                    !isLooping || (index >= trackIndex && index < trackIndex + cardsPerView);

                  return (
                    <div
                      key={key}
                      className="case-studies-grid-exact__carousel-item"
                      aria-hidden={!isVisible}
                    >
                      <Link
                        to={`/case-studies/${study.slug}`}
                        className="case-studies-grid-exact__card"
                        tabIndex={isVisible ? 0 : -1}
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
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
