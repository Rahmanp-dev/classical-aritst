
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Award, Globe, Music2 } from 'lucide-react';
import type { ImageType } from '@/lib/data';
import { motion } from 'framer-motion';
import { FloatingCard, FloatingSection, FloatingGrid } from '@/components/ui/floating-card';

type AboutProps = {
  artistImage: Omit<ImageType, "id" | "description">;
  artistName: string;
  artistBio: string;
}

export function AboutSection({ artistImage, artistName, artistBio }: AboutProps) {
  const stats = [
    { icon: Award, label: 'Awards', value: '12+' },
    { icon: Globe, label: 'Countries', value: '30+' },
    { icon: Music2, label: 'Albums', value: '8' },
  ];

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
              <p className="text-lg">{artistBio}</p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FloatingGrid cols={3} gap="md">
              {stats.map((stat, index) => (
                <FloatingCard 
                  key={stat.label}
                  variant="minimal"
                  size="sm"
                  delay={0.6 + index * 0.1}
                  className="text-center hover:bg-accent/5"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl font-bold font-headline text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </FloatingCard>
              ))}
            </FloatingGrid>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              asChild 
              size="lg" 
              className="btn-glow bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <a href="/press-kit.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Press Kit
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </FloatingSection>
  );
}
