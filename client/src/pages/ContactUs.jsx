import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";

export function ContactUsPage() {
  return (
    <div className="page-exact-shell">
      <FloatingNav />
      <main className="contact-page-exact">
      <div className="contact-intro-exact">
        <div className="contact-intro-exact__pill">
          <span>Contact</span>
        </div>
        <div className="contact-intro-exact__copy">
          <h1>Get in touch with our team</h1>
          <p>
            Stay up to date with the latest features, improvements, and fixes as we
            continue to evolve.
          </p>
        </div>
      </div>

      <div className="contact-form-exact">
        <div className="contact-form-exact__header">
          <h2>We’d love to answer your questions</h2>
          <p>Send us a message and we’ll get back to you as soon as possible</p>
        </div>

        <div className="contact-form-exact__field contact-form-exact__field--name">
          <div className="contact-form-exact__label">Name *</div>
          <div className="contact-form-exact__input">Neil</div>
        </div>

        <div className="contact-form-exact__field contact-form-exact__field--surname">
          <div className="contact-form-exact__label">Surname *</div>
          <div className="contact-form-exact__input">Armstrong</div>
        </div>

        <div className="contact-form-exact__field contact-form-exact__field--email">
          <div className="contact-form-exact__label">E-mail *</div>
          <div className="contact-form-exact__input">neilarmstrong@email.com</div>
        </div>

        <div className="contact-form-exact__field contact-form-exact__field--topic">
          <div className="contact-form-exact__label">Topic *</div>
          <div className="contact-form-exact__input">Select from the list</div>
        </div>

        <div className="contact-form-exact__field contact-form-exact__field--message">
          <div className="contact-form-exact__label contact-form-exact__label--message">
            <span className="contact-form-exact__label-strong">Messege</span> (optional )
          </div>
          <div className="contact-form-exact__message-frame" aria-hidden="true">
            <svg viewBox="0 0 702 125" role="presentation">
              <rect x="0.540042" y="0.540042" width="700.92" height="123.92" rx="6.34414" fill="none" stroke="#E1E1E1" strokeWidth="1.08008" />
              <path d="M695.625 110.922L686.602 119.945" stroke="#787878" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M697.174 114.477L690.609 121.041" stroke="#787878" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="contact-form-exact__caret" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation">
            <path d="M12 15L7 10H17L12 15Z" fill="currentColor" />
          </svg>
        </div>

        <div className="contact-form-exact__submit">Get in touch</div>
      </div>

      <div className="contact-card-exact contact-card-exact--email">
        <div className="contact-card-exact__content">
          <div className="contact-card-exact__title">
            <span className="contact-card-exact__icon" aria-hidden="true">
              <svg viewBox="0 0 40 40" role="presentation">
                <path
                  d="M6.59375 32.9688C5.68711 32.9688 4.91097 32.6459 4.26533 32.0003C3.61969 31.3547 3.29688 30.5785 3.29688 29.6719V9.89062C3.29688 8.98398 3.61969 8.20785 4.26533 7.56221C4.91097 6.91657 5.68711 6.59375 6.59375 6.59375H32.9688C33.8754 6.59375 34.6515 6.91657 35.2972 7.56221C35.9428 8.20785 36.2656 8.98398 36.2656 9.89062V29.6719C36.2656 30.5785 35.9428 31.3547 35.2972 32.0003C34.6515 32.6459 33.8754 32.9688 32.9688 32.9688H6.59375ZM19.7812 21.4297L6.59375 13.1875V29.6719H32.9688V13.1875L19.7812 21.4297ZM19.7812 18.1328L32.9688 9.89062H6.59375L19.7812 18.1328ZM6.59375 13.1875V9.89062V29.6719V13.1875Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <h3>Email us</h3>
          </div>
          <p>Facing a more technical issue ? Need an expert ? We’re here.</p>
        </div>
        <div className="contact-card-exact__link">support@venture.com</div>
      </div>

      <div className="contact-card-exact contact-card-exact--sales">
        <div className="contact-card-exact__content">
          <div className="contact-card-exact__title">
            <span className="contact-card-exact__icon" aria-hidden="true">
              <svg viewBox="0 0 38 38" role="presentation">
                <path
                  d="M16.9727 32.3984V29.3125H29.3164V18.3574C29.3164 15.3486 28.2685 12.7963 26.1726 10.7004C24.0767 8.60457 21.5244 7.55664 18.5156 7.55664C15.5068 7.55664 12.9545 8.60457 10.8586 10.7004C8.76278 12.7963 7.71484 15.3486 7.71484 18.3574V27.7695H6.17188C5.32324 27.7695 4.59676 27.4674 3.99243 26.863C3.3881 26.2587 3.08594 25.5322 3.08594 24.6836V21.5977C3.08594 21.0576 3.22095 20.5497 3.49097 20.074C3.76099 19.5982 4.1403 19.2189 4.62891 18.936L4.74463 16.8916C4.95036 15.1429 5.45825 13.5228 6.26831 12.0312C7.07837 10.5397 8.09416 9.24105 9.31567 8.13525C10.5372 7.02946 11.9387 6.16797 13.5203 5.55078C15.1018 4.93359 16.7669 4.625 18.5156 4.625C20.2643 4.625 21.923 4.93359 23.4917 5.55078C25.0604 6.16797 26.4619 7.02303 27.6963 8.11597C28.9307 9.2089 29.9465 10.5011 30.7437 11.9927C31.5409 13.4842 32.0552 15.1043 32.2866 16.853L32.4023 18.8589C32.891 19.0903 33.2703 19.4375 33.5403 19.9004C33.8103 20.3633 33.9453 20.8519 33.9453 21.3662V24.915C33.9453 25.4294 33.8103 25.918 33.5403 26.3809C33.2703 26.8438 32.891 27.1909 32.4023 27.4224V29.3125C32.4023 30.1611 32.1002 30.8876 31.4958 31.4919C30.8915 32.0963 30.165 32.3984 29.3164 32.3984H16.9727ZM12.7874 21.1541C12.4916 20.8583 12.3438 20.4919 12.3438 20.0547C12.3438 19.6175 12.4916 19.2511 12.7874 18.9553C13.0831 18.6596 13.4495 18.5117 13.8867 18.5117C14.3239 18.5117 14.6903 18.6596 14.9861 18.9553C15.2818 19.2511 15.4297 19.6175 15.4297 20.0547C15.4297 20.4919 15.2818 20.8583 14.9861 21.1541C14.6903 21.4498 14.3239 21.5977 13.8867 21.5977C13.4495 21.5977 13.0831 21.4498 12.7874 21.1541ZM22.0452 21.1541C21.7494 20.8583 21.6016 20.4919 21.6016 20.0547C21.6016 19.6175 21.7494 19.2511 22.0452 18.9553C22.3409 18.6596 22.7074 18.5117 23.1445 18.5117C23.5817 18.5117 23.9482 18.6596 24.2439 18.9553C24.5396 19.2511 24.6875 19.6175 24.6875 20.0547C24.6875 20.4919 24.5396 20.8583 24.2439 21.1541C23.9482 21.4498 23.5817 21.5977 23.1445 21.5977C22.7074 21.5977 22.3409 21.4498 22.0452 21.1541ZM9.29639 19.2061C9.11637 16.4801 9.93929 14.14 11.7651 12.1855C13.591 10.2311 15.8669 9.25391 18.5928 9.25391C20.8815 9.25391 22.8938 9.98039 24.6296 11.4333C26.3655 12.8863 27.4134 14.7443 27.7734 17.0073C25.4333 16.9816 23.2795 16.3516 21.3123 15.1172C19.345 13.8828 17.8341 12.2113 16.7798 10.1025C16.3683 12.1598 15.5004 13.9921 14.176 15.5994C12.8516 17.2066 11.2251 18.4089 9.29639 19.2061Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <h3>Contact sales</h3>
          </div>
          <p>Questions about custom pricing ? Feature picking ? We’ll handle it.</p>
        </div>
        <div className="contact-card-exact__link">
          Book a call with sales <span className="contact-card-exact__arrow">→</span>
        </div>
      </div>
      </main>
      <FooterSection />
    </div>
  );
}
