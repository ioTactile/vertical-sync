import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen-minus-header flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <div className="space-y-3 text-center">
            <span className="text-4xl font-bold">404</span>
            <h1 className="text-2xl font-bold">Page non trouvée</h1>
            <p>
              Désolé, nous n&apos;avons pas trouvé la page que vous cherchez.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
