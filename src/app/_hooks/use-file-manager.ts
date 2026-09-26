import * as React from 'react';

export const useFileManager = (maxFiles: number = Infinity) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFiles = (newFiles: File[]) => {
    setFiles((prevFiles) => {
      const totalFiles = [...prevFiles, ...newFiles];
      return totalFiles.slice(0, maxFiles);
    });
  };

  const clearFiles = () => setFiles([]);

  const removeFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  return {
    files,
    handleFiles,
    clearFiles,
    removeFile,
  };
};
