import { useEffect } from "react";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import { cookiePolicyContent } from "../data/cookiePolicyContent";

export function CookiePolicyPage() {
  useEffect(() => {
    document.title = "Cookie Policy - Venture PR";
  }, []);

  return (
    <main className="cookie-policy-page-native">
      <FloatingNav />
      <section className="cookie-policy-page-native__section">
        <div className="cookie-policy-page-native__container">
          <div
            className="cookie-policy-page-native__document"
            dangerouslySetInnerHTML={{ __html: cookiePolicyContent }}
          />
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
