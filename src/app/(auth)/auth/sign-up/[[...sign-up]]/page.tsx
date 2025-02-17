import { SignUp as ClerkSignUp } from "@clerk/nextjs";

export default function SignUp() {
  return (
    <div className="container mx-auto py-2 px-4 sm:px-0 flex justify-center items-center min-h-screen-minus-header">
      <ClerkSignUp />
    </div>
  );
}
