'use client';

import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Download, Check, Eye, Trophy, ShieldAlert, Target, RefreshCw } from 'lucide-react';
import { Scores } from '@/lib/types';

interface CharacterCardProps {
  name: string;
  archetype: string;
  league?: string;
  strength: string;
  limiter: string;
  quest: string;
  scores?: Scores;
  isLocked?: boolean;
}

const archetypeDetails = {
  creator: {
    killerSentence: "You don't need more effort. You need stronger allies.",
    whatPeopleNotice: "You move faster than everyone else.",
    strength: "You take action faster than most people.",
    limiter: "You try to solve everything alone.",
    brutalTruth: "Working harder is not your problem. Working with better people is.",
    quest: "Start one conversation you've been avoiding.",
    growthAdvice: "Focus on finding allies. Stop trying to do everything yourself.",
    themeColor: 'purple'
  },
  warrior: {
    killerSentence: "You know how to suffer. You don't always know when to stop.",
    whatPeopleNotice: "You do what you say you'll do.",
    strength: "You show up and stay disciplined when others quit.",
    limiter: "You get so focused on the routine that you lose sight of where you are going.",
    brutalTruth: "You are so focused on staying busy that you've stopped asking whether you're moving in the right direction.",
    quest: "Take one full evening off this week.",
    growthAdvice: "Focus on recovery and direction. You don't always need to grind to make progress.",
    themeColor: 'yellow'
  },
  architect: {
    killerSentence: "You know exactly what to do. That's why it's frustrating that you still haven't done it.",
    whatPeopleNotice: "You see things others miss.",
    strength: "You rarely make reckless decisions.",
    limiter: "Using thinking as a substitute for action.",
    brutalTruth: "You don't have an information problem. You have an avoidance problem.",
    quest: "Finish something you've been avoiding.",
    growthAdvice: "Focus on execution. Stop using planning and research as a way to avoid launching.",
    themeColor: 'blue'
  },
  connector: {
    killerSentence: "You help everyone else move forward. Who's helping you?",
    whatPeopleNotice: "People trust you quickly.",
    strength: "You build trust and connect people naturally.",
    limiter: "You spend so much energy on others that you forget your own goals.",
    brutalTruth: "Helping other people feels productive. That's why it's become your favorite distraction.",
    quest: "Keep one promise to yourself for seven days.",
    growthAdvice: "Focus on personal boundary settings. Keep promises to yourself before helping everyone else.",
    themeColor: 'pink'
  }
};

const themeColors = {
  creator: {
    border: 'border-purple-500/30 hover:border-purple-500/60',
    glow: 'shadow-[0_0_55px_rgba(124,58,237,0.15)]',
    text: 'text-purple-400',
    badge: 'bg-purple-950/80 border-purple-500/30 text-purple-300',
    grad: 'from-purple-950/40 via-charcoal-medium to-charcoal-dark',
    radarFill: 'rgba(168,85,247,0.15)',
    radarStroke: '#a855f7'
  },
  warrior: {
    border: 'border-yellow-500/30 hover:border-yellow-500/60',
    glow: 'shadow-[0_0_55px_rgba(234,179,8,0.12)]',
    text: 'text-yellow-400',
    badge: 'bg-yellow-950/80 border-yellow-500/30 text-yellow-300',
    grad: 'from-yellow-950/30 via-charcoal-medium to-charcoal-dark',
    radarFill: 'rgba(234,179,8,0.15)',
    radarStroke: '#eab308'
  },
  architect: {
    border: 'border-blue-500/30 hover:border-blue-500/60',
    glow: 'shadow-[0_0_55px_rgba(59,130,246,0.15)]',
    text: 'text-blue-400',
    badge: 'bg-blue-950/80 border-blue-500/30 text-blue-300',
    grad: 'from-blue-950/40 via-charcoal-medium to-charcoal-dark',
    radarFill: 'rgba(59,130,246,0.15)',
    radarStroke: '#3b82f6'
  },
  connector: {
    border: 'border-pink-500/30 hover:border-pink-500/60',
    glow: 'shadow-[0_0_55px_rgba(236,72,153,0.15)]',
    text: 'text-pink-400',
    badge: 'bg-pink-950/80 border-pink-500/30 text-pink-300',
    grad: 'from-pink-950/30 via-charcoal-medium to-charcoal-dark',
    radarFill: 'rgba(236,72,153,0.15)',
    radarStroke: '#ec4899'
  }
};

const getWhyYouGotResult = (arch: string, scores?: Scores) => {
  const s = scores || { discipline: 60, action: 75, courage: 65, relationships: 45, consistency: 70, fitness: 55 };
  const cleanArch = arch.toLowerCase().trim();
  
  if (cleanArch === 'creator' || cleanArch === 'builder') {
    const actionText = s.action >= 60 ? "consistently chose action over planning" : "focused heavily on immediate execution";
    const relText = s.relationships < 50 ? "scored lower on collaboration, preferring to solve problems alone" : "balanced action with team effort";
    return `You ${actionText}. You showed a strong willingness to start and push forward. You ${relText}. This pattern typically creates a Creator profile.`;
  } else if (cleanArch === 'warrior') {
    const discText = s.discipline >= 60 ? "consistently chose training and routine over comfort" : "maintained steady focus under pressure";
    const fitText = s.fitness >= 50 ? "showed high awareness of physical energy" : "pushed through fatigue";
    return `You ${discText}. You ${fitText} and kept promises to yourself day after day. This pattern of high discipline and daily training typically creates a Warrior profile.`;
  } else if (cleanArch === 'architect' || cleanArch === 'thinker') {
    const actionText = s.action < 50 ? "consistently chose research and analysis over immediate action" : "analyzed risks before taking steps";
    const selfText = s.courage >= 60 ? "showed high courage to plan long-term" : "focused heavily on detail-oriented planning";
    return `You ${actionText}. You ${selfText} and looked for patterns others missed. This pattern of high analysis and risk prevention typically creates an Architect profile.`;
  } else { // connector
    const relText = s.relationships >= 60 ? "consistently chose social connection and empathy over solo work" : "placed high value on trust and community";
    const actionText = s.action < 50 ? "spent less energy on your own personal projects" : "helped others move forward";
    return `You ${relText}. You showed a natural ability to build trust. However, you ${actionText} to support the group. This pattern typically creates a Connector profile.`;
  }
};

const RadarChart = ({ scores, theme }: { scores: Scores; theme: any }) => {
  const cx = 150;
  const cy = 100;
  const R = 60;

  const attributes = [
    { label: 'Discipline', value: scores.discipline ?? 50 },
    { label: 'Action', value: scores.action ?? 50 },
    { label: 'Consistency', value: scores.consistency ?? 50 },
    { label: 'Relationships', value: scores.relationships ?? 50 },
    { label: 'Courage', value: scores.courage ?? 50 },
    { label: 'Fitness', value: scores.fitness ?? 50 }
  ];

  const getHexagonPoints = (radius: number) => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * 60 - 90) * (Math.PI / 180);
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const userPoints = attributes.map((attr, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    const val = Math.max(0, Math.min(100, attr.value));
    const r = (val / 100) * R;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const labelPositions = [
    { x: cx, y: cy - R - 8, anchor: 'middle', baseline: 'auto' }, // top
    { x: cx + R + 6, y: cy - R / 2 + 2, anchor: 'start', baseline: 'middle' }, // top-right
    { x: cx + R + 6, y: cy + R / 2 + 4, anchor: 'start', baseline: 'middle' }, // bottom-right
    { x: cx, y: cy + R + 14, anchor: 'middle', baseline: 'hanging' }, // bottom
    { x: cx - R - 6, y: cy + R / 2 + 4, anchor: 'end', baseline: 'middle' }, // bottom-left
    { x: cx - R - 6, y: cy - R / 2 + 2, anchor: 'end', baseline: 'middle' }  // top-left
  ];

  return (
    <svg width="300" height="195" className="mx-auto select-none overflow-visible">
      <defs>
        <filter id="radar-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1.0].map((scale, idx) => (
        <polygon
          key={idx}
          points={getHexagonPoints(R * scale)}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const x2 = cx + R * Math.cos(angle);
        const y2 = cy + R * Math.sin(angle);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        );
      })}

      {/* User Area */}
      <polygon
        points={userPoints}
        fill={theme.radarFill}
        stroke={theme.radarStroke}
        strokeWidth="2"
        filter="url(#radar-glow)"
      />

      {/* Vertices */}
      {attributes.map((attr, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const val = Math.max(0, Math.min(100, attr.value));
        const r = (val / 100) * R;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="#ffffff"
            stroke={theme.radarStroke}
            strokeWidth="1.5"
          />
        );
      })}

      {/* Labels */}
      {attributes.map((attr, i) => {
        const pos = labelPositions[i];
        return (
          <g key={i}>
            <text
              x={pos.x}
              y={pos.y}
              fill="rgba(255,255,255,0.4)"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor={pos.anchor as any}
              alignmentBaseline={pos.baseline as any}
              className="uppercase tracking-wider"
            >
              {attr.label}
            </text>
            <text
              x={pos.x}
              y={pos.y + (i === 0 ? -11 : i === 3 ? 10 : 8)}
              fill="#ffffff"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor={pos.anchor as any}
            >
              {attr.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default function CharacterCard({
  name,
  archetype,
  strength,
  limiter,
  quest,
  scores,
  isLocked = false
}: CharacterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Normalize archetype name
  let normArch = (archetype || 'creator').toLowerCase().trim();
  if (normArch === 'builder' || normArch === 'creator') {
    normArch = 'creator';
  }
  if (normArch === 'strategist' || normArch === 'thinker') {
    normArch = 'architect';
  }
  const displayArch = normArch === 'creator' ? 'Creator' : normArch === 'architect' ? 'Architect' : normArch.charAt(0).toUpperCase() + normArch.slice(1);
  
  const currentTheme = themeColors[normArch as keyof typeof themeColors] || themeColors.creator;
  const details = archetypeDetails[normArch as keyof typeof archetypeDetails] || archetypeDetails.creator;
  
  // Image key mapping (architect uses thinker.png image; creator uses builder.png image)
  const imageKey = normArch === 'creator' ? 'builder' : normArch === 'architect' ? 'thinker' : normArch;

  // Fallback scores
  const cleanScores = scores || {
    discipline: 50,
    action: 50,
    courage: 50,
    relationships: 50,
    consistency: 50,
    fitness: 50,
    self_awareness: 50,
    ambition: 50
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    
    setRotate({
      x: -yc * 12,
      y: xc * 12
    });
    
    setCoords({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const toggleFlip = (e: React.MouseEvent) => {
    // Only toggle flip if they didn't click inside waitlist or share buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    
    setIsFlipped(!isFlipped);
    setRotate({ x: 0, y: 0 });
  };

  const handleDownload = async () => {
    if (!containerRef.current) return;
    setIsDownloading(true);

    try {
      const wasFlipped = isFlipped;
      if (wasFlipped) {
        setIsFlipped(false);
        await new Promise(r => setTimeout(r, 400));
      }

      const cardEl = cardRef.current;
      const originalStyle = cardEl ? cardEl.style.cssText : '';
      if (cardEl) cardEl.style.cssText = 'transform: none; transition: none;';

      const canvas = await html2canvas(containerRef.current, {
        scale: 2,
        backgroundColor: '#030303',
        useCORS: true,
        logging: false,
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });

      if (cardEl) cardEl.style.cssText = originalStyle;
      
      if (wasFlipped) {
        setIsFlipped(true);
      }

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `the-league-${name.toLowerCase().replace(/\s+/g, '-')}-${normArch}-card.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error('Failed to export character card image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const text = `I just unlocked my ${displayArch.toUpperCase()} character card on The League!
    
"Marcus Aurelius"
⚡ ${details.killerSentence}

💪 Biggest Strength: ${strength || details.strength}
⚠️ What's Holding Me Back: ${limiter || details.limiter}
🎯 Next Challenge: ${quest || details.quest}

Take the assessment at: https://theleague.app`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'THE LEAGUE | Character Diagnosis',
          text: text,
          url: 'https://theleague.app'
        });
      } catch (err) {
        console.warn('Native sharing failed, copying to clipboard:', err);
        await copyToClipboard(text);
      }
    } else {
      await copyToClipboard(text);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 3000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div 
        ref={containerRef}
        className="p-4 bg-transparent rounded-2xl flex items-center justify-center"
      >
        <div
          className="w-[340px] h-[580px]"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={toggleFlip}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: !isFlipped 
                ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`
                : 'rotateY(180deg)',
              transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            className={`rounded-2xl transition-all duration-300 select-none ${currentTheme.glow}`}
          >
            {/* FRONT OF CARD */}
            <div 
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                position: 'absolute',
                inset: 0,
                borderRadius: '1rem',
                borderWidth: '1px'
              }}
              className={`flex flex-col justify-between p-6 bg-gradient-to-b ${currentTheme.grad} ${currentTheme.border} z-10`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-white/40 block uppercase">
                    FOUNDING COHORT
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-wide truncate max-w-[190px]">
                    {name}
                  </h3>
                </div>
                <div className={`px-2.5 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider ${currentTheme.badge}`}>
                  {displayArch}
                </div>
              </div>

              {/* Panda Portrait */}
              <div className="relative w-full h-[220px] mb-2 overflow-hidden rounded-xl border border-white/[0.08] bg-black/40">
                <img 
                  src={`/images/${imageKey}.png`} 
                  alt={`${displayArch} Panda`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* One Killer Sentence */}
              <div className="border-y border-white/[0.08] py-2.5 my-1 text-center">
                <p className="text-xs sm:text-sm font-extrabold text-white leading-snug italic px-1">
                  "{details.killerSentence}"
                </p>
              </div>

              {/* Core Traits List */}
              <div className="space-y-3.5 text-left my-2">
                {/* What People Notice */}
                <div className="flex items-start space-x-2.5">
                  <Eye className={`h-3.5 w-3.5 mt-0.5 ${currentTheme.text} shrink-0`} />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block">
                      What People Notice
                    </span>
                    <p className="text-xs text-white/80 font-medium leading-relaxed">
                      {details.whatPeopleNotice}
                    </p>
                  </div>
                </div>

                {/* Strength */}
                <div className="flex items-start space-x-2.5">
                  <Trophy className={`h-3.5 w-3.5 mt-0.5 ${currentTheme.text} shrink-0`} />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block">
                      Biggest Strength
                    </span>
                    <p className="text-xs text-white/80 font-medium leading-relaxed">
                      {strength || details.strength}
                    </p>
                  </div>
                </div>

                {/* Limiter */}
                <div className="flex items-start space-x-2.5">
                  <ShieldAlert className="h-3.5 w-3.5 mt-0.5 text-red-400 shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-red-400/80 block">
                      What's Holding You Back
                    </span>
                    <p className="text-xs text-white/80 font-medium leading-relaxed">
                      {limiter || details.limiter}
                    </p>
                  </div>
                </div>

                {/* Next Challenge */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 flex items-start space-x-2.5 mt-1">
                  <Target className="h-3.5 w-3.5 mt-0.5 text-brand-gold shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-brand-gold block font-bold">
                      Next Challenge
                    </span>
                    <p className="text-xs text-white font-semibold leading-relaxed">
                      {quest || details.quest}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-[8px] font-mono text-white/30 border-t border-white/[0.04] pt-2.5">
                <span>THELEAGUE.APP</span>
                <span className="uppercase tracking-widest animate-pulse">Click Card to Flip</span>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div 
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                position: 'absolute',
                inset: 0,
                transform: 'rotateY(180deg)',
                borderRadius: '1rem',
                borderWidth: '1px'
              }}
              className={`flex flex-col justify-between p-6 bg-gradient-to-b ${currentTheme.grad} ${currentTheme.border} z-20`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2 border-b border-white/[0.06] pb-2">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-white/40 block uppercase">
                    ANALYSIS CARD
                  </span>
                  <h3 className="text-base font-bold text-white tracking-wide uppercase">
                    {displayArch} INSIGHT
                  </h3>
                </div>
                <div className={`px-2 py-0.5 rounded text-[8px] font-mono border uppercase tracking-wider ${currentTheme.badge}`}>
                  Back
                </div>
              </div>

              {/* Why You Got This Result */}
              <div className="text-left space-y-1 my-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-brand-gold block font-bold">
                  Why you got this archetype
                </span>
                <p className="text-[11px] text-white/80 leading-relaxed font-normal">
                  {getWhyYouGotResult(normArch, cleanScores)}
                </p>
              </div>

              {/* SVG Radar Chart */}
              <div className="flex items-center justify-center my-1">
                <RadarChart scores={cleanScores} theme={currentTheme} />
              </div>

              {/* Personalized Growth Advice */}
              <div className="border-t border-white/[0.06] pt-2 text-left space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-purple-400 block font-bold">
                  Growth Advice
                </span>
                <p className="text-[11px] text-white font-medium leading-relaxed italic">
                  "{details.growthAdvice}"
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-[8px] font-mono text-white/30 border-t border-white/[0.04] pt-2.5">
                <span>THELEAGUE.APP</span>
                <span className="uppercase tracking-widest animate-pulse">Click Card to Flip</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center justify-center space-x-2 text-xs text-white/70 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.02] active:bg-white/[0.06] rounded-lg px-4 py-2.5 transition-all duration-200 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Flip Card</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading || isLocked}
            className="flex items-center justify-center space-x-2 text-xs text-white/70 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.02] active:bg-white/[0.06] rounded-lg px-4 py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isDownloading ? 'Exporting...' : 'Download PNG'}</span>
          </button>

          <button
            onClick={handleShare}
            disabled={isLocked}
            className="flex items-center justify-center space-x-2 text-xs text-white rounded-lg bg-brand-purple hover:bg-purple-600 active:bg-purple-700 px-5 py-2.5 transition-all duration-200 shadow-lg shadow-purple-950/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isShared ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Card</span>
              </>
            )}
          </button>
        </div>
        {isLocked && (
          <p className="text-[10px] text-amber-500/80 font-mono animate-pulse">
            Rate the assessment accuracy below to unlock card download & share
          </p>
        )}
      </div>
    </div>
  );
}
