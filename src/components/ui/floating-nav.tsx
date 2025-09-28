
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Home, User, Music, Calendar, Image, Mail } from "lucide-react";
import type { NavLink } from "@/lib/data";

const iconMap: { [key: string]: React.ElementType } = {
  about: User,
  music: Music,
  tour: Calendar,
  gallery: Image,
  contact: Mail,
  default: Home
};

export const FloatingNav = ({
  navLinks,
  className,
}: {
  navLinks: NavLink[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  // Effect for showing/hiding nav on scroll
  useMotionValueEvent(scrollY, "change", (current) => {
    // Show nav when user scrolls down
    if (typeof current === "number") {
      let direction = current - (scrollY.getPrevious() ?? 0);
      if (current > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  // Effect for observing sections and setting active link
  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href)).filter(el => el);
    
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, { rootMargin: "-30% 0px -70% 0px" });

    sections.forEach(section => {
      if (section) observer.current?.observe(section);
    });

    return () => observer.current?.disconnect();
  }, [navLinks]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-white/20 rounded-full glass-card shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-50 p-2 items-center justify-center space-x-2",
          className
        )}
      >
        {navLinks.map((navItem) => {
          const Icon = iconMap[navItem.href.replace('#', '')] || iconMap.default;
          const isActive = activeSection === navItem.href;
          return (
            <Link
              key={navItem.href}
              href={navItem.href}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 md:w-auto md:h-10 md:px-4 rounded-full text-white/80 transition-all duration-300",
                "hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-0 bg-primary/80 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline text-sm font-medium">{navItem.label}</span>
              </span>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
