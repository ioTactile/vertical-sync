import { Library, MessageSquareText, Users } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Discussions',
      description:
        "Échangez avec d'autres grimpeurs, partagez vos expériences et posez vos questions",
      icon: MessageSquareText,
    },
    {
      title: 'Blog Collaboratif',
      description:
        "Découvrez des articles sur les techniques, l'équipement et les spots d'escalade",
      icon: Library,
    },
    {
      title: 'Communauté Active',
      description: 'Rejoignez une communauté passionnée et enrichissez vos connaissances',
      icon: Users,
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-accent/10">
      <div className="container mx-auto px-4 sm:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Tout ce dont vous avez besoin pour progresser
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-card"
            >
              <feature.icon className="w-10 md:w-12 h-10 md:h-12 text-primary mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
