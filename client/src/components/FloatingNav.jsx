import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollToTargetId } from "../utils/sectionRoutes";

const NAV_LINKS = [
  { label: "Services", href: "/services", targetId: "services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Process", href: "/process", targetId: "process" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleHomeClick = (event) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      return;
    }

    event.preventDefault();
    scrollToTargetId(null, "smooth");
  };

  const handleLinkClick = (event, link) => {
    setMenuOpen(false);

    if (location.pathname !== link.href || !link.targetId) {
      return;
    }

    event.preventDefault();
    scrollToTargetId(link.targetId, "smooth");
  };

  return (
    <>
      <header className="fnav-wrapper" role="banner">
        <nav
          className={`fnav-pill${scrolled ? " is-scrolled" : ""}`}
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="fnav-logo"
            aria-label="VenturePR home"
            onClick={handleHomeClick}
          >
            <img
              src="/venturepr_hero_images/navbar_logo.png"
              alt="Venture PR Logo"
              style={{ height: "32px", width: "auto" }}
            />
          </Link>

          <div className="fnav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="fnav-link"
                onClick={(event) => handleLinkClick(event, link)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link to="/contact-us" className="fnav-cta">
            Request a strategy call
          </Link>

          <button
            className="fnav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              style={{
                transform: menuOpen
                  ? "rotate(45deg) translate(4px, 4px)"
                  : "none",
              }}
            />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translate(4px, -4px)"
                  : "none",
              }}
            />
          </button>
        </nav>
      </header>

      <div
        className={`fnav-mobile-menu${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="fnav-mobile-link"
            onClick={(event) => handleLinkClick(event, link)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contact-us"
          className="fnav-mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Book Now
        </Link>
      </div>
    </>
  );
}
