'use client';

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Download, Check, Eye, Trophy, ShieldAlert, Target, RefreshCw } from 'lucide-react';
import { Scores } from '@/lib/types';
import { logAnalyticsEvent } from '@/lib/supabase';

interface CharacterCardProps {
  name: string;
  archetype: string;
  league?: string;
  strength: string;
  limiter: string;
  quest: string;
  scores?: Scores;
  isLocked?: boolean;
  assessmentId?: string;
}

const archetypeDetails = {
  creator: {
    killerSentence: "You don't need another idea. You need people who won't let you quit this one.",
    whatPeopleNotice: "You move faster than everyone else.",
    strength: "You take action faster than most people.",
    limiter: "You try to solve everything alone.",
    brutalTruth: "Working harder is not your problem. Working with better people is.",
    quest: "Start one conversation you've been avoiding.",
    growthAdvice: "Focus on finding allies. Stop trying to do everything yourself.",
    themeColor: 'purple'
  },
  warrior: {
    killerSentence: "You don't need more discipline. You need people who tell you when you're fighting the wrong battle.",
    whatPeopleNotice: "You do what you say you'll do.",
    strength: "You show up and stay disciplined when others quit.",
    limiter: "You get so focused on the routine that you lose sight of where you are going.",
    brutalTruth: "You are so focused on staying busy that you've stopped asking whether you're moving in the right direction.",
    quest: "Take one full evening off this week.",
    growthAdvice: "Focus on recovery and direction. You don't always need to grind to make progress.",
    themeColor: 'yellow'
  },
  architect: {
    killerSentence: "You don't need more information. You need people who make action impossible to avoid.",
    whatPeopleNotice: "You see things others miss.",
    strength: "You rarely make reckless decisions.",
    limiter: "Using thinking as a substitute for action.",
    brutalTruth: "You don't have an information problem. You have an avoidance problem.",
    quest: "Finish something you've been avoiding.",
    growthAdvice: "Focus on execution. Stop using planning and research as a way to avoid launching.",
    themeColor: 'blue'
  },
  connector: {
    killerSentence: "You don't need more connections. You need people whose standards challenge your own.",
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
    border: 'border-brand-purple/20 hover:border-brand-purple/40',
    glow: 'shadow-sm',
    text: 'text-brand-purple',
    badge: 'bg-brand-purple/10 border-brand-purple/20 text-brand-purple',
    grad: 'from-white via-[#FAFAF8] to-purple-50/20',
    radarFill: 'rgba(95, 46, 234, 0.08)',
    radarStroke: '#5F2EEA'
  },
  warrior: {
    border: 'border-brand-gold/20 hover:border-brand-gold/40',
    glow: 'shadow-sm',
    text: 'text-brand-gold',
    badge: 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold',
    grad: 'from-white via-[#FAFAF8] to-yellow-50/10',
    radarFill: 'rgba(197, 168, 90, 0.08)',
    radarStroke: '#C5A85A'
  },
  architect: {
    border: 'border-blue-500/20 hover:border-blue-500/40',
    glow: 'shadow-sm',
    text: 'text-blue-600',
    badge: 'bg-blue-50 border-blue-200 text-blue-700',
    grad: 'from-white via-[#FAFAF8] to-blue-50/10',
    radarFill: 'rgba(59, 130, 246, 0.08)',
    radarStroke: '#3b82f6'
  },
  connector: {
    border: 'border-pink-500/20 hover:border-pink-500/40',
    glow: 'shadow-sm',
    text: 'text-pink-600',
    badge: 'bg-pink-50 border-pink-200 text-pink-700',
    grad: 'from-white via-[#FAFAF8] to-pink-50/10',
    radarFill: 'rgba(236, 72, 153, 0.08)',
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
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1.0].map((scale, idx) => (
        <polygon
          key={idx}
          points={getHexagonPoints(R * scale)}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
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
            stroke="rgba(0,0,0,0.06)"
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
            r="3.5"
            fill="#ffffff"
            stroke={theme.radarStroke}
            strokeWidth="2"
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
              fill="rgba(0,0,0,0.5)"
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
              fill="#111111"
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
  isLocked = false,
  assessmentId
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
  const displayArch = normArch === 'creator' ? 'Creator' : normArch === 'architect' ? 'Thinker' : normArch.charAt(0).toUpperCase() + normArch.slice(1);
  
  const currentTheme = themeColors[normArch as keyof typeof themeColors] || themeColors.creator;
  const details = archetypeDetails[normArch as keyof typeof archetypeDetails] || archetypeDetails.creator;
  
  // Image key mapping (architect uses thinker.png image; creator uses creator.png image)
  const imageKey = normArch === 'creator' ? 'creator' : normArch === 'architect' ? 'thinker' : normArch;

  // Safe display name fallback
  const displayName = name && name.trim() ? name.trim() : 'Anonymous';

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
      x: -yc * 8,
      y: xc * 8
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

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleDownload = async () => {
    if (!containerRef.current) return;
    setIsDownloading(true);

    const sId = typeof window !== 'undefined' ? localStorage.getItem('the_league_session_id') || 'unknown' : 'unknown';
    const assId = assessmentId || null;
    logAnalyticsEvent(sId, assId, 'download_card_clicked', { archetype: normArch });

    try {
      const wasFlipped = isFlipped;
      if (wasFlipped) {
        setIsFlipped(false);
        await new Promise(r => setTimeout(r, 400));
      }

      const cardEl = cardRef.current;
      const originalStyle = cardEl ? cardEl.style.cssText : '';
      if (cardEl) {
        cardEl.style.transform = 'none';
        cardEl.style.transition = 'none';
      }
      
      // Force layout recalculation and wait repaint frames
      if (cardEl) cardEl.offsetHeight;
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

      const canvas = await html2canvas(containerRef.current, {
        scale: 2,
        backgroundColor: '#FAFAF8',
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
      const safeName = displayName.toLowerCase().replace(/\s+/g, '-');
      link.download = `the-league-${safeName}-${normArch}-card.png`;
      link.href = image;
      link.click();

      logAnalyticsEvent(sId, assId, 'download_card_success', { archetype: normArch });
    } catch (err) {
      console.error('Failed to export character card image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const sId = typeof window !== 'undefined' ? localStorage.getItem('the_league_session_id') || 'unknown' : 'unknown';
    const assId = assessmentId || null;
    logAnalyticsEvent(sId, assId, 'share_card_clicked', { archetype: normArch });

    const shareText = `I just unlocked my ${displayArch.toUpperCase()} character card on The League!\n\n⚡ ${details.killerSentence}\n\nTake the assessment at: https://theleague.app`;

    // Try native file sharing with generated image first
    if (containerRef.current) {
      try {
        const wasFlipped = isFlipped;
        if (wasFlipped) {
          setIsFlipped(false);
          await new Promise(r => setTimeout(r, 400));
        }

        const cardEl = cardRef.current;
        const originalStyle = cardEl ? cardEl.style.cssText : '';
        if (cardEl) {
          cardEl.style.transform = 'none';
          cardEl.style.transition = 'none';
        }
        if (cardEl) cardEl.offsetHeight; // force reflow
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

        const canvas = await html2canvas(containerRef.current, {
          scale: 2,
          backgroundColor: '#FAFAF8',
          useCORS: true,
          logging: false,
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });

        if (cardEl) cardEl.style.cssText = originalStyle;
        if (wasFlipped) {
          setIsFlipped(true);
        }

        const imgDataUrl = canvas.toDataURL('image/png');
        const safeName = displayName.toLowerCase().replace(/\s+/g, '-');
        const file = dataURLtoFile(imgDataUrl, `the-league-${safeName}-${normArch}.png`);

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'THE LEAGUE | Character Card',
            text: shareText
          });
          logAnalyticsEvent(sId, assId, 'share_card_success', { archetype: normArch, method: 'image_file' });
          return;
        }
      } catch (err) {
        console.warn('Native card file share failed, falling back to text:', err);
      }
    }

    // Fallback 1: Native text share
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'THE LEAGUE | Character Diagnosis',
          text: shareText,
          url: 'https://theleague.app'
        });
        logAnalyticsEvent(sId, assId, 'share_card_success', { archetype: normArch, method: 'text_share' });
        return;
      } catch (err) {
        console.warn('Native text share failed, falling back to copy:', err);
      }
    }

    // Fallback 2: Clipboard copy
    await copyToClipboard(`${shareText}\n\nhttps://theleague.app`);
    logAnalyticsEvent(sId, assId, 'share_card_success', { archetype: normArch, method: 'clipboard_copy' });
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 3000);
        return;
      }
    } catch (err) {
      console.warn('navigator.clipboard failed, using fallback:', err);
    }

    // Old-school element fallback
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setIsShared(true);
        setTimeout(() => setIsShared(false), 3000);
      } else {
        console.error('execCommand copy failed');
      }
    } catch (err) {
      console.error('Clipboard fallback copy failed:', err);
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
                ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.01 : 1}, ${isHovered ? 1.01 : 1}, 1)`
                : 'rotateY(180deg)',
              transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className={`rounded-2xl transition-all duration-300 select-none bg-white border border-border-gray ${currentTheme.glow}`}
          >
            {/* FRONT OF CARD */}
            <div 
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                position: 'absolute',
                inset: 0,
                borderRadius: '1rem',
              }}
              className={`flex flex-col justify-between p-6 bg-gradient-to-b ${currentTheme.grad} z-10`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-foreground/40 block uppercase">
                    FOUNDING COHORT
                  </span>
                  <h3 className="text-xl font-semibold text-foreground tracking-tight truncate max-w-[190px]">
                    {displayName}
                  </h3>
                </div>
                <div className={`px-2.5 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider font-bold ${currentTheme.badge}`}>
                  {displayArch}
                </div>
              </div>

              {/* Character Portrait Mascot */}
              <div className="relative w-full h-[200px] mb-2 overflow-hidden rounded-xl border border-border-gray bg-[#FAFAF8] flex items-center justify-center p-3">
                <img 
                  src={`/images/${imageKey}.png`} 
                  alt={`${displayArch} Mascot`}
                  crossOrigin="anonymous"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* One Killer Sentence */}
              <div className="border-y border-border-gray py-2.5 my-1 text-center">
                <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug italic px-1">
                  "{details.killerSentence}"
                </p>
              </div>

              {/* Core Traits List */}
              <div className="space-y-3.5 text-left my-2">
                {/* What People Notice */}
                <div className="flex items-start space-x-2.5">
                  <Eye className={`h-3.5 w-3.5 mt-0.5 ${currentTheme.text} shrink-0`} />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/40 block">
                      What People Notice
                    </span>
                    <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
                      {details.whatPeopleNotice}
                    </p>
                  </div>
                </div>

                {/* Strength */}
                <div className="flex items-start space-x-2.5">
                  <Trophy className={`h-3.5 w-3.5 mt-0.5 ${currentTheme.text} shrink-0`} />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/40 block">
                      Biggest Strength
                    </span>
                    <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
                      {strength || details.strength}
                    </p>
                  </div>
                </div>

                {/* Limiter */}
                <div className="flex items-start space-x-2.5">
                  <ShieldAlert className="h-3.5 w-3.5 mt-0.5 text-red-500 shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-red-500/80 block">
                      What's Holding You Back
                    </span>
                    <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
                      {limiter || details.limiter}
                    </p>
                  </div>
                </div>

                {/* Next Challenge */}
                <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-xl p-2.5 flex items-start space-x-2.5 mt-1">
                  <Target className="h-3.5 w-3.5 mt-0.5 text-brand-purple shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-brand-purple block font-bold">
                      Next Challenge
                    </span>
                    <p className="text-xs text-foreground font-semibold leading-relaxed">
                      {quest || details.quest}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-[8px] font-mono text-foreground/30 border-t border-border-gray pt-2.5">
                <span>THELEAGUE.APP</span>
                <span className="uppercase tracking-widest">Flip Card</span>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div 
              data-html2canvas-ignore="true"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                position: 'absolute',
                inset: 0,
                transform: 'rotateY(180deg)',
                borderRadius: '1rem',
              }}
              className={`flex flex-col justify-between p-6 bg-gradient-to-b ${currentTheme.grad} z-20`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2 border-b border-border-gray pb-2">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-foreground/40 block uppercase">
                    ANALYSIS CARD
                  </span>
                  <h3 className="text-base font-semibold text-foreground tracking-wide uppercase">
                    {displayArch} INSIGHT
                  </h3>
                </div>
                <div className={`px-2 py-0.5 rounded text-[8px] font-mono border uppercase tracking-wider font-bold ${currentTheme.badge}`}>
                  Back
                </div>
              </div>

              {/* Why You Got This Result */}
              <div className="text-left space-y-1 my-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-brand-gold block font-bold">
                  Why you got this archetype
                </span>
                <p className="text-[11px] text-foreground/80 leading-relaxed font-normal">
                  {getWhyYouGotResult(normArch, cleanScores)}
                </p>
              </div>

              {/* SVG Radar Chart */}
              <div className="flex items-center justify-center my-1 bg-white/50 rounded-xl py-2 border border-border-gray">
                <RadarChart scores={cleanScores} theme={currentTheme} />
              </div>

              {/* Personalized Growth Advice */}
              <div className="border-t border-border-gray pt-2 text-left space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-brand-purple block font-bold">
                  Growth Advice
                </span>
                <p className="text-[11px] text-foreground font-semibold leading-relaxed italic">
                  "{details.growthAdvice}"
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-[8px] font-mono text-foreground/30 border-t border-border-gray pt-2.5">
                <span>THELEAGUE.APP</span>
                <span className="uppercase tracking-widest">Flip Card</span>
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
            className="flex items-center justify-center space-x-2 text-xs text-foreground/75 hover:text-foreground border border-border-gray bg-white hover:bg-gray-50 active:bg-gray-100 rounded-lg px-4 py-2.5 transition-all duration-200 cursor-pointer font-semibold"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Flip Card</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading || isLocked}
            className="flex items-center justify-center space-x-2 text-xs text-foreground/75 hover:text-foreground border border-border-gray bg-white hover:bg-gray-50 active:bg-gray-100 rounded-lg px-4 py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isDownloading ? 'Exporting...' : 'Download PNG'}</span>
          </button>

          <button
            onClick={handleShare}
            disabled={isLocked}
            className="flex items-center justify-center space-x-2 text-xs text-white rounded-lg bg-brand-purple hover:bg-purple-700 active:bg-purple-800 px-5 py-2.5 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold"
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
          <p className="text-[10px] text-amber-600 font-mono font-semibold">
            Rate the assessment accuracy below to unlock card download & share
          </p>
        )}
      </div>
    </div>
  );
}
