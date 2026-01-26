import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const teamMembers = [
  {
    name: "Robert",
    position: "Předseda",
    bio: "Dlouholetý obyvatel Jehnic s vášní pro komunitní rozvoj. Věnuje se organizaci místních akcí a komunikaci s občany.",
  },
  {
    name: "Pavel",
    position: "Místopředseda",
    bio: "Odborník na infrastrukturu a technické záležitosti. Má zkušenosti s projektovým řízením a rozvojem veřejných prostor.",
  },
  {
    name: "Michal",
    position: "Člen",
    bio: "Zabývá se digitalizací a moderními technologiemi. Stojí za webem a elektronickou komunikací skupiny.",
  },
  {
    name: "Iveta",
    position: "Členka",
    bio: "Specialistka na vzdělávání a péči o děti. Iniciátorka projektů pro rodiny a mládež v obci.",
  },
  {
    name: "Martina",
    position: "Členka",
    bio: "Zaměřuje se na životní prostředí a udržitelnost. Podporuje zelené iniciativy a péči o veřejnou zeleň.",
  },
  {
    name: "Jiřina",
    position: "Členka",
    bio: "Věnuje se seniorům a sociálním záležitostem. Dbá na to, aby obec pamatovala na všechny generace.",
  },
];

const Tym = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              Náš <span className="text-gradient">tým</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Poznajte lidi, kteří tvoří skupinu Společně v Jehnicích. Spojuje nás 
              láska k obci a odhodlání pracovat pro její lepší budoucnost.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card
                key={member.name}
                className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg"
              >
                <CardContent className="p-6">
                  {/* Avatar Placeholder */}
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <User className="h-12 w-12" />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="mb-1 text-xl font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="mb-4 text-sm font-medium text-primary">
                      {member.position}
                    </p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tym;
