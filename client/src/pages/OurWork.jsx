import { OurWorkLabelSection } from "../components/our-work/OurWorkLabelSection";
import { OurWorkHeroSection } from "../components/our-work/OurWorkHeroSection";
import { OurWorkCtaSection } from "../components/our-work/OurWorkCtaSection";
import { OurWorkFeaturedSection } from "../components/our-work/OurWorkFeaturedSection";
import { OurWorkCoverageSection } from "../components/our-work/OurWorkCoverageSection";
import { OurWorkCaseStudiesSection } from "../components/our-work/OurWorkCaseStudiesSection";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";

export function OurWorkPage() {
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
