import { Button } from "@/app/_components/ui/button";
import { SITE_META_DESRIPTION } from "@/app/_constants/seo";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";

interface HeroSectionProps {
  user: User | null;
}

const HeroSection = ({ user }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen-minus-header flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      <div className="container mx-auto px-4 sm:px-0 z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Votre Communauté d&apos;Escalade en France
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground">
            {SITE_META_DESRIPTION}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <>
                <Button size="lg" className="rounded-full" asChild>
                  <Link href="/talks">Rejoindre la communauté</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                  asChild
                >
                  <Link href="/blog">Découvrir le blog</Link>
                </Button>
              </>
            ) : (
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/auth/sign-in">Commencer maintenant</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
