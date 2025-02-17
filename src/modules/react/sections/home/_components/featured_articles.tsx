import ArticleCards from "@/modules/react/sections/articles/_components/article-cards";

const FeaturedArticles = async () => {
  return (
    <div className="container mx-auto py-12 sm:py-20 px-4 sm:px-0">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Articles récents
      </h2>
      <ArticleCards nbArticlesShown={3} />
    </div>
  );
};

export default FeaturedArticles;
