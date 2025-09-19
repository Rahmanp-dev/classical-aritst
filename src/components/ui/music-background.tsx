"use client";

import { motion } from 'framer-motion';
import { Music, Music2, Music3, Music4 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ParticleData {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export function MusicBackground() {
  const musicIcons = [Music, Music2, Music3, Music4];
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Generate consistent particle data on client side only
    const particleData: ParticleData[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    
    setParticles(particleData);
    setIsMounted(true);
  }, []);

  // Don't render particles until mounted on client
  if (!isMounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating musical notes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const Icon = musicIcons[i % musicIcons.length];
          return (
            <motion.div
              key={i}
              className="absolute text-primary/5"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i * 8)}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + (i * 0.5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              <Icon className="w-12 h-12 md:w-16 md:h-16" />
            </motion.div>
          );
        })}
        
        {/* Animated sound waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <svg className="w-full h-full opacity-5" viewBox="0 0 1200 150" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q300,20 600,50 T1200,50 L1200,150 L0,150 Z"
              fill="url(#waveGradient)"
              animate={{
                d: [
                  "M0,50 Q300,20 600,50 T1200,50 L1200,150 L0,150 Z",
                  "M0,70 Q300,40 600,70 T1200,70 L1200,150 L0,150 Z",
                  "M0,50 Q300,20 600,50 T1200,50 L1200,150 L0,150 Z",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating musical notes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const Icon = musicIcons[i % musicIcons.length];
        return (
          <motion.div
            key={i}
            className="absolute text-primary/5"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <Icon className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
        );
      })}
      
      {/* Animated sound waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg className="w-full h-full opacity-5" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q300,20 600,50 T1200,50 L1200,150 L0,150 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,50 Q300,20 600,50 T1200,50 L1200,150 L0,150 Z",
                "M0,70 Q300,40 600,70 T1200,70 L1200,150 L0,150 Z",
                "M0,50 Q300,20 600,50 T1200,50 L1200,150 L0,150 Z",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Particle system with client-side generated positions */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Floating vinyl record component
export function FloatingVinyl({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        className="text-primary/20"
      >
        {/* Vinyl record */}
        <circle cx="60" cy="60" r="55" fill="currentColor" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        
        {/* Center hole */}
        <circle cx="60" cy="60" r="3" fill="hsl(var(--background))" />
        
        {/* Label */}
        <circle cx="60" cy="60" r="25" fill="hsl(var(--background))" fillOpacity="0.8" />
        <text x="60" y="65" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="monospace">
          ACOUSTIC
        </text>
      </svg>
    </motion.div>
  );
}