import { User } from "@prisma/client";

export type Author = Omit<
  User,
  "clerkId" | "email" | "createdAt" | "updatedAt"
>;
