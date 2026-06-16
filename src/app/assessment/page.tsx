'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldAlert, Sparkles, User, Mail } from 'lucide-react';
import Header from '@/components/Header';
import { QUESTIONS, calculateResults } from '@/lib/questions';
import { createAssessment, saveAnswer, submitWaitlist, completeAssessment } from '@/lib/supabase';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
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
  const [step, setStep] = useState<'intro' | 'questions' | 'capture' | 'reason' | 'goal'>('intro');
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

  // Application reasons and goals state
  const [reasonForJoining, setReasonForJoining] = useState('');
  const [primaryGoalInput, setPrimaryGoalInput] = useState('');

  // Start timer ref
  const startTimeRef = useRef<number | null>(null);

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
    // Record start time
    startTimeRef.current = Date.now();

    try {
      // Gather metadata
      const searchParams = new URLSearchParams(window.location.search);
      const utmParams = {
        source: searchParams.get('utm_source') || null,
        medium: searchParams.get('utm_medium') || null,
        campaign: searchParams.get('utm_campaign') || null
      };
      const contentId = searchParams.get('content_id') || null;
      const referrer = document.referrer || null;
      
      // Classify device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const deviceType = isMobile ? 'mobile' : 'desktop';

      const assId = await createAssessment(sessionId, utmParams, referrer, deviceType, contentId);
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

    const question = QUESTIONS[currentIdx];
    const option = question.options[optionIndex];
    const optionKey = String.fromCharCode(65 + optionIndex); // 0 -> A, 1 -> B, etc.

    if (assessmentId) {
      try {
        await saveAnswer(assessmentId, question.id, optionKey, option.text);
      } catch (err) {
        console.error("Failed to save answer progress:", err);
      }
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // ONLY email is mandatory
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return setFormError('A valid email address is required.');
    }

    setStep('reason');
  };

  const handleReasonSelect = (selectedReason: string) => {
    setReasonForJoining(selectedReason);
    setStep('goal');
  };

  const handleGoalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryGoalInput.trim()) {
      return setFormError("Please enter the biggest goal you are working toward right now.");
    }
    setIsSubmitting(true);
    setFormError('');

    try {
      const results = calculateResults(answers);
      const completionSeconds = startTimeRef.current 
        ? Math.round((Date.now() - startTimeRef.current) / 1000) 
        : 0;

      // Complete screening record
      await completeAssessment(assessmentId, results, completionSeconds);

      // Submit Founding Application details
      await submitWaitlist({
        assessmentId,
        name: name.trim() || undefined,
        email: email.trim().toLowerCase(),
        instagram: instagram.trim() ? instagram.trim().replace('@', '') : undefined,
        reasonForJoining: reasonForJoining,
        primaryGoal: primaryGoalInput.trim()
      });

      sessionStorage.setItem('the_league_results', JSON.stringify({
        ...results,
        name: name.trim(),
        assessmentId
      }));

      router.push('/results');
    } catch (err) {
      console.error("Failed to complete founding cohort application:", err);
      setFormError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const currentQuestion = QUESTIONS[currentIdx];
  const progressPercent = ((currentIdx) / QUESTIONS.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8] text-[#111111] antialiased">
      <Header />

      <main className="flex-1 flex flex-col justify-center px-4 py-12">
        {/* Centered Narrow Container */}
        <div className="w-full max-w-[720px] mx-auto space-y-8">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: INTRO AGREEMENT */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 text-center space-y-8 shadow-sm"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                  <ShieldAlert className="h-6 w-6" />
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                    Be completely honest with yourself.
                  </h1>
                  <div className="space-y-3 text-base text-[#6B7280] leading-relaxed font-normal max-w-md mx-auto">
                    <p>This is not a personality test.</p>
                    <p>There are no good or bad scores here.</p>
                    <p>Just choose the answer that feels closest to your daily reality.</p>
                    <p className="text-[#111111] font-semibold">Nobody else is watching.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={startAssessment}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-purple hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Start Fit Check</span>
                    <Sparkles className="h-4 w-4" />
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
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-8"
              >
                {/* Progress tracker metadata (Locked top alignment) */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-[#6B7280]">
                    <span className="uppercase tracking-widest font-bold">
                      FIT CHECK {currentQuestion.id} OF {QUESTIONS.length}
                    </span>
                    <span className="font-bold">{Math.round(progressPercent)}% COMPLETE</span>
                  </div>
                  <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${progressPercent}%` }}
                      className="h-full bg-brand-purple rounded-full transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Scenario details title (Introspective, raw text) */}
                <div className="py-2">
                  <h2 className="text-2xl sm:text-3xl font-semibold leading-snug text-foreground">
                    {currentQuestion.text}
                  </h2>
                </div>

                {/* Answer Options (Clickable border-based cards) */}
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className="w-full text-left bg-white border border-[#E5E7EB] hover:border-brand-purple hover:bg-brand-purple/[0.02] active:bg-brand-purple/5 rounded-2xl p-5 transition-all duration-200 group flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-base sm:text-lg text-foreground font-semibold leading-relaxed pr-4">
                        {opt.text}
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#6B7280] group-hover:text-brand-purple group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {currentIdx > 0 && (
                  <div className="flex justify-start">
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center space-x-2 text-xs font-mono text-[#6B7280] hover:text-[#111111] transition-colors duration-200 cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Previous Question</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3: CONTACT CAPTURE */}
            {step === 'capture' && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 space-y-8 shadow-sm"
              >
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A85A] uppercase block font-bold">
                    Screening Complete
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight uppercase">
                    Founding Cohort Application
                  </h2>
                  <p className="text-sm text-[#6B7280] max-w-sm mx-auto leading-relaxed">
                    We manually review every entry. The goal isn't to build the biggest community. It's to build the strongest one.
                  </p>
                </div>

                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-lg text-center font-mono font-bold">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Name field (optional) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B7280] block font-bold">
                      Name <span className="text-[#6B7280]/60 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Marcus Aurelius"
                        className="w-full h-12 bg-white border border-[#E5E7EB] hover:border-[#6B7280]/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-xl pl-10 pr-4 text-sm text-[#111111] placeholder-[#6B7280]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email field (required) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B7280] block font-bold">
                      Email Address <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@philosophy.edu"
                        className="w-full h-12 bg-white border border-[#E5E7EB] hover:border-[#6B7280]/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-xl pl-10 pr-4 text-sm text-[#111111] placeholder-[#6B7280]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Instagram Username (optional) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B7280] block font-bold">
                      Instagram Username <span className="text-[#6B7280]/60 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                        <InstagramIcon className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="marcus_aurelius"
                        className="w-full h-12 bg-white border border-[#E5E7EB] hover:border-[#6B7280]/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-xl pl-10 pr-4 text-sm text-[#111111] placeholder-[#6B7280]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-brand-purple hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: REASON SURVEY */}
            {step === 'reason' && (
              <motion.div
                key="reason"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 space-y-6 shadow-sm"
              >
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A85A] uppercase block font-bold">
                    Survey Step 1 of 2
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground uppercase tracking-tight">
                    What is your biggest reason for applying?
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    "I struggle to stay consistent",
                    "I don't have ambitious people around me",
                    "I want accountability",
                    "I want faster career/business growth",
                    "I feel like I'm doing everything alone",
                    "Other"
                  ].map((reasonOption, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleReasonSelect(reasonOption)}
                      className="w-full text-left bg-white border border-[#E5E7EB] hover:border-brand-purple hover:bg-brand-purple/[0.02] active:bg-brand-purple/5 rounded-2xl p-4 transition-all duration-200 group flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-sm sm:text-base text-foreground font-semibold">
                        {reasonOption}
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#6B7280] group-hover:text-brand-purple group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 5: GOAL SURVEY */}
            {step === 'goal' && (
              <motion.div
                key="goal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 space-y-6 shadow-sm"
              >
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A85A] uppercase block font-bold">
                    Founding Cohort Application
                  </span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground uppercase tracking-tight">
                    Before submitting, answer one question:
                  </h2>
                  <p className="text-xs text-[#6B7280] leading-relaxed max-w-md mx-auto font-medium">
                    What is the biggest goal you're actively working toward right now?
                  </p>
                </div>

                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-lg text-center font-mono font-bold">
                    {formError}
                  </div>
                )}

                {isSubmitting ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="animate-spin h-8 w-8 border-2 border-brand-purple border-t-transparent rounded-full" />
                    <span className="font-mono text-xs uppercase text-[#6B7280] tracking-wider font-bold">Submitting Application...</span>
                  </div>
                ) : (
                  <form onSubmit={handleGoalSubmit} className="space-y-6">
                    {/* Examples Helper Block (Tinted callout card style) */}
                    <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-2xl p-5 space-y-2 shadow-sm">
                      <span className="text-[9px] font-mono text-[#6B7280] uppercase tracking-widest block font-bold">Examples:</span>
                      <div className="flex flex-wrap gap-2">
                        {["Lose 15 kg", "Crack UPSC", "Get promoted", "Start a business", "Reach ₹5 lakh/month", "Build an app", "Improve my social life"].map((ex, i) => (
                          <span key={i} className="text-[10px] font-mono bg-white border border-[#E5E7EB] text-[#6B7280] px-2 py-0.5 rounded">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Text input */}
                    <div className="space-y-2">
                      <textarea
                        rows={3}
                        required
                        value={primaryGoalInput}
                        onChange={(e) => setPrimaryGoalInput(e.target.value)}
                        placeholder="e.g. Build and launch my SaaS product to 100 paying customers..."
                        className="w-full bg-white border border-[#E5E7EB] hover:border-[#6B7280]/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-xl p-4 text-sm text-[#111111] placeholder-[#6B7280]/40 outline-none transition-all resize-none"
                      />
                    </div>

                    <p className="text-[10px] text-[#6B7280] text-center italic font-mono font-medium">
                      This helps us understand who should be grouped together.
                    </p>

                    <div>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center space-x-2 bg-brand-purple hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
                      >
                        <span>Submit Application</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
