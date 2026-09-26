'use client';

import { useGetFetchQuery } from '@/modules/core/hooks/use-get-fetch-talk';
import { GetTalkWithCommentsResponse } from '@/modules/core/model/Talk';
import TalkForm from '@/modules/react/sections/admin/talks/_components/talk-form';
import { redirect, useSearchParams } from 'next/navigation';

const UpdateTalk = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: talk, isError } = useGetFetchQuery(id as string);

  if (!talk && isError) {
    redirect('/admin/talks');
  }

  if (!talk) return null;

  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Mettre à jour : {talk.title}</h1>

      <TalkForm mode="update" initialData={talk as GetTalkWithCommentsResponse} />
    </div>
  );
};

export default UpdateTalk;
