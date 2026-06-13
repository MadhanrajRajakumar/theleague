import React from 'react';

interface ArchetypeArtProps {
  archetype: string;
  className?: string;
}

export default function ArchetypeArt({ archetype, className = 'w-full h-full' }: ArchetypeArtProps) {
  const normalizedArch = archetype.toLowerCase().trim();

  // Builder: Isometric construction grid, neon purple glow
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
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Tech Border */}
        <circle cx="200" cy="200" r="180" stroke="#7c3aed" strokeWidth="1" strokeDasharray="5 15" opacity="0.3" />
        <circle cx="200" cy="200" r="160" stroke="#7c3aed" strokeWidth="2" opacity="0.1" />

        {/* Isometric Grid Floor */}
        <g opacity="0.15">
          <path d="M 200,80 L 320,200 L 200,320 L 80,200 Z" stroke="#a78bfa" strokeWidth="1" />
          <path d="M 200,140 L 260,200 L 200,260 L 140,200 Z" stroke="#a78bfa" strokeWidth="1" />
          <line x1="200" y1="80" x2="200" y2="320" stroke="#a78bfa" strokeWidth="1" />
          <line x1="80" y1="200" x2="320" y2="200" stroke="#a78bfa" strokeWidth="1" />
        </g>

        {/* Tech lines */}
        <g stroke="url(#builder-grad)" strokeWidth="1.5" opacity="0.4">
          <path d="M 200,40 L 200,140" strokeDasharray="4 4" />
          <circle cx="200" cy="40" r="3" fill="#c084fc" />
          <path d="M 50,200 L 140,200" strokeDasharray="4 4" />
          <circle cx="50" cy="200" r="3" fill="#c084fc" />
          <path d="M 350,200 L 260,200" strokeDasharray="4 4" />
          <circle cx="350" cy="200" r="3" fill="#c084fc" />
        </g>

        {/* Isometric Prism (Builder Mindset) */}
        <g filter="url(#purple-glow)">
          {/* Top Face */}
          <path
            d="M 200,100 L 270,140 L 200,180 L 130,140 Z"
            fill="#a78bfa"
            fillOpacity="0.25"
            stroke="#c084fc"
            strokeWidth="2"
          />
          {/* Left Face */}
          <path
            d="M 130,140 L 200,180 L 200,270 L 130,230 Z"
            fill="#7c3aed"
            fillOpacity="0.3"
            stroke="#a78bfa"
            strokeWidth="2"
          />
          {/* Right Face */}
          <path
            d="M 200,180 L 270,140 L 270,230 L 200,270 Z"
            fill="#4c1d95"
            fillOpacity="0.45"
            stroke="#c084fc"
            strokeWidth="2"
          />
        </g>

        {/* Core light pillar */}
        <line x1="200" y1="180" x2="200" y2="100" stroke="#ffffff" strokeWidth="2.5" filter="url(#purple-glow)" />

        {/* Small floating structures */}
        <g filter="url(#purple-glow)">
          <path d="M 200,300 L 220,310 L 200,320 L 180,310 Z" fill="#c084fc" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
          <path d="M 270,90 L 290,100 L 270,110 L 250,100 Z" fill="#c084fc" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
          <path d="M 130,90 L 150,100 L 130,110 L 110,100 Z" fill="#c084fc" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
        </g>

        {/* Data points */}
        <circle cx="200" cy="140" r="4" fill="#ffffff" filter="url(#purple-glow)" />
        <circle cx="270" cy="140" r="2.5" fill="#c084fc" />
        <circle cx="130" cy="140" r="2.5" fill="#c084fc" />
        <circle cx="200" cy="270" r="3" fill="#ffffff" />
      </svg>
    );
  }

  // Warrior: Sharp glowing digital shield, gold accents
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
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Circular Reticle */}
        <circle cx="200" cy="200" r="175" stroke="#fbbf24" strokeWidth="1" strokeDasharray="12 12" opacity="0.2" />
        <path d="M 200,10 L 200,25" stroke="#fbbf24" strokeWidth="2" opacity="0.6" />
        <path d="M 200,375 L 200,390" stroke="#fbbf24" strokeWidth="2" opacity="0.6" />
        <path d="M 10,200 L 25,200" stroke="#fbbf24" strokeWidth="2" opacity="0.6" />
        <path d="M 375,200 L 390,200" stroke="#fbbf24" strokeWidth="2" opacity="0.6" />

        {/* Tech Grid Lines */}
        <g opacity="0.1" stroke="#fbbf24" strokeWidth="1">
          <line x1="100" y1="100" x2="300" y2="300" />
          <line x1="300" y1="100" x2="100" y2="300" />
          <circle cx="200" cy="200" r="120" />
        </g>

        {/* Glowing Geometric Warrior Shield */}
        <g filter="url(#gold-glow)">
          {/* Shield Base Outline */}
          <path
            d="M 200,70 
               C 270,70 300,90 310,160 
               C 310,240 260,300 200,340 
               C 140,300 90,240 90,160 
               C 100,90 130,70 200,70 Z"
            fill="#ca8a04"
            fillOpacity="0.15"
            stroke="url(#warrior-grad)"
            strokeWidth="3"
          />

          {/* Internal Blade / Chevron geometries */}
          <path
            d="M 200,100 L 275,155 L 255,170 L 200,130 L 145,170 L 125,155 Z"
            fill="#fbbf24"
            fillOpacity="0.25"
            stroke="#fef08a"
            strokeWidth="1.5"
          />
          <path
            d="M 200,150 L 270,210 L 200,260 L 130,210 Z"
            fill="#854d0e"
            fillOpacity="0.4"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          
          {/* Central Core Line */}
          <line x1="200" y1="70" x2="200" y2="340" stroke="#ffffff" strokeWidth="2.5" opacity="0.9" />
        </g>

        {/* Small floating particles */}
        <circle cx="150" cy="110" r="3" fill="#fef08a" filter="url(#gold-glow)" />
        <circle cx="250" cy="110" r="3" fill="#fef08a" filter="url(#gold-glow)" />
        <circle cx="110" cy="240" r="2.5" fill="#fbbf24" />
        <circle cx="290" cy="240" r="2.5" fill="#fbbf24" />
        <circle cx="200" cy="200" r="5" fill="#ffffff" filter="url(#gold-glow)" />
      </svg>
    );
  }

  // Strategist: Hexagonal blueprint coordinates, indigo/blue gradients
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
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Orbitals */}
        <circle cx="200" cy="200" r="170" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 9" opacity="0.3" />
        <circle cx="200" cy="200" r="140" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="160 40" opacity="0.4" />
        
        {/* Radar grids */}
        <g opacity="0.1" stroke="#818cf8" strokeWidth="1">
          <circle cx="200" cy="200" r="90" />
          <line x1="200" y1="20" x2="200" y2="380" />
          <line x1="20" y1="200" x2="380" y2="200" />
        </g>

        {/* Blueprint crystal maze */}
        <g filter="url(#indigo-glow)">
          {/* Main Hexagon */}
          <polygon
            points="200,80 304,140 304,260 200,320 96,260 96,140"
            fill="#312e81"
            fillOpacity="0.2"
            stroke="url(#strat-grad)"
            strokeWidth="2.5"
          />

          {/* Internal Inner Hexagon */}
          <polygon
            points="200,120 269,160 269,240 200,280 131,240 131,160"
            fill="#4f46e5"
            fillOpacity="0.25"
            stroke="#818cf8"
            strokeWidth="1.5"
          />

          {/* Center Sacred Geometry / Triangle intersection */}
          <polygon
            points="200,140 252,230 148,230"
            stroke="#ffffff"
            strokeWidth="2"
            fillOpacity="0.1"
          />

          {/* Axis connection points */}
          <line x1="200" y1="80" x2="200" y2="120" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="304" y1="140" x2="269" y2="160" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="304" y1="260" x2="269" y2="240" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="200" y1="320" x2="200" y2="280" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="96" y1="260" x2="131" y2="240" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="96" y1="140" x2="131" y2="160" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* Focal Core coordinates */}
        <circle cx="200" cy="200" r="4.5" fill="#ffffff" filter="url(#indigo-glow)" />
        <circle cx="200" cy="140" r="3" fill="#818cf8" />
        <circle cx="252" cy="230" r="3" fill="#818cf8" />
        <circle cx="148" cy="230" r="3" fill="#818cf8" />
      </svg>
    );
  }

  // Connector: Neural galaxy, violet constellation nodes
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
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Orbit Rings */}
      <ellipse cx="200" cy="200" rx="160" ry="110" stroke="#ec4899" strokeWidth="1" strokeDasharray="6 12" transform="rotate(-15 200 200)" opacity="0.25" />
      <ellipse cx="200" cy="200" rx="160" ry="110" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 8" transform="rotate(45 200 200)" opacity="0.2" />

      {/* Connection Links (Lines) */}
      <g stroke="url(#conn-grad)" strokeWidth="1.5" filter="url(#magenta-glow)" opacity="0.8">
        {/* Core Web */}
        <line x1="200" y1="120" x2="290" y2="170" />
        <line x1="290" y1="170" x2="260" y2="280" />
        <line x1="260" y1="280" x2="140" y2="280" />
        <line x1="140" y1="280" x2="110" y2="170" />
        <line x1="110" y1="170" x2="200" y2="120" />
        
        {/* Cross web links */}
        <line x1="200" y1="120" x2="200" y2="210" />
        <line x1="290" y1="170" x2="200" y2="210" />
        <line x1="260" y1="280" x2="200" y2="210" />
        <line x1="140" y1="280" x2="200" y2="210" />
        <line x1="110" y1="170" x2="200" y2="210" />

        {/* Outlier links */}
        <line x1="200" y1="120" x2="200" y2="50" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="290" y1="170" x2="350" y2="190" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="260" y1="280" x2="310" y2="340" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="140" y1="280" x2="90" y2="340" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="110" y1="170" x2="50" y2="190" strokeWidth="0.75" strokeDasharray="3 3" />
      </g>

      {/* Nodes (Circles) */}
      <g filter="url(#magenta-glow)">
        <circle cx="200" cy="210" r="14" fill="#ffffff" stroke="#ec4899" strokeWidth="3" />
        <circle cx="200" cy="120" r="9.5" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
        <circle cx="290" cy="170" r="9.5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
        <circle cx="260" cy="280" r="9.5" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
        <circle cx="140" cy="280" r="9.5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
        <circle cx="110" cy="170" r="9.5" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
      </g>

      {/* Outlier Nodes */}
      <circle cx="200" cy="50" r="4" fill="#f472b6" />
      <circle cx="350" cy="190" r="4.5" fill="#a855f7" filter="url(#magenta-glow)" />
      <circle cx="310" cy="340" r="4.5" fill="#f472b6" />
      <circle cx="90" cy="340" r="4.5" fill="#a855f7" />
      <circle cx="50" cy="190" r="4" fill="#ec4899" filter="url(#magenta-glow)" />
    </svg>
  );
}
