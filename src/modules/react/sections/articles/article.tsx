"use client";

import { redirect, useParams } from "next/navigation";
import useArticleBySlug from "@/modules/core/hooks/use-article-by-slug";
import Tags from "@/modules/react/sections/_components/tags";
import Image from "next/image";

const Article = () => {
  const { slug } = useParams();

  const { data: article, isError } = useArticleBySlug(slug as string);

  if (!article && isError) {
    redirect("/blog");
  }

  if (!article) return null;

  return (
    <div>
      {/* Header */}
      <div className=" bg-secondary p-4">
        <div className="container flex justify-center items-center gap-2 mx-auto px-4 sm:px-0">
          {/* En-tête de l'article avec image de bannière */}
          <Image
            src={article.imageUrl || "/assets/vertical-sync.png"}
            alt={article.title}
            width={400}
            height={300}
            className="object-cover w-80 h-28 md:h-40 rounded-lg"
          />

          {/* Informations de l'article */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 mb-3">
              <span className="mr-3">
                {new Date(article.updatedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="mr-3">•</span>
              <span>{article.author.name}</span>
            </div>
            <Tags tags={article.articleTags} />
          </div>
        </div>
      </div>

      {/* Contenu de l'article */}
      <div className="container mx-auto flex flex-col gap-2 pt-2 pb-4 px-4 sm:px-0"></div>
    </div>
  );
};

export default Article;
