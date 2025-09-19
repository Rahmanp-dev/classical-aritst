"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MusicalLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function MusicalLogo({ className, size = 'md', animate = true }: MusicalLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const WaveformIcon = () => (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Stylized waveform bars */}
      {[
        { x: 8, height: 16, delay: 0 },
        { x: 14, height: 24, delay: 0.1 },
        { x: 20, height: 32, delay: 0.2 },
        { x: 26, height: 20, delay: 0.3 },
        { x: 32, height: 28, delay: 0.4 },
        { x: 38, height: 18, delay: 0.5 },
      ].map((bar, index) => (
        <motion.rect
          key={index}
          x={bar.x}
          y={(48 - bar.height) / 2}
          width="3"
          height={bar.height}
          rx="1.5"
          fill="url(#gradient)"
          initial={{ scaleY: 0.2, opacity: 0.5 }}
          animate={
            animate
              ? {
                  scaleY: [0.2, 1, 0.6, 1, 0.4, 1],
                  opacity: [0.5, 1, 0.8, 1, 0.7, 1],
                }
              : {}
          }
          transition={{
            duration: 2,
            delay: bar.delay,
            repeat: animate ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
    </motion.svg>
  );

  return <WaveformIcon />;
}

// Alternative minimalist music note logo
export function MusicalNoteLogo({ className, size = 'md' }: MusicalLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Stylized music note */}
      <motion.path
        d="M18 32C18 35.3137 15.3137 38 12 38C8.68629 38 6 35.3137 6 32C6 28.6863 8.68629 26 12 26C15.3137 26 18 28.6863 18 32Z"
        fill="hsl(var(--primary))"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      />
      <motion.rect
        x="17"
        y="10"
        width="3"
        height="22"
        rx="1.5"
        fill="hsl(var(--primary))"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      />
      <motion.path
        d="M20 10C20 10 28 8 32 12C32 12 28 14 20 16V10Z"
        fill="hsl(var(--accent))"
        initial={{ scale: 0, originX: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      />
    </motion.svg>
  );
}