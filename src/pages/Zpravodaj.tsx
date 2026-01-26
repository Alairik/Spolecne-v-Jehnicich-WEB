import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, FileText, Download, CheckCircle } from "lucide-react";

const archiveItems = [
  { title: "Zpravodaj - Prosinec 2024", date: "15. 12. 2024", url: "#" },
  { title: "Zpravodaj - Září 2024", date: "10. 9. 2024", url: "#" },
  { title: "Zpravodaj - Červen 2024", date: "5. 6. 2024", url: "#" },
  { title: "Zpravodaj - Březen 2024", date: "12. 3. 2024", url: "#" },
  { title: "Zpravodaj - Prosinec 2023", date: "18. 12. 2023", url: "#" },
];

const Zpravodaj = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Chyba",
        description: "Vyplňte prosím všechna pole.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Chyba",
        description: "Zadejte prosím platnou e-mailovou adresu.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulace odeslání - připraveno pro Mailchimp integraci
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubscribed(true);
    setIsSubmitting(false);
    toast({
      title: "Úspěch!",
      description: "Byli jste úspěšně přihlášeni k odběru zpravodaje.",
    });
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-gradient">Zpravodaj</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Přihlaste se k odběru našeho zpravodaje a buďte vždy v obraze o dění 
              v Jehnicích. Posíláme jej maximálně jednou měsíčně.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* Newsletter Form */}
            <Card className="border-2">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle>Přihlášení k odběru</CardTitle>
                <CardDescription>
                  Zadejte své jméno a e-mail pro odběr zpravodaje.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubscribed ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">Děkujeme za přihlášení!</h3>
                    <p className="text-muted-foreground">
                      Brzy obdržíte první zpravodaj na váš e-mail.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Jméno</Label>
                      <Input
                        id="name"
                        placeholder="Vaše jméno"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="vas@email.cz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Odesílám..." : "Přihlásit se k odběru"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Vaše údaje jsou v bezpečí. Z odběru se můžete kdykoli odhlásit.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Archive */}
            <Card className="border-2">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>Archiv zpravodajů</CardTitle>
                <CardDescription>
                  Stáhněte si starší vydání našeho zpravodaje.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {archiveItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                        <Download className="h-5 w-5 text-muted-foreground" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Zpravodaj;
