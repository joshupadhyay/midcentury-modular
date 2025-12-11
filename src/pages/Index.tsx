import { FurnitureCarousel } from "@/components/FurnitureCarousel";
import { FurnitureUpload } from "@/components/FurnitureUpload";

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

      <div className="relative z-10 flex flex-col items-center px-6 py-12">
        <div className="flex-1 flex items-center justify-center w-full">
          <FurnitureCarousel />
        </div>
        
        <div className="w-full mt-12 mb-8">
          <FurnitureUpload />
        </div>
      </div>
    </main>
  );
};

export default Index;
