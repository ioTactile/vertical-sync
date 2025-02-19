import ArticleForm from "@/modules/react/sections/admin/articles/_components/article-form";

const CreateArticle = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Créer un article</h1>
      <ArticleForm mode="create" />
    </div>
  );
};

export default CreateArticle;
