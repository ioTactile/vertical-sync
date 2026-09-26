import { CreateTagInputs } from "@/modules/core/schemas/tag/create-tag";
import { UpdateTagInputs } from "@/modules/core/schemas/tag/update-tag";

export type Tag = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTagDto = CreateTagInputs;

export type UpdateTagDto = {
  id: string;
  updatedAt: Date;
} & UpdateTagInputs;

export type GetTagsResponse = Tag[];

export type GetTagResponse = Tag;
