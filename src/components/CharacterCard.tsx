'use client';

import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Download, Check, Eye, Trophy, ShieldAlert, AlertTriangle, Target } from 'lucide-react';
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
  builder: {
    killerSentence: "You don't need more effort. You need stronger allies.",
    whatPeopleNotice: "You move faster than everyone else.",
    strength: "You take action faster than most people.",
    limiter: "You try to solve everything alone.",
    brutalTruth: "Working harder is not your problem. Working with better people is.",
    quest: "Start one conversation you've been avoiding.",
    themeColor: 'purple'
  },
  warrior: {
    killerSentence: "You know how to suffer. You don't always know when to stop.",
    whatPeopleNotice: "You do what you say you'll do.",
    strength: "You show up and stay disciplined when others quit.",
    limiter: "You get so focused on the routine that you lose sight of where you are going.",
    brutalTruth: "You are so focused on staying busy that you've stopped asking whether you're moving in the right direction.",
    quest: "Take one full evening off this week.",
    themeColor: 'yellow'
  },
  thinker: {
    killerSentence: "You know exactly what to do. That's why it's frustrating that you still haven't done it.",
    whatPeopleNotice: "You see things others miss.",
    strength: "You rarely make reckless decisions.",
    limiter: "Using thinking as a substitute for action.",
    brutalTruth: "You don't have an information problem. You have an avoidance problem.",
    quest: "Finish something you've been avoiding.",
    themeColor: 'indigo'
  },
  connector: {
    killerSentence: "You help everyone else move forward. Who's helping you?",
    whatPeopleNotice: "People trust you quickly.",
    strength: "You build trust and connect people naturally.",
    limiter: "You spend so much energy on others that you forget your own goals.",
    brutalTruth: "Helping other people feels productive. That's why it's become your favorite distraction.",
    quest: "Keep one promise to yourself for seven days.",
    themeColor: 'pink'
  }
};

const themeColors = {
  builder: {
    border: 'border-purple-500/30 hover:border-purple-500/60',
    glow: 'shadow-[0_0_55px_rgba(124,58,237,0.15)]',
    text: 'text-purple-400',
    badge: 'bg-purple-950/80 border-purple-500/30 text-purple-300',
    grad: 'from-purple-950/40 via-charcoal-medium to-charcoal-dark'
  },
  warrior: {
    border: 'border-yellow-500/30 hover:border-yellow-500/60',
    glow: 'shadow-[0_0_55px_rgba(234,179,8,0.12)]',
    text: 'text-yellow-400',
    badge: 'bg-yellow-950/80 border-yellow-500/30 text-yellow-300',
    grad: 'from-yellow-950/30 via-charcoal-medium to-charcoal-dark'
  },
  thinker: {
    border: 'border-indigo-500/30 hover:border-indigo-500/60',
    glow: 'shadow-[0_0_55px_rgba(99,102,241,0.15)]',
    text: 'text-indigo-400',
    badge: 'bg-indigo-950/80 border-indigo-500/30 text-indigo-300',
    grad: 'from-indigo-950/40 via-charcoal-medium to-charcoal-dark'
  },
  connector: {
    border: 'border-pink-500/30 hover:border-pink-500/60',
    glow: 'shadow-[0_0_55px_rgba(236,72,153,0.15)]',
    text: 'text-pink-400',
    badge: 'bg-pink-950/80 border-pink-500/30 text-pink-300',
    grad: 'from-pink-950/30 via-charcoal-medium to-charcoal-dark'
  }
};

export default function CharacterCard({
  name,
  archetype,
  strength,
  limiter,
  quest,
  isLocked = false
}: CharacterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Normalize archetype name
  let normArch = (archetype || 'builder').toLowerCase().trim();
  if (normArch === 'strategist') {
    normArch = 'thinker';
  }
  const displayArch = normArch.charAt(0).toUpperCase() + normArch.slice(1);
  const currentTheme = themeColors[normArch as keyof typeof themeColors] || themeColors.builder;
  const details = archetypeDetails[normArch as keyof typeof archetypeDetails] || archetypeDetails.builder;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
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

  const handleDownload = async () => {
    if (!containerRef.current) return;
    setIsDownloading(true);

    try {
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
🔥 Brutal Truth: ${details.brutalTruth}
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
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
            transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          className={`w-[340px] h-auto cursor-default relative rounded-2xl border transition-all duration-300 select-none overflow-hidden ${currentTheme.border} ${currentTheme.glow}`}
        >
          {isHovered && (
            <div 
              style={{
                background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(255,255,255,0.08) 0%, transparent 55%)`
              }}
              className="absolute inset-0 z-30 pointer-events-none"
            />
          )}

          <div className={`flex flex-col justify-between p-6 bg-gradient-to-b ${currentTheme.grad}`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
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

            {/* AI Portrait */}
            <div className="relative w-full h-[220px] mb-4 overflow-hidden rounded-xl border border-white/[0.08] bg-black/40">
              <img 
                src={`/images/${normArch}.png`} 
                alt={`${displayArch} Portrait`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* One Killer Sentence - Centerpiece */}
            <div className="border-y border-white/[0.08] py-3 my-2 text-center">
              <p className="text-sm sm:text-base font-extrabold text-white leading-snug italic px-1">
                "{details.killerSentence}"
              </p>
            </div>

            {/* Core Traits List */}
            <div className="space-y-4 text-left my-4">
              {/* What People Notice */}
              <div className="flex items-start space-x-3">
                <Eye className={`h-4 w-4 mt-0.5 ${currentTheme.text} shrink-0`} />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                    What People Notice
                  </span>
                  <p className="text-xs text-white/80 font-medium leading-relaxed">
                    {details.whatPeopleNotice}
                  </p>
                </div>
              </div>

              {/* Strength */}
              <div className="flex items-start space-x-3">
                <Trophy className={`h-4 w-4 mt-0.5 ${currentTheme.text} shrink-0`} />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                    Biggest Strength
                  </span>
                  <p className="text-xs text-white/80 font-medium leading-relaxed">
                    {strength || details.strength}
                  </p>
                </div>
              </div>

              {/* Limiter */}
              <div className="flex items-start space-x-3">
                <ShieldAlert className="h-4 w-4 mt-0.5 text-red-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-red-400/80 block">
                    What's Holding You Back
                  </span>
                  <p className="text-xs text-white/80 font-medium leading-relaxed">
                    {limiter || details.limiter}
                  </p>
                </div>
              </div>

              {/* Brutal Truth */}
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/80 block">
                    Brutal Truth
                  </span>
                  <p className="text-xs text-white/80 font-medium italic leading-relaxed">
                    {details.brutalTruth}
                  </p>
                </div>
              </div>

              {/* Next Challenge */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 flex items-start space-x-3 mt-2">
                <Target className="h-4 w-4 mt-0.5 text-brand-gold shrink-0" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold block font-bold">
                    Your Next Challenge
                  </span>
                  <p className="text-xs text-white font-semibold leading-relaxed">
                    {quest || details.quest}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-[9px] font-mono text-white/30 border-t border-white/[0.04] pt-3 mt-1">
              <span>THELEAGUE.APP</span>
              <span className="uppercase tracking-widest">v1.0 character</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-3">
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
