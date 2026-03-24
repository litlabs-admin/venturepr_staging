import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import { BlogLabelSection } from "../components/blog/BlogLabelSection";
import { BlogHeroSection } from "../components/blog/BlogHeroSection";
import { BlogCtaSection } from "../components/blog/BlogCtaSection";
import { BlogPostsSection } from "../components/blog/BlogPostsSection";
import { usePageTitle } from "../hooks/usePageTitle";

export function BlogPage() {
  usePageTitle("Blog - Venture PR");

  return (
    <main className="blog-page">
      <FloatingNav />
      <div className="blog-page__content">
        <BlogLabelSection />
        <BlogHeroSection />
        <BlogPostsSection />
        <BlogCtaSection />
      </div>
      <FooterSection />
    </main>
  );
}
