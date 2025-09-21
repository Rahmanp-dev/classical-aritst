
"use client";

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Link as SocialLink, NavLink } from '@/lib/data';
import { MusicalLogo } from '../ui/musical-logo';
import { motion } from 'framer-motion';
import { FloatingCard } from '@/components/ui/floating-card';

const iconMap = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
};

type FooterProps = {
  socialLinks: SocialLink[];
  navLinks: NavLink[];
  artistName: string;
}

export function Footer({ socialLinks, navLinks, artistName }: FooterProps) {
  return (
    <footer className="relative bg-gradient-to-t from-black via-background/95 to-background border-t border-border/20">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-[20%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div 
            className="md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="inline-flex items-center gap-3 font-bold text-xl mb-6 group">
              <div className="transition-transform group-hover:scale-110">
                <MusicalLogo size="md" className="text-primary" />
              </div>
              <span className="font-headline bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {artistName}
              </span>
            </Link>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Classical music reimagined for the modern world. Experience the fusion of traditional techniques with contemporary innovation.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map(({ platform, url, icon }, index) => {
                const IconComponent = iconMap[icon as keyof typeof iconMap] || Instagram;
                return (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <Button 
                      asChild 
                      variant="ghost" 
                      size="icon"
                      className="bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-110"
                    >
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <IconComponent className="h-5 w-5" />
                        <span className="sr-only">{platform}</span>
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-headline text-lg font-semibold mb-6 text-foreground">Quick Links</h3>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            className="md:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <FloatingCard variant="glass" size="md" className="h-full">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <h3 className="font-headline text-lg font-semibold text-foreground">Stay Connected</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Be the first to know about new releases, exclusive performances, and behind-the-scenes content.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                />
                <Button 
                  type="submit" 
                  className="btn-glow bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </FloatingCard>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-border/20 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {artistName}. All rights reserved. 
            <span className="mx-2 hidden sm:inline-block">•</span>
            <br className="sm:hidden" />
            Crafted with passion for musical excellence.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

    