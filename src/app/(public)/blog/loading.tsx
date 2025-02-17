import ArticleCardsSkeleton from "@/modules/react/sections/articles/_components/article-cards-skeleton";

export default function BlogLoading() {
  return (
    <div className="container mx-auto pt-2 pb-4 px-4 sm:px-0">
      <ArticleCardsSkeleton />;
    </div>
  );
}
