import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { EMAIL_CONTACT } from "@/app/_constants/app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles",
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Collecte des Données Personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Dans le cadre de l&apos;utilisation de nos services, nous sommes
              amenés à collecter les données personnelles suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Données d&apos;identification (nom, prénom, email)</li>
              <li>Données de connexion (adresse IP, logs)</li>
              <li>Données de navigation (cookies)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utilisation des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Les données collectées sont utilisées pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fournir et améliorer nos services</li>
              <li>Personnaliser votre expérience utilisateur</li>
              <li>Assurer la sécurité de votre compte</li>
              <li>Communiquer avec vous concernant nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conservation des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Vos données personnelles sont conservées pendant la durée
              nécessaire aux finalités pour lesquelles elles sont collectées,
              notamment :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Données de compte : pendant la durée de votre inscription</li>
              <li>Données de facturation : 10 ans (obligation légale)</li>
              <li>Cookies : 13 mois maximum</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vos Droits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Conformément au RGPD, vous disposez des droits suivants concernant
              vos données personnelles :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d&apos;opposition au traitement</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à : {EMAIL_CONTACT}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sécurité des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles
              appropriées pour assurer la sécurité de vos données personnelles,
              notamment :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chiffrement des données sensibles</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Surveillance régulière de nos systèmes</li>
              <li>Formation de notre personnel à la protection des données</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partage des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Vos données personnelles peuvent être partagées avec :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nos sous-traitants techniques (hébergement, maintenance)</li>
              <li>Les autorités compétentes sur demande légale</li>
            </ul>
            <p className="mt-4">
              Nous ne vendons ni ne louons vos données personnelles à des tiers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modification de la Politique</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nous nous réservons le droit de modifier cette politique de
              confidentialité à tout moment. Les modifications prennent effet
              dès leur publication sur le site.
            </p>
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
