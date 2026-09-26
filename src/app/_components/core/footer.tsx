import { MessageSquareText, Library, Map } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/app/_components/ui/separator';
import { Button } from '@/app/_components/ui/button';
import { FooterLink } from '@/types/navigation-item';
import { SITE_NAME } from '@/app/_constants/seo';
import { GITHUB_URL } from '@/app/_constants/app';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const footerLinks: FooterLink[] = [
  {
    title: 'Navigation',
    links: [
      { title: 'Discussions', url: '/talks', icon: MessageSquareText },
      { title: 'Blog', url: '/blog?page=1', icon: Library },
      { title: 'Spots', url: '/spots', icon: Map },
    ],
  },
  {
    title: 'Légal',
    links: [
      { title: 'Mentions légales', url: '/legal' },
      { title: 'Politique de confidentialité', url: '/privacy' },
      { title: 'CGU', url: '/terms' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 mx-auto px-4 sm:px-0 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      {link.icon && <link.icon className="h-4 w-4" />}
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-3">
            <h3 className="font-semibold">Suivez-moi</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.
          </p>
          <p>
            Fait avec ❤️ par{' '}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              ioTactile
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
