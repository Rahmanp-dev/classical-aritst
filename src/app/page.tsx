

import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TourSection } from "@/components/sections/tour-section";
import { MusicSection } from "@/components/sections/music-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getSiteContent, type SiteContent } from "@/lib/actions";
import { defaultContent } from "@/lib/data";
import { FloatingNav } from "@/components/ui/floating-nav";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

// This function now correctly prioritizes database content for arrays,
// ensuring admin panel changes for playlists, gallery, etc., are always displayed.
function deepMerge(target: any, source: any): any {
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);

  let output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else if (Array.isArray(source[key]) && source[key].length > 0) {
        // --- THIS IS THE CRITICAL FIX ---
        // If the database (source) has a non-empty array, it completely
        // overwrites the default. This ensures your admin edits are not ignored.
        output[key] = source[key];
      } else if (source[key] !== undefined && source[key] !== null) { // Added null check
        // For primitives (strings, numbers, booleans), database value wins.
        output[key] = source[key];
      }
    });
  }

  // Ensure all keys from defaultContent are present if they were missing in the database
  for (const key in target) {
    if (!(key in output)) {
      output[key] = target[key];
    }
  }

  return output;
}


export default async function Home() {
  const dbContent = await getSiteContent();
  
  // The navLinks are now taken DIRECTLY from defaultContent, bypassing the merge.
  // This guarantees the navigation order is always correct as defined in the code.
  const navLinks = defaultContent.navLinks;

  // The rest of the content is merged, prioritizing your database edits.
  const content = deepMerge(defaultContent, dbContent);


  return (
    <div className="flex flex-col min-h-dvh">
      <FloatingNav navLinks={navLinks} />
      <main className="flex-1">
        <HeroSection 
          heroImage={content.heroImage}
          artistName={content.artistName}
          artistTagline={content.artistTagline}
          heroCTAs={content.heroCTAs}
        />
        <AboutSection 
          artistImage={content.artistImage}
          artistName={content.artistName}
        />
        {(content.featuredPlaylists && content.featuredPlaylists.length > 0) || (content.instagramReels && content.instagramReels.length > 0) ? (
          <MusicSection 
            musicLinks={content.musicLinks}
            startListeningUrl={content.startListeningUrl}
            featuredPlaylists={content.featuredPlaylists}
            instagramReels={content.instagramReels}
          />
        ) : null}
        <TourSection tourDates={content.tourDates} tourImage={content.tourImage} />
        <GallerySection galleryItems={content.galleryItems} />
        <TestimonialsSection testimonials={content.testimonials} />
        <ContactSection contactInfo={content.contact} />
      </main>
      <Footer 
        socialLinks={content.socialLinks}
        navLinks={navLinks}
        artistName={content.artistName}
      />
    </div>
  );
}
