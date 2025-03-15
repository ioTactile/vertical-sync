import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";

export default function UserProfile() {
  return (
    <div className="container mx-auto py-2 px-4 sm:px-0 flex justify-center  min-h-screen-minus-header">
      <ClerkUserProfile
        appearance={{
          elements: {
            rootBox: "w-full",
            cardBox: "w-full flex",
          },
        }}
      />
    </div>
  );
}
