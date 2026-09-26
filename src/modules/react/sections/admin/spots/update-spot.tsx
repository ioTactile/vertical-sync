'use client';

import { useGetFetchQuery } from '@/modules/core/hooks/use-get-fetch-climbing-spot';
import SpotForm from '@/modules/react/sections/admin/spots/_components/spot-form';
import { redirect, useSearchParams } from 'next/navigation';

const UpdateSpot = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: spot, isError } = useGetFetchQuery(id as string);

  if (!spot && isError) {
    redirect('/admin/spots');
  }

  if (!spot) return null;

  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Mettre à jour : {spot.name}</h1>

      <SpotForm mode="update" initialData={spot} />
    </div>
  );
};

export default UpdateSpot;
