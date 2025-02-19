"use client";

import * as React from "react";
import useArticles from "@/modules/core/hooks/use-public-articles-page";
import ArticleCard from "@/modules/react/sections/articles/_components/article-card";

import { usePaginationStore, useUserStore } from "@/modules/core/store/store";
import ArticleCardsSkeleton from "@/modules/react/sections/articles/_components/article-cards-skeleton";

interface ArticleCardsProps {
  nbArticlesShown?: number;
}

const ArticleCards = ({ nbArticlesShown = 10 }: ArticleCardsProps) => {
  const { user } = useUserStore();
  const { page } = usePaginationStore();
  const { data, isPending } = useArticles(user?.id, page);

  if (isPending) {
    return <ArticleCardsSkeleton />;
  }

  if (!data?.articles.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.articles.slice(0, nbArticlesShown).map((article, index) => (
        <React.Fragment key={index}>
          <ArticleCard article={article} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ArticleCards;
