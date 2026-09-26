import SpotForm from '@/modules/react/sections/admin/spots/_components/spot-form';

const CreateSpot = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Créer un spot</h1>
      <SpotForm mode="create" />
    </div>
  );
};

export default CreateSpot;
