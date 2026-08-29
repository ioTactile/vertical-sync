import { User } from "@/prisma/client";

export type Author = Omit<User, "email" | "createdAt" | "updatedAt">;
