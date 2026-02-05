import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Users, Trophy, Target, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  bgClass: string;
}

const SLIDES: Slide[] = [
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

const AUTO_PLAY_INTERVAL = 5000;

function SlideContent({ slide, isActive, position }: {
  slide: Slide;
  isActive: boolean;
  position: "left" | "center" | "right";
}) {
  const Icon = slide.icon;

  const translateClass = {
    left: "-translate-x-full opacity-0",
    center: "translate-x-0 opacity-100",
    right: "translate-x-full opacity-0",
  }[position];

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-500",
        slide.bgClass,
        translateClass
      )}
    >
      <div className="container mx-auto px-4 text-center text-primary-foreground">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
          <Icon className="h-10 w-10" />
        </div>
        <h2 className="mb-4 text-3xl md:text-5xl font-bold">{slide.title}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl opacity-90">
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
}

function NavigationArrow({ direction, onClick }: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const position = direction === "prev" ? "left-4" : "right-4";
  const label = direction === "prev" ? "Předchozí slide" : "Další slide";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "absolute top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white/30",
        position
      )}
      onClick={onClick}
      aria-label={label}
    >
      <Icon className="h-6 w-6" />
    </Button>
  );
}

function DotIndicators({ total, current, onSelect }: {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={cn(
            "h-3 rounded-full transition-all",
            index === current
              ? "bg-white w-8"
              : "bg-white/50 w-3 hover:bg-white/70"
          )}
          aria-label={`Přejít na slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % SLIDES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [goToNext]);

  const getSlidePosition = (index: number): "left" | "center" | "right" => {
    if (index === currentSlide) return "center";
    if (index < currentSlide) return "left";
    return "right";
  };

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[400px] md:h-[500px]">
        {SLIDES.map((slide, index) => (
          <SlideContent
            key={slide.id}
            slide={slide}
            isActive={index === currentSlide}
            position={getSlidePosition(index)}
          />
        ))}
      </div>

      <NavigationArrow direction="prev" onClick={goToPrev} />
      <NavigationArrow direction="next" onClick={goToNext} />

      <DotIndicators
        total={SLIDES.length}
        current={currentSlide}
        onSelect={setCurrentSlide}
      />
    </section>
  );
}
