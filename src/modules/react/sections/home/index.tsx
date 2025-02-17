import FeaturesSection from "@/modules/react/sections/home/_components/features";
import CTASection from "@/modules/react/sections/home/_components/cta";
import HeroSection from "@/modules/react/sections/home/_components/hero";
import { currentUser } from "@clerk/nextjs/server";
import ServerFeaturedArticles from "@/modules/react/sections/home/_components/server_featured_articles";

const Home = async () => {
  const user = await currentUser();

  return (
    <div>
      <HeroSection user={user} />
      <ServerFeaturedArticles />
      <FeaturesSection />
      {!user && <CTASection />}
    </div>
  );
};

export default Home;
