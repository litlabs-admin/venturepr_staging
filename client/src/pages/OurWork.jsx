import { OurWorkLabelSection } from "../components/our-work/OurWorkLabelSection";
import { OurWorkHeroSection } from "../components/our-work/OurWorkHeroSection";
import { OurWorkCtaSection } from "../components/our-work/OurWorkCtaSection";
import { OurWorkFeaturedSection } from "../components/our-work/OurWorkFeaturedSection";
import { OurWorkCoverageSection } from "../components/our-work/OurWorkCoverageSection";
import { OurWorkCaseStudiesSection } from "../components/our-work/OurWorkCaseStudiesSection";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import { usePageTitle } from "../hooks/usePageTitle";

export function OurWorkPage() {
  usePageTitle("Our Work - Venture PR");

  return (
    <main className="our-work-page">
      <FloatingNav />
      <div className="our-work-content">
        <OurWorkLabelSection />
        <OurWorkHeroSection />
        <OurWorkCtaSection />
        <OurWorkFeaturedSection />
        <OurWorkCoverageSection />
        <OurWorkCaseStudiesSection />
      </div>
      <FooterSection />
    </main>
  );
}
