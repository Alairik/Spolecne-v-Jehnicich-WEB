import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, AlertCircle } from "lucide-react";
import { newsItems } from "@/data/news";
import newsletterHeroImage from "@/assets/heroes/newsletter-hero.jpg";

const Zpravodaj = () => {
  const featuredNews = newsItems.find((item) => item.isFeatured);
  const regularNews = newsItems.filter((item) => !item.isFeatured);

  return (
    <Layout>
      <PageHero 
        image={newsletterHeroImage}
        title="Zpravodaj"
        subtitle="Buďte vždy v obraze o dění v Jehnicích. Přinášíme vám aktuální zprávy, oznámení a zajímavosti z obce."
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Featured News - Aktuálně řešíme */}
          {featuredNews && (
            <div className="mb-12">
              <Link to={`/zpravodaj/${featuredNews.id}`}>
                <Card className="group border-2 border-secondary bg-secondary/5 transition-all hover:border-secondary hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
                        Aktuálně řešíme
                      </span>
                    </div>
                    <CardTitle className="text-xl md:text-2xl">{featuredNews.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {featuredNews.perex}
                    </CardDescription>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{featuredNews.date}</span>
                      <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Číst více
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}

          {/* News Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularNews.map((news) => (
              <Link key={news.id} to={`/zpravodaj/${news.id}`}>
                <Card className="group h-full border-2 transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {news.perex}
                    </CardDescription>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                      <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Více
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Zpravodaj;
