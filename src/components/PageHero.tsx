interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ image, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative h-64 md:h-80 w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
