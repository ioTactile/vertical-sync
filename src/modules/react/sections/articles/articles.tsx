import ArticleCards from "@/modules/react/sections/articles/_components/article-cards";
import Pagination from "@/modules/react/sections/articles/_components/pagination";
import ArticlesHeader from "@/modules/react/sections/articles/_components/articles-header";
import * as React from "react";
import ArticleCardsSkeleton from "@/modules/react/sections/articles/_components/article-cards-skeleton";

const Articles = () => {
  return (
    <div className="container mx-auto pt-2 pb-4 px-4 sm:px-0">
      <ArticlesHeader />
      <React.Suspense fallback={<ArticleCardsSkeleton />}>
        <ArticleCards />
        <Pagination />
      </React.Suspense>
    </div>
  );
};

export default Articles;
