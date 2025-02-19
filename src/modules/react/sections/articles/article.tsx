"use client";

import { redirect, useParams } from "next/navigation";
import useArticleBySlug from "@/modules/core/hooks/use-article-by-slug";
import Tags from "@/modules/react/sections/_components/tags";

const Article = () => {
  const { slug } = useParams();

  const { data: article, isError } = useArticleBySlug(slug as string);

  if (!article && isError) {
    redirect("/blog");
  }

  if (!article) return null;

  return (
    <div className="container mx-auto flex flex-col gap-2 mt-2 px-4 sm:px-0">
      <div className="flex space-x-2">
        <h1>{article.title}</h1>
        <span>•</span>
        <span>{article.author.name}</span>
      </div>

      <Tags tags={article.articleTags} />

      <p>{article.content}</p>
    </div>
  );
};

export default Article;
