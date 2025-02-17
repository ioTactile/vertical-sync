"use client";

import useArticles from "@/modules/core/hooks/use-articles";
import ArticlesHeader from "@/modules/react/sections/admin/articles/_components/articles-header";
import { DataTable } from "@/modules/react/sections/_components/data-table";
import { columns } from "@/modules/react/sections/admin/articles/_components/columns";
import { getFormatedDate } from "@/modules/core/utils/date";

const Articles = () => {
  const { data } = useArticles();

  const articlesFormated = data?.articles.map((article) => ({
    ...article,
    createdAt: getFormatedDate(article.createdAt),
    updatedAt: getFormatedDate(article.updatedAt),
  }));

  if (!articlesFormated) return null;

  return (
    <div className="container flex flex-col space-y-2 mx-auto py-2">
      <ArticlesHeader />
      <DataTable columns={columns} data={articlesFormated} />
    </div>
  );
};

export default Articles;
