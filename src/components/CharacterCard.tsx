'use client';

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Download, RefreshCw, Check, Copy } from 'lucide-react';
import ArchetypeArt from './ArchetypeArt';
import { Scores } from '@/lib/types';

interface CharacterCardProps {
  name: string;
  archetype: string;
  league: string;
  strength: string;
  limiter: string;
  quest: string;
  scores?: Scores;
}

export default function CharacterCard({
  name,
  archetype,
  league,
  strength,
  limiter,
  quest,
  scores
}: CharacterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    
    // 3D rotation (max 15deg)
    setRotate({
      x: -yc * 16,
      y: xc * 16
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

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    setRotate({ x: 0, y: 0 });
  };

  const handleDownload = async () => {
    if (!containerRef.current) return;
    setIsDownloading(true);

    try {
      // Force card to face front or capture flat
      const wasFlipped = isFlipped;
      if (wasFlipped) {
        setIsFlipped(false);
        // Wait briefly for CSS flip transition
        await new Promise(r => setTimeout(r, 400));
      }

      // Temporarily clear inline 3D styles for clean screenshot
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

      // Restore style
      if (cardEl) cardEl.style.cssText = originalStyle;
      if (wasFlipped) {
        setIsFlipped(true);
      }

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `the-league-${name.toLowerCase().replace(/\s+/g, '-')}-${archetype.toLowerCase()}-card.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error('Failed to export character card image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const text = `I just unlocked the ${archetype.toUpperCase()} Archetype in the ${league} League on THE LEAGUE: Identity Engine!

🔥 Greatest Strength: ${strength}
⚠️ Biggest Limiter: ${limiter}
⚔️ Active Quest: ${quest}

Discover yours at: https://theleague.app
#TheLeague #IdentityEngine`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'THE LEAGUE | Identity Engine Card',
          text: text,
          url: 'https://theleague.app'
        });
      } catch (err) {
        console.warn('Native sharing cancelled or failed, falling back to clipboard copy:', err);
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

  // Border theme colors
  const themeColors = {
    builder: {
      border: 'border-purple-500/30 hover:border-purple-500/60',
      glow: 'shadow-[0_0_50px_rgba(124,58,237,0.15)]',
      text: 'text-purple-400',
      badge: 'bg-purple-950/80 border-purple-500/30 text-purple-300',
      grad: 'from-purple-950/40 via-charcoal-medium to-charcoal-dark'
    },
    warrior: {
      border: 'border-yellow-500/30 hover:border-yellow-500/60',
      glow: 'shadow-[0_0_50px_rgba(234,179,8,0.12)]',
      text: 'text-yellow-400',
      badge: 'bg-yellow-950/80 border-yellow-500/30 text-yellow-300',
      grad: 'from-yellow-950/30 via-charcoal-medium to-charcoal-dark'
    },
    strategist: {
      border: 'border-indigo-500/30 hover:border-indigo-500/60',
      glow: 'shadow-[0_0_50px_rgba(99,102,241,0.15)]',
      text: 'text-indigo-400',
      badge: 'bg-indigo-950/80 border-indigo-500/30 text-indigo-300',
      grad: 'from-indigo-950/40 via-charcoal-medium to-charcoal-dark'
    },
    connector: {
      border: 'border-pink-500/30 hover:border-pink-500/60',
      glow: 'shadow-[0_0_50px_rgba(236,72,153,0.15)]',
      text: 'text-pink-400',
      badge: 'bg-pink-950/80 border-pink-500/30 text-pink-300',
      grad: 'from-pink-950/30 via-charcoal-medium to-charcoal-dark'
    }
  };

  const normArch = archetype.toLowerCase() as keyof typeof themeColors;
  const currentTheme = themeColors[normArch] || themeColors.builder;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* 3D Perspective Card Container */}
      <div 
        ref={containerRef}
        className="p-4 bg-transparent rounded-2xl flex items-center justify-center"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={toggleFlip}
          style={{
            transform: !isFlipped 
              ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`
              : 'perspective(1000px) rotateY(180deg)',
            transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          className={`w-[320px] h-[480px] cursor-pointer relative rounded-2xl border transition-all duration-300 select-none overflow-hidden ${currentTheme.border} ${currentTheme.glow} ${isFlipped ? 'shadow-2xl' : ''}`}
        >
          {/* Card Shine Overlay (Holographic glare) */}
          {isHovered && !isFlipped && (
            <div 
              style={{
                background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(255,255,255,0.1) 0%, transparent 55%)`
              }}
              className="absolute inset-0 z-30 pointer-events-none"
            />
          )}

          {/* FRONT OF CARD */}
          <div 
            style={{ backfaceVisibility: 'hidden' }}
            className={`absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b ${currentTheme.grad} z-10`}
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 block uppercase">
                  FOUNDING MEMBER
                </span>
                <h3 className="text-xl font-bold text-white tracking-wide truncate max-w-[170px]">
                  {name}
                </h3>
              </div>
              <div className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider ${currentTheme.badge}`}>
                {league} League
              </div>
            </div>

            {/* SVG Archetype Artwork */}
            <div className="flex-1 my-3 flex items-center justify-center relative overflow-hidden bg-black/20 rounded-xl border border-white/[0.03]">
              <ArchetypeArt archetype={archetype} className="w-[180px] h-[180px]" />
              <div className="absolute bottom-2 text-center w-full">
                <span className={`text-[10px] uppercase font-mono tracking-[0.2em] font-semibold opacity-60 ${currentTheme.text}`}>
                  {archetype}
                </span>
              </div>
            </div>

            {/* Footer Stats Grid */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-white/[0.08] pt-3 text-white/50">
                <div className="flex justify-between pr-2 border-r border-white/[0.08]">
                  <span>DISC :</span>
                  <span className="text-white font-bold">{scores?.discipline ?? 50}</span>
                </div>
                <div className="flex justify-between pl-2">
                  <span>EXEC :</span>
                  <span className="text-white font-bold">{scores?.execution ?? 50}</span>
                </div>
                <div className="flex justify-between pr-2 border-r border-white/[0.08]">
                  <span>CONS :</span>
                  <span className="text-white font-bold">{scores?.consistency ?? 50}</span>
                </div>
                <div className="flex justify-between pl-2">
                  <span>FITN :</span>
                  <span className="text-white font-bold">{scores?.fitness ?? 50}</span>
                </div>
              </div>

              {/* URL Loop */}
              <div className="flex justify-between items-center text-[9px] font-mono text-white/30 pt-1">
                <span>THELEAGUE.APP</span>
                <span className="uppercase tracking-widest">v1.0 identity</span>
              </div>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div 
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
            className={`absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b ${currentTheme.grad} z-20`}
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-white/[0.06] pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 block uppercase">
                  LEAGUE PROFILE
                </span>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {archetype.toUpperCase()}
                </h3>
              </div>
              <div className="text-[9px] font-mono text-white/40 uppercase pt-1 text-right">
                ID: #{Math.floor(1000 + Math.random() * 9000)}
              </div>
            </div>

            {/* Back Details Content */}
            <div className="flex-1 my-4 flex flex-col justify-center space-y-4">
              {/* Strength */}
              <div className="space-y-1">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${currentTheme.text}`}>
                  Greatest Strength
                </span>
                <p className="text-sm font-semibold text-white">
                  {strength}
                </p>
                <p className="text-[10px] text-white/50 leading-relaxed">
                  Your primary lever of momentum. Lean into this to solve complex friction.
                </p>
              </div>

              {/* Limiter */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-red-400">
                  Biggest Limiter
                </span>
                <p className="text-sm font-semibold text-white">
                  {limiter}
                </p>
                <p className="text-[10px] text-white/50 leading-relaxed">
                  Your key systemic bottleneck. Unblocking this yields 10x growth.
                </p>
              </div>

              {/* Active Quest */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3 space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-brand-gold">
                  Active V1 Quest
                </span>
                <p className="text-xs font-semibold text-white leading-normal">
                  {quest}
                </p>
              </div>
            </div>

            {/* Back Footer */}
            <div className="border-t border-white/[0.08] pt-3 flex flex-col items-center space-y-2 text-center">
              <span className="text-[10px] font-mono text-white/40 tracking-wider">
                What is your archetype?
              </span>
              <span className="text-xs font-bold text-gradient-purple tracking-widest">
                THELEAGUE.APP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleFlip}
          className="flex items-center justify-center space-x-2 text-xs text-white/70 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.02] active:bg-white/[0.06] rounded-lg px-4 py-2.5 transition-all duration-200"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Flip Card</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center justify-center space-x-2 text-xs text-white/70 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.02] active:bg-white/[0.06] rounded-lg px-4 py-2.5 transition-all duration-200 disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" />
          <span>{isDownloading ? 'Exporting...' : 'Download PNG'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center space-x-2 text-xs text-white rounded-lg bg-brand-purple hover:bg-purple-600 active:bg-purple-700 px-5 py-2.5 transition-all duration-200 shadow-lg shadow-purple-950/20"
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
    </div>
  );
}
