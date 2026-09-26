import { currentUser, User } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const userMiddleware = async (req: NextRequest) => {
  const user = await currentUser();

  const handleAuthAction = async (action: (user: User) => void) => {
    if (!user) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    action(user);
  };

  return { handleAuthAction };
};
