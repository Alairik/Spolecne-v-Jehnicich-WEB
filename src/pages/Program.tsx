import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Users,
  TreePine,
  Heart,
  Bus,
  Lightbulb,
  Home,
  Recycle,
  Baby,
  Landmark,
  Shield,
  Wifi,
} from "lucide-react";

const programSections = [
  {
    title: "Infrastruktura",
    icon: Building2,
    items: [
      { icon: Bus, text: "Zlepšení dopravní dostupnosti a parkování" },
      { icon: Lightbulb, text: "Modernizace veřejného osvětlení" },
      { icon: Home, text: "Údržba a oprava místních komunikací" },
      { icon: Wifi, text: "Rozšíření pokrytí vysokorychlostním internetem" },
    ],
  },
  {
    title: "Služby pro občany",
    icon: Users,
    items: [
      { icon: Landmark, text: "Rozšíření služeb obecního úřadu" },
      { icon: Shield, text: "Posílení bezpečnosti v obci" },
      { icon: Baby, text: "Podpora služeb pro rodiny s dětmi" },
      { icon: Heart, text: "Péče o seniory a sociálně potřebné" },
    ],
  },
  {
    title: "Životní prostředí",
    icon: TreePine,
    items: [
      { icon: TreePine, text: "Výsadba stromů a údržba zeleně" },
      { icon: Recycle, text: "Rozvoj třídění odpadu a kompostování" },
      { icon: Lightbulb, text: "Podpora úsporných a ekologických řešení" },
      { icon: Home, text: "Revitalizace veřejných prostranství" },
    ],
  },
  {
    title: "Komunita a kultura",
    icon: Heart,
    items: [
      { icon: Users, text: "Podpora spolkového života a tradičních akcí" },
      { icon: Baby, text: "Aktivity pro děti a mládež" },
      { icon: Heart, text: "Mezigenerační setkávání" },
      { icon: Landmark, text: "Péče o místní památky a historii" },
    ],
  },
];

const Program = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              Program <span className="text-gradient">2026</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Představujeme naše priority a plány pro nadcházející volební období. 
              Chceme, aby Jehnice byly místem, kde se dobře žije všem generacím.
            </p>
          </div>

          {/* Program Sections */}
          <div className="grid gap-8 lg:grid-cols-2">
            {programSections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <Card
                  key={section.title}
                  className="border-2 transition-all hover:border-primary hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <SectionIcon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {section.items.map((item, index) => {
                        const ItemIcon = item.icon;
                        return (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                              <ItemIcon className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-muted-foreground">{item.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Program;
