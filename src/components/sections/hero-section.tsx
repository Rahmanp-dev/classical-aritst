
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { ImageType, InfoCard } from '@/lib/data';
import { Music, Calendar, Play, Sparkles, Volume2, Headphones, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type HeroProps = {
  heroImage: Omit<ImageType, "id" | "description">;
  artistName: string;
  artistTagline: string;
  heroCTAs?: { listenNow: string; upcomingShows: string };
  infoCards: InfoCard[];
}

const iconMap: { [key: string]: React.ElementType } = {
  Headphones,
  Radio,
  Volume2,
  Music,
  Calendar,
  Play,
  Sparkles
};

// Enhanced Musical Visualizer Component
const MusicVisualizer = () => {
  const [bars, setBars] = useState<Array<{ height: number; delay: number }>>([]);

  useEffect(() => {
    // This effect runs only on the client
    const barData = Array.from({ length: 12 }, (_, i) => ({
      height: (Math.sin(i * 0.5) + 1) * 30 + 20,
      delay: i * 0.1,
    }));
    setBars(barData);
  }, []);
  
  if (bars.length === 0) {
      // Return a static placeholder for SSR
      return (
          <div className="flex items-end justify-center gap-1 h-20">
              {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="bg-gradient-to-t from-primary to-purple-400 rounded-full" style={{ width: '4px', height: `${20 + Math.sin(index * 0.5) * 15}px` }}/>
              ))}
          </div>
      );
  }

  return (
    <div className="flex items-end justify-center gap-1 h-20">
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-t from-primary to-purple-400 rounded-full"
          style={{ width: '4px', height: `${bar.height}px` }}
          animate={{
            scaleY: [0.3, 1.2, 0.8, 1.5, 0.4, 1],
            opacity: [0.6, 1, 0.8, 1, 0.7, 1],
          }}
          transition={{ duration: 2, delay: bar.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};


export function HeroSection({ heroImage, artistName, artistTagline, heroCTAs, infoCards }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-music-gradient"
    >
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroImage.imageUrl}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-3 mb-8 glass-card-strong rounded-full group hover:scale-105 transition-all duration-300"
          >
            <div className="beat-pulse">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-white/90">Classical Music Reimagined</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 font-headline relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-br from-white via-white to-primary bg-clip-text text-transparent relative z-10">
              {artistName}
            </span>
            <span className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-purple-500/30 bg-clip-text text-transparent blur-sm">
              {artistName}
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-12 text-white/80 font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {artistTagline}
          </motion.p>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="glass-card-strong rounded-2xl p-6 inline-block">
              <MusicVisualizer />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div 
              className="group"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button 
                asChild 
                size="lg"
                className="relative btn-glow bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white border-0 px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-primary/25 overflow-hidden"
              >
                <Link href={heroCTAs?.listenNow || '#'}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-3">
                    <div className="beat-pulse"><Play className="w-6 h-6" /></div>
                    <span>Listen Now</span>
                    <Volume2 className="w-5 h-5 opacity-70" />
                  </div>
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              className="group"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="btn-glow-static glass-card hover:glass-card-strong text-white px-10 py-7 text-lg rounded-2xl shadow-2xl"
              >
                <Link href={heroCTAs?.upcomingShows || '#'}>
                  <Calendar className="mr-3 h-6 w-6" />
                  Upcoming Shows
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {infoCards.map((item, index) => {
               const IconComponent = iconMap[item.icon] || Sparkles;
               const colorClass = ["from-green-500 to-emerald-600", "from-orange-500 to-red-600", "from-blue-500 to-purple-600"][index % 3];
               return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  className="group glass-card-strong rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${colorClass} p-4 rounded-xl mb-4 mx-auto w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white/60 text-sm uppercase tracking-wide mb-2 font-semibold">{item.label}</h3>
                  <p className="text-white font-bold text-xl group-hover:text-primary transition-colors duration-300">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="glass-card rounded-full p-3 cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-6 bg-gradient-to-b from-primary to-transparent rounded-full mx-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
    
