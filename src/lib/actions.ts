
'use server';

import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { defaultContent } from '@/lib/data';

const imageSchema = z.object({
  imageUrl: z.string().url(),
  imageHint: z.string().optional(),
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

  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
  }),
});


export type SiteContent = z.infer<typeof formSchema>;

const CONTENT_ID = "main_content";

// Correct deep merge utility that handles arrays properly
function deepMerge(target: any, source: any): SiteContent {
    const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);

    const output = { ...target };

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else if (Array.isArray(source[key])) {
                // If the source has an array, prefer it.
                output[key] = source[key];
            }
            else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output as SiteContent;
}


export async function getSiteContent(): Promise<SiteContent> {
  if (!process.env.MONGODB_URI) {
    console.warn("MongoDB not configured. Falling back to default content.");
    return defaultContent;
  }
  
  try {
    const client = await clientPromise;
    if (!client) {
      throw new Error("MongoDB client is not available.");
    }
    const db = client.db();
    const collection = db.collection('content');
    
    let dbContent = await collection.findOne({ _id: CONTENT_ID });

    if (!dbContent) {
      console.log("No content found in database. Inserting default content.");
      const docToInsert = { ...defaultContent, _id: CONTENT_ID };
      await collection.insertOne(docToInsert);
      const { _id, ...rest } = docToInsert;
       // Ensure the returned content conforms to the full structure
      return deepMerge(defaultContent, rest);
    }
    
    const { _id, ...restOfDbContent } = dbContent;

    // Merge DB content with defaults to ensure all keys are present
    const mergedContent = deepMerge(defaultContent, restOfDbContent);

    const parsed = formSchema.safeParse(mergedContent);

    if(parsed.success){
      return parsed.data;
    }

    console.warn("Database content is malformed. Returning merged default content. Error:", parsed.error.flatten());
    return mergedContent;

  } catch (error) {
    console.error('Failed to fetch site content:', error);
    return defaultContent;
  }
}

export async function saveSiteContent(values: SiteContent) {
  if (!process.env.MONGODB_URI) {
    const message = "Database is not configured. Cannot save content.";
    console.error(`saveSiteContent: ${message}`);
    return { success: false, message };
  }
  
  try {
    // 1. Validate the incoming data first.
    const validatedData = formSchema.parse(values);
    
    // 2. Ensure connection to the database.
    const client = await clientPromise;
    if (!client) {
        throw new Error("MongoDB client could not be established.");
    }
    const db = client.db();
    const collection = db.collection('content');
    
    // 3. Perform the update operation with the validated data.
    const result = await collection.updateOne(
      { _id: CONTENT_ID },
      { $set: validatedData },
      { upsert: true }
    );
    
    // 4. Check if the update was successful.
    if (result.modifiedCount === 0 && result.upsertedCount === 0 && result.matchedCount === 0) {
        // This case can happen if the data is identical to what's in the DB.
        // It's not a failure, but nothing was changed.
        console.log("No changes to save to the database.");
         return { success: true, message: "No new changes to save." };
    }
    
    // 5. Revalidate paths to show the new content.
    revalidatePath('/');
    revalidatePath('/admin');
    
    return { success: true, message: "Content saved successfully!" };

  } catch (error) {
    console.error("Failed to save site content:", error);
    let errorMessage = "An unknown error occurred during save.";
    if (error instanceof z.ZodError) {
      // Make the Zod error message more readable
      errorMessage = "Validation failed: " + error.errors.map(e => `${e.path.join('.')} - ${e.message}`).join(', ');
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
