import { MapPin } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';

const ClimbingSpots = () => {
  return (
    <section className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-0 text-center">
        <MapPin className="w-12 h-12 text-primary mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Découvrez les Spots d&apos;Escalade</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explorez notre carte interactive des spots d&apos;escalade en France. Trouvez les
          meilleurs endroits pour grimper près de chez vous.
        </p>
        <Button size="lg" className="rounded-full" asChild>
          <Link href="/spots">Explorer les spots</Link>
        </Button>
      </div>
    </section>
  );
};

export default ClimbingSpots;
