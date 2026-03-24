import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import { cookiePolicyContent } from "../data/cookiePolicyContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function CookiePolicyPage() {
  usePageTitle("Cookie Policy - Venture PR");
  const renderedCookiePolicyContent = cookiePolicyContent.replaceAll(
    'href="https://business.safety.google/privacy/"',
    'href="/privacy-policy"'
  );

  return (
    <main className="cookie-policy-page-native">
      <FloatingNav />
      <section className="cookie-policy-page-native__section">
        <div className="cookie-policy-page-native__container">
          <div
            className="cookie-policy-page-native__document"
            dangerouslySetInnerHTML={{ __html: renderedCookiePolicyContent }}
          />
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
