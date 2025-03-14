"use client";

import { useGetFetchQuery } from "@/modules/core/hooks/use-get-fetch-tag";
import TagForm from "@/modules/react/sections/admin/tags/_components/tag-form";
import { redirect, useSearchParams } from "next/navigation";

const UpdateTag = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: tag, isError } = useGetFetchQuery(id as string);

  if (!tag && isError) {
    redirect("/admin/tags");
  }

  if (!tag) return null;

  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Mettre à jour un tag</h1>

      <TagForm mode="update" initialData={tag} />
    </div>
  );
};

export default UpdateTag;
