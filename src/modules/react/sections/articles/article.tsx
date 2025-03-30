"use client";

import { redirect, useParams } from "next/navigation";
import useArticleBySlug from "@/modules/core/hooks/use-article-by-slug";
// import Tags from "@/modules/react/sections/_components/tags";
import Image from "next/image";
import Link from "next/link";
import useArticles from "@/modules/core/hooks/use-public-articles";
import { Button } from "@/app/_components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Tag, User } from "lucide-react";
import { sanitizeHtml } from "@/modules/core/utils/helpers";
import { useMemo } from "react";

const Article = () => {
  const { slug } = useParams();

  const { data: article, isError } = useArticleBySlug(slug as string);

  const { data: recentArticles } = useArticles();

  const filteredRecentArticles = recentArticles?.articles
    .filter((recentArticle) => recentArticle.id !== article?.id)
    .slice(0, 3);

  // Récupération des articles adjacents pour la navigation
  const navigation = useMemo(() => {
    if (!recentArticles?.articles.length || !article)
      return { previous: null, next: null };

    const currentIndex = recentArticles.articles.findIndex(
      (a) => a.id === article.id
    );
    if (currentIndex === -1) return { previous: null, next: null };

    return {
      previous:
        currentIndex > 0 ? recentArticles.articles[currentIndex - 1] : null,
      next:
        currentIndex < recentArticles.articles.length - 1
          ? recentArticles.articles[currentIndex + 1]
          : null,
    };
  }, [recentArticles, article]);

  if (!article && isError) {
    redirect("/blog");
  }

  if (!article) return null;

  return (
    <div>
      {/* Header */}
      <div className="bg-secondary p-4">
        <div className="container flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 mx-auto px-4 sm:px-0">
          {/* En-tête de l'article avec image de bannière */}
          <Image
            src={article.imageUrl || "/assets/vertical-sync.png"}
            alt={article.title}
            width={400}
            height={300}
            className="object-cover w-full md:w-96 h-48  rounded-lg shadow-none"
          />

          {/* Informations de l'article */}
          <div className="flex flex-col gap-4">
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

              {article.articleTags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag size="16" />
                  {article.articleTags.map((tag, index) => (
                    <span key={tag.tagId}>
                      {tag.tag.name}
                      {index !== article.articleTags.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              )}
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
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-p:my-2 prose-a:text-blue-600 prose-img:rounded-xl prose-img:shadow-lg prose-li:marker:text-primary prose-hr:border-t-2 prose-hr:border-gray-200 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic">
              {sanitizeHtml(article.content)}
            </div>

            {/* Navigation entre articles */}
            <div className="mt-12 border-t pt-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 justify-between gap-4 rounded-md ">
                {navigation?.previous && (
                  <div className="relative w-full">
                    <Image
                      src={
                        navigation.previous.imageUrl ||
                        "/assets/vertical-sync.png"
                      }
                      alt={navigation.previous.title}
                      width={400}
                      height={300}
                      className="object-cover w-1/2 h-full aspect-video rounded-lg  shadow-none"
                    />
                    <div className="absolute w-1/2  top-1/2 right-10 rounded-md -translate-y-1/2 bg-background shadow-sm  flex items-center justify-center">
                      <span className="text-foreground md:text-lg font-bold px-4 py-2">
                        {navigation.previous.title}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      asChild
                      className="absolute w-16 h-16 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground/80  border-8 border-white top-1/2 -translate-y-1/2 -left-4"
                    >
                      <Link href={`/blog/${navigation.previous.slug}`}>
                        <ChevronLeft />
                      </Link>
                    </Button>
                  </div>
                )}
                {navigation?.next && (
                  <div className="relative w-full flex items-center justify-end">
                    <div className="absolute w-1/2  top-1/2 left-10 rounded-md -translate-y-1/2 bg-background shadow-sm  flex items-center justify-center">
                      <span className="text-foreground md:text-lg font-bold px-4 py-2">
                        {navigation.next.title}
                      </span>
                    </div>
                    <Image
                      src={
                        navigation.next.imageUrl || "/assets/vertical-sync.png"
                      }
                      alt={navigation.next.title}
                      width={400}
                      height={300}
                      className="object-cover w-1/2 h-full aspect-video rounded-lg shadow-none"
                    />
                    <Button
                      variant="outline"
                      asChild
                      className="absolute w-16 h-16 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground/80  border-8 border-white top-1/2 -translate-y-1/2 -right-4"
                    >
                      <Link href={`/blog/${navigation.next.slug}`}>
                        <ChevronRight />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Barre latérale avec articles récents */}
          <div className="md:w-1/3 p-4">
            <h3 className="bg-secondary text-secondary-foreground text-lg md:text-xl text-center rounded-md font-bold px-4 py-2 mb-4">
              Les derniers articles
            </h3>
            <div className="space-y-4">
              {filteredRecentArticles?.map((recentArticle) => (
                <Button
                  asChild
                  key={recentArticle.id}
                  variant="outline"
                  className="w-full h-auto"
                >
                  <Link href={`/blog/${recentArticle.slug}`}>
                    <h4 className="text-lg md:text-xl text-center text-wrap">
                      {recentArticle.title}
                    </h4>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
