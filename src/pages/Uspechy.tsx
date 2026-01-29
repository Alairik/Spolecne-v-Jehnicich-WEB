import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, X } from "lucide-react";
import { achievements } from "@/data/achievements";
import achievementsHeroImage from "@/assets/heroes/achievements-hero.jpg";

const unfulfilledPromises = [
  {
    id: "cyklostezka",
    title: "Cyklostezka do Brna",
    description: "Propojení obce s městem bezpečnou cyklostezkou pro každodenní dojíždění.",
  },
  {
    id: "zdravotni-stredisko",
    title: "Rozšíření zdravotního střediska",
    description: "Navýšení kapacity ordinací a přidání specializovaných lékařů.",
  },
  {
    id: "parkovaci-dum",
    title: "Parkovací dům u nádraží",
    description: "Vícepatrový parkovací dům pro lepší dostupnost vlakové dopravy.",
  },
];

const Uspechy = () => {
  return (
    <Layout>
      <PageHero 
        image={achievementsHeroImage}
        title="Naše úspěchy"
        subtitle="Podívejte se, co se nám společně podařilo pro obec a její občany realizovat. Každý úspěch je výsledkem týmové práce a podpory komunity."
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
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
                      {/* Fulfilled Promise Badge */}
                      <div className="mt-3 flex items-center gap-2 text-sm text-secondary">
                        <CheckCircle className="h-4 w-4" />
                        <span>Splněný slib z našeho programu</span>
                      </div>
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

          {/* Unfulfilled Promises Section */}
          <div className="mt-20">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                Ne všechno se nám ovšem podařilo, ale za to se nestydíme
              </h2>
              <p className="text-muted-foreground">
                Transparentně přiznáváme, co se nám zatím nepodařilo splnit. Na těchto projektech budeme dále pracovat.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {unfulfilledPromises.map((item) => (
                <Card key={item.id} className="h-full border-2 border-muted">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <X className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                    {/* Unfulfilled Badge */}
                    <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                      <X className="h-4 w-4" />
                      <span>Nepodařilo se nám splnit</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Uspechy;
