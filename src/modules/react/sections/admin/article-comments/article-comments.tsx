"use client";

import ArticleCommentsHeader from "@/modules/react/sections/admin/article-comments/_components/article-comments-header";
import { DataTable } from "@/modules/react/sections/_components/data-table";
import { columns } from "@/modules/react/sections/admin/article-comments/_components/columns";
import { getFormatedDate } from "@/modules/core/utils/date";
import useArticleComments from "@/modules/core/hooks/use-article-comments";
import { useParams } from "next/navigation";
import TableSkeleton from "@/app/_components/ui/table-skeleton";

const ArticleComments = () => {
  const { id } = useParams();

  const { data: articleComments, isPending } = useArticleComments(id as string);

  const articleCommentsFormated =
    articleComments?.map((articleComment) => ({
      ...articleComment,
      createdAt: getFormatedDate(articleComment.createdAt),
      updatedAt: getFormatedDate(articleComment.updatedAt),
    })) || [];

  if (!articleCommentsFormated) return null;

  return (
    <div className="container flex flex-col space-y-2 mx-auto py-2">
      <ArticleCommentsHeader />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={articleCommentsFormated} />
      )}
    </div>
  );
};

export default ArticleComments;
