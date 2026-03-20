import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  consumeHomeScrollTarget,
  scrollToHomeTarget,
} from "../utils/homeNavigation";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const targetId = hash ? hash.replace("#", "") : consumeHomeScrollTarget();

    if (!targetId) {
      scrollToHomeTarget(null, { behavior: "auto" });
      return;
    }

    const timeoutIds = [0, 60, 180].map((delay) =>
      window.setTimeout(() => {
        scrollToHomeTarget(targetId);
      }, delay)
    );

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [pathname, hash]);

  return null;
}
