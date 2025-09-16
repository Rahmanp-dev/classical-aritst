"use client";

import { useState, useEffect } from 'react';
import { generatePersonalizedBio } from '@/ai/flows/personalized-artist-bio';
import { artistName, artistBio } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export function DynamicBio() {
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBio = async () => {
      setIsLoading(true);
      try {
        // Mocking visitor location. In a real app, this could come from an IP lookup or browser geolocation.
        const visitorLocation = 'New York'; 
        
        const result = await generatePersonalizedBio({
          artistName: artistName,
          artistBio: artistBio,
          visitorLocation: visitorLocation,
        });
        setBio(result.personalizedBio);
      } catch (error) {
        console.error("Failed to generate personalized bio:", error);
        setBio(artistBio); // Fallback to the default bio
      } finally {
        setIsLoading(false);
      }
    };

    fetchBio();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    );
  }

  return <p>{bio}</p>;
}
