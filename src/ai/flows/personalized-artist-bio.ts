'use server';

/**
 * @fileOverview An AI agent that generates a personalized artist biography based on the visitor's location.
 *
 * - generatePersonalizedBio - A function that generates the personalized biography.
 * - PersonalizedBioInput - The input type for the generatePersonalizedBio function.
 * - PersonalizedBioOutput - The return type for the generatePersonalizedBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedBioInputSchema = z.object({
  artistName: z.string().describe('The name of the artist.'),
  artistBio: z.string().describe('The general biography of the artist.'),
  visitorLocation: z.string().describe('The location of the website visitor (e.g., city, region).'),
});
export type PersonalizedBioInput = z.infer<typeof PersonalizedBioInputSchema>;

const PersonalizedBioOutputSchema = z.object({
  personalizedBio: z.string().describe('The personalized artist biography.'),
});
export type PersonalizedBioOutput = z.infer<typeof PersonalizedBioOutputSchema>;

export async function generatePersonalizedBio(input: PersonalizedBioInput): Promise<PersonalizedBioOutput> {
  return personalizedBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBioPrompt',
  input: {schema: PersonalizedBioInputSchema},
  output: {schema: PersonalizedBioOutputSchema},
  prompt: `You are a seasoned music biographer, adept at connecting artists with their audiences on a personal level.

  Given the following information about an artist and a website visitor, craft a biography that highlights the artist's relevance to the visitor's location. Mention any connections, influences, or experiences that would resonate with someone from that area.

  Artist Name: {{{artistName}}}
  Artist Bio: {{{artistBio}}}
  Visitor Location: {{{visitorLocation}}}

  Personalized Biography:`,
});

const personalizedBioFlow = ai.defineFlow(
  {
    name: 'personalizedBioFlow',
    inputSchema: PersonalizedBioInputSchema,
    outputSchema: PersonalizedBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
