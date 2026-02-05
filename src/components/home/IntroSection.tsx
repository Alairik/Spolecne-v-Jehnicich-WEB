import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Trophy, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const FEATURES: Feature[] = [
  {
    title: "Náš tým",
    description: "Šest aktivních občanů, kteří spojili síly pro rozvoj Jehnic.",
    icon: Users,
    href: "/tym",
  },
  {
    title: "Program 2026",
    description: "Konkrétní plány pro infrastrukturu, služby a životní prostředí.",
    icon: Target,
    href: "/program",
  },
  {
    title: "Naše úspěchy",
    description: "Podívejte se, co se nám již podařilo realizovat.",
    icon: Trophy,
    href: "/uspechy",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <Card className="group relative overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg">
      <CardHeader>
        <div className="mb-2 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="link" className="p-0 text-primary">
          <Link to={feature.href} className="flex items-center gap-1">
            Číst více
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function IntroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-6 text-3xl md:text-4xl font-bold text-foreground">
            Vítejte na stránkách skupiny{" "}
            <span className="text-gradient">Společně v Jehnicích</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Jsme skupina aktivních občanů, které spojuje láska k Jehnicím a touha
            zlepšovat život v naší obci. Věříme, že společně dokážeme více.
            Transparentnost, otevřená komunikace a zapojení občanů jsou základem
            naší práce.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map(feature => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
