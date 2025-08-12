import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient
          id="gemini-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#8A2BE2" />
          <stop offset="50%" stopColor="#4169E1" />
          <stop offset="100%" stopColor="#00BFFF" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5L12 2z"
        stroke="url(#gemini-gradient)"
        strokeWidth="1.5"
        fill="rgba(138, 43, 226, 0.1)"
      />
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="url(#gemini-gradient)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        strokeDasharray="4 4"
        transform="rotate(45 12 12)"
      />
       <path
        d="M12 7V12L16 14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
       <path
        d="M9.5 9.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}
