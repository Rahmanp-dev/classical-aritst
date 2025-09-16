import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { galleryItems } from '@/lib/data';

export function GallerySection() {
  return (
    <section id="gallery" className="bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Past Highlights</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            A look back at memorable moments from the road and studio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden group transition-all duration-300 hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={item.image.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={item.image.imageHint}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-bold text-primary-foreground">{item.title}</h3>
                    <p className="text-sm text-primary-foreground/80">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
