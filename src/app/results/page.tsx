'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Target, Zap, ShieldAlert, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import CharacterCard from '@/components/CharacterCard';
import { Scores } from '@/lib/types';

interface ResultData {
  scores: Scores;
  archetype: string;
  league: string;
  strength: string;
  limiter: string;
  quest: string;
  name: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [loadingStep, setLoadingStep] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [results, setResults] = useState<ResultData | null>(null);

  const loadingMessages = [
    'Analyzing decisions...',
    'Identifying behavioral patterns...',
    'Determining dominant archetype...',
    'Forging character card...'
  ];

  // Load results from sessionStorage
  useEffect(() => {
    const cached = sessionStorage.getItem('the_league_results');
    if (!cached) {
      // If no results, send back to home
      router.push('/');
      return;
    }
    setResults(JSON.parse(cached));
  }, [router]);

  // Loading ticker animation
  useEffect(() => {
    if (!results) return;

    if (loadingStep < loadingMessages.length) {
      const timer = setTimeout(() => {
        setLoadingStep(loadingStep + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsRevealed(true);
      // Trigger confetti explosion
      triggerConfetti();
    }
  }, [loadingStep, results]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#fbbf24', '#ffffff']
    });
  };

  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030303] text-white">
        <div className="animate-pulse font-mono text-xs uppercase tracking-widest text-white/40">
          Syncing profile...
        </div>
      </div>
    );
  }

  // Archetype text description mappings
  const archetypeDescriptions: Record<string, string> = {
    Builder: "You are a pure force of execution and momentum. You build, ship, and iterate rapidly, refusing to wait for permission or perfect circumstances. However, your relentless focus on creation can lead to severe isolation and a failure to build high-leverage relationships.",
    Warrior: "You possess exceptional self-control, consistency, and raw physical/mental discipline. You conquer your environment and routine daily. But your extreme focus on internal control can create tunnel vision, causing you to lose sight of the broader long-term roadmap.",
    Strategist: "You are a deep thinker, planner, and learner. You analyze architectural trade-offs, consume dense materials, and optimize workflows before starting. However, this depth often causes chronic over-analysis, preventing you from shipping products before they are perfect.",
    Connector: "You excel in relationships, influence, and networking. You naturally identify high-value peer alignments, deliver upfront value, and build leverage through alliances. Your biggest bottleneck is deep individual focus and maintaining a single-minded consistency over time."
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030303]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-5xl z-10">
          <AnimatePresence mode="wait">
            
            {/* 1. SCANNERS & LOADING SCREEN */}
            {!isRevealed ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-8 py-20"
              >
                {/* Tech scan box */}
                <div className="relative w-64 h-64 border border-white/[0.08] bg-white/[0.01] rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                  {/* Glowing scanner line */}
                  <motion.div 
                    animate={{ y: [-110, 110, -110] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent blur-[1px] z-10"
                  />
                  <motion.div 
                    animate={{ y: [-110, 110, -110] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-10 bg-brand-purple/10 blur-[10px] z-5"
                  />

                  <Sparkles className="h-10 w-10 text-brand-purple animate-pulse" />
                </div>

                <div className="space-y-2 text-center w-full max-w-xs">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-gold animate-pulse">
                    Evaluating Crucible Data
                  </h3>
                  <p className="text-sm font-semibold text-white/80 font-mono transition-all duration-300">
                    {loadingMessages[loadingStep] || 'Finalizing...'}
                  </p>
                </div>
              </motion.div>
            ) : (
              
              // 2. CHARACTER CARD REVEAL SCREEN
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Left side: The Holographic FUT Card */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center">
                  <CharacterCard
                    name={results.name}
                    archetype={results.archetype}
                    league={results.league}
                    strength={results.strength}
                    limiter={results.limiter}
                    quest={results.quest}
                    scores={results.scores}
                  />
                  <p className="text-[10px] font-mono text-white/30 mt-4 uppercase tracking-widest animate-pulse">
                    Hover card for holo shine • Click card to flip
                  </p>
                </div>

                {/* Right side: Archetype Breakdown and Waitlist Details */}
                <div className="lg:col-span-7 space-y-8">
                  {/* Archetype details */}
                  <div className="space-y-4 text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-full text-brand-gold">
                      <Award className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-black">
                        {results.league} League Member
                      </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
                      {results.archetype}
                    </h1>

                    <p className="text-sm text-white/60 leading-relaxed font-light">
                      {archetypeDescriptions[results.archetype]}
                    </p>
                  </div>

                  {/* Strength & Limiter panels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1">
                      <div className="flex items-center space-x-2 text-brand-purple font-mono text-[10px] uppercase font-bold tracking-wider">
                        <Zap className="h-3.5 w-3.5" />
                        <span>Greatest Strength</span>
                      </div>
                      <h4 className="text-base font-bold text-white pt-1">{results.strength}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Your dominant biological operating pattern. You do this instinctively.
                      </p>
                    </div>

                    <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1">
                      <div className="flex items-center space-x-2 text-red-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        <span>Biggest Limiter</span>
                      </div>
                      <h4 className="text-base font-bold text-white pt-1">{results.limiter}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Your primary bottleneck. Under heavy load, your system breaks here.
                      </p>
                    </div>
                  </div>

                  {/* Quest section */}
                  <div className="glass-card rounded-xl p-6 border border-brand-gold/20 bg-brand-gold/[0.01] space-y-2">
                    <div className="flex items-center space-x-2 text-brand-gold font-mono text-[10px] uppercase font-black tracking-wider">
                      <Target className="h-4 w-4" />
                      <span>Crucible V1 Active Quest</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-normal pt-1">
                      {results.quest}
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Complete this specific real-world quest within 30 days to systematically attack your primary limiter.
                    </p>
                  </div>

                  {/* Waitlist Status Box */}
                  <div className="glass-card rounded-xl p-6 border border-white/[0.06] bg-white/[0.01] space-y-4">
                    <div className="flex items-center space-x-2.5 text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-xs font-mono uppercase tracking-widest font-bold">
                        Waitlist Spot Secured
                      </span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      We have recorded your profile. The Founding League cohorts are currently forming. Ambitious members are grouped based on complementary strengths and limiters to solve isolation.
                    </p>
                    <div className="text-[10px] font-mono text-white/40 bg-black/40 border border-white/[0.04] rounded-lg px-3.5 py-2.5 flex justify-between items-center">
                      <span>Status: Awaiting Cohort Pairing</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
