import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Mail,
  Users,
  Handshake,
  Building,
  Package,
  TreePine,
  Baby,
  Sun,
} from "lucide-react";

const achievements = [
  {
    icon: Globe,
    title: "Moderní web a správa Facebooku",
    description:
      "Vytvořili jsme přehledné webové stránky a aktivně spravujeme facebookový profil pro lepší informovanost občanů.",
  },
  {
    icon: Mail,
    title: "Elektronická komunikace s občany",
    description:
      "Zavedli jsme pravidelný zpravodaj a e-mailovou komunikaci, aby každý věděl o dění v obci.",
  },
  {
    icon: Users,
    title: "Pravidelná setkání s komunitou",
    description:
      "Pořádáme pravidelná setkání, kde mohou občané sdílet své názory a podněty.",
  },
  {
    icon: Handshake,
    title: "Budování vztahů se sousedy",
    description:
      "Navázali jsme spolupráci s okolními obcemi a posilujeme sousedské vztahy.",
  },
  {
    icon: Building,
    title: "Komunitní centrum",
    description:
      "Podpořili jsme vznik prostoru pro setkávání, vzdělávání a kulturní akce.",
  },
  {
    icon: Package,
    title: "Z-box v Jehnicích",
    description:
      "Zajistili jsme instalaci výdejního boxu pro pohodlnější doručování zásilek.",
  },
  {
    icon: TreePine,
    title: "Zlepšení veřejných prostor",
    description:
      "Iniciovali jsme údržbu zeleně a úpravy veřejných prostranství pro příjemnější prostředí.",
  },
  {
    icon: Baby,
    title: "Dětské hřiště",
    description:
      "Přispěli jsme k vybudování bezpečného a moderního hřiště pro nejmenší obyvatele.",
  },
  {
    icon: Sun,
    title: "Hlídání dětí o prázdninách",
    description:
      "Pomohli jsme zajistit letní hlídání dětí, aby rodiče mohli v klidu pracovat.",
  },
];

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
                <Card
                  key={achievement.title}
                  className="group border-2 transition-all hover:border-primary hover:shadow-lg"
                >
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

export default Uspechy;
