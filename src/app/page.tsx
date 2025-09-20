
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TourSection } from "@/components/sections/tour-section";
import { MusicSection } from "@/components/sections/music-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getSiteContent } from "@/lib/actions";
import { defaultContent } from "@/lib/data";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <div className="flex flex-col min-h-dvh">
      <Header navLinks={content.navLinks || defaultContent.navLinks} artistName={content.artistName || defaultContent.artistName} />
      <main className="flex-1">
        <HeroSection 
          heroImage={content.heroImage || defaultContent.heroImage}
          artistName={content.artistName || defaultContent.artistName}
          artistTagline={content.artistTagline || defaultContent.artistTagline}
          heroCTAs={content.heroCTAs || defaultContent.heroCTAs}
          infoCards={content.infoCards || defaultContent.infoCards}
        />
        <TourSection tourDates={content.tourDates || defaultContent.tourDates} tourImage={content.tourImage || defaultContent.tourImage} />
        <MusicSection 
          musicLinks={content.musicLinks || defaultContent.musicLinks}
          featuredVideoUrl={content.featuredVideoUrl || defaultContent.featuredVideoUrl}
          startListeningUrl={content.startListeningUrl || defaultContent.startListeningUrl}
        />
        <GallerySection galleryItems={content.galleryItems || defaultContent.galleryItems} />
        <AboutSection 
          artistImage={content.artistImage || defaultContent.artistImage}
          artistName={content.artistName || defaultContent.artistName}
          artistBio={content.artistBio || defaultContent.artistBio}
          stats={content.aboutStats || defaultContent.aboutStats}
          pressKitUrl={content.pressKitUrl || defaultContent.pressKitUrl}
        />
        <ContactSection contactInfo={content.contact || defaultContent.contact} />
      </main>
      <Footer 
        socialLinks={content.socialLinks || defaultContent.socialLinks}
        navLinks={content.navLinks || defaultContent.navLinks}
        artistName={content.artistName || defaultContent.artistName}
      />
    </div>
  );
}

    