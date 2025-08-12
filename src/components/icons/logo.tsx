import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 6v6" />
      <path d="M15 9l-3-3-3 3" />
      <path d="M12 12v3l3 1.5" />
      <path d="M9 13.5L12 15" />
      <path d="M12 18v-3" />
    </svg>
  );
}
