const SECTION_ROUTES = [
  { path: "/services", targetId: "services" },
  { path: "/projects", targetId: "projects" },
  { path: "/process", targetId: "process" },
  { path: "/about", targetId: "about" },
  { path: "/faq", targetId: "faq" },
];

const SECTION_TARGETS_BY_PATH = new Map(
  SECTION_ROUTES.map(({ path, targetId }) => [path, targetId])
);

function normalizePathname(pathname) {
  if (!pathname) {
    return "/";
  }

  const normalizedPath = pathname.replace(/\/+$/, "");
  return normalizedPath === "" ? "/" : normalizedPath;
}

export function getSectionTargetId(pathname) {
  return SECTION_TARGETS_BY_PATH.get(normalizePathname(pathname)) ?? null;
}

export function scrollToTargetId(targetId, behavior = "smooth") {
  if (typeof window === "undefined") {
    return false;
  }

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

export { SECTION_ROUTES };
