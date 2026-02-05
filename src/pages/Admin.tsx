import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, LogOut, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Document {
  title: string;
  url: string;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  perex: string;
  content: string;
  published_date: string;
  is_featured: boolean;
  article_documents?: Document[];
}

interface FormData {
  title: string;
  slug: string;
  perex: string;
  content: string;
  published_date: string;
  is_featured: boolean;
  documents: Document[];
}

const INITIAL_FORM_DATA: FormData = {
  title: "",
  slug: "",
  perex: "",
  content: "",
  published_date: new Date().toISOString().split("T")[0],
  is_featured: false,
  documents: [],
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getToken(): string | null {
  return sessionStorage.getItem("adminToken");
}

function DocumentsEditor({
  documents,
  onAdd,
  onRemove,
}: {
  documents: Document[];
  onAdd: (doc: Document) => void;
  onRemove: (index: number) => void;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (title && url) {
      onAdd({ title, url });
      setTitle("");
      setUrl("");
    }
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <Label className="text-base font-semibold">Dokumenty</Label>

      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-2 rounded bg-muted p-2">
              <FileText className="h-4 w-4" />
              <span className="flex-1 text-sm">{doc.title}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-2 sm:grid-cols-2">
        <Input
          placeholder="Název dokumentu"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          placeholder="URL dokumentu"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Přidat dokument
      </Button>
    </div>
  );
}

function ArticleForm({
  formData,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: {
  formData: FormData;
  isEditing: boolean;
  onChange: (data: Partial<FormData>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}) {
  const handleTitleChange = (title: string) => {
    onChange({
      title,
      slug: isEditing ? formData.slug : generateSlug(title),
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Nadpis</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={e => handleTitleChange(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">URL slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={e => onChange({ slug: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="perex">Perex</Label>
        <Textarea
          id="perex"
          value={formData.perex}
          onChange={e => onChange({ perex: e.target.value })}
          rows={2}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Obsah</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={e => onChange({ content: e.target.value })}
          rows={6}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="published_date">Datum publikace</Label>
        <Input
          id="published_date"
          type="date"
          value={formData.published_date}
          onChange={e => onChange({ published_date: e.target.value })}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="is_featured"
          checked={formData.is_featured}
          onCheckedChange={checked => onChange({ is_featured: checked })}
        />
        <Label htmlFor="is_featured">Hlavní zpráva (Aktuálně řešíme)</Label>
      </div>

      <DocumentsEditor
        documents={formData.documents}
        onAdd={doc => onChange({ documents: [...formData.documents, doc] })}
        onRemove={index =>
          onChange({ documents: formData.documents.filter((_, i) => i !== index) })
        }
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Zrušit
        </Button>
        <Button type="submit">
          {isEditing ? "Uložit změny" : "Vytvořit článek"}
        </Button>
      </div>
    </form>
  );
}

function ArticlesTable({
  articles,
  onEdit,
  onDelete,
}: {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
}) {
  if (articles.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Zatím nemáte žádné články. Vytvořte první kliknutím na "Nový článek".
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nadpis</TableHead>
          <TableHead>Datum</TableHead>
          <TableHead>Hlavní</TableHead>
          <TableHead className="text-right">Akce</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map(article => (
          <TableRow key={article.id}>
            <TableCell className="font-medium">{article.title}</TableCell>
            <TableCell>{article.published_date}</TableCell>
            <TableCell>
              {article.is_featured && (
                <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Ano
                </span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => onEdit(article)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(article)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Admin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchArticles();
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-articles", {
        method: "GET",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (error) throw error;
      setArticles(data || []);
    } catch {
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst články",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUsername");
    navigate("/admin/login");
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setEditingArticle(null);
  };

  const openEditDialog = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      perex: article.perex,
      content: article.content,
      published_date: article.published_date,
      is_featured: article.is_featured,
      documents: article.article_documents || [],
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleFormChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const method = editingArticle ? "PUT" : "POST";
      const body = editingArticle
        ? { id: editingArticle.id, ...formData }
        : formData;

      const { error } = await supabase.functions.invoke("admin-articles", {
        method,
        headers: { Authorization: `Bearer ${getToken()}` },
        body,
      });

      if (error) throw error;

      toast({
        title: editingArticle ? "Článek upraven" : "Článek vytvořen",
        description: `Článek "${formData.title}" byl úspěšně ${editingArticle ? "upraven" : "vytvořen"}.`,
      });

      setIsDialogOpen(false);
      resetForm();
      fetchArticles();
    } catch {
      toast({
        title: "Chyba",
        description: "Nepodařilo se uložit článek",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (article: Article) => {
    if (!confirm(`Opravdu chcete smazat článek "${article.title}"?`)) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-articles?id=${article.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Delete failed");

      toast({
        title: "Článek smazán",
        description: `Článek "${article.title}" byl úspěšně smazán.`,
      });

      fetchArticles();
    } catch {
      toast({
        title: "Chyba",
        description: "Nepodařilo se smazat článek",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">Načítání...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Správa článků</h1>
              <p className="text-muted-foreground">
                Přihlášen jako: {sessionStorage.getItem("adminUsername")}
              </p>
            </div>
            <div className="flex gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openNewDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nový článek
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingArticle ? "Upravit článek" : "Nový článek"}
                    </DialogTitle>
                  </DialogHeader>
                  <ArticleForm
                    formData={formData}
                    isEditing={!!editingArticle}
                    onChange={handleFormChange}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Odhlásit
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Seznam článků</CardTitle>
            </CardHeader>
            <CardContent>
              <ArticlesTable
                articles={articles}
                onEdit={openEditDialog}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
