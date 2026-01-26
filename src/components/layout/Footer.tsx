import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* O nás */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-lg font-bold text-primary-foreground">SJ</span>
              </div>
              <span className="font-semibold text-foreground">
                Společně v Jehnicích
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Pracujeme pro lepší Jehnice. Spojuje nás láska k obci a touha zlepšovat 
              život všech jejích obyvatel.
            </p>
          </div>

          {/* Rychlé odkazy */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Rychlé odkazy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tym" className="text-muted-foreground hover:text-primary transition-colors">
                  Náš tým
                </Link>
              </li>
              <li>
                <Link to="/program" className="text-muted-foreground hover:text-primary transition-colors">
                  Program 2026
                </Link>
              </li>
              <li>
                <Link to="/uspechy" className="text-muted-foreground hover:text-primary transition-colors">
                  Naše úspěchy
                </Link>
              </li>
              <li>
                <Link to="/zpravodaj" className="text-muted-foreground hover:text-primary transition-colors">
                  Zpravodaj
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@spolecnevjehnicich.cz" className="hover:text-primary transition-colors">
                  info@spolecnevjehnicich.cz
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Jehnice, Brno-venkov</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Facebook className="h-4 w-4 text-primary" />
                <a 
                  href="https://facebook.com/spolecnevjehnicich" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Společně v Jehnicích. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}
