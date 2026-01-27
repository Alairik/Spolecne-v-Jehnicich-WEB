import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { achievements, getAchievementById } from "@/data/achievements";

const UspechDetail = () => {
  const { id } = useParams<{ id: string }>();
  const achievement = id ? getAchievementById(id) : undefined;

  if (!achievement) {
    return <Navigate to="/uspechy" replace />;
  }

  const Icon = achievement.icon;
  const currentIndex = achievements.findIndex((a) => a.id === id);
  const prevAchievement = currentIndex > 0 ? achievements[currentIndex - 1] : null;
  const nextAchievement = currentIndex < achievements.length - 1 ? achievements[currentIndex + 1] : null;

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/uspechy" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na úspěchy
            </Link>
          </div>

          {/* Main Content */}
          <div className="mx-auto max-w-3xl">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 md:p-12">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h1 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
                  {achievement.title}
                </h1>

                {/* Full Description */}
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  {achievement.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
              {prevAchievement ? (
                <Button variant="outline" asChild className="gap-2">
                  <Link to={`/uspechy/${prevAchievement.id}`}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="truncate max-w-[200px]">{prevAchievement.title}</span>
                  </Link>
                </Button>
              ) : (
                <div />
              )}

              {nextAchievement ? (
                <Button variant="outline" asChild className="gap-2">
                  <Link to={`/uspechy/${nextAchievement.id}`}>
                    <span className="truncate max-w-[200px]">{nextAchievement.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UspechDetail;
