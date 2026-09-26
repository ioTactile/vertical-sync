import { EMAIL_CONTACT } from '@/app/_constants/app';
import { PenSquare } from 'lucide-react';

const WriterCTA = () => {
  return (
    <section className="py-12 sm:py-20 bg-accent/10">
      <div className="container mx-auto px-4 sm:px-0 text-center">
        <PenSquare className="w-12 h-12 text-primary mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Devenez Rédacteur</h2>
        <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
          Vous êtes passionné(e) d&apos;escalade et vous aimez écrire ? Rejoignez notre équipe de
          rédacteurs et partagez votre expertise !
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Contactez-nous à{' '}
          <a href={`mailto:${EMAIL_CONTACT}`} className="text-primary hover:underline">
            {EMAIL_CONTACT}
          </a>
        </p>
      </div>
    </section>
  );
};

export default WriterCTA;
