import ArticleCards from "@/modules/react/sections/articles/_components/article-cards";
import Pagination from "@/modules/react/sections/articles/_components/pagination";
import ArticlesHeader from "@/modules/react/sections/articles/_components/ArticlesHeader";

const Articles = () => {
  return (
    <div className="container mx-auto pt-2 pb-4 px-4 sm:px-0">
      <ArticlesHeader />
      <ArticleCards />
      <Pagination />
    </div>
  );
};

export default Articles;
