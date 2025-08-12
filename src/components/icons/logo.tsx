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
        <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FF9933" /> {/* Saffron */}
          <stop offset="50%" stopColor="#FFFFFF" /> {/* White */}
          <stop offset="100%" stopColor="#138808" /> {/* Green */}
        </linearGradient>
      </defs>
      <path
        d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"
        fill="#1E3A8A" /* Deep Blue */
        stroke="#FFFFFF"
        strokeWidth="0.5"
      />
      <path
        d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"
        stroke="url(#logo-gradient)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* AI Circuit Pattern */}
      <circle cx="12" cy="12" r="1.5" fill="white" opacity="0.8" />
      <path d="M12 10.5V9" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      <path d="M12 13.5V15" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      <path d="M14.1 11.2l1.1-1.1" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      <path d="M8.8 13.9l-1.1 1.1" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      <path d="M14.1 12.8l1.1 1.1" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      <path d="M8.8 10.1l-1.1-1.1" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}