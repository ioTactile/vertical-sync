import { useCallback } from 'react';
import { redirect } from 'next/navigation';
import type { UserResource } from '@clerk/shared/types';
import { useUserStore } from '@/modules/core/store/store';

export const useAuthAction = () => {
  const { user, isLoaded } = useUserStore();

  const handleAuthAction = useCallback(
    (action: (user: UserResource) => void | Promise<void>) => {
      if (!isLoaded) return;

      if (!user) {
        redirect('/auth/sign-in');
      }

      action(user);
    },
    [user, isLoaded],
  );

  return { handleAuthAction };
};
