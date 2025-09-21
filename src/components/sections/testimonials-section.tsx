
"use client";

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import type { Testimonial } from "@/lib/data";
import { motion } from "framer-motion";
import { FloatingSection } from "../ui/floating-card";
import { Quote } from "lucide-react";

type TestimonialsProps = {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <FloatingSection id="testimonials" background="subtle">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          Words of Acclaim
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover what critics and fans are saying about the music.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="p-1">
                  <Card className="bg-card/50 backdrop-blur-lg border-border/30">
                    <CardContent className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
                      <Quote className="w-10 h-10 text-primary mb-6" />
                      <p className="text-lg md:text-xl font-medium text-foreground/90 leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </p>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground italic">{testimonial.source}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </motion.div>
    </FloatingSection>
  )
}
