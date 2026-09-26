import ArticleCards from '@/modules/react/sections/articles/_components/article-cards';
import Pagination from '@/modules/react/sections/articles/_components/pagination';
import ArticlesHeader from '@/modules/react/sections/articles/_components/articles-header';
import * as React from 'react';
import ArticleCardsSkeleton from '@/modules/react/sections/articles/_components/article-cards-skeleton';

const Articles = () => {
  return (
    <div className="container min-h-screen-minus-header mx-auto flex flex-col gap-6 pt-2 pb-4 px-4 sm:px-0">
      <ArticlesHeader />
      <React.Suspense fallback={<ArticleCardsSkeleton />}>
        <div className="grow">
          <ArticleCards />
        </div>
        <div className="mt-auto pt-6">
          <Pagination />
        </div>
      </React.Suspense>
    </div>
  );
};

export default Articles;
