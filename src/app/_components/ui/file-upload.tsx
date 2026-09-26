import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { CloudUpload, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  isLoading?: boolean;
  maxFiles?: number;
  className?: string;
  label?: string;
  accept?: Record<string, string[]>;
}

export const FileUpload = ({
  onUpload,
  isLoading,
  maxFiles = 1,
  className,
  label = 'Déposer vos fichiers ici',
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
  },
}: FileUploadProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles);
    },
    maxFiles,
    accept,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors',
        'hover:border-primary/50 flex flex-col items-center justify-center gap-2',
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted',
        className,
      )}
    >
      {isLoading ? (
        <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
      ) : (
        <>
          <input {...getInputProps()} />
          <CloudUpload className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">{label}</p>
        </>
      )}
    </div>
  );
};
