
"use client";

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Link as SocialLink, NavLink } from '@/lib/data';
import { Logo } from '../icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer 
      className="bg-muted/40 border-t"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Logo className="text-primary h-7 w-7" />
              <span className="font-headline">{artistName}</span>
            </Link>
            <div className="flex space-x-4">
              {socialLinks.map(({ platform, url, icon }) => {
                const IconComponent = iconMap[icon as keyof typeof iconMap] || 'div';
                return (
                  <Button key={platform} asChild variant="ghost" size="icon">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <IconComponent className="h-5 w-5" />
                      <span className="sr-only">{platform}</span>
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-headline text-lg mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4 text-center md:text-left">
              Subscribe to the newsletter for tour dates, new music, and more.
            </p>
            <form className="flex w-full max-w-sm">
              <Input type="email" placeholder="Enter your email" className="rounded-r-none" />
              <Button type="submit" className="rounded-l-none">Subscribe</Button>
            </form>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
             <h3 className="font-headline text-lg mb-4">Links</h3>
             <div className="flex flex-col space-y-2 text-sm">
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                ))}
             </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {artistName}. All Rights Reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
