import { useState } from "react";

export function CtaSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Submitting newsletter email:", email);
  };

  return (
    <section className="nl-section" aria-label="Newsletter Subscription">
      <div className="nl-section__bg-overlay"></div>
      <div className="nl-section__container">
        
        <div className="nl-section__content">
          <div className="nl-section__heading">
            <h2>Businesses Need Big Ideas.</h2>
            <h2>Join Our Newsletter.</h2>
          </div>
        </div>

        <form className="nl-form" onSubmit={handleSubmit}>
          <div className="nl-form__group">
            <input
              type="email"
              required
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="nl-form__input"
            />
            <button type="submit" className="nl-form__button">
              Subscribe
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
