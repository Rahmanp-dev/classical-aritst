
"use client";

import { useEffect } from 'react';
import { Card, CardContent } from './card';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instgrm: any;
  }
}

type InstagramEmbedProps = {
  url: string;
};

export function InstagramEmbed({ url }: InstagramEmbedProps) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);
  
  const postUrl = new URL(url);
  const pathParts = postUrl.pathname.split('/').filter(Boolean);
  const shortcode = pathParts[1];

  if (!shortcode) {
    return (
        <Card>
            <CardContent className="p-4 text-center text-destructive-foreground bg-destructive">
                Invalid Instagram URL provided.
            </CardContent>
        </Card>
    );
  }

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={`${url.split('?')[0]}?utm_source=ig_embed&utm_campaign=loading`}
      data-instgrm-version="14"
      style={{
        background: '#FFF',
        border: '0',
        borderRadius: '3px',
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
        margin: '1px',
        maxWidth: '540px',
        minWidth: '326px',
        padding: '0',
        width: 'calc(100% - 2px)',
      }}
    >
    </blockquote>
  );
}
