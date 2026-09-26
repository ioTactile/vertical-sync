'use client';

import useAdminArticles from '@/modules/core/hooks/use-admin-articles';
import ArticlesHeader from '@/modules/react/sections/admin/articles/_components/articles-header';
import { DataTable } from '@/modules/react/sections/_components/data-table';
import { columns } from '@/modules/react/sections/admin/articles/_components/columns';
import { getFormatedDate } from '@/modules/core/utils/date';
import TableSkeleton from '@/app/_components/ui/table-skeleton';

const Articles = () => {
  const { data: articles, isPending } = useAdminArticles();

  const articlesFormated =
    articles?.articles.map((article) => ({
      ...article,
      createdAt: getFormatedDate(article.createdAt),
      updatedAt: getFormatedDate(article.updatedAt),
    })) || [];

  return (
    <div className="container flex flex-col space-y-2 mx-auto py-2">
      <ArticlesHeader />

      {isPending ? <TableSkeleton /> : <DataTable columns={columns} data={articlesFormated} />}
    </div>
  );
};

export default Articles;
