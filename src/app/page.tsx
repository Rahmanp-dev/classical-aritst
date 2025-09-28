
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

// Deep merge utility that correctly prioritizes database content, especially for arrays.
function deepMerge(target: any, source: any): SiteContent {
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);

  // Start with a copy of the default content structure
  const output = { ...target };

  // Iterate over the database content (source)
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        // If the key doesn't exist in the target, or isn't an object, just take the source's object
        if (!(key in target) || !isObject(target[key])) {
          output[key] = source[key];
        } else {
          // Both are objects, recurse
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        // This is the crucial part: if the source has a value (primitive, or an array),
        // it should overwrite the target's default value. This ensures DB content is prioritized.
        output[key] = source[key];
      }
    }
  }
  
  // Final check to ensure no top-level keys from default are missing if they weren't in the DB
  for (const key in target) {
    if (!(key in output)) {
      output[key] = target[key];
    }
  }

  return output as SiteContent;
}


export default async function Home() {
  const dbContent = await getSiteContent();
  // The merge now correctly prioritizes DB content over defaults.
  const content = deepMerge(defaultContent, dbContent);


  return (
    <div className="flex flex-col min-h-dvh">
      <FloatingNav navLinks={content.navLinks} />
      <main className="flex-1">
        <HeroSection 
          heroImage={content.heroImage}
          artistName={content.artistName}
          artistTagline={content.artistTagline}
          heroCTAs={content.heroCTAs}
          infoCards={content.infoCards}
        />
        <AboutSection 
          artistImage={content.artistImage}
          artistName={content.artistName}
          artistBio={content.artistBio}
          stats={content.aboutStats}
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
        <ContactSection contactInfo={content.contact} />
      </main>
      <Footer 
        socialLinks={content.socialLinks}
        navLinks={content.navLinks}
        artistName={content.artistName}
      />
    </div>
  );
}
