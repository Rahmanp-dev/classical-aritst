
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import type { TourDate } from '@/lib/data';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type TourImage = {
  imageUrl: string;
  imageHint: string;
  description?: string;
}

type TourProps = {
  tourDates: TourDate[];
  tourImage: TourImage;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function TourSection({ tourDates, tourImage }: TourProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section 
      id="tour" 
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
          <h2 className="text-4xl md:text-5xl font-bold font-headline">On Tour</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Experience the music live. Find a show near you.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-4">
            {tourDates.map((event, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="bg-background/80 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center w-16 shrink-0">
                        <p className="text-sm font-bold text-primary">{event.date.split(' ')[0]}</p>
                        <p className="text-2xl font-bold">{event.date.split(' ')[1].replace(',', '')}</p>
                      </div>
                      <div className="border-l pl-4">
                        <h3 className="font-bold">{event.venue}</h3>
                        <p className="text-sm text-muted-foreground">{event.city}</p>
                      </div>
                    </div>
                    <Button asChild className="sm:ml-auto mt-4 sm:mt-0 w-full sm:w-auto">
                      <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                        <Ticket className="mr-2 h-4 w-4" /> Tickets
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div className="lg:col-span-2" variants={fadeIn}>
            <Card className="overflow-hidden h-full">
              <div className="relative w-full h-full min-h-[400px] bg-muted rounded-lg">
                <Image
                  src={tourImage.imageUrl}
                  alt={tourImage.description || tourImage.imageHint || 'Tour image'}
                  fill
                  className="object-cover"
                  data-ai-hint={tourImage.imageHint}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
