import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { newsItems } from "@/data/news";
import newsletterHeroImage from "@/assets/heroes/newsletter-hero.jpg";

const ZpravodajDetail = () => {
  const { id } = useParams<{ id: string }>();
  const news = newsItems.find((item) => item.id === id);

  if (!news) {
    return <Navigate to="/zpravodaj" replace />;
  }

  return (
    <Layout>
      <PageHero 
        image={newsletterHeroImage}
        title={news.title}
        subtitle={news.date}
      />
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/zpravodaj">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Zpět na zpravodaj
              </Button>
            </Link>
          </div>

          <div className="mx-auto max-w-3xl">
            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {news.content}
              </p>
            </div>

            {/* Documents Gallery */}
            {news.documents && news.documents.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-xl font-semibold text-foreground">
                  Přílohy ke stažení
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {news.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      className="flex items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:border-primary hover:bg-muted"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate font-medium text-foreground">{doc.title}</p>
                        <p className="text-sm text-muted-foreground">PDF dokument</p>
                      </div>
                      <Download className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ZpravodajDetail;
