
'use server';

import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { defaultContent } from '@/lib/data';

const imageSchema = z.object({
  imageUrl: z.string().url(),
  imageHint: z.string(),
});

const formSchema = z.object({
  artistName: z.string().min(1, 'Artist name is required.'),
  artistTagline: z.string().min(1, 'Artist tagline is required.'),
  artistBio: z.string().min(1, 'Artist bio is required.'),
  
  heroImage: imageSchema,
  
  heroCTAs: z.object({
    listenNow: z.string().url("Must be a valid URL."),
    upcomingShows: z.string().url("Must be a valid URL."),
  }),

  infoCards: z.array(z.object({
    label: z.string().min(1, "Label is required."),
    value: z.string().min(1, "Value is required."),
    icon: z.string().min(1, "Icon name is required."),
  })).length(3, "There must be exactly 3 info cards."),

  musicLinks: z.array(z.object({
    platform: z.string().min(1, 'Platform is required.'),
    url: z.string().url('Must be a valid URL.'),
    icon: z.string().min(1, 'Icon name is required.'),
  })),

  featuredVideoUrl: z.string().url("Must be a valid YouTube embed URL."),
  startListeningUrl: z.string().url("Must be a valid URL."),

  galleryItems: z.array(z.object({
      id: z.string(),
      title: z.string().min(1, "Title is required."),
      description: z.string().min(1, "Description is required."),
      image: imageSchema,
  })),

  artistImage: imageSchema,

  aboutStats: z.array(z.object({
    label: z.string().min(1, "Label is required."),
    value: z.string().min(1, "Value is required."),
    icon: z.string().min(1, "Icon name is required."),
  })).length(3, "There must be exactly 3 stats."),

  pressKitUrl: z.string().url("Must be a valid URL for the downloadable file."),
  
  socialLinks: z.array(z.object({
    platform: z.string().min(1, 'Platform is required.'),
    url: z.string().url('Must be a valid URL.'),
    icon: z.string().min(1, 'Icon name is required.'),
  })),

  navLinks: z.array(z.object({
    href: z.string().min(1, 'Href is required.'),
    label: z.string().min(1, 'Label is required.'),
  })),
  
  tourDates: z.array(z.object({
    date: z.string().min(1, 'Date is required.'),
    venue: z.string().min(1, 'Venue is required.'),
    city: z.string().min(1, 'City is required.'),
    ticketUrl: z.string().url('Must be a valid URL.'),
  })),
  tourImage: imageSchema,

});


export type SiteContent = z.infer<typeof formSchema>;

const CONTENT_ID = "main_content";

export async function getSiteContent(): Promise<SiteContent> {
  if (!clientPromise) {
    console.warn("MongoDB not connected. Falling back to default content.");
    return defaultContent;
  }
  
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<SiteContent & { _id: string }>('content');
    
    let content = await collection.findOne({ _id: CONTENT_ID });

    if (!content) {
      // If no content, insert default and return it
      const docToInsert = { ...defaultContent, _id: CONTENT_ID };
      await collection.insertOne(docToInsert);
      // remove the _id before returning
      const { _id, ...rest } = docToInsert;
      return rest;
    }

    // remove the _id before returning
    const { _id, ...rest } = content;
    return rest;

  } catch (error) {
    console.error('Failed to fetch site content:', error);
    // Fallback to default content on error
    return defaultContent;
  }
}

export async function saveSiteContent(values: SiteContent) {
  if (!clientPromise) {
    return { success: false, message: "Database is not configured. Cannot save content." };
  }
  
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('content');
    
    const validatedData = formSchema.parse(values);

    await collection.updateOne(
      { _id: CONTENT_ID },
      { $set: validatedData },
      { upsert: true }
    );
    
    revalidatePath('/');
    revalidatePath('/admin');
    
    return { success: true, message: "Content saved successfully!" };

  } catch (error) {
    console.error("Failed to save site content:", error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof z.ZodError) {
      errorMessage = "Validation failed: " + error.errors.map(e => e.message).join(', ');
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}

    