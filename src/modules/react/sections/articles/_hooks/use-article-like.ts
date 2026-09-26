import * as React from 'react';
import { useCreateArticleLike } from '@/modules/core/mutations/useCreateArticleLike';
import { useDeleteArticleLike } from '@/modules/core/mutations/useDeleteArticleLike';
import { useAuthAction } from '@/app/_hooks/use-auth-action';

const useArticleLike = (articleId: string, isLiked: boolean) => {
  const createLikeMutation = useCreateArticleLike();
  const deleteLikeMutation = useDeleteArticleLike();
  const { handleAuthAction } = useAuthAction();

  const handletoggleLike = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      handleAuthAction((user) => {
        if (isLiked) {
          deleteLikeMutation.mutate({ articleId, userId: user.id });
        } else {
          createLikeMutation.mutate({ articleId, userId: user.id });
        }
      });
    },
    [articleId, isLiked, createLikeMutation, deleteLikeMutation, handleAuthAction],
  );

  return { handletoggleLike };
};

export default useArticleLike;
