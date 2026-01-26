import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Users, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Náš tým",
    description: "Poznajte lidi, kteří pracují pro lepší Jehnice. Spojuje nás láska k obci a odhodlání.",
    icon: Users,
    href: "/tym",
    bgClass: "bg-primary",
  },
  {
    id: 2,
    title: "Naše úspěchy",
    description: "Podívejte se, co se nám již podařilo pro obec a její obyvatele udělat.",
    icon: Trophy,
    href: "/uspechy",
    bgClass: "bg-secondary",
  },
  {
    id: 3,
    title: "Program 2026",
    description: "Přečtěte si naše plány a vize pro budoucnost Jehnic v příštím volebním období.",
    icon: Target,
    href: "/program",
    bgClass: "bg-primary",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[400px] md:h-[500px]">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-500",
                slide.bgClass,
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              )}
            >
              <div className="container mx-auto px-4 text-center text-primary-foreground">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                  <Icon className="h-10 w-10" />
                </div>
                <h2 className="mb-4 text-3xl font-bold md:text-5xl">{slide.title}</h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 md:text-xl">
                  {slide.description}
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Link to={slide.href}>Zjistit více</Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white/30"
        onClick={prevSlide}
        aria-label="Předchozí slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white/30"
        onClick={nextSlide}
        aria-label="Další slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-3 w-3 rounded-full transition-all",
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Přejít na slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
