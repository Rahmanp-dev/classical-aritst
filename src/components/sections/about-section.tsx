
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { ImageType } from '@/lib/data';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type AboutProps = {
  artistImage: Omit<ImageType, "id" | "description">;
  artistName: string;
  artistBio: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function AboutSection({ artistImage, artistName, artistBio }: AboutProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section 
      id="about"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } }
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
          <motion.div className="md:col-span-2" variants={fadeIn}>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={artistImage.imageUrl}
                alt={`Portrait of ${artistName}`}
                fill
                className="object-cover"
                data-ai-hint={artistImage.imageHint}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </motion.div>
          <motion.div className="md:col-span-3" variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">About {artistName}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4 mb-8">
              <p>{artistBio}</p>
            </div>
            <Button asChild size="lg">
              <a href="/press-kit.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Press Kit
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
