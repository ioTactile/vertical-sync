'use client';

import { useToast } from '@/app/_hooks/use-toast';

export const useShare = () => {
  const { toast } = useToast();

  const handleShare = (
    text: string,
    toastTitle: string,
    e?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e?.preventDefault();
    e?.stopPropagation();

    navigator.clipboard.writeText(text);
    toast({
      title: toastTitle,
    });
  };

  return { handleShare };
};
