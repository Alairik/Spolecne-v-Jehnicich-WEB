import { Layout } from "@/components/layout/Layout";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { IntroSection } from "@/components/home/IntroSection";

export default function Index() {
  return (
    <Layout>
      <HeroCarousel />
      <IntroSection />
    </Layout>
  );
}
