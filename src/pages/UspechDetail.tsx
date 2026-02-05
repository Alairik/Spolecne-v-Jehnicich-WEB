import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import { achievements, getAchievementById } from "@/data/achievements";

function ImageGallery({
  images,
  title,
  onImageClick,
}: {
  images: string[];
  title: string;
  onImageClick: (image: string) => void;
}) {
  if (images.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-foreground mb-4">Galerie</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageClick(image)}
            className="group relative aspect-video overflow-hidden rounded-lg border-2 border-transparent hover:border-primary transition-all"
          >
            <img
              src={image}
              alt={`${title} - obrázek ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ImageLightbox({
  image,
  onClose,
}: {
  image: string | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!image} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        {image && (
          <img
            src={image}
            alt="Zvětšený obrázek"
            className="w-full h-auto rounded-lg"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function NavigationButtons({
  prevId,
  prevTitle,
  nextId,
  nextTitle,
}: {
  prevId: string | null;
  prevTitle: string | null;
  nextId: string | null;
  nextTitle: string | null;
}) {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
      {prevId && prevTitle ? (
        <Button variant="outline" asChild className="gap-2">
          <Link to={`/uspechy/${prevId}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="truncate max-w-[200px]">{prevTitle}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextId && nextTitle ? (
        <Button variant="outline" asChild className="gap-2">
          <Link to={`/uspechy/${nextId}`}>
            <span className="truncate max-w-[200px]">{nextTitle}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}

export default function UspechDetail() {
  const { id } = useParams<{ id: string }>();
  const achievement = id ? getAchievementById(id) : undefined;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!achievement) {
    return <Navigate to="/uspechy" replace />;
  }

  const Icon = achievement.icon;
  const currentIndex = achievements.findIndex(a => a.id === id);
  const prevAchievement = currentIndex > 0 ? achievements[currentIndex - 1] : null;
  const nextAchievement = currentIndex < achievements.length - 1 ? achievements[currentIndex + 1] : null;

  const paragraphs = achievement.fullDescription
    .split("\n\n")
    .map(p => p.trim())
    .filter(Boolean);

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              to="/uspechy"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na úspěchy
            </Link>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {achievement.title}
                  </h1>
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <ImageGallery
                  images={achievement.gallery}
                  title={achievement.title}
                  onImageClick={setSelectedImage}
                />
              </CardContent>
            </Card>

            <NavigationButtons
              prevId={prevAchievement?.id ?? null}
              prevTitle={prevAchievement?.title ?? null}
              nextId={nextAchievement?.id ?? null}
              nextTitle={nextAchievement?.title ?? null}
            />
          </div>
        </div>
      </section>

      <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </Layout>
  );
}
