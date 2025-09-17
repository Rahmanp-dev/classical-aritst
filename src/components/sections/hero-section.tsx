
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
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
};

const AnimatedGradientText = ({ text }: { text: string }) => {
  return (
    <span className="relative inline-block">
      {text}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
        style={{ backgroundSize: '200% 200%' }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 4,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </span>
  );
};

export function HeroSection({ heroImage, artistName, artistTagline }: HeroProps) {
  return (
    <motion.section 
      id="home" 
      className="relative h-dvh w-full flex items-center justify-center text-center overflow-hidden p-0"
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 0.5, 0]}}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        <Image
          src={heroImage.imageUrl}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <motion.div 
        className="relative z-10 flex flex-col items-center text-primary-foreground px-4"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-4 font-headline"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          <AnimatedGradientText text={artistName} />
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-10 text-primary-foreground/80 font-light"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          {artistTagline}
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-primary/40 hover:shadow-2xl">
            <Link href="#music">
              <Music className="mr-2 h-5 w-5" />
              Listen Now
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-primary-foreground/50">
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
