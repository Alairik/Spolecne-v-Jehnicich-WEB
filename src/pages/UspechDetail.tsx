import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import { achievements, getAchievementById } from "@/data/achievements";

const UspechDetail = () => {
  const { id } = useParams<{ id: string }>();
  const achievement = id ? getAchievementById(id) : undefined;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!achievement) {
    return <Navigate to="/uspechy" replace />;
  }

  const Icon = achievement.icon;
  const currentIndex = achievements.findIndex((a) => a.id === id);
  const prevAchievement = currentIndex > 0 ? achievements[currentIndex - 1] : null;
  const nextAchievement = currentIndex < achievements.length - 1 ? achievements[currentIndex + 1] : null;

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/uspechy" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na úspěchy
            </Link>
          </div>

          {/* Main Content */}
          <div className="mx-auto max-w-4xl">

            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 md:p-12">
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                    {achievement.title}
                  </h1>
                </div>

                {/* Full Description */}
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  {achievement.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>

                {/* Gallery */}
                {achievement.gallery.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Galerie</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {achievement.gallery.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(image)}
                          className="group relative aspect-video overflow-hidden rounded-lg border-2 border-transparent hover:border-primary transition-all"
                        >
                          <img
                            src={image}
                            alt={`${achievement.title} - obrázek ${index + 1}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
              {prevAchievement ? (
                <Button variant="outline" asChild className="gap-2">
                  <Link to={`/uspechy/${prevAchievement.id}`}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="truncate max-w-[200px]">{prevAchievement.title}</span>
                  </Link>
                </Button>
              ) : (
                <div />
              )}

              {nextAchievement ? (
                <Button variant="outline" asChild className="gap-2">
                  <Link to={`/uspechy/${nextAchievement.id}`}>
                    <span className="truncate max-w-[200px]">{nextAchievement.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Zvětšený obrázek"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default UspechDetail;
