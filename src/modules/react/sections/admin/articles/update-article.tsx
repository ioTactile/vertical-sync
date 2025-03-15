"use client";

import { useGetFetchQuery } from "@/modules/core/hooks/use-get-fetch-article";
import ArticleForm from "@/modules/react/sections/admin/articles/_components/article-form";
import { redirect, useSearchParams } from "next/navigation";

const UpdateArticle = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: article, isError } = useGetFetchQuery(id as string);

  if (!article && isError) {
    redirect("/admin/articles");
  }

  if (!article) return null;

  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">
        Mettre à jour : {article.title}
      </h1>

      <ArticleForm mode="update" initialData={article} />
    </div>
  );
};

export default UpdateArticle;
