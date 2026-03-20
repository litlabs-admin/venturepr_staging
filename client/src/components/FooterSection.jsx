import { Link } from "react-router-dom";
import footerLogo from "../assets/logo/footer_logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Projects", href: "/#projects" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/contact-us" },

];

const socialLinks = [
  { label: "X", href: "https://twitter.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Youtube", href: "https://youtube.com" },
  { label: "Instagram", href: "https://instagram.com" }
];

const navLinkColumns = [navLinks.slice(0, 4), navLinks.slice(4, 8)];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"
      />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"
      />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer className="footer-section" aria-label="Footer">
      <div className="footer-section__container">
        <div className="footer-section__top">
          <div className="footer-section__top-row">
            <div className="footer-section__brand">
              <Link to="/" className="footer-section__logo">
                <img src={footerLogo} alt="Venture" />
              </Link>
              <p className="footer-section__tagline">
                The next big story starts here. Let's get your brand noticed.
              </p>
            </div>

            <div className="footer-section__links">
              <div className="footer-section__links-group">
                {navLinkColumns.map((column, columnIndex) => (
                  <div className="footer-section__link-column" key={`nav-column-${columnIndex}`}>
                    {column.map((link) => (
                      <Link key={link.label} to={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="footer-section__link-column">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-section__contact">
          <div className="footer-section__contact-item">
            <div className="footer-section__label-row">
              <span className="footer-section__label-icon">
                <PhoneIcon />
              </span>
              <span className="footer-section__label">Phone</span>
            </div>
            <a href="tel: 4242303770">424.230.3770</a>
          </div>
          <div className="footer-section__contact-item">
            <div className="footer-section__label-row">
              <span className="footer-section__label-icon">
                <EnvelopeIcon />
              </span>
              <span className="footer-section__label">Email</span>
            </div>
            <a href="mailto: agencie@email.com">info@venturepr.co</a>
          </div>
          <div className="footer-section__contact-item">
            <div className="footer-section__label-row">
              <span className="footer-section__label-icon">
                <MapPinIcon />
              </span>
              <span className="footer-section__label">Address</span>
            </div>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener">
              407 N. Maple Dr., Ste. GRD 1, Beverly Hills, California 90210
            </a>
          </div>
          <div className="footer-section__contact-item">
            <div className="footer-section__label-row">
              <span className="footer-section__label-icon">
                <ClockIcon />
              </span>
              <span className="footer-section__label">Opening Hours</span>
            </div>
            <div className="footer-section__hours">
              <span>Mon–Fri 9:00am – 6:00pm PT</span>
            </div>
          </div>
        </div>

        <div className="footer-section__bottom">
          <div className="footer-section__bottom-row">
            <span className="footer-section__copyright">
              © copyright 2026 VenturePR. All rights reserved.
            </span>
            <div className="footer-section__legal">
              <a href="#cookie-policy">Cookie Policy</a>
              <span className="footer-section__separator">|</span>
              <a href="#privacy-policy">Privacy policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
