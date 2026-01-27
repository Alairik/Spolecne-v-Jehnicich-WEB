import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { achievements } from "@/data/achievements";

const Uspechy = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              Naše <span className="text-gradient">úspěchy</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Podívejte se, co se nám společně podařilo pro obec a její občany 
              realizovat. Každý úspěch je výsledkem týmové práce a podpory komunity.
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Link key={achievement.id} to={`/uspechy/${achievement.id}`}>
                  <Card className="group h-full border-2 transition-all hover:border-primary hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {achievement.description}
                      </CardDescription>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Více informací
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Uspechy;
