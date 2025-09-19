
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/lib/data';
import { MusicalLogo } from '@/components/ui/musical-logo';

type HeaderProps = {
  navLinks: NavLink[];
  artistName: string;
}

export function Header({ navLinks, artistName }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto">
        <div
          className={cn(
            'flex items-center justify-between h-14 px-6 rounded-2xl transition-all duration-500',
            'glass-header hover:glass-card-strong',
            isScrolled ? 'glass-card-strong border-white/30' : ''
          )}
        >
          <Link 
            href="/" 
            className="flex items-center gap-3 font-bold text-lg group"
          >
            <div className="transition-transform group-hover:scale-110">
              <MusicalLogo size="md" className="text-primary" />
            </div>
            <span className="font-headline text-foreground group-hover:text-primary transition-colors">
              {artistName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium text-foreground/80 transition-all duration-300",
                  "hover:text-primary hover:scale-105",
                  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-primary after:to-purple-500",
                  "after:transition-all after:duration-300 hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="glass-button hover:glass-card-strong"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[400px] glass-card-strong border-l border-white/20"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                     <Link 
                       href="/" 
                       className="flex items-center gap-3 font-bold text-lg" 
                       onClick={() => setMobileMenuOpen(false)}
                     >
                        <MusicalLogo size="md" className="text-primary" />
                        <span className="font-headline">{artistName}</span>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:glass-button"
                      >
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </div>
                  <nav className="flex-1 flex flex-col items-center justify-center space-y-8">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-2xl font-headline transition-all duration-300",
                          "hover:text-primary hover:scale-110",
                          "opacity-0 translate-y-4",
                          isMobileMenuOpen && "animate-in slide-in-from-right-4 fade-in"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
