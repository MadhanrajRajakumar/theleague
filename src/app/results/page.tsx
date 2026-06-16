'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShieldAlert, Sparkles, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import CharacterCard from '@/components/CharacterCard';
import { Scores } from '@/lib/types';
import { submitFeedback, submitOpenFeedback, logAnalyticsEvent } from '@/lib/supabase';

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
  leagueReadiness?: string;
  readinessText?: string;
  assessmentId?: string;
  feedbackSubmitted?: boolean;
}

const archetypeRedesignData = {
  creator: {
    displayName: "Creator",
    colorClass: "text-brand-purple",
    payoffTagline: "Your problem isn't ideas. It's follow-through.",
    readinessStatus: "Strong Candidate",
    snapshot: {
      execution: "High",
      consistency: "Developing",
      strategicThinking: "High",
      peerChallenge: "Needed"
    },
    strength: [
      "You generate high-velocity starts when others hesitate.",
      "You find creative pathways around technical blockages.",
      "You move from concept to prototype in days, not months."
    ],
    blindSpot: [
      "You abandon projects as soon as the novelty wears off.",
      "You isolate yourself and build in a vacuum when stuck.",
      "You mistake starting new things for actual progress."
    ],
    whyThisRole: [
      "You consistently prioritize speed over structural systems.",
      "You reject traditional constraints and default to building.",
      "You thrive on momentum and suffer under static routines."
    ],
    reputation: [
      "People expect you to spark new initiatives.",
      "People trust your ability to solve complex, novel challenges.",
      "People worry you will lose focus before finishing the work."
    ],
    whyThisMatters: "You don't need more ideas. You need feedback loops and people who won't let you quit. Without that, you'll spend years starting projects you never launch.",
    readinessText: "Your application indicates high initial momentum. To proceed, we need to verify whether you have the accountability systems to sustain execution when things get hard."
  },
  warrior: {
    displayName: "Warrior",
    colorClass: "text-brand-gold",
    payoffTagline: "Your problem isn't discipline. It's direction.",
    readinessStatus: "Exceptional Fit",
    snapshot: {
      execution: "High",
      consistency: "High",
      strategicThinking: "Developing",
      peerChallenge: "Needed"
    },
    strength: [
      "You show up and grind consistently even when exhausted.",
      "You honor routines and execute daily commitments.",
      "You bring grit and physical determination to your goals."
    ],
    blindSpot: [
      "You keep marching blindly down the wrong path.",
      "You mistake raw activity and busyness for strategic progress.",
      "You struggle to pause, reflect, or pivot when conditions change."
    ],
    whyThisRole: [
      "You consistently prioritize training and execution over comfort.",
      "You honor commitments and daily habits when motivation drops.",
      "You default to action-based solutions under pressure."
    ],
    reputation: [
      "People trust your word and expect you to follow through.",
      "People see you as highly reliable and steady under pressure.",
      "People observe you working hard, but wonder where it's leading."
    ],
    whyThisMatters: "You don't need more discipline. You need stronger feedback loops and people willing to challenge your direction. Without that, you'll keep moving fast while staying on the wrong path.",
    readinessText: "Your application highlights exceptional discipline. To proceed, we need to verify your alignment with peers who will push you to analyze your trajectory."
  },
  architect: {
    displayName: "Thinker",
    colorClass: "text-blue-600",
    payoffTagline: "Your problem isn't information. It's execution.",
    readinessStatus: "Promising Candidate",
    snapshot: {
      execution: "Developing",
      consistency: "Medium",
      strategicThinking: "High",
      peerChallenge: "Needed"
    },
    strength: [
      "You identify systemic risks and structural flaws early.",
      "You build logical frameworks that simplify complex scenarios.",
      "You base decisions on deep analysis rather than impulse."
    ],
    blindSpot: [
      "You use research and planning to avoid the fear of starting.",
      "You get trapped in infinite refinement loops without launching.",
      "You overcomplicate simple actions to delay public exposure."
    ],
    whyThisRole: [
      "You consistently default to systemic planning over raw action.",
      "You prioritize risk mitigation and comprehensive analysis.",
      "You thrive on mental clarity and avoid reckless starts."
    ],
    reputation: [
      "People value your strategic perspective and analytical insights.",
      "People respect your ability to foresee obstacles before they occur.",
      "People notice you planning extensively, but rarely see you finish."
    ],
    whyThisMatters: "You don't need more information. You need an environment where execution is the only metric. Without that, you'll spend years refining plans that never meet the real world.",
    readinessText: "Your application demonstrates strong analytical capacity. To proceed, we need to place you with execution-first builders who will force you to launch."
  },
  connector: {
    displayName: "Connector",
    colorClass: "text-pink-600",
    payoffTagline: "Your problem isn't networking. It's focus.",
    readinessStatus: "Strong Candidate",
    snapshot: {
      execution: "Medium",
      consistency: "Medium",
      strategicThinking: "Medium",
      peerChallenge: "Needed"
    },
    strength: [
      "You build high-trust relationships and open doors easily.",
      "You identify mutual value and unite complementary skills.",
      "You synthesize different perspectives to clear blockages."
    ],
    blindSpot: [
      "You solve everyone else's problems while neglecting your own.",
      "You collect contacts without building focused execution loops.",
      "You use social momentum as a distraction from deep work."
    ],
    whyThisRole: [
      "You prioritize relationship building and empathy over solo execution.",
      "You default to collaborative settings and external support.",
      "You gain energy from groups and feel isolated building alone."
    ],
    reputation: [
      "People value your trust, introductions, and guidance.",
      "People see you as a natural resource for talent and advice.",
      "People notice you helping others, but want to see your own win."
    ],
    whyThisMatters: "You don't need more connections. You need to close your door and focus on your own benchmarks. Without that, you'll spend years helping others build their dreams while yours stay frozen.",
    readinessText: "Your application shows excellent relational momentum. To proceed, we need to verify your capacity to set firm boundaries and commit to your own work."
  }
};

const readinessCTA = {
  "Exceptional Fit": { text: "Review Cohort Details", event: "cohort_details_viewed" },
  "Strong Candidate": { text: "Track Application", event: "track_application_clicked" },
  "Promising Candidate": { text: "View Next Steps", event: "view_next_steps_clicked" },
  "Needs Further Evaluation": { text: "Track Application", event: "track_application_clicked" }
};

export default function ResultsPage() {
  const router = useRouter();
  const [loadingStep, setLoadingStep] = useState(0);
  const [revealStage, setRevealStage] = useState<'scanning' | 'dramaticText' | 'dashboard'>('scanning');
  const [results, setResults] = useState<ResultData | null>(null);
  
  // Feedback flow states: 'init' | 'text_input' | 'done'
  const [feedbackState, setFeedbackState] = useState<'init' | 'text_input' | 'done'>('init');
  const [feedbackText, setFeedbackText] = useState('');
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
      setFeedbackState('done');
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

  // Dramatic text timer & analytics views
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

  // Analytics - Time spent & scroll depth tracking
  useEffect(() => {
    if (revealStage !== 'dashboard' || !results) return;

    const startTime = Date.now();
    const sId = localStorage.getItem('the_league_session_id') || 'unknown';
    const assId = results.assessmentId || null;

    logAnalyticsEvent(sId, assId, 'results_viewed');

    const handleBeforeUnload = () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      logAnalyticsEvent(sId, assId, 'time_on_results_page', { duration_seconds: duration });
    };

    // Scroll depth tracking
    const tracked = { p25: false, p50: false, p75: false, p100: false };
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 25 && !tracked.p25) {
        tracked.p25 = true;
        logAnalyticsEvent(sId, assId, 'scroll_depth', { depth: '25%' });
      }
      if (scrollPercent >= 50 && !tracked.p50) {
        tracked.p50 = true;
        logAnalyticsEvent(sId, assId, 'scroll_depth', { depth: '50%' });
      }
      if (scrollPercent >= 75 && !tracked.p75) {
        tracked.p75 = true;
        logAnalyticsEvent(sId, assId, 'scroll_depth', { depth: '75%' });
      }
      if (scrollPercent >= 95 && !tracked.p100) {
        tracked.p100 = true;
        logAnalyticsEvent(sId, assId, 'scroll_depth', { depth: '100%' });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      const duration = Math.round((Date.now() - startTime) / 1000);
      logAnalyticsEvent(sId, assId, 'time_on_results_page', { duration_seconds: duration });
    };
  }, [revealStage, results]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#5F2EEA', '#C5A85A', '#111111']
    });
  };

  // Step 1: Submit numerical accuracy rating
  const handleRatingSubmit = async (ratingText: 'Very Accurate' | 'Somewhat' | 'Not Really') => {
    if (!results || isSubmittingFeedback) return;
    setIsSubmittingFeedback(true);

    const ratingVal = ratingText === 'Very Accurate' ? 5 : ratingText === 'Somewhat' ? 3 : 1;
    const assId = results.assessmentId || 'fallback-id';

    try {
      await submitFeedback(assId, ratingVal);

      if (ratingText === 'Very Accurate') {
        setFeedbackState('done');
        const updatedResults = { ...results, feedbackSubmitted: true };
        sessionStorage.setItem('the_league_results', JSON.stringify(updatedResults));
      } else {
        setFeedbackState('text_input');
      }
    } catch (err) {
      console.error('Failed to submit accuracy rating:', err);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  // Step 2: Submit open-text feedback
  const handleFeedbackTextSubmit = async () => {
    if (!results || isSubmittingFeedback) return;
    setIsSubmittingFeedback(true);

    const assId = results.assessmentId || 'fallback-id';

    try {
      if (feedbackText.trim()) {
        await submitOpenFeedback(assId, feedbackText.trim());
      }
      setFeedbackState('done');
      const updatedResults = { ...results, feedbackSubmitted: true };
      sessionStorage.setItem('the_league_results', JSON.stringify(updatedResults));
    } catch (err) {
      console.error('Failed to submit open feedback text:', err);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8] text-[#111111]">
        <div className="animate-pulse font-mono text-xs uppercase tracking-widest text-[#111111]/45">
          Syncing profile...
        </div>
      </div>
    );
  }

  const normArch = (results.archetype || 'creator').toLowerCase().trim();
  const currentData = archetypeRedesignData[normArch as keyof typeof archetypeRedesignData] || archetypeRedesignData.creator;
  const displayArch = currentData.displayName;

  const handleCTAClick = () => {
    const sId = localStorage.getItem('the_league_session_id') || 'unknown';
    const assId = results.assessmentId || null;
    const ctaInfo = readinessCTA[currentData.readinessStatus as keyof typeof readinessCTA] || { text: "Track Application", event: "track_application_clicked" };
    
    logAnalyticsEvent(sId, assId, 'results_cta_clicked', { 
      action: ctaInfo.text,
      status: currentData.readinessStatus
    });

    // Smooth scroll to typical journey
    document.getElementById('member-journey')?.scrollIntoView({ behavior: 'smooth' });
  };

  const ctaText = (readinessCTA[currentData.readinessStatus as keyof typeof readinessCTA] || { text: "Track Application" }).text;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8] text-[#111111] antialiased">
      <Header />

      <main className="flex-1 py-12 px-4 relative">
        <div className="max-w-5xl mx-auto z-10 flex flex-col items-center">
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
                <div className="relative w-64 h-64 border border-border-gray bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                  <motion.div 
                    animate={{ y: [-110, 110, -110] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-0.5 bg-brand-purple z-10"
                  />
                  <motion.div 
                    animate={{ y: [-110, 110, -110] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-10 bg-brand-purple/5 blur-[8px] z-5"
                  />
                  <Sparkles className="h-10 w-10 text-brand-purple animate-pulse" />
                </div>

                <div className="space-y-2 text-center w-full max-w-xs font-mono">
                  <h3 className="text-xs uppercase tracking-wider text-brand-gold font-bold animate-pulse">
                    Evaluating life patterns
                  </h3>
                  <p className="text-sm font-semibold text-foreground/80 transition-all duration-300">
                    {loadingMessages[loadingStep] || 'Finalizing...'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: DRAMATIC TYPOGRAPHY OVERLAY */}
            {revealStage === 'dramaticText' && (
              <motion.div
                key="dramaticText"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center space-y-4 py-32"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-xs font-mono uppercase tracking-widest text-[#111111]/60"
                >
                  The Fit Check is complete...
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wider font-mono"
                >
                  ROLE UNLOCKED
                </motion.h2>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                  className={`text-5xl sm:text-6xl md:text-7xl font-semibold uppercase tracking-wider ${currentData.colorClass}`}
                >
                  THE {displayArch}
                </motion.h1>
              </motion.div>
            )}

            {/* STAGE 3: THE RESULTS DASHBOARD */}
            {revealStage === 'dashboard' && (
              <div className="w-full space-y-12">
                
                {/* BOUNDED STICKY GRID: Wraps Card, core insight, snapshot, and strengths */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                  
                  {/* Left Column: Bounded Sticky Identity Card */}
                  <div className="lg:col-span-5 lg:sticky lg:top-24 self-start z-20">
                    <span className="text-[10px] font-mono tracking-widest text-foreground/35 block uppercase text-center mb-2">
                      Your League Identity Card
                    </span>
                    <div className="transform scale-95 lg:scale-100 origin-top">
                      <CharacterCard
                        name={results.name}
                        archetype={normArch}
                        strength={results.strength}
                        limiter={results.limiter}
                        quest={results.quest}
                        scores={results.scores}
                        isLocked={feedbackState !== 'done'}
                        assessmentId={results.assessmentId}
                      />
                    </div>
                  </div>

                  {/* Right Column: Above-the-fold core items */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Header */}
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono tracking-widest text-foreground/45 block uppercase">
                        ROLE DIAGNOSIS
                      </span>
                      <h1 className="text-3xl font-semibold tracking-tight text-foreground uppercase">
                        The {displayArch} Diagnosis
                      </h1>
                    </div>

                    {/* Level 1: Core Insight tagline */}
                    <div className="bg-white border border-border-gray rounded-2xl p-6 space-y-3">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
                        YOUR CORE INSIGHT
                      </span>
                      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground leading-[1.25]">
                        {currentData.payoffTagline}
                      </h2>
                      <p className="text-xs sm:text-sm text-foreground/50 italic leading-relaxed">
                        "{results.killerSentence || currentData.whyThisMatters.split('.')[0] + '.'}"
                      </p>
                    </div>

                    {/* Level 1b: Status-Driven Action CTA */}
                    <div className="bg-white rounded-2xl p-5 border border-border-gray flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-0.5 text-left w-full sm:w-auto">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-foreground/40 block">COHORT READINESS</span>
                        <h4 className="text-sm font-semibold text-foreground">
                          {currentData.readinessStatus}
                        </h4>
                      </div>
                      <button
                        onClick={handleCTAClick}
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-purple hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
                      >
                        <span>{ctaText}</span>
                      </button>
                    </div>

                    {/* Level 2: Snapshot indicator metrics */}
                    <div className="bg-white border border-border-gray rounded-2xl p-5 space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/40 block font-bold text-left">
                        YOUR PROFILE AT A GLANCE
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider text-foreground/40 block font-mono">Execution</span>
                          <span className="text-xs font-semibold text-foreground">{currentData.snapshot.execution}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider text-foreground/40 block font-mono">Consistency</span>
                          <span className="text-xs font-semibold text-foreground">{currentData.snapshot.consistency}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider text-foreground/40 block font-mono">Thinking</span>
                          <span className="text-xs font-semibold text-foreground">{currentData.snapshot.strategicThinking}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider text-foreground/40 block font-mono">Challenge</span>
                          <span className="text-xs font-semibold text-foreground">{currentData.snapshot.peerChallenge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Level 3: Strengths and Weaknesses cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Strength Card */}
                      <div className="bg-white border border-border-gray rounded-2xl p-5 space-y-3 text-left">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
                          YOUR BIGGEST STRENGTH
                        </span>
                        <ul className="space-y-2 text-xs text-foreground/70 pl-3 list-disc font-semibold">
                          {currentData.strength.map((s, i) => (
                            <li key={i} className="leading-relaxed">{s}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Blind Spot Card */}
                      <div className="bg-white border border-border-gray rounded-2xl p-5 space-y-3 text-left">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-red-500 font-bold block">
                          YOUR BIGGEST BLIND SPOT
                        </span>
                        <ul className="space-y-2 text-xs text-foreground/70 pl-3 list-disc font-semibold">
                          {currentData.blindSpot.map((b, i) => (
                            <li key={i} className="leading-relaxed">{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>

                {/* SCROLL-OUT CONTENT AREA (Card scrolls out of view below this) */}
                <div className="max-w-4xl mx-auto w-full space-y-12 border-t border-border-gray pt-12">
                  
                  {/* Validation: Why Warrior & Reputation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Why This Role */}
                    <div className="bg-white border border-border-gray rounded-2xl p-6 space-y-4 text-left">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-brand-gold font-bold block">
                        WHY {displayArch.toUpperCase()}
                      </span>
                      <ul className="space-y-3 text-xs text-foreground/70 pl-3 list-disc font-semibold">
                        {currentData.whyThisRole.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Reputation */}
                    <div className="bg-white border border-border-gray rounded-2xl p-6 space-y-4 text-left">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
                        YOUR REPUTATION
                      </span>
                      <ul className="space-y-3 text-xs text-foreground/70 pl-3 list-disc font-semibold">
                        {currentData.reputation.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Why This Matters Centerpiece */}
                  <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 space-y-2.5 text-left">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-amber-700 font-bold block">
                      WHY THIS MATTERS
                    </span>
                    <p className="text-sm text-amber-900 leading-relaxed font-semibold italic">
                      "{currentData.whyThisMatters}"
                    </p>
                  </div>

                  {/* Cohort Forecast: Tension cards */}
                  <div className="space-y-4 text-left">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/45 block">
                        COHORT FORECAST
                      </span>
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide font-sans">
                        Who You Need Around You
                      </h4>
                      <p className="text-xs text-foreground/50">
                        We structure cohorts to compile complementary forces, compensating for your blind spots.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white border border-border-gray rounded-2xl p-5 space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-blue-600 font-bold block">THINKER</span>
                        <p className="text-xs text-foreground/70 leading-relaxed font-semibold">Challenges your assumptions</p>
                      </div>
                      <div className="bg-white border border-border-gray rounded-2xl p-5 space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-brand-purple font-bold block">BUILDER</span>
                        <p className="text-xs text-foreground/70 leading-relaxed font-semibold">Pushes you to execute faster</p>
                      </div>
                      <div className="bg-white border border-border-gray rounded-2xl p-5 space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-pink-600 font-bold block">CONNECTOR</span>
                        <p className="text-xs text-foreground/70 leading-relaxed font-semibold">Introduces opportunities you wouldn't create alone</p>
                      </div>
                    </div>
                  </div>

                  {/* Typical Member Journey Timeline */}
                  <div id="member-journey" className="bg-white rounded-2xl p-6 border border-border-gray space-y-6 text-left">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-green-700 font-bold block">
                        TYPICAL MEMBER JOURNEY
                      </span>
                      <p className="text-xs text-foreground/50 leading-relaxed">
                        This profile is not your destination. It's your starting point. If accepted into a cohort, the typical member journey looks like this:
                      </p>
                    </div>

                    {/* Timeline vertical stepper */}
                    <div className="space-y-6 border-l border-border-gray ml-2 pl-4">
                      <div className="relative space-y-0.5">
                        <span className="absolute -left-[25px] top-0.5 h-3.5 w-3.5 rounded-full bg-green-100 border border-green-200 text-green-700 flex items-center justify-center text-[8px] font-bold">✓</span>
                        <h5 className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-semibold">
                          Stage 1: Founding Cohort
                        </h5>
                        <p className="text-xs text-foreground/60 leading-normal font-semibold">
                          Join a small group of ambitious peers committed to improving together.
                        </p>
                      </div>

                      <div className="relative space-y-0.5">
                        <span className="absolute -left-[25px] top-0.5 h-3.5 w-3.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center text-[8px] font-bold">2</span>
                        <h5 className="text-[10px] font-mono uppercase tracking-wider text-foreground/70 font-semibold">
                          Stage 2: Weekly Accountability
                        </h5>
                        <p className="text-xs text-foreground/60 leading-normal">
                          Report weekly progress across the Four Pillars: Fitness, Mind, Money, and Connection.
                        </p>
                      </div>

                      <div className="relative space-y-0.5">
                        <span className="absolute -left-[25px] top-0.5 h-3.5 w-3.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center text-[8px] font-bold">3</span>
                        <h5 className="text-[10px] font-mono uppercase tracking-wider text-foreground/70 font-semibold">
                          Stage 3: Accountability Tier
                        </h5>
                        <p className="text-xs text-foreground/60 leading-normal">
                          Consistent execution builds trust. Missed commitments adjust your tier status.
                        </p>
                      </div>

                      <div className="relative space-y-0.5">
                        <span className="absolute -left-[25px] top-0.5 h-3.5 w-3.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center text-[8px] font-bold">4</span>
                        <h5 className="text-[10px] font-mono uppercase tracking-wider text-foreground/70 font-semibold">
                          Stage 4: League Promotion
                        </h5>
                        <p className="text-xs text-foreground/60 leading-normal">
                          Top performers earn promotion to elite accountability cohorts and exclusive opportunities.
                        </p>
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className="text-[10px] font-mono text-foreground/60 bg-[#FAFAF8] border border-border-gray rounded-xl px-3.5 py-2.5 flex justify-between items-center font-bold">
                      <span>Application Status: Under Review</span>
                      <ChevronRight className="h-3.5 w-3.5 animate-pulse text-brand-purple" />
                    </div>
                  </div>

                  {/* Feedback gate block */}
                  <div className="bg-white rounded-2xl p-6 border border-border-gray text-center space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-foreground/80 font-bold leading-normal">
                      Does this screening profile represent your blind spots?
                    </h4>
                    
                    {feedbackState === 'done' && (
                      <div className="text-xs text-green-700 font-mono flex items-center justify-center space-x-2 py-1 font-bold">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                        <span>Thanks. This helps improve future cohort matching.</span>
                      </div>
                    )}

                    {feedbackState === 'init' && (
                      <div className="flex flex-col gap-2 max-w-xs mx-auto">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleRatingSubmit('Very Accurate')}
                            disabled={isSubmittingFeedback}
                            className="text-[10px] px-2.5 py-2.5 border border-border-gray hover:border-brand-purple/40 hover:bg-brand-purple/5 bg-white text-foreground rounded-xl transition-all cursor-pointer font-semibold flex-1 disabled:opacity-50"
                          >
                            Very Accurate
                          </button>
                          <button
                            onClick={() => handleRatingSubmit('Somewhat')}
                            disabled={isSubmittingFeedback}
                            className="text-[10px] px-2.5 py-2.5 border border-border-gray hover:border-brand-purple/40 hover:bg-brand-purple/5 bg-white text-foreground rounded-xl transition-all cursor-pointer font-semibold flex-1 disabled:opacity-50"
                          >
                            Somewhat
                          </button>
                        </div>
                        <button
                          onClick={() => handleRatingSubmit('Not Really')}
                          disabled={isSubmittingFeedback}
                          className="text-[10px] px-2.5 py-2.5 border border-border-gray hover:border-brand-purple/40 hover:bg-brand-purple/5 bg-white text-foreground rounded-xl transition-all cursor-pointer font-semibold w-full disabled:opacity-50"
                        >
                          Not Really
                        </button>
                      </div>
                    )}

                    {feedbackState === 'text_input' && (
                      <div className="space-y-3 text-left max-w-sm mx-auto">
                        <span className="text-[10px] font-mono text-brand-gold uppercase block font-bold">
                          What felt inaccurate? Help us improve:
                        </span>
                        <textarea
                          rows={3}
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Your comments help us calibrate the V1 algorithms..."
                          className="w-full bg-[#FAFAF8] border border-border-gray focus:border-brand-purple rounded-lg p-2.5 text-xs text-foreground placeholder-foreground/35 outline-none transition-all resize-none font-semibold"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleFeedbackTextSubmit}
                            disabled={isSubmittingFeedback}
                            className="flex-1 text-[10px] bg-brand-purple hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-2 rounded-xl transition-all cursor-pointer disabled:opacity-50 text-center"
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => setFeedbackState('done')}
                            className="flex-1 text-[10px] border border-border-gray hover:bg-gray-50 text-foreground/60 hover:text-foreground font-semibold py-2 rounded-xl transition-all cursor-pointer text-center"
                          >
                            Skip
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
