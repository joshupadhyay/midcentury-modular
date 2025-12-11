import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

export const FurnitureUpload = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newImages: UploadedImage[] = Array.from(files)
      .filter(file => file.type.startsWith("image/"))
      .map(file => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));
    
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) URL.revokeObjectURL(image.preview);
      return prev.filter(img => img.id !== id);
    });
  }, []);

  return (
    <section className="w-full max-w-3xl mx-auto slide-up" style={{ animationDelay: "0.7s" }}>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-light text-foreground mb-2">
          Upload Your Piece
        </h2>
        <p className="text-sm text-muted-foreground font-body">
          Share photos of your furniture for analysis
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-sm p-8 md:p-12 text-center
          transition-all duration-300 cursor-pointer
          ${isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-muted-foreground/50 hover:bg-muted/30"
          }
        `}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-3">
          <div className={`
            p-4 rounded-full transition-colors duration-300
            ${isDragging ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}
          `}>
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-foreground font-display text-lg">
              Drop images here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded images preview */}
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="relative group aspect-square rounded-sm overflow-hidden bg-muted shadow-soft"
            >
              <img
                src={image.preview}
                alt={image.file.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeImage(image.id)}
                className="
                  absolute top-2 right-2 p-1.5 rounded-full
                  bg-background/80 text-foreground
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                  hover:bg-destructive hover:text-destructive-foreground
                "
                aria-label="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Action button */}
      {images.length > 0 && (
        <div className="mt-6 text-center">
          <Button 
            size="lg"
            className="font-display tracking-wide"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Analyze {images.length} {images.length === 1 ? "Photo" : "Photos"}
          </Button>
        </div>
      )}
    </section>
  );
};
