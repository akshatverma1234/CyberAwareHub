import React from "react";
import { articles } from "@/assets/article";

const ArticlePage = async ({ params }) => {
  const { slug } = await params;

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <p className="text-center mt-10 text-white">Article not found</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-blue-400 mt-8 flex justify-center items-center">
        {article.title}
      </h1>
      <div className="" dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

export default ArticlePage;
