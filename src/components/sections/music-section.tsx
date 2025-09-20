
"use client";

import { Button } from '@/components/ui/button';
import type { Link as MusicLink } from '@/lib/data';
import { Youtube, Play, ExternalLink } from 'lucide-react';
import { SpotifyIcon, AppleMusicIcon, SoundcloudIcon } from '@/components/icons';
import { motion } from 'framer-motion';
import { FloatingCard, FloatingSection, FloatingGrid } from '@/components/ui/floating-card';
import Link from 'next/link';

const iconMap = {
  spotify: SpotifyIcon,
  apple: AppleMusicIcon,
  youtube: Youtube,
  soundcloud: SoundcloudIcon,
};

const platformColors = {
  spotify: 'from-green-500 to-green-600',
  apple: 'from-gray-800 to-black',
  youtube: 'from-red-500 to-red-600',
  soundcloud: 'from-orange-500 to-orange-600',
};

type MusicProps = {
  musicLinks: MusicLink[];
  featuredVideoUrl: string;
  startListeningUrl: string;
}

export function MusicSection({ musicLinks, featuredVideoUrl, startListeningUrl }: MusicProps) {
  return (
    <FloatingSection id="music" background="gradient">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          Discover the Music
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Experience classical music reimagined through modern soundscapes and innovative compositions.
        </p>
      </motion.div>

      {/* Streaming Platforms */}
      <div className="mb-16">
        <motion.h3 
          className="text-2xl font-bold font-headline mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Listen on Your Favorite Platform
        </motion.h3>
        
        <FloatingGrid cols={2} gap="md" className="max-w-2xl mx-auto">
          {musicLinks.map(({ platform, url, icon }, index) => {
            const IconComponent = iconMap[icon as keyof typeof iconMap] || Youtube;
            const colorClass = platformColors[icon as keyof typeof platformColors] || 'from-primary to-purple-600';
            
            return (
              <FloatingCard 
                key={platform}
                variant="glass"
                delay={0.3 + index * 0.1}
                className="group cursor-pointer overflow-hidden"
              >
                <a href={url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className={`bg-gradient-to-r ${colorClass} p-1 rounded-lg mb-4 w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <div className="bg-background/20 p-3 rounded-md backdrop-blur-sm">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {platform}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Stream now on {platform}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <Play className="w-4 h-4 mr-2" />
                    Listen Now
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </FloatingCard>
            );
          })}
        </FloatingGrid>
      </div>

      {/* Featured Video */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold font-headline mb-8 text-center">
          Latest Performance
        </h3>
        
        <FloatingCard variant="glass" className="max-w-5xl mx-auto overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-background to-background/50 rounded-lg overflow-hidden relative group">
            <iframe
              className="w-full h-full"
              src={featuredVideoUrl}
              title="Latest Performance"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </FloatingCard>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-muted-foreground mb-6">
          Join thousands of listeners experiencing classical music reimagined
        </p>
        <Button 
          asChild
          size="lg" 
          className="btn-glow bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
        >
          <Link href={startListeningUrl}>
            <Play className="mr-2 h-5 w-5" />
            Start Listening
          </Link>
        </Button>
      </motion.div>
    </FloatingSection>
  );
}

    