import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSectionTargetId, scrollToTargetId } from "../utils/sectionRoutes";

export default function ScrollToRouteTarget() {
  const { pathname } = useLocation();

  useEffect(() => {
    const targetId = getSectionTargetId(pathname);
    const behavior = targetId ? "smooth" : "auto";

    const timeoutIds = [0, 60, 180].map((delay) =>
      window.setTimeout(() => {
        scrollToTargetId(targetId, behavior);
      }, delay)
    );

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [pathname]);

  return null;
}
