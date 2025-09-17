
"use client";

import { Button } from '@/components/ui/button';
import type { Link as MusicLink } from '@/lib/data';
import { Youtube } from 'lucide-react';
import { SpotifyIcon, AppleMusicIcon, SoundcloudIcon } from '@/components/icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const iconMap = {
  spotify: SpotifyIcon,
  apple: AppleMusicIcon,
  youtube: Youtube,
  soundcloud: SoundcloudIcon,
};

type MusicProps = {
  musicLinks: MusicLink[];
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MusicSection({ musicLinks }: MusicProps) {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section 
      id="music"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Discover the Music</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Listen on your favorite platform or watch the latest video.
          </p>
        </motion.div>

        <motion.div className="flex justify-center flex-wrap gap-4 mb-12" variants={fadeIn}>
          {musicLinks.map(({ platform, url, icon }) => {
            const IconComponent = iconMap[icon as keyof typeof iconMap] || 'div';
            return (
              <Button key={platform} asChild size="lg" variant="outline" className="min-w-[180px]">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <IconComponent className="mr-2 h-5 w-5" />
                  {platform}
                </a>
              </Button>
            );
          })}
        </motion.div>

        <motion.div className="max-w-4xl mx-auto" variants={fadeIn}>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
