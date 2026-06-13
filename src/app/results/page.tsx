'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Target, Zap, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import CharacterCard from '@/components/CharacterCard';
import { Scores } from '@/lib/types';
import { submitFeedback } from '@/lib/supabase';

interface ResultData {
  scores: Scores;
  archetype: string;
  league: string;
  strength: string;
  limiter: string;
  quest: string;
  name: string;
  brutalTruth?: string;
  killerSentence?: string;
  assessmentId?: string;
  feedbackSubmitted?: boolean;
}

const archetypeDetails = {
  builder: {
    killerSentence: "You don't need more effort. You need stronger allies.",
    brutalTruth: "Working harder is not your problem. Working with better people is."
  },
  warrior: {
    killerSentence: "You know how to suffer. You don't always know when to stop.",
    brutalTruth: "You are so focused on staying busy that you've stopped asking whether you're moving in the right direction."
  },
  architect: {
    killerSentence: "You know exactly what to do. That's why it's frustrating that you still haven't done it.",
    brutalTruth: "You don't have an information problem. You have an avoidance problem."
  },
  thinker: {
    killerSentence: "You know exactly what to do. That's why it's frustrating that you still haven't done it.",
    brutalTruth: "You don't have an information problem. You have an avoidance problem."
  },
  connector: {
    killerSentence: "You help everyone else move forward. Who's helping you?",
    brutalTruth: "Helping other people feels productive. That's why it's become your favorite distraction."
  }
};

const archetypeGoodBad = {
  builder: {
    goodNews: "You take action when most people hesitate.",
    badNews: "You often isolate yourself when things become difficult."
  },
  warrior: {
    goodNews: "You commit to your routines and show up even when you are exhausted.",
    badNews: "You put your head down and grind blindly, even when you are heading in the wrong direction."
  },
  architect: {
    goodNews: "You understand complex situations and avoid costly mistakes.",
    badNews: "You use research and planning as a way to avoid the fear of launching."
  },
  thinker: {
    goodNews: "You understand complex situations and avoid costly mistakes.",
    badNews: "You use research and planning as a way to avoid the fear of launching."
  },
  connector: {
    goodNews: "You bring people together and open doors that others can't.",
    badNews: "You collect relationships but neglect your own personal project."
  }
};

export default function ResultsPage() {
  const router = useRouter();
  const [loadingStep, setLoadingStep] = useState(0);
  const [revealStage, setRevealStage] = useState<'scanning' | 'dramaticText' | 'dashboard'>('scanning');
  const [results, setResults] = useState<ResultData | null>(null);
  
  // Feedback gate state
  const [feedbackChosen, setFeedbackChosen] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

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
    const data = JSON.parse(cached);
    setResults(data);
    if (data.feedbackSubmitted) {
      setFeedbackChosen(true);
    }
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
      setRevealStage('dramaticText');
    }
  }, [loadingStep, results]);

  // Dramatic text timer
  useEffect(() => {
    if (revealStage === 'dramaticText') {
      triggerConfetti();
      
      const timer = setTimeout(() => {
        setRevealStage('dashboard');
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

  const handleFeedbackSubmit = async (accuracy: string) => {
    if (!results || isSubmittingFeedback) return;
    setIsSubmittingFeedback(true);
    try {
      const assId = results.assessmentId || 'fallback-id';
      await submitFeedback(assId, accuracy);
      setFeedbackChosen(true);
      
      const updatedResults = { ...results, feedbackSubmitted: true };
      sessionStorage.setItem('the_league_results', JSON.stringify(updatedResults));
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    } finally {
      setIsSubmittingFeedback(false);
    }
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

  // Normalize archetype key
  let normArch = (results.archetype || 'builder').toLowerCase().trim();
  if (normArch === 'strategist' || normArch === 'thinker') {
    normArch = 'architect';
  }
  const displayArch = normArch === 'architect' ? 'Architect' : normArch.charAt(0).toUpperCase() + normArch.slice(1);

  // Color configurations for dramatic text
  const archColors: Record<string, string> = {
    builder: 'text-purple-400 shadow-purple-950/40',
    warrior: 'text-brand-gold shadow-yellow-950/40',
    architect: 'text-blue-400 shadow-blue-950/40',
    connector: 'text-pink-400 shadow-pink-950/40'
  };

  const currentArchColorClass = archColors[normArch] || 'text-brand-purple';
  const details = archetypeDetails[normArch as keyof typeof archetypeDetails] || archetypeDetails.builder;
  const goodBad = archetypeGoodBad[normArch as keyof typeof archetypeGoodBad] || archetypeGoodBad.builder;

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
                  THE {displayArch}
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
                    strength={results.strength}
                    limiter={results.limiter}
                    quest={results.quest}
                    isLocked={!feedbackChosen}
                  />

                  {/* Feedback Gate Box */}
                  <div className="w-full max-w-[340px] mt-6 glass-card rounded-xl p-5 border border-white/[0.06] text-center space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/80">
                      Was this analysis accurate?
                    </h4>
                    {feedbackChosen ? (
                      <div className="text-xs text-green-400 font-mono flex items-center justify-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Thanks for the feedback! Card unlocked.</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleFeedbackSubmit('Very Accurate')}
                            disabled={isSubmittingFeedback}
                            className="text-[10px] sm:text-xs px-3 py-2 border border-white/10 hover:border-brand-purple/40 hover:bg-brand-purple/[0.02] active:bg-brand-purple/[0.04] bg-white/[0.01] text-white/80 hover:text-white rounded-lg transition-all cursor-pointer font-mono flex-1 disabled:opacity-50"
                          >
                            Very Accurate
                          </button>
                          <button
                            onClick={() => handleFeedbackSubmit('Somewhat Accurate')}
                            disabled={isSubmittingFeedback}
                            className="text-[10px] sm:text-xs px-3 py-2 border border-white/10 hover:border-brand-purple/40 hover:bg-brand-purple/[0.02] active:bg-brand-purple/[0.04] bg-white/[0.01] text-white/80 hover:text-white rounded-lg transition-all cursor-pointer font-mono flex-1 disabled:opacity-50"
                          >
                            Somewhat
                          </button>
                        </div>
                        <button
                          onClick={() => handleFeedbackSubmit('Not Really')}
                          disabled={isSubmittingFeedback}
                          className="text-[10px] sm:text-xs px-3 py-2 border border-white/10 hover:border-brand-purple/40 hover:bg-brand-purple/[0.02] active:bg-brand-purple/[0.04] bg-white/[0.01] text-white/80 hover:text-white rounded-lg transition-all cursor-pointer font-mono w-full disabled:opacity-50"
                        >
                          Not Really
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Detailed Analysis */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-3.5 text-center lg:text-left">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 block uppercase">
                      Assessment Completed
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
                      The {displayArch}
                    </h1>
                  </div>

                  {/* One Killer Sentence - Centerpiece */}
                  <div className="glass-card rounded-xl p-6 border border-brand-purple/20 bg-brand-purple/[0.01] text-center lg:text-left">
                    <p className="text-base sm:text-lg font-extrabold text-white leading-relaxed italic">
                      "{results.killerSentence || details.killerSentence}"
                    </p>
                  </div>

                  {/* Good News & Bad News panels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1.5">
                      <div className="flex items-center space-x-2 text-brand-purple font-mono text-[10px] uppercase font-bold tracking-wider">
                        <Zap className="h-3.5 w-3.5" />
                        <span>The Good News</span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed pt-1">{goodBad.goodNews}</p>
                    </div>

                    <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1.5">
                      <div className="flex items-center space-x-2 text-red-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        <span>The Bad News</span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed pt-1">{goodBad.badNews}</p>
                    </div>
                  </div>

                  {/* Brutal Truth */}
                  <div className="glass-card rounded-xl p-5 border border-amber-500/20 bg-amber-500/[0.01] space-y-1.5">
                    <div className="flex items-center space-x-2 text-amber-500 font-mono text-[10px] uppercase font-bold tracking-wider">
                      <AlertTriangle className="h-4 w-4" />
                      <span>The Brutal Truth</span>
                    </div>
                    <p className="text-xs text-white/80 font-medium italic leading-relaxed pt-1">
                      {results.brutalTruth || details.brutalTruth}
                    </p>
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
                        The First Cohorts Are Forming
                      </h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Ambitious people from different fields are already joining:
                      </p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono text-white/40 list-disc pl-4 pt-1.5">
                        <li>Career growth</li>
                        <li>Fitness goals</li>
                        <li>Creative projects</li>
                        <li>Ambitious ventures</li>
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
