import { SITE_NAME } from "@/app/_constants/seo";
import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Profil utilisateur`,
  description: "Profil utilisateur et paramètres de compte",
};

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
