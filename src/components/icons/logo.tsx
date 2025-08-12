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
        <linearGradient id="tricolor-border" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop stopColor="#FF9933" />
          <stop offset="0.5" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#138808" />
        </linearGradient>
        <linearGradient id="ai-glow" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#8A2BE2" />
          <stop offset="1" stopColor="#4169E1" />
        </linearGradient>
        <radialGradient id="shield-body" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0a192f" stopOpacity="1" />
        </radialGradient>
        <filter id="outer-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
         <filter id="inner-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="0 1 1 1 1 1 1 1 1 1 1" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite operator="in" in2="SourceAlpha" result="shadow" />
          <feComposite operator="in" in2="SourceGraphic" result="inner-glow-and-shape" />
          <feColorMatrix
            in="shadow"
            result="color-shadow"
            type="matrix"
            values="0 0 0 0 0.54
                    0 0 0 0 0.17
                    0 0 0 0 0.89
                    0 0 0 1 0"
          />
          <feMerge>
            <feMergeNode in="color-shadow" />
            <feMergeNode in="inner-glow-and-shape" />
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#outer-glow)">
        <path
            d="M50 110C50 110 90 90 90 55V20L50 5L10 20V55C10 90 50 110 50 110Z"
            fill="url(#shield-body)"
            stroke="url(#tricolor-border)"
            strokeWidth="4"
        />
      </g>

      <g filter="url(#inner-glow)" opacity="0.8">
          <path d="M50 25V35" stroke="url(#ai-glow)" strokeWidth="2" strokeLinecap="round" />
          <path d="M50 75V85" stroke="url(#ai-glow)" strokeWidth="2" strokeLinecap="round" />
          
          <path d="M35 35L42 42" stroke="url(#ai-glow)" strokeWidth="2" strokeLinecap="round" />
          <path d="M65 35L58 42" stroke="url(#ai-glow)" strokeWidth="2" strokeLinecap="round" />
          
          <path d="M35 65L42 58" stroke="url(#ai-glow)" strokeWidth="2" strokeLinecap="round" />
          <path d="M65 65L58 58" stroke="url(#ai-glow)" strokeWidth="2" strokeLinecap="round" />

          <path d="M30 50H40" stroke="url(#ai-glow)" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 50H60" stroke="url(#ai-glow)" strokeWidth="2" strokeLinecap="round" />

          <circle cx="50" cy="50" r="10" stroke="url(#ai-glow)" strokeWidth="2"/>
          <circle cx="50" cy="50" r="4" fill="url(#ai-glow)"/>
      </g>
    </svg>
  );
}
