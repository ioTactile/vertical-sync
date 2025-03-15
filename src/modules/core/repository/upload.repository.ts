import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3";
import { createId } from "@paralleldrive/cuid2";

export interface IUploadRepository {
  uploadFile(file: Buffer, contentType: string): Promise<string>;
  deleteFile(key: string): Promise<void>;
}

export class S3UploadRepository implements IUploadRepository {
  constructor(private readonly s3Client: S3Client) {}

  async uploadFile(file: Buffer, contentType: string): Promise<string> {
    const key = `images/${createId()}-${Date.now()}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${key}`;
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key.split("/").pop(),
    });

    await this.s3Client.send(command);
  }
}

export const uploadRepository = new S3UploadRepository(s3Client);
