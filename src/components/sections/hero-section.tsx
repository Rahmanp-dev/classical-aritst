
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { ImageType } from '@/lib/data';
import { Music, Calendar, Play, Sparkles, Volume2, Headphones, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type HeroProps = {
  heroImage: Omit<ImageType, "id" | "description">;
  artistName: string;
  artistTagline: string;
}

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

// Enhanced Musical Visualizer Component
const MusicVisualizer = () => {
  const [bars, setBars] = useState<Array<{ height: number; delay: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Generate bar data on client side only
    const barData = Array.from({ length: 12 }, (_, i) => ({
      height: (Math.sin(i * 0.5) + 1) * 30 + 20, // Deterministic height based on index
      delay: i * 0.1,
    }));
    setBars(barData);
    setIsMounted(true);
  }, []);

  // Show static bars while loading
  if (!isMounted) {
    return (
      <div className="flex items-end justify-center gap-1 h-20">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-primary to-purple-400 rounded-full"
            style={{ 
              width: '4px',
              height: '40px'
            }}
          />
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
          style={{ 
            width: '4px',
            height: `${bar.height}px`
          }}
          animate={{
            scaleY: [0.3, 1.2, 0.8, 1.5, 0.4, 1],
            opacity: [0.6, 1, 0.8, 1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            delay: bar.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating Music Notes
const FloatingMusicNote = ({ delay = 0, className = "" }) => (
  <motion.div
    className={`absolute text-primary/20 ${className}`}
    initial={{ y: 100, opacity: 0, rotate: 0 }}
    animate={{ 
      y: -100, 
      opacity: [0, 1, 1, 0], 
      rotate: [0, 180, 360],
      scale: [0.5, 1, 1.2, 0.8]
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Music className="w-8 h-8" />
  </motion.div>
);

// Enhanced Audio Spectrum Component
const AudioSpectrum = () => {
  const [spectrumData, setSpectrumData] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Generate spectrum data on client side only
    const data = Array.from({ length: 30 }, (_, i) => 20 + Math.sin(i * 0.5) * 20);
    setSpectrumData(data);
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <div className="flex items-end justify-center h-full gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-primary via-purple-500 to-transparent rounded-t"
                style={{ 
                  width: '2px',
                  height: '30px'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Spectrum bars */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
        <div className="flex items-end justify-center h-full gap-1">
          {spectrumData.map((baseHeight, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-t from-primary via-purple-500 to-transparent rounded-t"
              style={{ width: '2px' }}
              animate={{
                height: [
                  `${baseHeight}px`,
                  `${baseHeight + 20 + Math.sin(i * 0.5 + 1) * 10}px`,
                  `${baseHeight + 5 + Math.sin(i * 0.5 + 2) * 5}px`,
                ],
              }}
              transition={{
                duration: 1.5 + (i * 0.05),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export function HeroSection({ heroImage, artistName, artistTagline }: HeroProps) {
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

      {/* Audio Spectrum Background */}
      <AudioSpectrum />

      {/* Enhanced Floating Elements */}
      <motion.div
        className="floating-orb w-32 h-32 bg-primary/20 top-20 left-[10%]"
        animate={{ 
          y: [-10, 20, -10],
          x: [-5, 10, -5],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="floating-orb w-48 h-48 bg-purple-500/15 bottom-32 right-[15%]"
        animate={{ 
          y: [0, -25, 0],
          x: [0, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="floating-orb w-20 h-20 bg-primary/30 top-1/3 right-[25%]"
        animate={{ 
          y: [-15, 15, -15],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating Music Notes */}
      <FloatingMusicNote delay={0} className="top-1/4 left-[20%]" />
      <FloatingMusicNote delay={2} className="top-1/3 right-[30%]" />
      <FloatingMusicNote delay={4} className="top-1/2 left-[70%]" />
      <FloatingMusicNote delay={6} className="top-3/4 right-[20%]" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Enhanced Floating Badge */}
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

          {/* Artist Name with Enhanced Effects */}
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 font-headline relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-br from-white via-white to-primary bg-clip-text text-transparent relative z-10">
              {artistName}
            </span>
            {/* Glowing text effect */}
            <span className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-purple-500/30 bg-clip-text text-transparent blur-sm">
              {artistName}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-12 text-white/80 font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {artistTagline}
          </motion.p>

          {/* Music Visualizer */}
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

          {/* Enhanced Action Cards */}
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {/* Primary CTA with Glow Effect */}
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
                <Link href="#music">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-3">
                    <div className="beat-pulse">
                      <Play className="w-6 h-6" />
                    </div>
                    <span>Listen Now</span>
                    <Volume2 className="w-5 h-5 opacity-70" />
                  </div>
                </Link>
              </Button>
            </motion.div>

            {/* Secondary CTA */}
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
                <Link href="#tour">
                  <Calendar className="mr-3 h-6 w-6" />
                  Upcoming Shows
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Info Cards with Musical Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Headphones, label: "Latest Album", value: "Now Streaming", color: "from-green-500 to-emerald-600" },
              { icon: Radio, label: "Live Shows", value: "World Tour 2025", color: "from-orange-500 to-red-600" },
              { icon: Volume2, label: "Platforms", value: "All Major Services", color: "from-blue-500 to-purple-600" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.08, y: -8 }}
                className="group glass-card-strong rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${item.color} p-4 rounded-xl mb-4 mx-auto w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white/60 text-sm uppercase tracking-wide mb-2 font-semibold">{item.label}</h3>
                <p className="text-white font-bold text-xl group-hover:text-primary transition-colors duration-300">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
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
