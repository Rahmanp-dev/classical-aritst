
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { ImageType } from '@/lib/data';
import { Music, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

type HeroProps = {
  heroImage: Omit<ImageType, "id" | "description">;
  artistName: string;
  artistTagline: string;
}

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export function HeroSection({ heroImage, artistName, artistTagline }: HeroProps) {
  return (
    <motion.section 
      id="home" 
      className="relative h-dvh w-full flex items-center justify-center text-center p-0"
      initial="hidden"
      animate="show"
    >
      <Image
        src={heroImage.imageUrl}
        alt="Hero background"
        fill
        className="object-cover"
        priority
        data-ai-hint={heroImage.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <motion.div 
        className="relative z-10 flex flex-col items-center text-primary-foreground px-4"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 font-headline"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          {artistName}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-8 text-primary-foreground/80"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          {artistTagline}
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
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
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
