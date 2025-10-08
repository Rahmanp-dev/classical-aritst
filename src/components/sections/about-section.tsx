
"use client";

import Image from 'next/image';
import type { ImageType } from '@/lib/data';
import { motion } from 'framer-motion';
import { FloatingSection } from '@/components/ui/floating-card';

type AboutProps = {
  artistImage: Omit<ImageType, "id" | "description">;
  artistName: string;
}

export function AboutSection({ artistImage, artistName }: AboutProps) {

  return (
    <FloatingSection id="about" background="subtle">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <div className="relative aspect-[4/3] max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-black/20 border border-border/20">
            <Image
              src={artistImage.imageUrl}
              alt={`Portrait of ${artistName}`}
              fill
              className="object-cover"
              data-ai-hint={artistImage.imageHint}
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </motion.div>

        {/* Hardcoded Bio Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-foreground mb-4">Aniruddh Aithal – Hindustani Classical Vocalist</h2>
          
          <div className="text-center" style={{ textWrap: 'balance' } as React.CSSProperties}>
            <p>Aniruddh Aithal is a 26-year-old Hindustani classical musician, specializing in vocal music. Music has always been an inseparable part of his life. From a very young age, he was exposed to classical music, primarily because of his parents who are avid listeners of the art form.</p>
            
            <p>Blessed with an exceptionally sweet voice, Aniruddh’s vocation in life was clear from childhood. Born on 29th August 1998, he began learning Hindustani Classical Music at the age of 10.</p>
            
            <p>He formally started training under <strong>Smt. Geetha Garud Prithviraj</strong>, daughter and disciple of the legendary Tabla maestro <strong>Pt. D.S. Garud</strong>. After 8 years of rigorous training, and with the blessings of his Guru, Aniruddh is now receiving advanced guidance from <strong>Dr. Ashok Huggannavar</strong>, disciple of the legendary maestros <strong>Pt. Lingaraj Buwa Yaraguppi</strong>, <strong>Pt. Sangameshwar Gurav</strong>, and <strong>Pt. Basavaraj Rajguru</strong>.</p>
            
            <p>He considers himself fortunate to have found two Gurus who are extremely patient, methodical, and prolific in their teaching. Their training has moulded him into a musician who is not only technically sound but also aesthetically appealing. His artistry is evidenced by the numerous prizes he has won at both state and national levels.</p>
          </div>

          <div className="my-12">
            <h3 className="text-2xl md:text-3xl font-headline font-semibold text-foreground mb-6 text-center">Awards and Achievements</h3>
            <ul className="list-disc pl-5 space-y-3 text-left max-w-prose mx-auto">
              <li>All India Radio National Level Competition (2017) – Winner</li>
              <li>University Level Medals – Youth Festivals during his engineering studies</li>
              <li>Scholarships – Awarded by the Centre for Cultural Resources and Training (CCRT), New Delhi and the Karnataka Sangeetha Nruthya Academy</li>
              <li>A-Grade Artist – Conferred by All India Radio in 2023, making him one of the youngest artists in India to achieve this honor</li>
              <li>Shanmukhananda Bharat Ratna Dr. M.S. Subbulakshmi Fellowship (2024) – Awarded in September 2024</li>
              <li>Sur Jyotsna Award (2025) – By the Lokmat Group for emerging artists</li>
            </ul>
             <p className="mt-4 text-left max-w-prose mx-auto">In 2025, Aniruddh also completed his first tour of the US and Canada, receiving great appreciation and response.</p>
          </div>
          
          <div className="my-12">
            <h3 className="text-2xl md:text-3xl font-headline font-semibold text-foreground mb-6 text-center">Notable Performances</h3>
            <ul className="list-disc pl-5 space-y-3 text-left max-w-prose mx-auto">
                <li>CentreStage Festival (December 2023) – Sundar Nursery, New Delhi (featured among 5 promising artists of India)</li>
                <li>Sawai Gandharav Festival – Kundgol, alongside established artists</li>
                <li>IIT Chennai Cultural Outreach – Encouraging young talent across India</li>
                <li>Aarohi – A national platform promoting young talent</li>
                <li>Numerous jugalbandhis with Hindustani and Carnatic vocalists, as well as eminent flautists</li>
            </ul>
            <p className="mt-4 text-left max-w-prose mx-auto">In addition to classical music, Aniruddh has received training in rare art forms such as <strong>Rangageethes</strong> (theatre songs), <strong>Dasarapadas</strong>, <strong>Vachanas</strong>, and <strong>Tatvapadas</strong> – genres that are increasingly rare and endangered.</p>
          </div>

          <div className="my-12 text-center" style={{ textWrap: 'balance' } as React.CSSProperties}>
            <h3 className="text-2xl md:text-3xl font-headline font-semibold text-foreground mb-6">Academic Pursuits</h3>
            <p>Alongside his music, Aniruddh’s passion for applied sciences led him to pursue an <strong>Engineering degree</strong>, which he completed in 2020. He is currently completing his Masters in <strong>Data Science and Analytics</strong> at the <strong>University of Michigan, Ann Arbor</strong>.</p>
          </div>

          <div className="my-12 text-center" style={{ textWrap: 'balance' } as React.CSSProperties}>
            <h3 className="text-2xl md:text-3xl font-headline font-semibold text-foreground mb-6">A True Representation of Today’s Youth</h3>
            <p>With his multifaceted interests, formidable skills, and deep passion for both music and science, Aniruddh Aithal truly represents the spirit of the youth of India today – multitalented, confident, and articulate.</p>
          </div>
        </motion.div>

      </div>
    </FloatingSection>
  );
}
