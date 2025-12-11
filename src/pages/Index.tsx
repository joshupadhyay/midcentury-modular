import barcelonaChair from "@/assets/barcelona-chair-illustration.png";

const Index = () => {
  return (
    <main className="min-h-screen marble-bg">
      {/* Subtle architectural frame lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 right-8 h-px bg-border/30" />
        <div className="absolute bottom-8 left-8 right-8 h-px bg-border/30" />
        <div className="absolute top-8 bottom-8 left-8 w-px bg-border/30" />
        <div className="absolute top-8 bottom-8 right-8 w-px bg-border/30" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header */}
        <header className="text-center mb-8 slide-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-body mb-3">
            Assembly Instructions
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground tracking-tight">
            Barcelona Chair
          </h1>
        </header>

        {/* Main Illustration */}
        <figure 
          className="relative w-full max-w-5xl fade-in" 
          style={{ animationDelay: "0.3s" }}
        >
          <div className="relative overflow-hidden rounded-sm shadow-elegant">
            <img
              src={barcelonaChair}
              alt="Barcelona Chair assembly diagram - exploded view showing chrome frame, leather cushions, and hardware components in Portal game instructional style"
              className="w-full h-auto object-contain"
            />
            {/* Subtle overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/5 to-transparent pointer-events-none" />
          </div>
        </figure>

        {/* Footer attribution */}
        <footer 
          className="mt-10 text-center slide-up" 
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          <p className="text-xs tracking-widest uppercase text-muted-foreground/70 font-body">
            Mies van der Rohe · 1929
          </p>
          <p className="mt-2 text-sm text-muted-foreground font-display italic">
            "Less is more"
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
