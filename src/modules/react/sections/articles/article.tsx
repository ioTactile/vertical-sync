"use client";

import { redirect, useParams } from "next/navigation";
import useArticleBySlug from "@/modules/core/hooks/use-article-by-slug";
// import Tags from "@/modules/react/sections/_components/tags";
import Image from "next/image";
import Link from "next/link";
import useArticles from "@/modules/core/hooks/use-public-articles";
import { Button } from "@/app/_components/ui/button";
import { Calendar, Tag, User } from "lucide-react";

const Article = () => {
  const { slug } = useParams();

  const { data: article, isError } = useArticleBySlug(slug as string);

  const { data: recentArticles } = useArticles();

  if (!article && isError) {
    redirect("/blog");
  }

  if (!article) return null;

  return (
    <div>
      {/* Header */}
      <div className="bg-secondary p-4">
        <div className="container flex justify-center items-center gap-12 mx-auto px-4 sm:px-0">
          {/* En-tête de l'article avec image de bannière */}
          <Image
            src={article.imageUrl || "/assets/vertical-sync.png"}
            alt={article.title}
            width={400}
            height={300}
            className="object-cover w-80 h-28 md:h-40 rounded-lg shadow-md"
          />

          {/* Informations de l'article */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold">{article.title}</h1>
            <div className="flex flex-wrap items-center text-muted-foreground gap-6">
              <span className="flex items-center gap-2">
                <Calendar size="16" />
                {new Date(article.updatedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <User size="16" />
                {article.author.name}
              </span>
              <div className="flex items-center gap-2">
                <Tag size="16" />
                {article.articleTags.map((tag, index) => (
                  <span key={tag.tagId}>
                    {tag.tag.name}
                    {index !== article.articleTags.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu de l'article */}
      <div className="container mx-auto flex flex-col gap-2 pt-2 pb-4 px-4 sm:px-0">
        {/* Contenu principal avec barre latérale */}
        <div className="flex flex-col md:flex-row">
          {/* Contenu de l'article */}
          <div className="md:w-2/3 p-4">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Barre latérale avec articles récents */}
          <div className="md:w-1/3 p-4">
            <h3 className="bg-secondary text-secondary-foreground text-xl text-center rounded-md font-bold px-4 py-2 mb-4">
              Les derniers articles
            </h3>
            <div className="space-y-4">
              {recentArticles?.articles.map((recentArticle) => (
                <Button
                  asChild
                  key={recentArticle.id}
                  variant="outline"
                  className="w-full"
                >
                  <Link href={`/blog/${recentArticle.slug}`}>
                    <h4 className="text-xl text-center">
                      {recentArticle.title}
                    </h4>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation entre articles */}
        <div className="mt-12 border-t pt-6">
          <div className="flex justify-between">
            {/* {navigation?.previous ? (
              <Link
                href={`/blog/${navigation.previous.slug}`}
                className="flex items-center text-primary-600 hover:text-primary-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Article précédent</span>
              </Link>
            ) : (
              <div />
            )}

            {navigation?.next ? (
              <Link
                href={`/blog/${navigation.next.slug}`}
                className="flex items-center text-primary-600 hover:text-primary-800"
              >
                <span>Article suivant</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ) : (
              <div />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
