
"use client";

import Image from 'next/image';
import type { ImageType } from '@/lib/data';
import { motion } from 'framer-motion';
import { FloatingSection } from '@/components/ui/floating-card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type AboutProps = {
  artistImage: Omit<ImageType, "id" | "description">;
  artistName: string;
  artistBio: string;
}

export function AboutSection({ artistImage, artistName, artistBio }: AboutProps) {

  return (
    <FloatingSection id="about" background="subtle">
      <div className="max-w-4xl mx-auto">
        
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <div className="relative aspect-[4/3] max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-black/20 border border-border/20">
            <Image
              src={artistImage.imageUrl}
              alt={`Portrait of ${artistName}`}
              fill
              className="object-cover"
              data-ai-hint={artistImage.imageHint}
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </motion.div>

        {/* Full Bio Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-center"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {artistBio}
          </ReactMarkdown>
        </motion.div>

      </div>
    </FloatingSection>
  );
}
