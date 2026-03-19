import { HeroSection } from "./components/HeroSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { BrandsSection } from "./components/BrandsSection";
import { ServicesSection } from "./components/ServicesSection";
import { StatisticsSection } from "./components/StatisticsSection";
import { FloatingEdgeTestimonials } from "./components/FloatingEdgeTestimonials";

import { ProjectsSection } from "./components/ProjectsSection";
import { ProcessSection } from "./components/ProcessSection";
import { DifferencesSection } from "./components/DifferencesSection";
import { TestimonialSection } from "./components/TestimonialSection";
import { AboutSection } from "./components/AboutSection";
import { FaqSection } from "./components/FaqSection";
import { CtaSection } from "./components/CtaSection";
import { FooterSection } from "./components/FooterSection";
import FloatingNav from "./components/FloatingNav";
import { OurWorkPage } from "./pages/OurWork";
import { ContactUsPage } from "./pages/ContactUs";
import { CaseStudiesPage } from "./pages/CaseStudies";
import { Routes, Route, Navigate } from "react-router-dom";
import { defaultCaseStudySlug } from "./data/caseStudies";
import ScrollToHash from "./components/ScrollToHash";

function HomePage() {
  return (
    <main className="home-page">
      <FloatingNav />
      <FloatingEdgeTestimonials />
      <HeroSection />
      <StatisticsSection />
      <BenefitsSection />
      <BrandsSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <DifferencesSection />
      <TestimonialSection />
      <AboutSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}

export default function App() {
  return (
    <div className="page-shell">
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-work" element={<OurWorkPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route
          path="/case-studies"
          element={<Navigate replace to={`/case-studies/${defaultCaseStudySlug}`} />}
        />
        <Route path="/case-studies/:slug" element={<CaseStudiesPage />} />
      </Routes>
    </div>
  );
}
