
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
    <div className="w-[328px] h-full overflow-hidden rounded-md">
        <blockquote
            className="instagram-media"
            data-instgrm-permalink={`${url.split('?')[0]}?utm_source=ig_embed&utm_campaign=loading`}
            data-instgrm-version="14"
            style={{
                margin: '1px !important', // Override default margin
                maxWidth: 'none',
                minWidth: '326px',
                width: 'calc(100% - 2px)',
                background: 'transparent',
            }}
        >
        </blockquote>
    </div>
  );
}
