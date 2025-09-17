
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { GalleryItem } from '@/lib/data';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';


type GalleryProps = {
  galleryItems: GalleryItem[];
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function GalleryCard({ item }: { item: GalleryItem }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      <Card
        className="overflow-hidden group transition-all duration-300 w-full h-full"
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
      >
        <CardContent className="p-0">
          <div className="relative aspect-video">
            <Image
              src={item.image.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint={item.image.imageHint}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{
                transform: "translateZ(25px) scale(0.9)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 group-hover:from-black/80" />
            <div className="absolute bottom-0 left-0 p-4 transition-all duration-300 transform group-hover:-translate-y-1">
              <h3 className="font-bold text-primary-foreground">{item.title}</h3>
              <p className="text-sm text-primary-foreground/80">{item.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


export function GallerySection({ galleryItems }: GalleryProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section 
      id="gallery" 
      className="bg-muted/40"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={fadeIn}>
          <h2 className="text-5xl md:text-6xl font-bold font-headline">Past Highlights</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A look back at memorable moments from the road and studio.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {galleryItems.map((item) => (
            <motion.div key={item.id} variants={fadeIn} style={{ perspective: "1000px" }}>
              <GalleryCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
