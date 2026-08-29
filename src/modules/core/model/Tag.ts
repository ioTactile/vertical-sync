import { CreateTagInputs } from "@/modules/react/sections/admin/tags/_schemas/create-tag";
import { UpdateTagInputs } from "@/modules/react/sections/admin/tags/_schemas/update-tag";
import { Tag } from "@/prisma/client";

// Create Tag
export type CreateTagDto = CreateTagInputs;

// Update Tag
export type UpdateTagDto = {
  id: string;
  updatedAt: Date;
} & UpdateTagInputs;

// Many Tags
export type GetTagsResponse = Tag[];

// One Tag
export type GetTagResponse = Tag;
