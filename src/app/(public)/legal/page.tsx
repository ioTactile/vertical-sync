import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { EMAIL_CONTACT } from "@/app/_constants/app";
import { SITE_NAME } from "@/app/_constants/seo";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Mentions Légales`,
  description: "Mentions légales et informations juridiques",
};

export default function MentionsLegales() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Éditeur du Site</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Identité</h3>
              <p>Jordan Biesmans - Auto-entrepreneur</p>
              <p className="text-muted-foreground">Adresse non renseignée</p>
              <p>SIRET : 982 726 697 00013</p>
              <p>Email : {EMAIL_CONTACT}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Directeur de la publication
              </h3>
              <p>Jordan Biesmans</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Capital social</h3>
              <p>Auto-entrepreneur - Dispensé d&apos;immatriculation au RCS</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">TVA Intracommunautaire</h3>
              <p>Non assujetti à la TVA - Article 293B du CGI</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hébergement</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Hostinger International Limited</p>
            <p>61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
            <p>Email: https://www.hostinger.fr/contact</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Propriété Intellectuelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              L&apos;ensemble de ce site relève de la législation française et
              internationale sur le droit d&apos;auteur et la propriété
              intellectuelle. Tous les droits de reproduction sont réservés, y
              compris pour les documents téléchargeables et les représentations
              iconographiques et photographiques.
            </p>
            <p>
              La reproduction de tout ou partie de ce site sur un support
              électronique quel qu&apos;il soit est formellement interdite sauf
              autorisation expresse du directeur de la publication.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liens vers les Documents Légaux</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Pour plus d&apos;informations sur le traitement de vos données
              personnelles, veuillez consulter notre{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Politique de Confidentialité
              </Link>
              .
            </p>
            <p>
              Pour connaître les conditions d&apos;utilisation de nos services,
              veuillez consulter nos{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Conditions Générales d&apos;Utilisation
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Médiation de la Consommation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Conformément aux articles L.616-1 et R.616-1 du code de la
              consommation, notre entreprise a mis en place un dispositif de
              médiation de la consommation. L&apos;entité de médiation retenue
              est : CNPM - MÉDIATION - CONSOMMATION. En cas de litige, vous
              pouvez déposer votre réclamation sur son site :{" "}
              <a
                href="https://cnpm-mediation-consommation.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://cnpm-mediation-consommation.eu
              </a>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Droit Applicable</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige, les tribunaux français seront compétents.
            </p>
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
