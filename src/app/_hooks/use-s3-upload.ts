import { useState } from 'react';
import { uploadGateway } from '@/modules/core/gateway-infra/api.upload-gateway';
import { useToast } from './use-toast';

interface UseS3UploadOptions {
  maxFiles?: number;
}

export const useS3Upload = ({ maxFiles = 1 }: UseS3UploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const uploadToS3 = async (files: File[]) => {
    if (files.length > maxFiles) {
      throw new Error(`Maximum ${maxFiles} fichier(s) autorisé(s)`);
    }

    setIsUploading(true);

    try {
      const urls = await uploadGateway.uploadFiles(files);
      return urls;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFromS3 = async (urls: string[]) => {
    try {
      await uploadGateway.deleteFiles(urls);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erreur lors de la suppression des fichiers',
        description: 'Veuillez réessayer plus tard',
        variant: 'destructive',
      });
    }
  };

  return { uploadToS3, deleteFromS3, isUploading };
};
