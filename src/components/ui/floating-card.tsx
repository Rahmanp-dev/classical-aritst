"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FloatingVinyl } from './music-background';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'solid' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  delay?: number;
}

export function FloatingCard({ 
  children, 
  className, 
  variant = 'default', 
  size = 'md',
  hover = true,
  delay = 0
}: FloatingCardProps) {
  const variants = {
    default: 'bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/10',
    glass: 'glass-card hover:glass-card-strong transition-all duration-500',
    solid: 'bg-card border border-border shadow-xl shadow-black/5',
    minimal: 'bg-transparent border border-border/30 hover:border-border/60 shadow-lg shadow-black/5'
  };

  const sizes = {
    sm: 'p-4 rounded-lg',
    md: 'p-6 rounded-xl', 
    lg: 'p-8 rounded-2xl'
  };

  const hoverEffects = hover ? {
    whileHover: { 
      scale: 1.02, 
      y: -5,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay,
        duration: 0.6,
        ease: "easeOut"
      }}
      {...hoverEffects}
      className={cn(
        'transition-all duration-300 group',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// Floating Section Container
interface FloatingSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'transparent' | 'subtle' | 'gradient';
}

export function FloatingSection({ 
  children, 
  className,
  id,
  background = 'transparent'
}: FloatingSectionProps) {
  const backgrounds = {
    transparent: '',
    subtle: 'bg-gradient-to-br from-background via-background to-background/80',
    gradient: 'bg-gradient-to-br from-background via-background/95 to-background/90'
  };

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        'relative py-20 md:py-28 lg:py-36 overflow-hidden',
        backgrounds[background],
        className
      )}
    >
      {/* Subtle floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-[10%] w-32 h-32 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[15%] w-48 h-48 bg-accent/5 rounded-full blur-3xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating vinyl records */}
        <FloatingVinyl className="top-20 left-[80%]" />
        <FloatingVinyl className="bottom-32 left-[5%]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {children}
      </div>
    </motion.section>
  );
}

// Floating Grid for layouts
interface FloatingGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FloatingGrid({ 
  children, 
  cols = 3, 
  gap = 'md',
  className 
}: FloatingGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  return (
    <div className={cn(
      'grid',
      gridCols[cols],
      gaps[gap],
      className
    )}>
      {children}
    </div>
  );
}