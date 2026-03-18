import { Link } from "react-router-dom";

export function OurWorkCtaSection() {
  return (
    <section className="our-work-cta-exact" aria-label="Book a strategy call">
      <Link to="/contact-us" className="our-work-cta-exact__button">
        Book a strategy call
      </Link>
    </section>
  );
}
