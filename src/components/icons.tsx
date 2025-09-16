import type { SVGProps } from 'react';

export function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18v-6l8-4v6l-8 4Z" />
      <path d="M12 6a9 9 0 1 1-9 9" />
    </svg>
  );
}

export function AppleMusicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 12a5 5 0 1 1-5-5" />
      <path d="M12 12a5 5 0 1 1 5-5" />
      <path d="M12 12a5 5 0 1 1-5 5" />
      <path d="M12 12a5 5 0 1 1 5 5" />
    </svg>
  );
}

export function SoundcloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 14.5A6.5 6.5 0 1 1 10.5 8H20v7.5" />
      <path d="M4 14.5v-3" />
      <path d="m7 14.5-1-3" />
    </svg>
  );
}

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12l-4-4Z" />
      <path d="M16 8s-2-2-4-4-4 4-4 4" />
      <path d="m21.17 11.17-3.98-3.98" />
      <path d="m14 2-2.12 2.12" />
    </svg>
  );
}
