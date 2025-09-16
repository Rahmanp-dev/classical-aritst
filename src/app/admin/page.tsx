
"use client";

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_ADMIN_PASSWORD, galleryItems } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

const formSchema = z.object({
  artistName: z.string().min(1, 'Artist name is required.'),
  artistTagline: z.string().min(1, 'Artist tagline is required.'),
  artistBio: z.string().min(1, 'Artist bio is required.'),
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
      image: z.object({
          imageUrl: z.string().url("Must be a valid URL."),
          imageHint: z.string(),
      }),
  })),
});

type CloudinaryUploadResult = {
  info?: {
    secure_url: string;
  };
  event: string;
};

function AdminDashboard() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues would be fetched from a DB in a real app
    defaultValues: {
      artistName: "Acoustic Edge",
      artistTagline: "Classical Music Reimagined",
      artistBio: "Acoustic Edge is a musical pioneer, blending classical techniques with modern electronic soundscapes to create a truly unique auditory experience. With a background in classical cello and a passion for contemporary production, Acoustic Edge bridges centuries of music, captivating audiences worldwide.",
      tourDates: [
        { date: 'OCT 25, 2024', venue: 'The Grand Hall', city: 'Berlin', ticketUrl: '#' },
        { date: 'NOV 02, 2024', venue: 'Symphony House', city: 'London', ticketUrl: '#' },
        { date: 'NOV 15, 2024', venue: 'Le Trianon', city: 'Paris', ticketUrl: '#' },
        { date: 'DEC 01, 2024', venue: 'Carnegie Hall', city: 'New York', ticketUrl: '#' },
      ],
      musicLinks: [
        { platform: 'Spotify', url: '#', icon: 'spotify' },
        { platform: 'Apple Music', url: '#', icon: 'apple' },
        { platform: 'Youtube', url: '#', icon: 'youtube' },
        { platform: 'SoundCloud', url: '#', icon: 'soundcloud' },
      ],
      socialLinks: [
        { platform: 'Instagram', url: '#', icon: 'instagram' },
        { platform: 'Twitter', url: '#', icon: 'twitter' },
        { platform: 'Facebook', url: '#', icon: 'facebook' },
      ],
      navLinks: [
        { href: '#tour', label: 'Tour' },
        { href: '#music', label: 'Music' },
        { href: '#gallery', label: 'Gallery' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' },
      ],
      galleryItems: galleryItems,
    }
  });

  const { fields: tourDateFields, append: appendTourDate, remove: removeTourDate } = useFieldArray({ control: form.control, name: "tourDates" });
  const { fields: musicLinkFields, append: appendMusicLink, remove: removeMusicLink } = useFieldArray({ control: form.control, name: "musicLinks" });
  const { fields: socialLinkFields, append: appendSocialLink, remove: removeSocialLink } = useFieldArray({ control: form.control, name: "socialLinks" });
  const { fields: navLinkFields, append: appendNavLink, remove: removeNavLink } = useFieldArray({ control: form.control, name: "navLinks" });
  const { fields: galleryItemFields, append: appendGalleryItem, remove: removeGalleryItem, update: updateGalleryItem } = useFieldArray({ control: form.control, name: "galleryItems" });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Content Saved!",
      description: "Your website content has been updated.",
    });
  }
  
  const handleImageUpload = (result: CloudinaryUploadResult, index: number) => {
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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-headline mb-8">Admin Dashboard</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="general">
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="tour">Tour Dates</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="nav">Navigation</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6">
              <Card>
                <CardHeader><CardTitle>General Information</CardTitle></CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <FormField control={form.control} name="artistName" render={({ field }) => (
                    <FormItem><FormLabel>Artist Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="artistTagline" render={({ field }) => (
                    <FormItem><FormLabel>Artist Tagline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="artistBio" render={({ field }) => (
                    <FormItem><FormLabel>Artist Bio</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tour" className="mt-6">
              <Card>
                <CardHeader><CardTitle>Tour Dates</CardTitle></CardHeader>
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
            </TabsContent>

            <TabsContent value="links" className="mt-6 space-y-8">
               <Card>
                <CardHeader><CardTitle>Music Links</CardTitle></CardHeader>
                <CardContent className="space-y-4 pt-6">
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
                          <FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input {...field} placeholder="spotify" /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeMusicLink(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => appendMusicLink({ platform: '', url: 'https://', icon: '' })}>Add Music Link</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
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
                           <FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input {...field} placeholder="instagram" /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                       <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => appendSocialLink({ platform: '', url: 'https://', icon: '' })}>Add Social Link</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nav" className="mt-6">
              <Card>
                <CardHeader><CardTitle>Navigation Links</CardTitle></CardHeader>
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
            </TabsContent>

            <TabsContent value="images" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gallery Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {galleryItemFields.map((field, index) => (
                    <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-md">
                      <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-md overflow-hidden">
                          <Image src={field.image.imageUrl} alt={field.title} fill className="object-cover"/>
                      </div>
                      <div className="grid grid-cols-1 gap-4 flex-1">
                        <FormField
                          control={form.control}
                          name={`galleryItems.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`galleryItems.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className='flex gap-2'>
                           <CldUploadWidget
                                signatureEndpoint="/api/sign-cloudinary-params"
                                onUpload={(result) => handleImageUpload(result as CloudinaryUploadResult, index)}
                            >
                                {({ open }) => (
                                    <Button type="button" variant="outline" onClick={() => open()}>
                                        <Upload className="mr-2 h-4 w-4" /> Change Image
                                    </Button>
                                )}
                            </CldUploadWidget>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeGalleryItem(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendGalleryItem({
                        id: `gallery-${Date.now()}`,
                        title: 'New Image',
                        description: 'A new description',
                        image: { imageUrl: 'https://picsum.photos/seed/new/600/400', imageHint: 'new image' },
                      })
                    }
                  >
                    Add Gallery Item
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button type="submit" size="lg">Save All Changes</Button>
        </form>
      </Form>
    </div>
  );
}


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
      defaultValues: { password: '' },
  });


  const handleLogin = (values: {password: string}) => {
    if (values.password === DUMMY_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({ title: 'Login Successful', description: 'Welcome to the admin dashboard.' });
    } else {
      form.setError('password', { type: 'manual', message: 'Incorrect password.' });
      toast({ variant: 'destructive', title: 'Login Failed', description: 'The password you entered is incorrect.' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
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

  return <AdminDashboard />;
}
