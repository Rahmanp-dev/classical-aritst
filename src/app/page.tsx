
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

// Correct deep merge utility that handles arrays properly
function deepMerge(target: any, source: any): SiteContent {
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);

  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceValue = source[key];
      if (isObject(sourceValue)) {
        if (!(key in target) || !isObject(target[key])) {
          output[key] = sourceValue;
        } else {
          output[key] = deepMerge(target[key], sourceValue);
        }
      } else {
        // Overwrite target array or value with source value if it exists
        output[key] = sourceValue;
      }
    });
  }

  // Ensure all keys from defaultContent are present
  Object.keys(defaultContent).forEach(key => {
    const defaultKeyValue = (defaultContent as any)[key];
    if (!(key in output)) {
      output[key] = defaultKeyValue;
    } else if (isObject(defaultKeyValue) && !isObject(output[key])) {
      // If db has a non-object but default has an object, prefer default structure
      output[key] = defaultKeyValue;
    } else if (isObject(defaultKeyValue) && isObject(output[key])) {
      // If both are objects, merge them ensuring all default keys are present
      output[key] = deepMerge(defaultKeyValue, output[key]);
    } else if (Array.isArray(defaultKeyValue)) {
      // If default is an array, take it. This is the fix.
      output[key] = defaultKeyValue;
    }
  });

  return output as SiteContent;
}


export default async function Home() {
  const dbContent = await getSiteContent();
  // The merge now correctly prioritizes the defaultContent's array structure
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
