
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { GalleryItem } from '@/lib/data';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


type GalleryProps = {
  galleryItems: GalleryItem[];
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
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
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Past Highlights</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            A look back at memorable moments from the road and studio.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {galleryItems.map((item) => (
            <motion.div key={item.id} variants={fadeIn}>
              <Card
                className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:!scale-105"
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
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
