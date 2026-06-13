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
  const [revealStage, setRevealStage] = useState<'scanning' | 'dramaticText' | 'dashboard'>('scanning');
  const [results, setResults] = useState<ResultData | null>(null);

  const loadingMessages = [
    'Analyzing patterns...',
    'Identifying strengths...',
    'Finding limitations...',
    'Generating archetype...'
  ];

  // Load results from sessionStorage
  useEffect(() => {
    const cached = sessionStorage.getItem('the_league_results');
    if (!cached) {
      router.push('/');
      return;
    }
    setResults(JSON.parse(cached));
  }, [router]);

  // Loading sequence ticker
  useEffect(() => {
    if (!results) return;

    if (loadingStep < loadingMessages.length) {
      const timer = setTimeout(() => {
        setLoadingStep(loadingStep + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Step 2: Show dramatic text reveal
      setRevealStage('dramaticText');
    }
  }, [loadingStep, results]);

  // Dramatic text timer
  useEffect(() => {
    if (revealStage === 'dramaticText') {
      // Trigger first confetti burst
      triggerConfetti();
      
      const timer = setTimeout(() => {
        setRevealStage('dashboard');
        // Trigger second confetti burst on dashboard reveal
        setTimeout(triggerConfetti, 400);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [revealStage]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.5 },
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

  // Archetype human descriptions
  const archetypeDescriptions: Record<string, string> = {
    Builder: "You like taking action. You would rather start now than wait for the perfect moment. People admire your drive. But sometimes you try to do everything alone.",
    Warrior: "When you commit to something, you usually follow through. You know how to stay disciplined when others quit. But sometimes you become so focused that you forget the bigger picture.",
    Strategist: "You think before you act. You like understanding things deeply. That helps you avoid mistakes. But sometimes you spend too much time thinking and not enough time doing.",
    Connector: "You build relationships naturally. People trust you. You know how to bring people together. But sometimes you spend so much energy helping others that you forget your own goals."
  };

  // Color configurations for dramatic text
  const archColors: Record<string, string> = {
    Builder: 'text-purple-400 shadow-purple-950/40',
    Warrior: 'text-brand-gold shadow-yellow-950/40',
    Strategist: 'text-indigo-400 shadow-indigo-950/40',
    Connector: 'text-pink-400 shadow-pink-950/40'
  };

  const currentArchColorClass = archColors[results.archetype] || 'text-brand-purple';

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-5xl z-10 flex justify-center">
          <AnimatePresence mode="wait">
            
            {/* STAGE 1: SCANNING PROGRESS */}
            {revealStage === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-8 py-20 w-full"
              >
                {/* Scanner block */}
                <div className="relative w-64 h-64 border border-white/[0.08] bg-white/[0.01] rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                  <motion.div 
                    animate={{ y: [-110, 110, -110] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent blur-[1px] z-10"
                  />
                  <motion.div 
                    animate={{ y: [-110, 110, -110] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-10 bg-brand-purple/10 blur-[10px] z-5"
                  />

                  <Sparkles className="h-10 w-10 text-brand-purple animate-pulse" />
                </div>

                <div className="space-y-2 text-center w-full max-w-xs font-mono">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-brand-gold animate-pulse">
                    Evaluating life patterns
                  </h3>
                  <p className="text-sm font-semibold text-white/80 transition-all duration-300">
                    {loadingMessages[loadingStep] || 'Finalizing...'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: DRAMATIC TYPOGRAPHY OVERLAY */}
            {revealStage === 'dramaticText' && (
              <motion.div
                key="dramaticText"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col items-center justify-center text-center space-y-4 py-32"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-xs font-mono uppercase tracking-[0.3em] text-white/60"
                >
                  The assessment is complete...
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-widest font-mono"
                >
                  YOU ARE
                </motion.h2>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                  className={`text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider ${currentArchColorClass} filter drop-shadow-[0_0_35px_rgba(124,58,237,0.3)]`}
                >
                  THE {results.archetype}
                </motion.h1>
              </motion.div>
            )}

            {/* STAGE 3: THE RESULTS DASHBOARD */}
            {revealStage === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full"
              >
                {/* Left side: Character Card */}
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
                    Hover card for shine • Click card to flip
                  </p>
                </div>

                {/* Right side: Detailed Analysis */}
                <div className="lg:col-span-7 space-y-7">
                  <div className="space-y-3.5 text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-full text-brand-gold">
                      <Award className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                        {results.league} League Member
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
                      The {results.archetype}
                    </h1>

                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      {archetypeDescriptions[results.archetype]}
                    </p>
                  </div>

                  {/* Strength & Limiter panels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1">
                      <div className="flex items-center space-x-2 text-brand-purple font-mono text-[10px] uppercase font-bold tracking-wider">
                        <Zap className="h-3.5 w-3.5" />
                        <span>Your Biggest Strength</span>
                      </div>
                      <h4 className="text-xs font-bold text-white pt-1.5 leading-relaxed">{results.strength}</h4>
                    </div>

                    <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1">
                      <div className="flex items-center space-x-2 text-red-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        <span>What's Holding You Back</span>
                      </div>
                      <h4 className="text-xs font-bold text-white pt-1.5 leading-relaxed">{results.limiter}</h4>
                    </div>
                  </div>

                  {/* Challenge panel */}
                  <div className="glass-card rounded-xl p-6 border border-brand-gold/20 bg-brand-gold/[0.01] space-y-2">
                    <div className="flex items-center space-x-2 text-brand-gold font-mono text-[10px] uppercase font-bold tracking-wider">
                      <Target className="h-4 w-4" />
                      <span>Your Next Challenge</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-normal pt-1">
                      {results.quest}
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed font-light">
                      Do this challenge this week to start working on what is holding you back.
                    </p>
                  </div>

                  {/* Tribe / Belonging Section */}
                  <div className="glass-card rounded-xl p-6 border border-white/[0.06] bg-white/[0.01] space-y-4">
                    <div className="flex items-center space-x-2.5 text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-xs font-mono uppercase tracking-widest font-bold">
                        Waitlist Spot Secured
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                        The First League Is Forming
                      </h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        People from different backgrounds are already joining:
                      </p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono text-white/40 list-disc pl-4 pt-1.5">
                        <li>Business</li>
                        <li>Fitness</li>
                        <li>Career</li>
                        <li>Self-improvement</li>
                      </ul>
                      <p className="text-xs text-white/50 pt-2 leading-relaxed">
                        We are forming founding cohorts. You will receive an email once we match you with a group.
                      </p>
                    </div>

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
