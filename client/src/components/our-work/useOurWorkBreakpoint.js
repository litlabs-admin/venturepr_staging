import { useEffect, useState } from "react";

const getBreakpoint = () => {
  if (typeof window === "undefined") {
    return "desktop";
  }

  if (window.innerWidth <= 809) {
    return "mobile";
  }

  if (window.innerWidth <= 1199) {
    return "tablet";
  }

  return "desktop";
};

export function useOurWorkBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
