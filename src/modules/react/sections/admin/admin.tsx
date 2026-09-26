import Link from 'next/link';
import { Library, MessageSquareText, Tag, AlertTriangle, MapPin } from 'lucide-react';
import { Card } from '@/app/_components/ui/card';

const cards = [
  {
    title: 'Articles',
    description: 'Gérer les articles du blog',
    icon: Library,
    href: '/admin/articles',
    color: 'text-green-600',
  },
  {
    title: 'Discussions',
    description: 'Gérer les discussions de la communauté',
    icon: MessageSquareText,
    href: '/admin/talks',
    color: 'text-blue-600',
  },
  {
    title: 'Spots',
    description: "Gérer les spots d'escalade",
    icon: MapPin,
    href: '/admin/spots',
    color: 'text-purple-600',
  },
  {
    title: 'Tags',
    description: 'Gérer les tags du site',
    icon: Tag,
    href: '/admin/tags',
    color: 'text-orange-600',
  },
  {
    title: 'Signalements',
    description: 'Gérer les contenus signalés',
    icon: AlertTriangle,
    href: '/admin/reports',
    color: 'text-red-600',
  },
];

const Admin = () => {
  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl lg:text-3xl font-bold mb-4">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="p-6 hover:bg-accent/10 transition-colors">
              <div className="flex flex-col gap-4">
                <card.icon className={`w-8 h-8 ${card.color}`} />
                <div>
                  <h2 className="font-semibold">{card.title}</h2>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Admin;
