import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import teamHeroImage from "@/assets/heroes/team-hero.jpg";

interface TeamMember {
  name: string;
  position: string;
  bio: string;
}

const TEAM_MEMBERS: TeamMember[] = [
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

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <User className="h-12 w-12" />
        </div>

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
  );
}

export default function Tym() {
  return (
    <Layout>
      <PageHero
        image={teamHeroImage}
        title="Náš tým"
        subtitle="Poznajte lidi, kteří tvoří skupinu Společně v Jehnicích. Spojuje nás láska k obci a odhodlání pracovat pro její lepší budoucnost."
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map(member => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
