import { Link } from "react-router-dom";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import { usePageTitle } from "../hooks/usePageTitle";

export function NotFoundPage() {
  usePageTitle("Page Not Found - Venture PR");

  return (
    <main className="not-found-page">
      <FloatingNav />
      <section className="not-found-page__section">
        <div className="not-found-page__container">
          <p className="not-found-page__eyebrow">404</p>
          <h1 className="not-found-page__title">This page could not be found.</h1>
          <p className="not-found-page__copy">
            The URL may be incorrect, outdated, or no longer available. Use the
            links below to get back to the main site experience.
          </p>
          <div className="not-found-page__actions">
            <Link
              className="not-found-page__action not-found-page__action--primary"
              to="/"
            >
              Return home
            </Link>
            <Link
              className="not-found-page__action not-found-page__action--secondary"
              to="/our-work"
            >
              View our work
            </Link>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
