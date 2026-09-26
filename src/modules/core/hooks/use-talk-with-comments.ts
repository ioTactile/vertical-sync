import getTalkWithComments from '@/modules/core/queries/get-talk-with-comments';
import { useQuery } from '@tanstack/react-query';

const useTalkWithComments = (id: string) => {
  return useQuery({
    queryKey: ['talks', id],
    queryFn: () => getTalkWithComments(id),
  });
};

export default useTalkWithComments;
