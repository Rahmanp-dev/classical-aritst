
"use client";

import { Button } from '@/components/ui/button';
import type { Link as MusicLink, YoutubeVideo, InstagramReel } from '@/lib/data';
import { Youtube, Play, ExternalLink, Instagram } from 'lucide-react';
import { SpotifyIcon, AppleMusicIcon, SoundcloudIcon } from '@/components/icons';
import { motion } from 'framer-motion';
import { FloatingCard, FloatingSection, FloatingGrid } from '@/components/ui/floating-card';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';

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
  youtubeVideos: YoutubeVideo[];
  instagramReels: InstagramReel[];
}

export function MusicSection({ 
  musicLinks, 
  featuredVideoUrl, 
  startListeningUrl, 
  youtubeVideos, 
  instagramReels 
}: MusicProps) {
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
          Discover the Music & Media
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Explore official releases, live performances, and moments from behind the scenes.
        </p>
      </motion.div>

      {/* Featured Video */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold font-headline mb-8 text-center">
          Featured Performance
        </h3>
        
        <FloatingCard variant="glass" className="max-w-5xl mx-auto overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-background to-background/50 rounded-lg overflow-hidden relative group">
            <iframe
              className="w-full h-full"
              src={featuredVideoUrl}
              title="Featured Performance"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </FloatingCard>
      </motion.div>

      {/* YouTube Collection */}
      {youtubeVideos && youtubeVideos.length > 0 && (
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold font-headline mb-8 text-center">More Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {youtubeVideos.map((video, index) => (
               <FloatingCard 
                key={video.id}
                variant="solid"
                delay={0.4 + index * 0.1}
                className="overflow-hidden"
              >
                <div className="aspect-video relative">
                   <iframe
                    className="w-full h-full"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold truncate" title={video.title}>{video.title}</h4>
                </div>
              </FloatingCard>
            ))}
          </div>
        </motion.div>
      )}

      {/* Instagram Reels Collection */}
      {instagramReels && instagramReels.length > 0 && (
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold font-headline mb-8 text-center">From Instagram</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {instagramReels.map((reel, index) => (
              <FloatingCard 
                key={reel.id}
                variant="solid"
                delay={0.4 + index * 0.1}
                className="overflow-hidden group"
              >
                <a href={reel.url} target="_blank" rel="noopener noreferrer">
                  <div className="bg-muted p-8 flex flex-col items-center justify-center text-center aspect-square">
                    <Instagram className="w-12 h-12 text-primary mb-4" />
                    <p className="text-sm text-muted-foreground line-clamp-3">{reel.caption}</p>
                  </div>
                  <div className="p-4 bg-card-foreground/5">
                    <div className="flex items-center text-primary text-sm font-medium">
                      View on Instagram
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </FloatingCard>
            ))}
          </div>
        </motion.div>
      )}

      {/* Streaming Platforms */}
      <div className="mt-24">
        <motion.h3 
          className="text-2xl font-bold font-headline mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Official Releases
        </motion.h3>
        
        <FloatingGrid cols={2} gap="md" className="max-w-2xl mx-auto mb-12">
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
                <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6">
                  <div className={`bg-gradient-to-r ${colorClass} p-1 rounded-lg mb-4 w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <div className="bg-background/20 p-3 rounded-md backdrop-blur-sm">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                    {platform}
                  </h4>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Listen Now
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </FloatingCard>
            );
          })}
        </FloatingGrid>
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
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
      </div>

    </FloatingSection>
  );
}
