import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 120"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="neon-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#00E5FF" /> {/* Neon Cyan */}
          <stop offset="1" stopColor="#007AFF" /> {/* Neon Blue */}
        </linearGradient>
        <radialGradient id="shield-inner-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
        </radialGradient>
        <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
          <feFlood floodColor="#00E5FF" floodOpacity="0.6" result="glowColor" />
          <feComposite in="glowColor" in2="offsetBlur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#logo-glow)">
        {/* Main Shield Outline */}
        <path
          d="M50 110C50 110 90 90 90 55V20L50 5L10 20V55C10 90 50 110 50 110Z"
          stroke="url(#neon-gradient)"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="rgba(0, 229, 255, 0.05)"
        />

        {/* Inner Shield Detail */}
        <path
          d="M50 95C50 95 78 80 78 55V28L50 17L22 28V55C22 80 50 95 50 95Z"
          stroke="url(#neon-gradient)"
          strokeWidth="1"
          strokeOpacity="0.5"
          fill="url(#shield-inner-glow)"
        />

        {/* AI/Cyber Symbol in Center */}
        <circle cx="50" cy="53" r="12" stroke="url(#neon-gradient)" strokeWidth="2" strokeDasharray="4 2" />
        <path d="M50 43V48" stroke="url(#neon-gradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 58V63" stroke="url(#neon-gradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 53H45" stroke="url(#neon-gradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M55 53H60" stroke="url(#neon-gradient)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="53" r="3" fill="url(#neon-gradient)" />
      </g>
    </svg>
  );
}
