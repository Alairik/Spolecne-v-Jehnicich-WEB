import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Tým", path: "/tym" },
  { label: "Program 2026", path: "/program" },
  { label: "Úspěchy", path: "/uspechy" },
  { label: "Zpravodaj", path: "/zpravodaj" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">SJ</span>
      </div>
      <span className="hidden sm:block font-semibold text-foreground">
        Společně v Jehnicích
      </span>
    </Link>
  );
}

function NavLink({ path, label, isActive, onClick }: {
  path: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-primary"
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex gap-1">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              path={item.path}
              label={item.label}
              isActive={pathname === item.path}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.path}
                path={item.path}
                label={item.label}
                isActive={pathname === item.path}
                onClick={closeMenu}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
