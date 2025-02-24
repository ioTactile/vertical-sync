export interface IUploadGateway {
  uploadFiles: (files: File[]) => Promise<string[]>;
  deleteFiles: (urls: string[]) => Promise<{ message: string }>;
}
