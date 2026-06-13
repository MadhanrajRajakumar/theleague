import React from 'react';

interface ArchetypeArtProps {
  archetype: string;
  className?: string;
}

export default function ArchetypeArt({ archetype, className = 'w-full h-full' }: ArchetypeArtProps) {
  const normalizedArch = archetype.toLowerCase().trim();

  // 1. Builder: Silhouette of blacksmith with hammer, anvil, sparks, purple theme
  if (normalizedArch === 'builder') {
    return (
      <svg
        viewBox="0 0 400 400"
        className={`${className} transition-all duration-500`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="builder-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          <filter id="purple-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glowing aura */}
        <circle cx="200" cy="180" r="90" fill="#7c3aed" opacity="0.15" filter="url(#purple-glow)" />

        {/* Sparks */}
        <g filter="url(#purple-glow)">
          <circle cx="150" cy="120" r="2" fill="#c084fc" />
          <circle cx="170" cy="80" r="3" fill="#ffffff" />
          <circle cx="250" cy="110" r="2" fill="#c084fc" />
          <circle cx="230" cy="60" r="2.5" fill="#ffffff" />
          <circle cx="130" cy="160" r="1.5" fill="#7c3aed" />
          <circle cx="270" cy="150" r="2" fill="#c084fc" />
        </g>

        {/* Anvil Outline (Glowing background layer) */}
        <path
          d="M 120,270 L 280,270 L 270,230 C 240,230 230,220 230,200 L 170,200 C 170,220 160,230 130,230 Z"
          fill="#4c1d95"
          fillOpacity="0.4"
          stroke="#7c3aed"
          strokeWidth="1.5"
        />

        {/* Blacksmith / Creator Character Silhouette */}
        <g fill="#070708" stroke="#7c3aed" strokeWidth="2.5">
          {/* Shoulders / Body */}
          <path d="M 100,340 C 120,290 140,220 200,220 C 260,220 280,290 300,340 Z" />
          {/* Head & Goggles outline */}
          <circle cx="200" cy="155" r="35" />
          <path d="M 175,155 Q 200,165 225,155" strokeWidth="3" stroke="#c084fc" />
          {/* Raised Hammer arm (left from spectator's view) */}
          <path d="M 115,280 C 100,220 100,160 130,120 L 160,140 C 135,175 130,220 140,270 Z" />
        </g>

        {/* Glowing Hammer Head (glowing purple overlay) */}
        <g filter="url(#purple-glow)">
          {/* Hammer Handle */}
          <line x1="120" y1="130" x2="160" y2="90" stroke="#c084fc" strokeWidth="4.5" />
          {/* Hammer Head */}
          <rect x="145" y="70" width="30" height="20" rx="3" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" transform="rotate(45 160 80)" />
        </g>

        {/* Anvil glowing top plane */}
        <line x1="160" y1="200" x2="240" y2="200" stroke="#ffffff" strokeWidth="3" filter="url(#purple-glow)" />

      </svg>
    );
  }

  // 2. Warrior: Spartan/Knight silhouette, gold theme
  if (normalizedArch === 'warrior') {
    return (
      <svg
        viewBox="0 0 400 400"
        className={`${className} transition-all duration-500`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="warrior-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
          <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Back gold aura */}
        <circle cx="200" cy="180" r="90" fill="#eab308" opacity="0.15" filter="url(#gold-glow)" />

        {/* Spartan/Knight Silhouette */}
        <g fill="#070708" stroke="url(#warrior-grad)" strokeWidth="2.5">
          {/* Cape / Shoulders */}
          <path d="M 80,340 C 110,260 140,210 200,210 C 260,210 290,260 320,340 Z" />
          {/* Plate shoulders details */}
          <path d="M 100,280 Q 140,250 200,260" stroke="#eab308" strokeWidth="1.5" />
          <path d="M 300,280 Q 260,250 200,260" stroke="#eab308" strokeWidth="1.5" />
          {/* Spartan Helmet */}
          <path d="M 160,190 C 160,110 240,110 240,190 L 225,200 L 175,200 Z" />
          {/* Plume */}
          <path d="M 200,110 C 210,70 240,50 260,70 Q 220,70 200,110 Z" fill="#854d0e" stroke="#fbbf24" strokeWidth="1.5" />
        </g>

        {/* Visor - T-Shape visor glowing gold */}
        <g filter="url(#gold-glow)">
          <path
            d="M 185,150 L 215,150 M 200,150 L 200,195"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* Glowing Sword silhouette pointed down */}
        <g filter="url(#gold-glow)">
          {/* Blade */}
          <polygon points="196,220 204,220 202,330 198,330" fill="#ffffff" stroke="#fbbf24" strokeWidth="1.5" />
          {/* Crossguard */}
          <line x1="185" y1="235" x2="215" y2="235" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          {/* Pommel */}
          <circle cx="200" cy="213" r="3" fill="#ffffff" />
        </g>
      </svg>
    );
  }

  // 3. Strategist: General/Tactician silhouette looking at glowing blueprint table, indigo theme
  if (normalizedArch === 'strategist') {
    return (
      <svg
        viewBox="0 0 400 400"
        className={`${className} transition-all duration-500`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="strat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <filter id="indigo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Back indigo aura */}
        <circle cx="200" cy="180" r="90" fill="#4f46e5" opacity="0.15" filter="url(#indigo-glow)" />

        {/* Hexagonal glowing console/map on table */}
        <g filter="url(#indigo-glow)" opacity="0.4">
          <polygon points="120,290 280,290 310,340 90,340" fill="#312e81" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1.5" />
          <line x1="200" y1="290" x2="200" y2="340" stroke="#818cf8" strokeWidth="0.75" />
          <line x1="160" y1="305" x2="240" y2="305" stroke="#818cf8" strokeWidth="0.75" />
          <line x1="140" y1="320" x2="260" y2="320" stroke="#818cf8" strokeWidth="0.75" />
        </g>

        {/* Hooded Tactician / General Character Silhouette */}
        <g fill="#070708" stroke="url(#strat-grad)" strokeWidth="2.5">
          {/* Shoulders */}
          <path d="M 110,340 C 110,270 140,210 200,210 C 260,210 290,270 290,340 Z" />
          {/* Hood */}
          <path d="M 165,200 C 160,140 240,140 235,200 L 210,215 L 190,215 Z" />
          {/* Collar/Cape outlines */}
          <path d="M 150,260 Q 200,230 250,260" stroke="#818cf8" strokeWidth="1.5" />
        </g>

        {/* Holographic glowing details floating above table */}
        <g filter="url(#indigo-glow)">
          {/* Stylized geometric blueprint projection */}
          <circle cx="200" cy="265" r="12" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="200,250 212,272 188,272" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="200" cy="265" r="2" fill="#ffffff" />
        </g>
      </svg>
    );
  }

  // 4. Connector: Explorer/Diplomat silhouette with glowing network lines, violet/pink theme
  return (
    <svg
      viewBox="0 0 400 400"
      className={`${className} transition-all duration-500`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="conn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="magenta-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Back magenta aura */}
      <circle cx="200" cy="180" r="90" fill="#ec4899" opacity="0.15" filter="url(#magenta-glow)" />

      {/* Network background constellation */}
      <g stroke="#ec4899" strokeWidth="0.75" opacity="0.25">
        <line x1="80" y1="120" x2="140" y2="160" />
        <line x1="140" y1="160" x2="110" y2="240" />
        <line x1="320" y1="120" x2="260" y2="160" />
        <line x1="260" y1="160" x2="290" y2="240" />
        <circle cx="80" cy="120" r="2" fill="#ec4899" />
        <circle cx="320" cy="120" r="2" fill="#ec4899" />
      </g>

      {/* Diplomat/Explorer Silhouette */}
      <g fill="#070708" stroke="url(#conn-grad)" strokeWidth="2.5">
        {/* Pack / Shoulders */}
        <path d="M 90,340 C 110,270 140,210 200,210 C 260,210 290,270 310,340 Z" />
        {/* Head/Cowl profile */}
        <path d="M 170,205 C 165,150 235,150 230,205 L 210,220 L 190,220 Z" />
        {/* Left hand holding glowing compass/source */}
        <path d="M 285,300 C 290,260 260,230 240,240 L 255,270 Z" />
      </g>

      {/* Glowing Lantern/Compass nodes */}
      <g filter="url(#magenta-glow)">
        <circle cx="230" cy="245" r="9" fill="#ffffff" stroke="#ec4899" strokeWidth="2" />
        {/* Star radiating network threads */}
        <line x1="230" y1="245" x2="200" y2="210" stroke="#f472b6" strokeWidth="1.5" />
        <line x1="230" y1="245" x2="260" y2="280" stroke="#f472b6" strokeWidth="1.5" />
        <line x1="230" y1="245" x2="150" y2="250" stroke="#f472b6" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" />
        <line x1="230" y1="245" x2="310" y2="210" stroke="#f472b6" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" />
      </g>
    </svg>
  );
}
