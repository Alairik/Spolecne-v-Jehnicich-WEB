interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ image, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative h-64 md:h-80 w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
