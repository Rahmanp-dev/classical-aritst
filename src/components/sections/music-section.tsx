
"use client";

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Link as MusicLink, FeaturedPlaylist, InstagramReel } from '@/lib/data';
import { Youtube, Play, ExternalLink, Instagram } from 'lucide-react';
import { SpotifyIcon, AppleMusicIcon, SoundcloudIcon } from '@/components/icons';
import { motion } from 'framer-motion';
import { FloatingCard, FloatingSection, FloatingGrid } from '@/components/ui/floating-card';
import Link from 'next/link';
import { InstagramEmbed } from '../ui/instagram-embed';

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
  startListeningUrl: string;
  featuredPlaylists: FeaturedPlaylist[];
  instagramReels: InstagramReel[];
}

export function MusicSection({ 
  musicLinks, 
  startListeningUrl, 
  featuredPlaylists, 
  instagramReels 
}: MusicProps) {

  const hasPlaylists = featuredPlaylists && featuredPlaylists.length > 0;
  const defaultTab = hasPlaylists ? featuredPlaylists[0].id : "";

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
          Past Performances
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Explore official releases, live performances, and moments from behind the scenes.
        </p>
      </motion.div>

      {/* Featured Playlists */}
      {hasPlaylists && (
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue={defaultTab} className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <TabsList className="mb-8">
              {featuredPlaylists.map(playlist => (
                <TabsTrigger key={playlist.id} value={playlist.id}>
                  {playlist.genre}
                </TabsTrigger>
              ))}
            </TabsList>

            {featuredPlaylists.map(playlist => (
              <TabsContent key={playlist.id} value={playlist.id} className="w-full">
                <FloatingCard variant="glass" className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-background to-background/50 rounded-lg overflow-hidden relative group">
                    <iframe
                      className="w-full h-full"
                      src={playlist.playlistUrl}
                      title={`YouTube Playlist: ${playlist.genre}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </FloatingCard>
              </TabsContent>
            ))}
          </Tabs>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {instagramReels.map((reel, index) => (
              <motion.div 
                key={reel.id} 
                className="w-[330px] h-[650px] bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/10 rounded-xl p-1 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4 + index * 0.1,
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                  <InstagramEmbed url={reel.url} />
              </motion.div>
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
