import React from "react";

const ArticlePage = async ({ params }) => {
  const { slug } = await params;

  let article = null;
  let error = null;

  try {
    // First, get all articles to find the one with matching slug
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/articles`,
      {
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const articles = await response.json();
    article = articles.find((a) => a.slug === slug);

    if (!article) {
      error = "Article not found";
    }
  } catch (err) {
    error = err.message;
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 px-6 py-12 flex items-center justify-center">
        <p className="text-center text-red-400 text-xl">
          {error || "Article not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
            {article.title}
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400 mb-6">
            <span>By {article.author}</span>
            <span className="hidden md:block">•</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            <span className="hidden md:block">•</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {article.views} views
              </span>
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                {article.likes} likes
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="bg-slate-900 rounded-lg p-8 mb-8">
          {article.excerpt && (
            <div className="mb-6 p-4 bg-slate-800 rounded-lg border-l-4 border-blue-400">
              <p className="text-gray-300 font-medium italic">
                {article.excerpt}
              </p>
            </div>
          )}

          <div
            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Comments Section */}
        {article.comments && article.comments.length > 0 && (
          <div className="bg-slate-900 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Comments ({article.comments.length})
            </h3>

            <div className="space-y-4">
              {article.comments.map((comment, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 font-medium">
                      {comment.userId || "Anonymous"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
