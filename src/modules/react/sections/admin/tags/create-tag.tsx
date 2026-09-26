import TagForm from '@/modules/react/sections/admin/tags/_components/tag-form';

const CreateTag = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Créer un tag</h1>
      <TagForm mode="create" />
    </div>
  );
};

export default CreateTag;
