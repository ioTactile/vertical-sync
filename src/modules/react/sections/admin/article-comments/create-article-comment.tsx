import ArticleCommentForm from '@/modules/react/sections/admin/article-comments/_components/article-comment-form';

const CreateArticleComment = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Créer un commentaire</h1>
      <ArticleCommentForm />
    </div>
  );
};

export default CreateArticleComment;
