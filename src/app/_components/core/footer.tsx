import { MessageSquareText, Library, Github } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/app/_components/ui/separator";
import { Button } from "@/app/_components/ui/button";
import { FooterLink } from "@/types/navigation-item";
import { SITE_NAME } from "@/app/_constants/seo";
import { GITHUB_URL } from "@/app/_constants/app";

const footerLinks: FooterLink[] = [
  {
    title: "Navigation",
    links: [
      { title: "Discussions", url: "/talks", icon: MessageSquareText },
      { title: "Blog", url: "/blog?page=1", icon: Library },
    ],
  },
  {
    title: "Légal",
    links: [
      { title: "Mentions légales", url: "/legal" },
      { title: "Politique de confidentialité", url: "/privacy" },
      { title: "CGU", url: "/terms" },
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
            <h3 className="font-semibold">Suivez-nous</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full"
                >
                  <Github className="h-4 w-4" />
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
            Fait avec ❤️ par{" "}
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
