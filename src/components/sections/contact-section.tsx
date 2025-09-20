
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { FloatingCard, FloatingSection } from '@/components/ui/floating-card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactInfo = {
  email: string;
  phone: string;
  location: string;
}

type ContactSectionProps = {
  contactInfo: ContactInfo;
}

export function ContactSection({ contactInfo }: ContactSectionProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  const staticContactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: contactInfo.email,
      description: "For booking and general inquiries"
    },
    {
      icon: Phone,
      title: "Phone",
      value: contactInfo.phone,
      description: "Available Mon-Fri 9AM-6PM"
    },
    {
      icon: MapPin,
      title: "Location",
      value: contactInfo.location,
      description: "Available for worldwide performances"
    }
  ];

  return (
    <FloatingSection id="contact" background="gradient">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Ready to bring classical music reimagined to your event? Let's discuss your vision.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          <motion.h3 
            className="text-2xl font-bold font-headline mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contact Information
          </motion.h3>
          
          {staticContactInfo.map((info, index) => (
            <FloatingCard 
              key={info.title}
              variant="glass"
              size="md"
              delay={0.3 + index * 0.1}
              className="group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                  <p className="text-lg font-medium text-foreground/90 mb-1">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <FloatingCard variant="glass" size="lg">
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-headline mb-2">Send a Message</h3>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/90">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/90">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john.doe@example.com" 
                            className="bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Booking for a private event" 
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us more about your event, venue, and requirements..." 
                          className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="btn-glow w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </Form>
          </FloatingCard>
        </motion.div>
      </div>
    </FloatingSection>
  );
}
