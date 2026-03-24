import { useEffect, useRef } from "react";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import { privacyPolicyContent } from "../data/privacyPolicyContent";
import { usePageTitle } from "../hooks/usePageTitle";

export function PrivacyPolicyPage() {
  const documentRef = useRef(null);

  usePageTitle("Privacy Policy - Venture PR");

  useEffect(() => {
    const container = documentRef.current;

    if (!container) {
      return;
    }

    const targetSentence =
      "Like many businesses, we also collect information through cookies and similar technologies.";

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();

    while (node) {
      const text = node.textContent ?? "";

      if (text.includes(targetSentence) && text.includes("cookies")) {
        const replacement = document.createElement("span");
        replacement.innerHTML = text.replace(
          "cookies",
          '<a href="/cookie-policy" data-custom-class="link">cookies</a>'
        );

        node.parentNode?.replaceChild(replacement, node);
        break;
      }

      node = walker.nextNode();
    }
  }, []);

  return (
    <main className="privacy-policy-page-native">
      <FloatingNav />
      <section className="privacy-policy-page-native__section">
        <div className="privacy-policy-page-native__container">
          <div
            ref={documentRef}
            className="privacy-policy-page-native__document"
            dangerouslySetInnerHTML={{ __html: privacyPolicyContent }}
          />
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
