import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/prisma';

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInDb = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!userInDb) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
        imageUrl: user.imageUrl,
      },
    });

    return newUser;
  }

  return userInDb;
};
