import { Link } from "react-router-dom";

export function BlogCtaSection() {
  return (
    <section className="blog-cta" aria-label="Subscribe or contact">
      <div className="blog-cta__panel">
        <div className="blog-cta__copy">
          <span className="blog-cta__eyebrow">Fresh perspective</span>
          <h2>Looking for strategic communications insight tailored to your brand?</h2>
          <p>
            If a post sparks an idea for your next launch, campaign, or messaging
            update, let&apos;s turn that thinking into a practical plan.
          </p>
        </div>
        <Link to="/contact-us" className="blog-cta__button">
          Start the conversation
        </Link>
      </div>
    </section>
  );
}
