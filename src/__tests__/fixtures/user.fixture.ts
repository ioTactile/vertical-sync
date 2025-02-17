import { User } from "@prisma/client";

export const mockUser: User = {
  id: "user_1",
  clerkId: "clerk_1",
  name: "John Doe",
  email: "test@test.com",
  imageUrl: "https://test.com/image.png",
  createdAt: new Date(),
  updatedAt: new Date(),
};
