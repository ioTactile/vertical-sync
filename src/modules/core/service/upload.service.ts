import {
  IUploadRepository,
} from "@/modules/core/repository/upload.repository";

export class UploadService {
  constructor(private readonly uploadRepository: IUploadRepository) {}

  async uploadFile(file: Buffer, contentType: string): Promise<string> {
    return this.uploadRepository.uploadFile(file, contentType);
  }

  async deleteFile(url: string): Promise<void> {
    return this.uploadRepository.deleteFile(url);
  }
}

