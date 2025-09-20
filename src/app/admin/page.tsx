
"use client";

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { getSiteContent, saveSiteContent, type SiteContent } from '@/lib/actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Upload, Eye, LogOut } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// This is a placeholder for a real authentication system.
// In a production app, you would use a secure method for admin access.
export const DUMMY_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_DUMMY_ADMIN_PASSWORD || "password123";

const imageSchema = z.object({
  imageUrl: z.string().url("Must be a valid URL."),
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

type CloudinaryUploadResult = {
  info?: {
    secure_url: string;
  };
  event: string;
};

function AdminDashboard({ initialData, onLogout }: { initialData: SiteContent; onLogout: () => void; }) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { fields: musicLinkFields, append: appendMusicLink, remove: removeMusicLink } = useFieldArray({ control: form.control, name: "musicLinks" });
  const { fields: socialLinkFields, append: appendSocialLink, remove: removeSocialLink } = useFieldArray({ control: form.control, name: "socialLinks" });
  const { fields: navLinkFields, append: appendNavLink, remove: removeNavLink } = useFieldArray({ control: form.control, name: "navLinks" });
  const { fields: galleryItemFields, append: appendGalleryItem, remove: removeGalleryItem, update: updateGalleryItem } = useFieldArray({ control: form.control, name: "galleryItems" });
  const { fields: tourDateFields, append: appendTourDate, remove: removeTourDate } = useFieldArray({ control: form.control, name: "tourDates" });
  const { fields: infoCardFields } = useFieldArray({ control: form.control, name: "infoCards" });
  const { fields: aboutStatFields } = useFieldArray({ control: form.control, name: "aboutStats" });

  const isCloudinaryEnabled = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    const result = await saveSiteContent(values);
    setIsSaving(false);
    
    if (result.success) {
      toast({
        title: "Content Saved!",
        description: "Your website content has been successfully updated in the database.",
      });
    } else {
       toast({
        title: "Error Saving Content",
        description: result.message,
        variant: 'destructive'
      });
    }
  }
  
  const handleGalleryImageUpload = (result: CloudinaryUploadResult, index: number) => {
    if (result.event === 'success' && result.info) {
        const currentItem = form.getValues(`galleryItems.${index}`);
        updateGalleryItem(index, {
            ...currentItem,
            image: {
                ...currentItem.image,
                imageUrl: result.info.secure_url,
            }
        });
        toast({ title: 'Image Uploaded', description: 'The image has been successfully uploaded and updated.' });
    }
  };
  
  const handleSingleImageUpload = (result: CloudinaryUploadResult, fieldName: "heroImage" | "artistImage" | "tourImage") => {
    if (result.event === 'success' && result.info) {
        form.setValue(`${fieldName}.imageUrl`, result.info.secure_url);
        toast({ title: 'Image Uploaded', description: 'The image has been successfully uploaded and updated.' });
    }
  };
  
  const handlePressKitUpload = (result: CloudinaryUploadResult) => {
    if (result.event === 'success' && result.info) {
        form.setValue('pressKitUrl', result.info.secure_url);
        toast({ title: 'File Uploaded', description: 'The press kit has been successfully uploaded.' });
    }
  };

  const uploadWidgetOptions = {
    signatureEndpoint: "/api/sign-cloudinary-params",
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "next-cloudinary-unsigned"
  };

  return (
    <div className="bg-muted/30 min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
              <h1 className="text-2xl font-bold font-headline">Admin Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/" target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    View Site
                  </Link>
                </Button>
                <Button onClick={onLogout} variant="ghost">
                  <LogOut className="mr-2 h-4 w-4"/>
                   Logout
                </Button>
                <Button type="submit" size="lg" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save All Changes"}
                </Button>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-12">
            {!isCloudinaryEnabled && (
              <Alert className="mb-8">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Cloudinary is not fully configured</AlertTitle>
                <AlertDescription>
                  To enable image and file uploads, you must set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in your environment variables. 
                  For secure signed uploads, also add `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`. Without these, the system will attempt to use unsigned uploads.
                  <pre className="mt-2 rounded-md bg-muted p-2 text-sm">
                    <code>{`# Required for all uploads:\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"\nNEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_unsigned_preset"\n\n# Optional for secure signed uploads:\nCLOUDINARY_API_KEY="your_api_key"\nCLOUDINARY_API_SECRET="your_api_secret"`}</code>
                  </pre>
                  You can get these from your <a href="https://cloudinary.com/users/register/free" target="_blank" rel="noopener noreferrer" className="underline">Cloudinary dashboard</a>.
                </AlertDescription>
              </Alert>
            )}
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="flex flex-wrap h-auto">
                <TabsTrigger value="general">General & Hero</TabsTrigger>
                <TabsTrigger value="links">Info & Links</TabsTrigger>
                <TabsTrigger value="about">About Section</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="tour">Tour</TabsTrigger>
                <TabsTrigger value="nav">Navigation & Footer</TabsTrigger>
              </TabsList>

              <div className="mt-6 space-y-8">
                <TabsContent value="general">
                  <Card>
                    <CardHeader><CardTitle>General Information</CardTitle><CardDescription>Manage the main artist details and biography.</CardDescription></CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <FormField control={form.control} name="artistName" render={({ field }) => (
                        <FormItem><FormLabel>Artist Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="artistTagline" render={({ field }) => (
                        <FormItem><FormLabel>Artist Tagline (shown on hero)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="artistBio" render={({ field }) => (
                        <FormItem><FormLabel>Artist Bio (shown on about section)</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </CardContent>
                  </Card>
                  <Card className="mt-8">
                    <CardHeader><CardTitle>Hero Section</CardTitle><CardDescription>Manage hero image and call-to-action button links.</CardDescription></CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-md">
                          <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-md overflow-hidden">
                              <Image src={form.watch('heroImage.imageUrl')} alt="Hero background" fill className="object-cover"/>
                          </div>
                          <div className="grid grid-cols-1 gap-4 flex-1">
                              <FormLabel>Hero Background Image</FormLabel>
                              <FormField control={form.control} name="heroImage.imageHint" render={({ field }) => (
                                  <FormItem><FormLabel className="text-sm font-normal">Image Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                              {isCloudinaryEnabled && <CldUploadWidget {...uploadWidgetOptions} onUpload={(r) => handleSingleImageUpload(r as CloudinaryUploadResult, "heroImage")}>
                                  {({ open }) => <Button type="button" variant="outline" onClick={() => open()}><Upload className="mr-2 h-4 w-4" /> Change Image</Button>}
                              </CldUploadWidget>}
                          </div>
                      </div>
                      <FormField control={form.control} name="heroCTAs.listenNow" render={({ field }) => (
                        <FormItem><FormLabel>Listen Now Button URL</FormLabel><FormControl><Input {...field} placeholder="https://" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="heroCTAs.upcomingShows" render={({ field }) => (
                        <FormItem><FormLabel>Upcoming Shows Button URL</FormLabel><FormControl><Input {...field} placeholder="https://" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="links">
                  <Card>
                    <CardHeader><CardTitle>Hero Info Cards</CardTitle><CardDescription>Manage the three small info cards in the hero section.</CardDescription></CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      {infoCardFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start p-4 border rounded-md">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                            <FormField control={form.control} name={`infoCards.${index}.label`} render={({ field }) => (
                              <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`infoCards.${index}.value`} render={({ field }) => (
                              <FormItem><FormLabel>Value</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`infoCards.${index}.icon`} render={({ field }) => (
                              <FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input {...field} placeholder="e.g., Headphones, Radio, Volume2" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                   <Card className="mt-8">
                    <CardHeader><CardTitle>Music Section Links</CardTitle><CardDescription>Manage links to streaming platforms and the featured video.</CardDescription></CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <FormField control={form.control} name="featuredVideoUrl" render={({ field }) => (
                        <FormItem><FormLabel>Featured YouTube Video URL</FormLabel><FormControl><Input {...field} placeholder="https://www.youtube.com/embed/..." /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="startListeningUrl" render={({ field }) => (
                        <FormItem><FormLabel>"Start Listening" Button URL</FormLabel><FormControl><Input {...field} placeholder="https://..." /></FormControl><FormMessage /></FormItem>
                      )} />
                      <h4 className="text-md font-semibold pt-4 border-t">Streaming Platforms</h4>
                      {musicLinkFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start p-4 border rounded-md">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                            <FormField control={form.control} name={`musicLinks.${index}.platform`} render={({ field }) => (
                              <FormItem><FormLabel>Platform</FormLabel><FormControl><Input {...field} placeholder="Spotify" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`musicLinks.${index}.url`} render={({ field }) => (
                              <FormItem><FormLabel>URL</FormLabel><FormControl><Input {...field} placeholder="https://spotify.com" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`musicLinks.${index}.icon`} render={({ field }) => (
                              <FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input {...field} placeholder="spotify, apple, youtube, soundcloud" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeMusicLink(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => appendMusicLink({ platform: '', url: 'https://', icon: '' })}>Add Music Link</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="about">
                   <Card>
                    <CardHeader><CardTitle>About Section</CardTitle><CardDescription>Manage the artist portrait, stats, and press kit.</CardDescription></CardHeader>
                    <CardContent className="space-y-6 pt-6">
                       <div className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-md">
                          <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-md overflow-hidden">
                              <Image src={form.watch('artistImage.imageUrl')} alt="Artist portrait" fill className="object-cover"/>
                          </div>
                          <div className="grid grid-cols-1 gap-4 flex-1">
                              <FormLabel>About Section Portrait</FormLabel>
                              <FormField control={form.control} name="artistImage.imageHint" render={({ field }) => (
                                  <FormItem><FormLabel className="text-sm font-normal">Image Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                              {isCloudinaryEnabled && <CldUploadWidget {...uploadWidgetOptions} onUpload={(r) => handleSingleImageUpload(r as CloudinaryUploadResult, "artistImage")}>
                                  {({ open }) => <Button type="button" variant="outline" onClick={() => open()}><Upload className="mr-2 h-4 w-4" /> Change Image</Button>}
                              </CldUploadWidget>}
                          </div>
                      </div>

                      <h4 className="text-md font-semibold pt-4 border-t">Artist Statistics</h4>
                      {aboutStatFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start p-4 border rounded-md">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                            <FormField control={form.control} name={`aboutStats.${index}.label`} render={({ field }) => (
                              <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`aboutStats.${index}.value`} render={({ field }) => (
                              <FormItem><FormLabel>Value</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`aboutStats.${index}.icon`} render={({ field }) => (
                              <FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input {...field} placeholder="e.g., Award, Globe, Music2" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                        </div>
                      ))}

                      <h4 className="text-md font-semibold pt-4 border-t">Press Kit</h4>
                      <FormField control={form.control} name="pressKitUrl" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Downloadable Press Kit URL</FormLabel>
                          <FormControl><Input {...field} placeholder="https://..." /></FormControl>
                          <FormMessage />
                          {isCloudinaryEnabled && <div className="pt-2"><CldUploadWidget {...uploadWidgetOptions} onUpload={(r) => handlePressKitUpload(r as CloudinaryUploadResult)}>
                              {({ open }) => <Button type="button" variant="outline" onClick={() => open()}><Upload className="mr-2 h-4 w-4" /> Upload File</Button>}
                          </CldUploadWidget></div>}
                        </FormItem>
                      )} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="gallery">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gallery Images</CardTitle>
                      <CardDescription>Manage the images in your "Past Highlights" section.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      {galleryItemFields.map((field, index) => (
                        <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-md">
                          <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-md overflow-hidden">
                              <Image src={field.image.imageUrl} alt={field.title} fill className="object-cover"/>
                          </div>
                          <div className="grid grid-cols-1 gap-4 flex-1">
                            <FormField control={form.control} name={`galleryItems.${index}.title`} render={({ field }) => (
                                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`galleryItems.${index}.description`} render={({ field }) => (
                                <FormItem><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`galleryItems.${index}.image.imageHint`} render={({ field }) => (
                                <FormItem><FormLabel>Image Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <div className='flex gap-2'>
                              {isCloudinaryEnabled && (
                                <CldUploadWidget {...uploadWidgetOptions} onUpload={(result) => handleGalleryImageUpload(result as CloudinaryUploadResult, index)} >
                                    {({ open }) => (<Button type="button" variant="outline" onClick={() => open()}><Upload className="mr-2 h-4 w-4" /> Change Image</Button>)}
                                </CldUploadWidget>
                              )}
                              <Button type="button" variant="ghost" size="icon" onClick={() => removeGalleryItem(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => appendGalleryItem({ id: `gallery-${Date.now()}`, title: 'New Image', description: 'A new description', image: { imageUrl: 'https://picsum.photos/seed/new/600/400', imageHint: 'new image' }})}>
                        Add Gallery Item
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tour">
                  <Card>
                    <CardHeader><CardTitle>Tour Dates</CardTitle><CardDescription>Add or remove upcoming tour dates.</CardDescription></CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      {tourDateFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start p-4 border rounded-md relative">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <FormField control={form.control} name={`tourDates.${index}.date`} render={({ field }) => (
                              <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} placeholder="OCT 25, 2024" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`tourDates.${index}.city`} render={({ field }) => (
                              <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} placeholder="Berlin" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`tourDates.${index}.venue`} render={({ field }) => (
                              <FormItem><FormLabel>Venue</FormLabel><FormControl><Input {...field} placeholder="The Grand Hall" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`tourDates.${index}.ticketUrl`} render={({ field }) => (
                              <FormItem><FormLabel>Ticket URL</FormLabel><FormControl><Input {...field} placeholder="https://example.com" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeTourDate(index)} className="shrink-0"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => appendTourDate({ date: '', venue: '', city: '', ticketUrl: 'https://' })}>Add Tour Date</Button>
                    </CardContent>
                  </Card>
                  <Card className="mt-8">
                      <CardHeader><CardTitle>Tour Section Image</CardTitle><CardDescription>Manage the image for the tour section map area.</CardDescription></CardHeader>
                      <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-md">
                              <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-md overflow-hidden">
                                  <Image src={form.watch('tourImage.imageUrl')} alt="Tour section image" fill className="object-cover"/>
                              </div>
                              <div className="grid grid-cols-1 gap-4 flex-1">
                                   <FormField control={form.control} name="tourImage.imageHint" render={({ field }) => (
                                      <FormItem><FormLabel className="text-sm font-normal">Image Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                  )} />
                                  {isCloudinaryEnabled && <CldUploadWidget {...uploadWidgetOptions} onUpload={(r) => handleSingleImageUpload(r as CloudinaryUploadResult, "tourImage")}>
                                      {({ open }) => <Button type="button" variant="outline" onClick={() => open()}><Upload className="mr-2 h-4 w-4" /> Change Image</Button>}
                                  </CldUploadWidget>}
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="nav">
                  <Card>
                    <CardHeader><CardTitle>Header Navigation</CardTitle><CardDescription>Manage the main site navigation links in the header.</CardDescription></CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      {navLinkFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start p-4 border rounded-md">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <FormField control={form.control} name={`navLinks.${index}.label`} render={({ field }) => (
                                <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} placeholder="Home" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`navLinks.${index}.href`} render={({ field }) => (
                                <FormItem><FormLabel>Href</FormLabel><FormControl><Input {...field} placeholder="#home" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeNavLink(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => appendNavLink({ label: '', href: '#' })}>Add Nav Link</Button>
                    </CardContent>
                  </Card>
                  <Card className="mt-8">
                    <CardHeader><CardTitle>Footer Social Links</CardTitle><CardDescription>Links to social media profiles shown in the footer.</CardDescription></CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      {socialLinkFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start p-4 border rounded-md">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                            <FormField control={form.control} name={`socialLinks.${index}.platform`} render={({ field }) => (
                              <FormItem><FormLabel>Platform</FormLabel><FormControl><Input {...field} placeholder="Instagram" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`socialLinks.${index}.url`} render={({ field }) => (
                              <FormItem><FormLabel>URL</FormLabel><FormControl><Input {...field} placeholder="https://instagram.com" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`socialLinks.${index}.icon`} render={({ field }) => (
                              <FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input {...field} placeholder="instagram, twitter, facebook" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => appendSocialLink({ platform: '', url: 'https://', icon: '' })}>Add Social Link</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

              </div>
            </Tabs>
          </main>
        </form>
      </Form>
    </div>
  );
}


function LoadingSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold font-headline mb-8">Admin Dashboard</h1>
            <div className="space-y-8">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    );
}

const AUTH_STORAGE_KEY = 'admin-authenticated';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [initialData, setInitialData] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { toast } = useToast();
  
  const form = useForm({
      resolver: zodResolver(z.object({ password: z.string() })),
      defaultValues: { password: '' },
  });
  
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
        console.warn("Could not read auth state from localStorage");
    }
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getSiteContent()
        .then(data => {
          setInitialData(data);
          setIsLoading(false);
        })
        .catch(err => {
            console.error(err);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load site content.' });
            setIsLoading(false);
        });
    }
  }, [isAuthenticated, toast]);

  const handleLogin = (values: {password: string}) => {
    if (values.password === DUMMY_ADMIN_PASSWORD) {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (error) {
        console.warn("Could not save auth state to localStorage");
      }
      setIsAuthenticated(true);
      toast({ title: 'Login Successful', description: 'Loading site content...' });
    } else {
      form.setError('password', { type: 'manual', message: 'Incorrect password.' });
      toast({ variant: 'destructive', title: 'Login Failed', description: 'The password you entered is incorrect.' });
    }
  };

  const handleLogout = () => {
    try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
        console.warn("Could not remove auth state from localStorage");
    }
    setIsAuthenticated(false);
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  };

  if (!authChecked) {
    return <LoadingSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>

                                <FormControl>
                                    <Input
                                        type="password"
                                        {...field}
                                        placeholder="Enter admin password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !initialData) {
    return <LoadingSkeleton />;
  }

  return <AdminDashboard initialData={initialData} onLogout={handleLogout} />;
}

    