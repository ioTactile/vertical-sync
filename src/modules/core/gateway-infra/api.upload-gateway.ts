import { axiosInstance } from "@/lib/globals";
import { IUploadGateway } from "@/modules/core/gateway/upload.gateway";

export class ApiUploadGateway implements IUploadGateway {
  async uploadFiles(files: File[]): Promise<string[]> {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("contentType", file.type);
      const response = await axiosInstance.post("/api/upload", formData);
      return response.data.url;
    });

    return Promise.all(uploadPromises);
  }

  async deleteFiles(urls: string[]): Promise<{ message: string }> {
    const deletePromises = urls.map(async (url) => {
      await axiosInstance.post("/api/upload/delete", { url });
    });
    await Promise.all(deletePromises);
    return { message: "Image(s) supprimée(s)" };
  }
}

export const uploadGateway = new ApiUploadGateway();
