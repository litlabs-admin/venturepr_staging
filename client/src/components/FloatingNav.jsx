import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  saveHomeScrollTarget,
  scrollToHomeTarget,
} from "../utils/homeNavigation";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Process", href: "/#process" },
  { label: "Contact Us", href: "/contact-us" }
];

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  const handleHomeNavigation = (event, targetId = null) => {
    event.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      scrollToHomeTarget(targetId);
      return;
    }

    saveHomeScrollTarget(targetId);
    navigate(targetId ? `/#${targetId}` : "/");
  };

  return (
    <>
      {/* ── Pill bar ── */}
      <header className="fnav-wrapper" role="banner">
        <nav
          className={`fnav-pill${scrolled ? " is-scrolled" : ""}`}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            className="fnav-logo"
            aria-label="VenturePR home"
            onClick={(event) => handleHomeNavigation(event)}
          >
            <img
              src="/venturepr_hero_images/navbar_logo.png"
              alt="Venture PR Logo"
              style={{ height: "32px", width: "auto" }}
            />
          </Link>

          {/* Desktop links */}
          <div className="fnav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="fnav-link"
                onClick={(event) => {
                  if (link.href.startsWith("/#")) {
                    handleHomeNavigation(event, link.href.slice(2));
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link to="/contact-us" className="fnav-cta">
            Request a strategy call
          </Link>

          {/* Mobile hamburger */}
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
                  : "none"
              }}
            />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translate(4px, -4px)"
                  : "none"
              }}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile dropdown ── */}
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
            onClick={(event) => {
              if (link.href.startsWith("/#")) {
                handleHomeNavigation(event, link.href.slice(2));
                return;
              }

              setMenuOpen(false);
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/contact-us" className="fnav-mobile-cta" onClick={() => setMenuOpen(false)}>
          Book Now
        </Link>
      </div>
    </>
  );
}
