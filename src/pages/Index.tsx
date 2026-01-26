import { Layout } from "@/components/layout/Layout";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { IntroSection } from "@/components/home/IntroSection";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <IntroSection />
    </Layout>
  );
};

export default Index;
