import { Link } from "react-router-dom";

export function BlogHeroSection() {
  return (
    <section className="blog-hero" aria-labelledby="blog-hero-title">
      <div className="blog-hero__stack">
        <h1 id="blog-hero-title" className="blog-hero__title">
          <span>Ideas, analysis, and the stories behind the work.</span>
        </h1>
        <p className="blog-hero__subtitle">
          Explore Venture PR&apos;s perspective on launches, storytelling, media
          strategy, and the editorial signals that shape stronger brand narratives.
        </p>
        <Link to="/contact-us" className="blog-hero__button">
          Book a strategy call
        </Link>
      </div>
    </section>
  );
}
