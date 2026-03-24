import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogPosts, readBlogPostsCache } from "../../utils/blogApi";

const INITIAL_VISIBLE_POSTS = 6;
const LOAD_MORE_INCREMENT = 3;

export function BlogPostsSection() {
  const [posts, setPosts] = useState(() => readBlogPostsCache() ?? []);
  const [status, setStatus] = useState(() =>
    (readBlogPostsCache() ?? []).length ? "ready" : "loading"
  );
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_POSTS);

  useEffect(() => {
    let isActive = true;

    async function loadPosts() {
      try {
        const nextPosts = await getBlogPosts();

        if (!isActive) {
          return;
        }

        setPosts(nextPosts);
        setStatus(nextPosts.length ? "ready" : "empty");
        setVisibleCount(INITIAL_VISIBLE_POSTS);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setStatus("error");
      }
    }

    loadPosts();

    return () => {
      isActive = false;
    };
  }, []);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMorePosts = status === "ready" && posts.length > visibleCount;

  const handleViewMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + LOAD_MORE_INCREMENT, posts.length)
    );
  };

  return (
    <section className="blog-posts-section" aria-labelledby="blog-posts-title">
      <div className="blog-posts-section__eyebrow">/ Blog</div>
      <div className="blog-posts-section__header">
        <h2 id="blog-posts-title">Recent writing from Venture PR</h2>
        <p>
          Strategy notes, editorial observations, and practical thinking for teams
          shaping launches, narratives, and long-term visibility.
        </p>
      </div>

      {status === "loading" ? (
        <div className="blog-posts-section__status" role="status" aria-live="polite">
          Loading articles...
        </div>
      ) : null}

      {status === "error" ? (
        <div className="blog-posts-section__status blog-posts-section__status--error">
          We couldn&apos;t load the latest articles right now.
        </div>
      ) : null}

      {status === "empty" ? (
        <div className="blog-posts-section__status">
          No blog articles are available yet.
        </div>
      ) : null}

      {status === "ready" ? (
        <>
          <div className="blog-posts-section__grid">
            {visiblePosts.map((post) => (
              <article key={post.slug} className="blog-posts-section__card">
                <Link
                  to={`/blog/${post.slug}`}
                  className="blog-posts-section__card-link"
                  aria-label={`Read blog post: ${post.title}`}
                >
                  <div className="blog-posts-section__media">
                    {post.heroImage ? (
                      <img src={post.heroImage} alt={post.heroImageAlt} />
                    ) : (
                      <div className="blog-posts-section__media-fallback" aria-hidden="true" />
                    )}
                  </div>
                  <div className="blog-posts-section__content">
                    <div className="blog-posts-section__meta">
                      {post.category ? <span>{post.category}</span> : null}
                      {post.publishDate ? <span>{post.publishDate}</span> : null}
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="blog-posts-section__readmore">Read article</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {hasMorePosts ? (
            <div className="blog-posts-section__actions">
              <button
                type="button"
                className="blog-posts-section__view-more"
                onClick={handleViewMore}
              >
                View more
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
