import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data/testimonials";
import { useOurWorkBreakpoint } from "./our-work/useOurWorkBreakpoint";

const MIN_MOBILE_WIDTH = 420;
const VISIBLE_MS = 1500;
const COOLDOWN_MS = 2200;

const mod = (value, length) => ((value % length) + length) % length;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return prefersReducedMotion;
}

function shortenQuote(quote, maxLength) {
  const normalizedQuote = quote.replace(/^[\u201c"]|[\u201d"]$/g, "");
  if (normalizedQuote.length <= maxLength) {
    return normalizedQuote;
  }

  const trimmedQuote = normalizedQuote.slice(0, maxLength);
  const lastSpaceIndex = trimmedQuote.lastIndexOf(" ");
  const safeQuote = lastSpaceIndex > 40 ? trimmedQuote.slice(0, lastSpaceIndex) : trimmedQuote;
  return `${safeQuote}...`;
}

function isWhitespaceTarget(element) {
  if (!element) {
    return false;
  }

  if (
    element.closest(
      [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "img",
        "picture",
        "video",
        "canvas",
        "svg",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "li",
        ".marqo-button",
        ".testimonial-card",
        ".benefit-card",
        ".brand-tile",
        ".case-studies-grid-exact__carousel-item",
        ".our-work-coverage-exact__carousel-item",
        ".testimonial-carousel",
      ].join(", ")
    )
  ) {
    return false;
  }

  return true;
}

function getPromptSamplePoints(side, isCompact) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isRight = side === "right";
  const xPositions = isCompact
    ? [viewportWidth - 48, viewportWidth - 132]
    : isRight
      ? [viewportWidth - 40, viewportWidth - 132, viewportWidth - 220]
      : [40, 132, 220];
  const yPositions = isCompact
    ? [viewportHeight - 108, viewportHeight - 156]
    : [viewportHeight - 118, viewportHeight - 166, viewportHeight - 214];

  return xPositions.flatMap((x) =>
    yPositions.map((y) => ({
      x: Math.max(8, Math.min(viewportWidth - 8, x)),
      y: Math.max(8, Math.min(viewportHeight - 8, y)),
    }))
  );
}

function canRenderInWhitespace(side, isCompact) {
  return getPromptSamplePoints(side, isCompact).every(({ x, y }) =>
    isWhitespaceTarget(document.elementFromPoint(x, y))
  );
}

function getEligibleSection(nodeList) {
  const viewportHeight = window.innerHeight;
  const sections = Array.from(nodeList);

  return (
    sections.find((section) => {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const sectionHeight = Math.max(rect.height, 1);
      return visibleHeight > sectionHeight * 0.3 && rect.bottom > viewportHeight * 0.3;
    }) ?? null
  );
}

export function FloatingEdgeTestimonials() {
  const breakpoint = useOurWorkBreakpoint();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [promptState, setPromptState] = useState({
    index: 0,
    side: "right",
    isVisible: false,
  });
  const visibilityTimeoutRef = useRef(null);
  const scrollStateRef = useRef({
    lastTriggerAt: 0,
    nextIndex: 0,
    nextSide: "left",
    isVisible: false,
    shownSectionKeys: new Set(),
  });

  useEffect(() => {
    return () => {
      if (visibilityTimeoutRef.current) {
        window.clearTimeout(visibilityTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) {
      return undefined;
    }

    const isCompact = breakpoint === "mobile";
    if (isCompact && window.innerWidth < MIN_MOBILE_WIDTH) {
      setPromptState((prev) => ({ ...prev, isVisible: false }));
      return undefined;
    }

    let frameId = null;

    const hidePrompt = () => {
      scrollStateRef.current.isVisible = false;
      setPromptState((prev) => ({ ...prev, isVisible: false }));
    };

    const showPrompt = (sectionKey) => {
      const nextIndex = scrollStateRef.current.nextIndex;
      const preferredSide = scrollStateRef.current.nextSide;
      const resolvedSide = isCompact
        ? canRenderInWhitespace("right", true)
          ? "right"
          : null
        : canRenderInWhitespace(preferredSide, false)
          ? preferredSide
          : canRenderInWhitespace(preferredSide === "left" ? "right" : "left", false)
            ? preferredSide === "left" ? "right" : "left"
            : null;

      if (!resolvedSide) {
        return;
      }

      scrollStateRef.current.lastTriggerAt = Date.now();
      scrollStateRef.current.isVisible = true;
      scrollStateRef.current.shownSectionKeys.add(sectionKey);
      scrollStateRef.current.nextIndex = mod(nextIndex + 1, testimonials.length);
      scrollStateRef.current.nextSide = preferredSide === "left" ? "right" : "left";

      setPromptState({
        index: nextIndex,
        side: resolvedSide,
        isVisible: true,
      });

      if (visibilityTimeoutRef.current) {
        window.clearTimeout(visibilityTimeoutRef.current);
      }

      visibilityTimeoutRef.current = window.setTimeout(hidePrompt, VISIBLE_MS);
    };

    const updatePrompt = () => {
      frameId = null;

      const heroSection = document.getElementById("hero");
      const testimonialSection = document.querySelector(".testimonial-section");
      const newsletterSection = document.querySelector(".nl-section");
      const footerSection = document.querySelector(".footer-section");
      const eligibleSections = document.querySelectorAll(
        ".home-page > section:not(.marqo-hero):not(.testimonial-section):not(.nl-section)"
      );
      const viewportHeight = window.innerHeight;

      if (!heroSection || !testimonialSection || (!newsletterSection && !footerSection)) {
        return;
      }

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const stopAnchor =
        newsletterSection?.offsetTop ?? footerSection?.offsetTop ?? Number.POSITIVE_INFINITY;
      const startY = Math.max(heroBottom - viewportHeight * 0.2, 0);
      const stopY = Math.max(stopAnchor - viewportHeight * 1.15, startY);
      const testimonialRect = testimonialSection.getBoundingClientRect();
      const isTestimonialDominant =
        testimonialRect.top < viewportHeight * 0.62 &&
        testimonialRect.bottom > viewportHeight * 0.38;
      const scrollY = window.scrollY;
      const isWithinActiveBand = scrollY >= startY && scrollY <= stopY;
      const shouldAllowPrompt = isWithinActiveBand && !isTestimonialDominant;

      if (!shouldAllowPrompt) {
        if (visibilityTimeoutRef.current) {
          window.clearTimeout(visibilityTimeoutRef.current);
        }
        hidePrompt();
        return;
      }

      const isCoolingDown = Date.now() - scrollStateRef.current.lastTriggerAt < COOLDOWN_MS;
      const activeSection = getEligibleSection(eligibleSections);
      const activeSectionKey = activeSection?.className ?? null;

      if (
        activeSectionKey &&
        !scrollStateRef.current.isVisible &&
        !isCoolingDown &&
        !scrollStateRef.current.shownSectionKeys.has(activeSectionKey)
      ) {
        showPrompt(activeSectionKey);
      }
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updatePrompt);
    };

    scrollStateRef.current.lastTriggerAt = 0;
    scrollStateRef.current.isVisible = false;
    scrollStateRef.current.shownSectionKeys = new Set();
    setPromptState((prev) => ({ ...prev, isVisible: false }));

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (visibilityTimeoutRef.current) {
        window.clearTimeout(visibilityTimeoutRef.current);
      }
    };
  }, [breakpoint, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  const isCompact = breakpoint === "mobile";
  if (typeof window !== "undefined" && isCompact && window.innerWidth < MIN_MOBILE_WIDTH) {
    return null;
  }

  const testimonial = testimonials[promptState.index];
  const snippetLength = isCompact ? 92 : 124;

  return (
    <div className="floating-testimonials-layer" aria-hidden="true">
      <article
        className={`floating-testimonial-prompt floating-testimonial-prompt--${promptState.side}${
          promptState.isVisible ? " is-visible" : ""
        }${isCompact ? " is-compact" : ""}`}
      >
        <p className="floating-testimonial-prompt__quote">
          {shortenQuote(testimonial.quote, snippetLength)}
        </p>
        <p className="floating-testimonial-prompt__attribution">
          {testimonial.name}
          <span className="floating-testimonial-prompt__separator"> / </span>
          {testimonial.role}
        </p>
      </article>
    </div>
  );
}
