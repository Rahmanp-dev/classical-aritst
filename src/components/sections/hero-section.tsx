import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { artistName, artistTagline } from '@/lib/data';
import { Music, Calendar } from 'lucide-react';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <section id="home" className="relative h-dvh w-full flex items-center justify-center text-center p-0">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col items-center text-primary-foreground px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 font-headline animate-fade-in-down" style={{animationDelay: '0.2s'}}>
          {artistName}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-8 text-primary-foreground/80 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          {artistTagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#music">
              <Music className="mr-2 h-5 w-5" />
              Listen Now
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-black/20 hover:bg-black/40">
            <Link href="#tour">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Shows
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
