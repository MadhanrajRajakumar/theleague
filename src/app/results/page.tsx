'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShieldAlert, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
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
    colorClass: "text-[#C9A84C]",
    payoffTagline: "Your problem isn't fitness plans. It's sticking to them.",
    readinessStatus: "Strong Candidate",
    snapshot: {
      execution: "High",
      consistency: "Developing",
      strategicThinking: "High",
      peerChallenge: "Needed"
    },
    strength: [
      "You start training plans with high initial energy.",
      "You easily adapt and try new fitness protocols.",
      "You move from decision to action quickly when motivated."
    ],
    blindSpot: [
      "You abandon training programs as soon as the novelty wears off.",
      "You build habits in isolation and quit when nobody is watching.",
      "You mistake starting a new diet for actual physical progress."
    ],
    whyThisRole: [
      "You consistently prioritize novel plans over structural consistency.",
      "You reject rigid routines and default to starting new things.",
      "You thrive on momentum and suffer under static workout schedules."
    ],
    reputation: [
      "People expect you to suggest new fitness trends.",
      "People trust your creative approach to overcoming hurdles.",
      "People worry you will lose focus before completing a program."
    ],
    whyThisMatters: "You don't need another fitness plan. You need feedback loops and people who won't let you quit. Without that, you'll spend years starting programs you never complete.",
    readinessText: "Your assessment indicates high initial momentum. To proceed, we need to verify whether you have the accountability systems to sustain execution when things get hard.",
    whyTheLeagueWorks: "The League surrounds you with a strict accountability group that monitors your daily proof, forcing you to stick to your program long after the initial novelty has worn off.",
    biggestRisk: "You quit when novelty disappears."
  },
  warrior: {
    displayName: "Warrior",
    colorClass: "text-[#C9A84C]",
    payoffTagline: "Your problem isn't workout intensity. It's recovery.",
    readinessStatus: "Exceptional Fit",
    snapshot: {
      execution: "High",
      consistency: "High",
      strategicThinking: "Developing",
      peerChallenge: "Needed"
    },
    strength: [
      "You show up and grind consistently even when exhausted.",
      "You honor routines and execute daily physical commitments.",
      "You bring grit and physical determination to your goals."
    ],
    blindSpot: [
      "You keep pushing through injuries and fatigue blindly.",
      "You mistake raw gym busyness for structured fitness progression.",
      "You struggle to rest, recover, or pivot your training splits."
    ],
    whyThisRole: [
      "You consistently prioritize training and execution over comfort.",
      "You honor commitments and daily habits when motivation drops.",
      "You default to action-based physical efforts under stress."
    ],
    reputation: [
      "People trust your word and expect you to show up.",
      "People see you as highly reliable and steady under pressure.",
      "People observe you working hard, but wonder if you are overtraining."
    ],
    whyThisMatters: "You don't need more discipline. You need people who force you to recover so you can grow. Without that, you'll run yourself into the ground while staying in the same place.",
    readinessText: "Your assessment highlights exceptional discipline. To proceed, we need to verify your alignment with peers who will push you to analyze your recovery.",
    whyTheLeagueWorks: "The League helps you balance execution with structure. By tracking all four pillars—specifically Recovery and Fuel—your group ensures you don't burn out or overtrain.",
    biggestRisk: "You mistake intensity for sustainability."
  },
  architect: {
    displayName: "Thinker",
    colorClass: "text-[#C9A84C]",
    payoffTagline: "Your problem isn't fitness research. It's workout execution.",
    readinessStatus: "Promising Candidate",
    snapshot: {
      execution: "Developing",
      consistency: "Medium",
      strategicThinking: "High",
      peerChallenge: "Needed"
    },
    strength: [
      "You identify training mistakes and structural flaws early.",
      "You build logical splits that optimize training variables.",
      "You base fitness decisions on deep analysis rather than hype."
    ],
    blindSpot: [
      "You use research and planning to avoid the discomfort of heavy lifting.",
      "You get trapped in planning cycles without ever completing a workout.",
      "You overcomplicate nutrition splits to delay starting today."
    ],
    whyThisRole: [
      "You consistently default to systemic planning over raw action.",
      "You prioritize risk mitigation and comprehensive analysis.",
      "You thrive on clarity and avoid unstructured training starts."
    ],
    reputation: [
      "People value your logical perspective on training/recovery.",
      "People respect your ability to explain complex training mechanics.",
      "People notice you planning splits, but rarely see you execute."
    ],
    whyThisMatters: "You don't need more research. You need an environment where execution is the only metric. Without that, you'll spend years refining plans that never yield actual results.",
    readinessText: "Your assessment demonstrates strong analytical capacity. To proceed, we need to place you with execution-first builders who will force you to lift.",
    whyTheLeagueWorks: "The League forces you out of spreadsheets and into action. With a group checking for daily proof of your commitments, research stops being a hiding place.",
    biggestRisk: "Planning becomes a substitute for action."
  },
  connector: {
    displayName: "Connector",
    colorClass: "text-[#C9A84C]",
    payoffTagline: "Your problem isn't workout partners. It's personal consistency.",
    readinessStatus: "Strong Candidate",
    snapshot: {
      execution: "Medium",
      consistency: "Medium",
      strategicThinking: "Medium",
      peerChallenge: "Needed"
    },
    strength: [
      "You build high-trust training bonds and gather groups.",
      "You find energy in community workout settings.",
      "You inspire and push others to stay on track."
    ],
    blindSpot: [
      "You focus on other people's workouts while neglecting your own.",
      "You use social class settings as a distraction from focused training.",
      "You fail to push your own physical limits when working alone."
    ],
    whyThisRole: [
      "You prioritize group settings and training partners over solo effort.",
      "You default to collaborative gym groups and social check-ins.",
      "You gain energy from groups and feel unmotivated training alone."
    ],
    reputation: [
      "People value your motivation, advice, and social support.",
      "People see you as a natural organizer of runs or workouts.",
      "People notice you helping others, but want to see your own transformation."
    ],
    whyThisMatters: "You don't need more gym buddies. You need people whose standards challenge your consistency. Without that, you'll spend years helping others stay active while yours stays frozen.",
    readinessText: "Your assessment shows excellent relational momentum. To proceed, we need to verify your capacity to set firm boundaries and commit to your own training targets.",
    whyTheLeagueWorks: "The League shifts your focus back to your own benchmarks. You are matched with high-standard peers who demand to see your personal progress, not just your group leadership.",
    biggestRisk: "You rely too heavily on external motivation."
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
      colors: ['#C9A84C', '#161616', '#2A2A2A', '#8A8880']
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
      <div className="flex min-h-screen items-center justify-center bg-[#0D0D0D] text-[#8A8880]">
        <div className="animate-pulse font-mono text-xs uppercase tracking-widest text-[#8A8880]/50">
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
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-[#8A8880] antialiased">
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
                <div className="relative w-64 h-64 border border-[#2A2A2A] bg-[#161616] rounded-[8px] overflow-hidden flex flex-col items-center justify-center">
                  <motion.div 
                    animate={{ y: [-110, 110, -110] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-0.5 bg-[#C9A84C] z-10"
                  />
                  <motion.div 
                    animate={{ y: [-110, 110, -110] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-10 bg-[#C9A84C]/10 blur-[8px] z-5"
                  />
                  <Sparkles className="h-10 w-10 text-[#C9A84C] animate-pulse" />
                </div>

                <div className="space-y-2 text-center w-full max-w-xs">
                  <h3 className="text-xs font-barlow font-extrabold uppercase tracking-wider text-[#C9A84C] animate-pulse">
                    Evaluating life patterns
                  </h3>
                  <p className="text-sm text-[#F2F0EB] font-sans transition-all duration-300">
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
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-xs font-mono uppercase tracking-widest text-[#8A8880]"
                >
                  The Fit Check is complete...
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-2xl sm:text-3xl font-barlow font-extrabold text-[#F2F0EB] uppercase tracking-wider"
                >
                  ROLE UNLOCKED
                </motion.h2>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                  className="text-5xl sm:text-6xl md:text-7xl font-barlow font-extrabold uppercase tracking-wider text-[#C9A84C]"
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
                    <span className="text-[10px] font-mono tracking-widest text-[#8A8880]/60 block uppercase text-center mb-2">
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
                      <span className="text-[10px] font-mono tracking-widest text-[#C9A84C] block uppercase">
                        ROLE DIAGNOSIS
                      </span>
                      <h1 className="text-3xl sm:text-4xl font-barlow font-extrabold tracking-wider text-[#F2F0EB] uppercase">
                        The {displayArch} Diagnosis
                      </h1>
                    </div>

                    {/* Level 1: Core Insight tagline */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-3">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold block">
                        YOUR CORE INSIGHT
                      </span>
                      <h2 className="text-xl sm:text-2xl font-barlow font-extrabold uppercase tracking-wider text-[#F2F0EB] leading-tight">
                        {currentData.payoffTagline}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#8A8880] italic leading-relaxed">
                        "{results.killerSentence || currentData.whyThisMatters.split('.')[0] + '.'}"
                      </p>
                    </div>

                    {/* Level 1b: Status-Driven Action CTA */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-0.5 text-left w-full sm:w-auto">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#8A8880]/60 block">COHORT READINESS</span>
                        <h4 className="text-sm font-barlow font-extrabold uppercase tracking-wider text-[#F2F0EB]">
                          {currentData.readinessStatus}
                        </h4>
                      </div>
                      <button
                        onClick={handleCTAClick}
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C9A84C] hover:bg-[#b0913c] text-[#0D0D0D] font-sans font-extrabold uppercase tracking-wider text-xs px-6 py-3 rounded-[6px] transition-colors cursor-pointer"
                      >
                        <span>{ctaText}</span>
                      </button>
                    </div>

                    {/* Level 2: Snapshot indicator metrics */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#8A8880]/60 block font-bold text-left">
                        YOUR PROFILE AT A GLANCE
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider text-[#8A8880]/60 block font-mono">Execution</span>
                          <span className="text-xs font-semibold text-[#F2F0EB]">{currentData.snapshot.execution}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider text-[#8A8880]/60 block font-mono">Consistency</span>
                          <span className="text-xs font-semibold text-[#F2F0EB]">{currentData.snapshot.consistency}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider text-[#8A8880]/60 block font-mono">Thinking</span>
                          <span className="text-xs font-semibold text-[#F2F0EB]">{currentData.snapshot.strategicThinking}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider text-[#8A8880]/60 block font-mono">Challenge</span>
                          <span className="text-xs font-semibold text-[#F2F0EB]">{currentData.snapshot.peerChallenge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Level 3: Strengths and Weaknesses cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Strength Card */}
                      <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-3 text-left">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold block">
                          YOUR BIGGEST STRENGTH
                        </span>
                        <ul className="space-y-2 text-xs text-[#8A8880] pl-3 list-disc font-semibold">
                          {currentData.strength.map((s, i) => (
                            <li key={i} className="leading-relaxed">{s}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Blind Spot Card */}
                      <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-3 text-left">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#A33B3B] font-bold block">
                          YOUR BIGGEST BLIND SPOT
                        </span>
                        <ul className="space-y-2 text-xs text-[#8A8880] pl-3 list-disc font-semibold">
                          {currentData.blindSpot.map((b, i) => (
                            <li key={i} className="leading-relaxed">{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>

                {/* SCROLL-OUT CONTENT AREA (Card scrolls out of view below this) */}
                <div className="max-w-4xl mx-auto w-full space-y-12 border-t border-[#2A2A2A] pt-12">
                  
                  {/* Validation: Why Warrior & Reputation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Why This Role */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-4 text-left">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold block">
                        WHY {displayArch.toUpperCase()}
                      </span>
                      <ul className="space-y-3 text-xs text-[#8A8880] pl-3 list-disc font-semibold">
                        {currentData.whyThisRole.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Reputation */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-4 text-left">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold block">
                        YOUR REPUTATION
                      </span>
                      <ul className="space-y-3 text-xs text-[#8A8880] pl-3 list-disc font-semibold">
                        {currentData.reputation.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Why This Matters Centerpiece */}
                  <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/15 rounded-[8px] p-6 space-y-2.5 text-left">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold block">
                      WHY THIS MATTERS
                    </span>
                    <p className="text-sm text-[#F2F0EB] leading-relaxed font-semibold italic">
                      "{currentData.whyThisMatters}"
                    </p>
                  </div>

                  {/* Why The League Works & Biggest Risk 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {/* Why The League Works */}
                    <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold block">
                        WHY THE LEAGUE WORKS FOR YOU
                      </span>
                      <p className="text-xs sm:text-sm text-[#8A8880] leading-relaxed font-semibold">
                        {currentData.whyTheLeagueWorks}
                      </p>
                    </div>

                    {/* Your Biggest Risk */}
                    <div className="bg-[#A33B3B]/10 border border-[#A33B3B]/20 rounded-[8px] p-6 space-y-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#A33B3B] font-bold block">
                        YOUR BIGGEST RISK
                      </span>
                      <p className="text-xs sm:text-sm text-[#F2F0EB] leading-relaxed">
                        {currentData.biggestRisk}
                      </p>
                    </div>
                  </div>

                  {/* Cohort Forecast: Tension cards */}
                  <div className="space-y-4 text-left">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] block font-bold">
                        COHORT FORECAST
                      </span>
                      <h4 className="text-sm font-barlow font-extrabold uppercase tracking-wider text-[#F2F0EB]">
                        Who You Need Around You
                      </h4>
                      <p className="text-xs text-[#8A8880]">
                        We structure cohorts to compile complementary forces, compensating for your blind spots.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold block">THINKER</span>
                        <p className="text-xs text-[#8A8880] leading-relaxed font-semibold">Keeps your training plans realistic and structured</p>
                      </div>
                      <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold block">BUILDER</span>
                        <p className="text-xs text-[#8A8880] leading-relaxed font-semibold">Pushes you to start workouts and keep going</p>
                      </div>
                      <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A84C] font-bold block">CONNECTOR</span>
                        <p className="text-xs text-[#8A8880] leading-relaxed font-semibold">Unites the group and builds collective energy</p>
                      </div>
                    </div>
                  </div>

                  {/* Typical Member Journey Timeline */}
                  <div id="member-journey" className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-6 text-left">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#3B7A4A] font-bold block">
                        TYPICAL MEMBER JOURNEY
                      </span>
                      <p className="text-xs text-[#8A8880] leading-relaxed">
                        This profile is not your destination. It's your starting point. If accepted into a cohort, the typical member journey looks like this:
                      </p>
                    </div>

                    {/* Timeline vertical stepper */}
                    <div className="space-y-6 border-l border-[#2A2A2A] ml-2 pl-4">
                      <div className="relative space-y-0.5">
                        <span className="absolute -left-[25px] top-0.5 h-3.5 w-3.5 rounded-full bg-[#3B7A4A]/20 border border-[#3B7A4A]/40 text-[#3B7A4A] flex items-center justify-center text-[8px] font-bold">✓</span>
                        <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#C9A84C] font-semibold">
                          Stage 1: Founding Cohort
                        </h5>
                        <p className="text-xs text-[#8A8880] leading-normal font-semibold">
                          Join a private fitness accountability network of ambitious peers.
                        </p>
                      </div>

                      <div className="relative space-y-0.5">
                        <span className="absolute -left-[25px] top-0.5 h-3.5 w-3.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] flex items-center justify-center text-[8px] font-bold">2</span>
                        <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#F2F0EB] font-semibold">
                          Stage 2: Daily Accountability
                        </h5>
                        <p className="text-xs text-[#8A8880] leading-normal">
                          Report daily progress across the Four Pillars: Train, Fuel, Recover, and Accountability.
                        </p>
                      </div>

                      <div className="relative space-y-0.5">
                        <span className="absolute -left-[25px] top-0.5 h-3.5 w-3.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] flex items-center justify-center text-[8px] font-bold">3</span>
                        <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#F2F0EB] font-semibold">
                          Stage 3: Accountability Tier
                        </h5>
                        <p className="text-xs text-[#8A8880] leading-normal">
                          Consistent execution builds trust. Missed commitments adjust your tier status.
                        </p>
                      </div>

                      <div className="relative space-y-0.5">
                        <span className="absolute -left-[25px] top-0.5 h-3.5 w-3.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] flex items-center justify-center text-[8px] font-bold">4</span>
                        <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#F2F0EB] font-semibold">
                          Stage 4: League Promotion
                        </h5>
                        <p className="text-xs text-[#8A8880] leading-normal">
                          Top performers earn promotion to elite accountability cohorts and exclusive opportunities.
                        </p>
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className="text-[10px] font-mono text-[#8A8880] bg-[#0D0D0D] border border-[#2A2A2A] rounded-[8px] px-3.5 py-2.5 flex justify-between items-center font-bold">
                      <span>Application Status: Under Review</span>
                      <ChevronRight className="h-3.5 w-3.5 animate-pulse text-[#C9A84C]" />
                    </div>
                  </div>

                  {/* Feedback gate block */}
                  <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 text-center space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#F2F0EB] font-bold leading-normal">
                      Does this screening profile represent your blind spots?
                    </h4>
                    
                    {feedbackState === 'done' && (
                      <div className="text-xs text-[#3B7A4A] font-mono flex items-center justify-center space-x-2 py-1 font-bold">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3B7A4A]" />
                        <span>Thanks. This helps improve future cohort matching.</span>
                      </div>
                    )}

                    {feedbackState === 'init' && (
                      <div className="flex flex-col gap-2 max-w-xs mx-auto">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleRatingSubmit('Very Accurate')}
                            disabled={isSubmittingFeedback}
                            className="text-[10px] px-2.5 py-2.5 border border-[#2A2A2A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 bg-[#0D0D0D] text-[#F2F0EB] rounded-[8px] transition-all cursor-pointer font-semibold flex-1 disabled:opacity-50"
                          >
                            Very Accurate
                          </button>
                          <button
                            onClick={() => handleRatingSubmit('Somewhat')}
                            disabled={isSubmittingFeedback}
                            className="text-[10px] px-2.5 py-2.5 border border-[#2A2A2A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 bg-[#0D0D0D] text-[#F2F0EB] rounded-[8px] transition-all cursor-pointer font-semibold flex-1 disabled:opacity-50"
                          >
                            Somewhat
                          </button>
                        </div>
                        <button
                          onClick={() => handleRatingSubmit('Not Really')}
                          disabled={isSubmittingFeedback}
                          className="text-[10px] px-2.5 py-2.5 border border-[#2A2A2A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 bg-[#0D0D0D] text-[#F2F0EB] rounded-[8px] transition-all cursor-pointer font-semibold w-full disabled:opacity-50"
                        >
                          Not Really
                        </button>
                      </div>
                    )}

                    {feedbackState === 'text_input' && (
                      <div className="space-y-3 text-left max-w-sm mx-auto">
                        <span className="text-[10px] font-mono text-[#C9A84C] uppercase block font-bold">
                          What felt inaccurate? Help us improve:
                        </span>
                        <textarea
                          rows={3}
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Your comments help us calibrate the V1 algorithms..."
                          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] focus:border-[#C9A84C] rounded-[8px] p-2.5 text-xs text-[#F2F0EB] placeholder-[#8A8880]/40 outline-none transition-all resize-none font-semibold"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleFeedbackTextSubmit}
                            disabled={isSubmittingFeedback}
                            className="flex-1 text-[10px] bg-[#C9A84C] hover:bg-[#b0913c] active:bg-[#C9A84C] text-[#0D0D0D] font-extrabold uppercase tracking-wider py-2 rounded-[6px] transition-all cursor-pointer disabled:opacity-50 text-center"
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => setFeedbackState('done')}
                            className="flex-1 text-[10px] border border-[#2A2A2A] hover:bg-[#0D0D0D]/50 text-[#8A8880] hover:text-[#F2F0EB] font-semibold py-2 rounded-[8px] transition-all cursor-pointer text-center"
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
