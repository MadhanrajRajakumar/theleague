'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldAlert, Sparkles, User, Mail } from 'lucide-react';
import Header from '@/components/Header';
import { QUESTIONS, calculateResults } from '@/lib/questions';
import { createAssessment, updateAssessmentProgress, submitWaitlist, completeAssessment } from '@/lib/supabase';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState<'intro' | 'questions' | 'capture'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [assessmentId, setAssessmentId] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
  
  // Lead Capture Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Setup unique session ID
  useEffect(() => {
    let sId = localStorage.getItem('the_league_session_id');
    if (!sId) {
      sId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('the_league_session_id', sId);
    }
    setSessionId(sId);
  }, []);

  const startAssessment = async () => {
    try {
      const assId = await createAssessment(sessionId);
      setAssessmentId(assId);
      setStep('questions');
    } catch (err) {
      console.error("Failed to start assessment:", err);
      setAssessmentId('fallback-' + Date.now());
      setStep('questions');
    }
  };

  const handleSelectOption = async (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionIndex;
    setAnswers(newAnswers);

    if (assessmentId) {
      const tempResults = calculateResults(newAnswers);
      updateAssessmentProgress(assessmentId, currentIdx + 1, tempResults.scores);
    }

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('capture');
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) return setFormError('Name is required.');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setFormError('A valid email address is required.');
    if (!instagram.trim()) return setFormError('Instagram username is required.');

    setIsSubmitting(true);

    try {
      const results = calculateResults(answers);

      await completeAssessment(assessmentId, results);

      await submitWaitlist({
        assessmentId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        instagram: instagram.trim().replace('@', ''),
        archetype: results.archetype,
        league: results.league,
        strength: results.strength,
        limiter: results.limiter,
        quest: results.quest
      });

      sessionStorage.setItem('the_league_results', JSON.stringify({
        ...results,
        name: name.trim()
      }));

      router.push('/results');
    } catch (err) {
      console.error("Failed to complete waitlist capture:", err);
      setFormError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const currentQuestion = QUESTIONS[currentIdx];
  const progressPercent = ((currentIdx) / QUESTIONS.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white">
      <Header />

      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-2xl relative z-10">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: INTRO AGREEMENT */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="glass-card border border-white/[0.06] rounded-2xl p-8 sm:p-12 text-center space-y-8 animate-shimmer"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20 text-brand-purple">
                  <ShieldAlert className="h-6 w-6" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase font-mono">
                    Before we begin
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base text-white/70 leading-relaxed font-light">
                    <p>There are no right answers.</p>
                    <p>There are no wrong answers.</p>
                    <p>Answer honestly.</p>
                    <p className="text-brand-gold font-medium">Not based on who you want to be.</p>
                    <p className="opacity-80">Based on who you are today.</p>
                    <p className="opacity-40 text-xs">The more honest you are, the more accurate your result will be.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={startAssessment}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-purple hover:bg-purple-600 active:bg-purple-700 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-purple-950/20"
                  >
                    <span>Start Assessment</span>
                    <Sparkles className="h-4 w-4 text-brand-gold" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: SCENARIOS */}
            {step === 'questions' && currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="space-y-8"
              >
                {/* Progress tracker */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-white/40">
                    <span className="uppercase tracking-widest text-brand-purple font-semibold">
                      Question {currentQuestion.id} of {QUESTIONS.length}
                    </span>
                    <span>{Math.round(progressPercent)}% COMPLETE</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.02]">
                    <div 
                      style={{ width: `${progressPercent}%` }}
                      className="h-full bg-brand-purple rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Scenario details card (Short, max 3 lines) */}
                <div className="glass-card border border-white/[0.05] rounded-2xl p-6 sm:p-10 space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-white/30 block uppercase">
                    SCENARIO {currentQuestion.id}
                  </span>
                  <h2 className="text-base sm:text-lg font-semibold leading-relaxed text-white">
                    {currentQuestion.text}
                  </h2>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-1 gap-3.5">
                  {currentQuestion.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className="w-full text-left glass-card border border-white/[0.06] rounded-xl p-5 hover:border-brand-purple/40 hover:bg-brand-purple/[0.02] active:bg-brand-purple/[0.04] transition-all duration-200 group flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm text-white/70 group-hover:text-white leading-normal pr-4 font-normal">
                        {opt.text}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-brand-purple group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {currentIdx > 0 && (
                  <div className="flex justify-start">
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center space-x-2 text-xs font-mono text-white/40 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Previous Question</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3: LEAD CAPTURE */}
            {step === 'capture' && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card border border-white/[0.06] rounded-2xl p-8 sm:p-12 space-y-8"
              >
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block font-semibold">
                    Assessment Complete
                  </span>
                  <h2 className="text-2xl font-black text-white uppercase tracking-wide">
                    See Your Results
                  </h2>
                  <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                    We have finished your analysis. Enter your details below to generate and secure your character card.
                  </p>
                </div>

                {formError && (
                  <div className="bg-red-950/20 border border-red-500/20 text-red-300 text-xs p-3.5 rounded-lg text-center font-mono">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/20">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Marcus Aurelius"
                        className="w-full bg-black/40 border border-white/[0.08] hover:border-white/[0.15] focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/20">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@philosophy.edu"
                        className="w-full bg-black/40 border border-white/[0.08] hover:border-white/[0.15] focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Instagram Username */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">
                      Instagram Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/20">
                        <InstagramIcon className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="marcus_aurelius"
                        className="w-full bg-black/40 border border-white/[0.08] hover:border-white/[0.15] focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center space-x-2 bg-brand-purple hover:bg-purple-600 active:bg-purple-700 text-white font-bold text-sm px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-purple-950/20 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Generating Card...' : 'Reveal My Character'}</span>
                      <Sparkles className="h-4 w-4 text-brand-gold animate-pulse" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
