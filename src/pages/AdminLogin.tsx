import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

function LoginForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (username: string, password: string) => void;
  isLoading: boolean;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Uživatelské jméno</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="admin"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Heslo</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Přihlašování..." : "Přihlásit se"}
      </Button>
    </form>
  );
}

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("admin-auth", {
        body: { username, password },
      });

      if (error || data?.error) {
        toast({
          title: "Chyba přihlášení",
          description: data?.error || "Nesprávné přihlašovací údaje",
          variant: "destructive",
        });
        return;
      }

      sessionStorage.setItem("adminToken", data.token);
      sessionStorage.setItem("adminUsername", data.username);

      toast({
        title: "Přihlášení úspěšné",
        description: `Vítejte, ${data.username}!`,
      });

      navigate("/admin");
    } catch {
      toast({
        title: "Chyba",
        description: "Nepodařilo se připojit k serveru",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Administrace</CardTitle>
              </CardHeader>
              <CardContent>
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
