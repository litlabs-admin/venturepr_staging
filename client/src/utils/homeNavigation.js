const HOME_SCROLL_TARGET_KEY = "venturepr-home-scroll-target";

function getScrollBehavior(behavior) {
  if (typeof window === "undefined") {
    return behavior;
  }

  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return prefersReducedMotion ? "auto" : behavior;
}

export function saveHomeScrollTarget(targetId) {
  if (typeof window === "undefined") {
    return;
  }

  if (!targetId) {
    window.sessionStorage.removeItem(HOME_SCROLL_TARGET_KEY);
    return;
  }

  window.sessionStorage.setItem(HOME_SCROLL_TARGET_KEY, targetId);
}

export function consumeHomeScrollTarget() {
  if (typeof window === "undefined") {
    return null;
  }

  const targetId = window.sessionStorage.getItem(HOME_SCROLL_TARGET_KEY);

  if (targetId) {
    window.sessionStorage.removeItem(HOME_SCROLL_TARGET_KEY);
  }

  return targetId;
}

export function scrollToHomeTarget(targetId, options = {}) {
  if (typeof window === "undefined") {
    return false;
  }

  const behavior = getScrollBehavior(options.behavior ?? "smooth");

  if (!targetId) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });

    return true;
  }

  const element = document.getElementById(targetId);

  if (!element) {
    return false;
  }

  element.scrollIntoView({
    behavior,
    block: "start",
  });

  return true;
}
