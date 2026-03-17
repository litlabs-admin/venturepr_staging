import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Delay slightly to ensure elements are rendered
    const timeout = setTimeout(() => {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // We use scrollIntoView which now respects scroll-padding-top in CSS
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, hash]);

  return null;
}
