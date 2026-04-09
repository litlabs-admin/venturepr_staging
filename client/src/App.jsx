import { HeroSection } from "./components/HeroSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { BrandsSection } from "./components/BrandsSection";
import { ServicesSection } from "./components/ServicesSection";
import { StatisticsSection } from "./components/StatisticsSection";

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
import { CookiePolicyPage } from "./pages/CookiePolicy";
import { NotFoundPage } from "./pages/NotFound";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicy";
import { BlogPage } from "./pages/Blog";
import { BlogPostPage } from "./pages/BlogPost";
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { defaultCaseStudySlug } from "./data/caseStudies";
import ScrollToRouteTarget from "./components/ScrollToRouteTarget";
import { SECTION_ROUTES } from "./utils/sectionRoutes";

function HomePage() {
  return (
    <main className="home-page">
      <Helmet>
        <title>Public Relations for Disruptive Companies</title>
        <meta
          name="description"
          content="Strategic PR that's earned billions of impressions for the world's most ambitious brands."
        />
        <meta property="og:title" content="Public Relations for Disruptive Companies" />
        <meta
          property="og:description"
          content="Strategic PR that's earned billions of impressions for the world's most ambitious brands."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <FloatingNav />
      <HeroSection />
      <StatisticsSection />
      <BenefitsSection />
      <BrandsSection />
      <TestimonialSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <DifferencesSection />
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
      <ScrollToRouteTarget />
      <Routes>
        {SECTION_ROUTES.map(({ path }) => (
          <Route key={path} path={path} element={<HomePage />} />
        ))}
        <Route path="/" element={<HomePage />} />
        <Route path="/our-work" element={<OurWorkPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route
          path="/case-studies"
          element={<Navigate replace to={`/case-studies/${defaultCaseStudySlug}`} />}
        />
        <Route path="/case-studies/:slug" element={<CaseStudiesPage />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </div>
  );
}
