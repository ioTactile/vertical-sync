import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { EMAIL_CONTACT } from "@/app/_constants/app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation du service",
};

export default function CGU() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">
        Conditions Générales d&apos;Utilisation
      </h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Objet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Les présentes Conditions Générales d&apos;Utilisation (CGU)
              définissent les modalités d&apos;utilisation de la plateforme
              communautaire accessible à l&apos;adresse
              vertical-sync.iotactile.com. Cette plateforme permet aux
              utilisateurs de partager des discussions, articles et spots, ainsi
              que d&apos;interagir avec la communauté.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Services Proposés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>La plateforme propose les services suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accès à des articles et contenus éditoriaux</li>
              <li>Participation à des discussions communautaires</li>
              <li>Découverte et partage de spots</li>
              <li>Création et gestion d&apos;un profil utilisateur</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Inscription et Compte Utilisateur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              L&apos;inscription sur la plateforme nécessite la création
              d&apos;un compte utilisateur. Vous vous engagez à :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fournir des informations exactes et à jour</li>
              <li>Maintenir la confidentialité de vos identifiants</li>
              <li>Ne pas créer plusieurs comptes</li>
              <li>Ne pas usurper l&apos;identité d&apos;une autre personne</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Rôles et Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>La plateforme distingue plusieurs types d&apos;utilisateurs :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Utilisateurs standard :</strong> Peuvent consulter le
                contenu, participer aux discussions et partager des spots
              </li>
              <li>
                <strong>Rédacteurs :</strong> Peuvent créer et publier des
                articles sur le blog
              </li>
              <li>
                <strong>Administrateurs :</strong> Disposent de droits étendus
                pour la gestion de la plateforme
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Règles de Publication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Lors de la publication de contenus (discussions, commentaires,
              spots), vous vous engagez à :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respecter la législation en vigueur</li>
              <li>Ne pas publier de contenus offensants ou inappropriés</li>
              <li>
                Ne pas faire la promotion de produits ou services sans
                autorisation
              </li>
              <li>Respecter les droits de propriété intellectuelle</li>
              <li>
                Fournir des informations exactes concernant les spots partagés
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Modération</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nous nous réservons le droit de modérer les contenus publiés et de
              :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Supprimer tout contenu inapproprié</li>
              <li>Suspendre ou supprimer les comptes en infraction</li>
              <li>
                Modifier les droits d&apos;accès des utilisateurs si nécessaire
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Propriété Intellectuelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>En publiant du contenu sur la plateforme, vous :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Conservez vos droits de propriété intellectuelle sur vos
                contenus
              </li>
              <li>
                Accordez une licence non exclusive d&apos;utilisation à la
                plateforme
              </li>
              <li>
                Garantissez disposer des droits nécessaires sur les contenus
                publiés
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Responsabilités</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>La plateforme ne peut être tenue responsable :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Des contenus publiés par les utilisateurs</li>
              <li>
                De l&apos;exactitude des informations concernant les spots
                partagés
              </li>
              <li>Des interruptions ou dysfonctionnements du service</li>
              <li>
                Des dommages directs ou indirects liés à l&apos;utilisation de
                la plateforme
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Modification et Résiliation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Nous nous réservons le droit de :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Modifier les CGU à tout moment (les utilisateurs seront
                informés)
              </li>
              <li>
                Modifier, suspendre ou arrêter tout ou partie des services
              </li>
              <li>
                Supprimer un compte utilisateur en cas de non-respect des CGU
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Pour toute question concernant ces CGU ou le fonctionnement de la
              plateforme, vous pouvez nous contacter à l&apos;adresse :
              {EMAIL_CONTACT}
            </p>
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
