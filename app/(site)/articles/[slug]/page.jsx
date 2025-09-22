import { getArticleBySlug } from "@/app/api/lib/fetchingData/getArticleBySlug";
import SummarizedContent from "@/components/SummarizedContent/SummarizedContent";
import React from "react";
import ReactMarkdown from "react-markdown";

const ArticlePage = async ({ params }) => {
  const { slug } = await params;

  let article = null;
  let error = null;

  try {
    article = await getArticleBySlug(slug);

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
      <div className="max-w-7xl mx-auto mt-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
            {article.title}
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400 mb-6">
            <span>By {article.author}</span>
            <span className="hidden md:block">•</span>
            <span>{article.publishedDate}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden max-w-4xl mx-auto">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Summary Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="p-6 bg-slate-800 rounded-lg border-l-4 border-blue-400">
            <h2 className="text-xl font-semibold text-blue-400 mb-3">
              Summary
            </h2>
            <p className="text-gray-300 font-medium italic leading-relaxed">
              {article.summary}
            </p>
          </div>
        </div>

        <div className="xl:hidden mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="max-h-80 overflow-y-auto">
              <SummarizedContent content={article.content} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-slate-900 rounded-lg p-8">
              <div className="markdown-content text-white prose prose-invert max-w-none">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="hidden xl:block xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="h-full">
                  <SummarizedContent content={article.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
