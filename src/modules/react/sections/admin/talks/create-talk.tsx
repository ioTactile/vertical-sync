import TalkForm from '@/modules/react/sections/admin/talks/_components/talk-form';

const CreateTalk = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Créer une discussion</h1>
      <TalkForm mode="create" />
    </div>
  );
};

export default CreateTalk;
