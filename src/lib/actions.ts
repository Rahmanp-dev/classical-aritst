
'use server';

import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';

const imageSchema = z.object({
  imageUrl: z.string().url(),
  imageHint: z.string(),
});

const formSchema = z.object({
  artistName: z.string().min(1, 'Artist name is required.'),
  artistTagline: z.string().min(1, 'Artist tagline is required.'),
  artistBio: z.string().min(1, 'Artist bio is required.'),
  heroImage: imageSchema,
  artistImage: imageSchema,
  tourImage: imageSchema,
  tourDates: z.array(z.object({
    date: z.string().min(1, 'Date is required.'),
    venue: z.string().min(1, 'Venue is required.'),
    city: z.string().min(1, 'City is required.'),
    ticketUrl: z.string().url('Must be a valid URL.'),
  })),
  musicLinks: z.array(z.object({
    platform: z.string().min(1, 'Platform is required.'),
    url: z.string().url('Must be a valid URL.'),
    icon: z.string().min(1, 'Icon name is required.'),
  })),
  socialLinks: z.array(z.object({
    platform: z.string().min(1, 'Platform is required.'),
    url: z.string().url('Must be a valid URL.'),
    icon: z.string().min(1, 'Icon name is required.'),
  })),
  navLinks: z.array(z.object({
    href: z.string().min(1, 'Href is required.'),
    label: z.string().min(1, 'Label is required.'),
  })),
  galleryItems: z.array(z.object({
      id: z.string(),
      title: z.string().min(1, "Title is required."),
      description: z.string().min(1, "Description is required."),
      image: imageSchema,
  })),
});

export type SiteContent = z.infer<typeof formSchema>;

const CONTENT_ID = "main_content";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<SiteContent>('content');
    
    let content = await collection.findOne({ _id: CONTENT_ID });

    if (!content) {
      // If no content, insert default and return it
      const { defaultContent } = await import('@/lib/data');
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
    const { defaultContent } = await import('@/lib/data');
    return defaultContent;
  }
}

export async function saveSiteContent(values: SiteContent) {
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
