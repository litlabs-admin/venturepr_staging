import { useState } from "react";
import { isValidEmail, submitWeb3Form } from "../utils/web3forms";

export function CtaSection() {
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitState.status === "sending") {
      return;
    }

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setSubmitState({
        status: "error",
        message: "Please enter your email address before subscribing.",
      });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setSubmitState({
        status: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setSubmitState({
      status: "sending",
      message: "Submitting your subscription...",
    });

    const formData = new FormData();
    formData.append("email", trimmedEmail);
    formData.append("subject", "Newsletter Signup");
    formData.append("form_name", "Homepage Newsletter CTA");
    formData.append("source", "Homepage CTA");

    const result = await submitWeb3Form(formData);

    if (result.success) {
      setEmail("");
      setSubmitState({
        status: "success",
        message: "Thanks for subscribing. You're on the list.",
      });
      return;
    }

    setSubmitState({
      status: "error",
      message: result.message,
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (submitState.message) {
      setSubmitState({
        status: "idle",
        message: "",
      });
    }
  };

  const isSubmitting = submitState.status === "sending";
  const buttonLabel = isSubmitting ? "Submitting..." : "Subscribe";
  const statusRole = submitState.status === "error" ? "alert" : "status";

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

        <form className="nl-form" onSubmit={handleSubmit} noValidate>
          <div className="nl-form__group">
            <input
              type="email"
              name="email"
              required
              disabled={isSubmitting}
              placeholder="name@email.com"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              className="nl-form__input"
            />
            <button
              type="submit"
              className="nl-form__button"
              disabled={isSubmitting}
            >
              {buttonLabel}
            </button>
          </div>
          {submitState.message ? (
            <p
              className={`nl-form__status is-${submitState.status}`}
              role={statusRole}
            >
              {submitState.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
