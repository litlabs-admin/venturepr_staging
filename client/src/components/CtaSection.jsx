import { useState, useRef, useEffect } from "react";

export function CtaSection() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");
  const dropdownRef = useRef(null);

  const budgetOptions = [
    "Under $5K",
    "$5K–$10K",
    "$10K–$20K",
    "$20K+",
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="cta-section" aria-label="CTA">
      <div className="cta-section__container">
        <div className="cta-section__accent" aria-hidden="true" />
        <div className="cta-section__wrapper">
          <div className="cta-section__content">
            <div className="cta-section__heading">
              <h2>Ready to earn your brand's spotlight?</h2>
              <p>
                Tell us about your company and we'll map out a strategy that fits.
              </p>
            </div>
          </div>

          <div className="cta-section__form-wrap">
            <form className="cta-form">
              <label className="cta-form__field">
                <span className="sr-only">Name</span>
                <div className="cta-form__input-wrap">
                  <input type="text" required name="Name" placeholder="Name" />
                </div>
              </label>

              <div className="cta-form__row">
                <label className="cta-form__field cta-form__field--split">
                  <span className="sr-only">Email</span>
                  <div className="cta-form__input-wrap">
                    <input
                      type="email"
                      required
                      name="Email"
                      placeholder="Email"
                    />
                  </div>
                </label>
                <label className="cta-form__field cta-form__field--split">
                  <span className="sr-only">Phone</span>
                  <div className="cta-form__input-wrap">
                    <input
                      type="tel"
                      name="Phone Number"
                      placeholder="Phone"
                    />
                  </div>
                </label>
              </div>

              <label className="cta-form__field">
                <span className="sr-only">Company Name</span>
                <div className="cta-form__input-wrap">
                  <input
                    type="text"
                    required
                    name="Company Name"
                    placeholder="Company Name"
                  />
                </div>
              </label>

              <div className="cta-form__field" ref={dropdownRef}>
                <span className="sr-only">Monthly PR Budget Range</span>
                <input type="hidden" name="Monthly PR Budget Range" value={selectedBudget} required />
                <div 
                  className={`cta-form__input-wrap cta-form__input-wrap--select ${isSelectOpen ? 'is-open' : ''} ${!selectedBudget ? 'is-empty' : ''}`}
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                >
                  <div className="cta-form__select-trigger">
                    {selectedBudget || "Monthly PR Budget Range"}
                  </div>
                  
                  <div className={`cta-form__select-menu ${isSelectOpen ? 'is-visible' : ''}`}>
                    {budgetOptions.map((option) => (
                      <div 
                        key={option}
                        className={`cta-form__select-option ${selectedBudget === option ? 'is-selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBudget(option);
                          setIsSelectOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <label className="cta-form__field">
                <span className="sr-only">Message</span>
                <div className="cta-form__input-wrap cta-form__input-wrap--textarea">
                  <textarea
                    required
                    name="Message"
                    placeholder="Enter your Message"
                  />
                </div>
              </label>

              <div className="cta-form__submit">
                <button type="submit">Get My Free PR Audit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
