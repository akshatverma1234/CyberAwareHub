import { getArticleBySlug } from "@/app/api/lib/fetchingData/getArticleBySlug";
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
      <div className="max-w-4xl mx-auto mt-12">
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

        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
        <div className="rounded-lg p-8 mb-2">
          <div className="mb-6 p-4 bg-slate-800 rounded-lg border-l-4 border-blue-400">
            <p className="text-gray-300 font-medium italic">
              {article.summary}
            </p>
          </div>
        </div>
        <div className="bg-slate-900 rounded-lg p-8 mb-8">
          <div className="prose prose-invert max-w-none text-white">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
