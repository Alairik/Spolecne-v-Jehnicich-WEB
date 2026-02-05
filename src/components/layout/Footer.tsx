import { Link } from "react-router-dom";
import { Mail, MapPin, Facebook } from "lucide-react";

const QUICK_LINKS = [
  { label: "Náš tým", path: "/tym" },
  { label: "Program 2026", path: "/program" },
  { label: "Naše úspěchy", path: "/uspechy" },
  { label: "Zpravodaj", path: "/zpravodaj" },
] as const;

const CONTACT_INFO = {
  email: "info@spolecnevjehnicich.cz",
  location: "Jehnice, Brno-venkov",
  facebook: "https://facebook.com/spolecnevjehnicich",
} as const;

function FooterLogo() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">SJ</span>
      </div>
      <span className="font-semibold text-foreground">
        Společně v Jehnicích
      </span>
    </div>
  );
}

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <FooterLogo />
            <p className="text-sm text-muted-foreground">
              Pracujeme pro lepší Jehnice. Spojuje nás láska k obci a touha
              zlepšovat život všech jejích obyvatel.
            </p>
          </div>

          <FooterSection title="Rychlé odkazy">
            <ul className="space-y-2 text-sm">
              {QUICK_LINKS.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Kontakt">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{CONTACT_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Facebook className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={CONTACT_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Společně v Jehnicích. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}
