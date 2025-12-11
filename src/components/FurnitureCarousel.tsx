import { useEffect, useState, useCallback } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import barcelonaChair from "@/assets/barcelona-chair-illustration.png";
import poulsenLamp from "@/assets/poulsen-lamp-illustration.png";
import eamesLounge from "@/assets/eames-lounge-illustration.png";
interface FurnitureSlide {
  image: string;
  title: string;
  alt: string;
  designer: string;
  year: string;
  quote: string;
}
const slides: FurnitureSlide[] = [{
  image: barcelonaChair,
  title: "Barcelona Chair",
  alt: "Barcelona Chair assembly diagram - exploded view showing chrome frame, leather cushions, and hardware components in Portal game instructional style",
  designer: "Mies van der Rohe",
  year: "1929",
  quote: "Less is more"
}, {
  image: poulsenLamp,
  title: "PH Lamp",
  alt: "Louis Poulsen PH Lamp assembly diagram - exploded view showing layered shades, socket, and cord in Portal game instructional style",
  designer: "Poul Henningsen",
  year: "1958",
  quote: "Light should be gentle"
}, {
  image: eamesLounge,
  title: "Eames Lounge Chair",
  alt: "Eames Lounge Chair assembly diagram - exploded view showing molded plywood shells, leather cushions, and aluminum base in Portal game instructional style",
  designer: "Charles & Ray Eames",
  year: "1956",
  quote: "The details are not the details"
}];
const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
export const FurnitureCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  // Breathing cycle for organic auto-advance
  useEffect(() => {
    if (!api || !isReady) return;
    const duration = randomInRange(5500, 7000); // Organic timing variation

    const timeout = setTimeout(() => {
      api.scrollNext();
    }, duration);
    return () => clearTimeout(timeout);
  }, [api, current, isReady]);
  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);

    // Small delay before starting auto-advance
    const startTimeout = setTimeout(() => setIsReady(true), 1000);
    return () => {
      api.off("select", onSelect);
      clearTimeout(startTimeout);
    };
  }, [api, onSelect]);
  const currentSlide = slides[current];
  return <div className="w-full">
      {/* Header */}
      <header className="text-center mb-8 slide-up" style={{
      animationDelay: "0.1s"
    }}>
        <p className="tracking-[0.3em] uppercase text-muted-foreground font-body mb-3 text-3xl font-normal">
          MIDCENTURY MODULAR
        </p>
        <h1 className="md:text-5xl lg:text-6xl font-display font-light text-foreground tracking-tight transition-all duration-500 text-xl">
          {currentSlide.title}
        </h1>
      </header>

      {/* Carousel */}
      <Carousel setApi={setApi} opts={{
      align: "center",
      loop: true,
      duration: 45 // Slower, smoother transition
    }} className="w-full max-w-5xl mx-auto fade-in" style={{
      animationDelay: "0.3s"
    }}>
        <CarouselContent>
          {slides.map((slide, index) => <CarouselItem key={index}>
              <figure className="relative">
                <div className="relative overflow-hidden rounded-sm shadow-elegant aspect-[16/9]">
                  <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/5 to-transparent pointer-events-none" />
                </div>
              </figure>
            </CarouselItem>)}
        </CarouselContent>
      </Carousel>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => <button key={index} onClick={() => api?.scrollTo(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current ? "bg-foreground w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} aria-label={`Go to slide ${index + 1}`} />)}
      </div>

      {/* Footer attribution */}
      <footer className="mt-10 text-center slide-up" style={{
      animationDelay: "0.5s",
      animationFillMode: "both"
    }}>
        <p className="text-xs tracking-widest uppercase text-muted-foreground/70 font-body transition-all duration-500">
          {currentSlide.designer} · {currentSlide.year}
        </p>
        <p className="mt-2 text-sm text-muted-foreground font-display italic transition-all duration-500">
          "{currentSlide.quote}"
        </p>
      </footer>
    </div>;
};