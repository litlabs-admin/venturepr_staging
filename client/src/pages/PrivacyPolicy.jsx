import { useEffect } from "react";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import { privacyPolicyContent } from "../data/privacyPolicyContent";

export function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy - Venture PR";
  }, []);

  return (
    <main className="privacy-policy-page-native">
      <FloatingNav />
      <section className="privacy-policy-page-native__section">
        <div className="privacy-policy-page-native__container">
          <div
            className="privacy-policy-page-native__document"
            dangerouslySetInnerHTML={{ __html: privacyPolicyContent }}
          />
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
