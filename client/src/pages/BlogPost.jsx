import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import FloatingNav from "../components/FloatingNav";
import { FooterSection } from "../components/FooterSection";
import { MarkdownContent } from "../components/blog/MarkdownContent";
import { usePageTitle } from "../hooks/usePageTitle";
import {
  getBlogPost,
  readBlogPostCache,
  readRelatedPostsFromCache,
} from "../utils/blogApi";

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(() => readBlogPostCache(slug));
  const [relatedPosts, setRelatedPosts] = useState(() =>
    readRelatedPostsFromCache(slug)
  );
  const [status, setStatus] = useState(() =>
    readBlogPostCache(slug) ? "ready" : "loading"
  );

  usePageTitle(post ? `${post.title} - Venture PR` : "Blog - Venture PR");

  useEffect(() => {
    if (!slug) {
      setStatus("not-found");
      return undefined;
    }

    const cachedPost = readBlogPostCache(slug);
    const cachedRelatedPosts = readRelatedPostsFromCache(slug);

    if (cachedPost) {
      setPost(cachedPost);
      setRelatedPosts(cachedRelatedPosts);
      setStatus("ready");
      return undefined;
    }

    let isActive = true;

    async function loadPost() {
      try {
        const payload = await getBlogPost(slug);

        if (!isActive) {
          return;
        }

        setPost(payload.post);
        setRelatedPosts(payload.relatedPosts);
        setStatus(payload.post ? "ready" : "not-found");
      } catch (error) {
        if (!isActive) {
          return;
        }

        if (error.status === 404) {
          setStatus("not-found");
          return;
        }

        setStatus("error");
      }
    }

    setStatus("loading");
    setPost(null);
    setRelatedPosts(cachedRelatedPosts);
    loadPost();

    return () => {
      isActive = false;
    };
  }, [slug]);

  if (status === "not-found") {
    return <Navigate replace to="/not-found" />;
  }

  return (
    <div className="page-exact-shell">
      <FloatingNav />
      <main className="blog-post-page">
        {status === "loading" ? (
          <section className="blog-post-page__status" role="status" aria-live="polite">
            Loading article...
          </section>
        ) : null}

        {status === "error" ? (
          <section className="blog-post-page__status blog-post-page__status--error">
            We couldn&apos;t load this article right now.
          </section>
        ) : null}

        {status === "ready" && post ? (
          <>
            <article className="blog-post-detail">
              <div className="blog-post-detail__eyebrow-row">
                <Link to="/blog" className="blog-post-detail__backlink">
                  <span aria-hidden="true">&larr;</span>
                  <span>Back to Blog</span>
                </Link>
                {post.category ? (
                  <span className="blog-post-detail__category">{post.category}</span>
                ) : null}
              </div>

              <div className="blog-post-detail__hero">
                {post.heroImage ? (
                  <img src={post.heroImage} alt={post.heroImageAlt} />
                ) : (
                  <div className="blog-post-detail__hero-fallback" aria-hidden="true" />
                )}
              </div>

              <div className="blog-post-detail__intro">
                <div className="blog-post-detail__copy">
                  <h1>{post.title}</h1>
                  {post.excerpt ? (
                    <p className="blog-post-detail__excerpt">{post.excerpt}</p>
                  ) : null}
                  <div className="blog-post-detail__meta">
                    {post.publishDate ? <span>{post.publishDate}</span> : null}
                    {post.readTime ? <span>{post.readTime}</span> : null}
                  </div>
                </div>
              </div>

              <div className="blog-post-detail__body">
                <MarkdownContent markdown={post.bodyMarkdown} />
              </div>
            </article>

            {relatedPosts.length ? (
              <section className="blog-related" aria-labelledby="related-posts-title">
                <div className="blog-related__header">
                  <div className="blog-related__eyebrow">/ Related Posts</div>
                  <h2 id="related-posts-title">Continue reading</h2>
                </div>

                <div className="blog-related__grid">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.slug} className="blog-related__card">
                      <Link to={`/blog/${relatedPost.slug}`} className="blog-related__link">
                        <div className="blog-related__media">
                          {relatedPost.heroImage ? (
                            <img src={relatedPost.heroImage} alt={relatedPost.heroImageAlt} />
                          ) : (
                            <div
                              className="blog-posts-section__media-fallback"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <div className="blog-related__content">
                          <div className="blog-related__meta">
                            {relatedPost.category ? <span>{relatedPost.category}</span> : null}
                            {relatedPost.readTime ? <span>{relatedPost.readTime}</span> : null}
                          </div>
                          <h3>{relatedPost.title}</h3>
                          <p>{relatedPost.excerpt}</p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </>
        ) : null}
      </main>
      <FooterSection />
    </div>
  );
}
