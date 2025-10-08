

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

function deepMerge(dbContent: any, defaultContent: any): SiteContent {
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);

  // Start with a copy of the default content structure
  const output = { ...defaultContent };

  // Iterate over the database content (source)
  if (isObject(defaultContent) && isObject(dbContent)) {
    for (const key in dbContent) {
      if (Array.isArray(dbContent[key]) && dbContent[key].length > 0) {
        // This is the crucial part: if the DB has a non-empty array,
        // it should overwrite the default array.
        output[key] = dbContent[key];
      }
      else if (isObject(dbContent[key])) {
        // If the key doesn't exist in the target, or isn't an object, just take the source's object
        if (!(key in defaultContent) || !isObject(defaultContent[key])) {
          output[key] = dbContent[key];
        } else {
          // Both are objects, recurse
          output[key] = deepMerge(dbContent[key], defaultContent[key]);
        }
      } 
      else if (dbContent[key] !== undefined && dbContent[key] !== null) {
        // For primitives, if the source has a value, it overwrites the default.
        output[key] = dbContent[key];
      }
    }
  }
  
  // Final check to ensure no top-level keys from default are missing if they weren't in the DB
  for (const key in defaultContent) {
    if (!(key in output)) {
      output[key] = defaultContent[key];
    }
  }

  return output as SiteContent;
}


export default async function Home() {
  const dbContent = await getSiteContent();
  // The merge now correctly prioritizes DB content over defaults.
  const content = deepMerge(dbContent, defaultContent);


  return (
    <div className="flex flex-col min-h-dvh">
      <FloatingNav navLinks={defaultContent.navLinks} />
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
          artistBio={content.artistBio}
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
