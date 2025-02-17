import { SignIn as ClerkSignIn } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <div className="container mx-auto py-2 px-4 sm:px-0 flex justify-center items-center min-h-screen-minus-header">
      <ClerkSignIn />
    </div>
  );
}
