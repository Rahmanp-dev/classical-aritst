
"use client";

import Image from 'next/image';
import type { ImageType } from '@/lib/data';
import { motion } from 'framer-motion';
import { FloatingCard, FloatingSection } from '@/components/ui/floating-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type AboutProps = {
  artistImage: Omit<ImageType, "id" | "description">;
  artistName: string;
  artistBio: string;
}

export function AboutSection({ artistImage, artistName, artistBio }: AboutProps) {
  // Truncate bio to the first paragraph
  const firstParagraph = artistBio.split('\n\n')[0];

  return (
    <FloatingSection id="about" background="subtle">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <FloatingCard variant="glass" className="overflow-hidden">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src={artistImage.imageUrl}
                alt={`Portrait of ${artistName}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                data-ai-hint={artistImage.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </FloatingCard>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold font-headline mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              About {artistName}
            </motion.h2>
            
            <motion.div 
              className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {firstParagraph}
              </ReactMarkdown>
            </motion.div>

            <Dialog>
              <DialogTrigger asChild>
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-6"
                  >
                    <Button variant="link" className="px-0">Read More</Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline">About {artistName}</DialogTitle>
                </DialogHeader>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed py-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {artistBio}
                  </ReactMarkdown>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </div>
    </FloatingSection>
  );
}
