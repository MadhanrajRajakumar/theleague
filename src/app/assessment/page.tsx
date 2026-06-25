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
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-[#8A8880] antialiased">
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
                className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-8 sm:p-12 text-center space-y-8"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C]">
                  <ShieldAlert className="h-6 w-6" />
                </div>

                <div className="space-y-4">
                  <h1 className="font-barlow font-extrabold text-3xl sm:text-4xl tracking-tight text-[#F2F0EB] uppercase">
                    Be completely honest with yourself.
                  </h1>
                  <div className="space-y-3 text-base text-[#8A8880] leading-relaxed font-normal max-w-md mx-auto">
                    <p>This is not a personality test.</p>
                    <p>There are no good or bad scores here.</p>
                    <p>Just choose the answer that feels closest to your daily reality.</p>
                    <p className="text-[#C9A84C] font-semibold">Nobody else is watching.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={startAssessment}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#C9A84C] hover:bg-[#b0913c] text-[#0D0D0D] font-sans font-semibold text-sm px-8 py-3.5 rounded-[6px] transition-colors cursor-pointer"
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
                  <div className="flex justify-between items-center text-xs font-mono text-[#555]">
                    <span className="uppercase tracking-[2px] font-bold text-[#C9A84C]">
                      FIT CHECK {currentQuestion.id} OF {QUESTIONS.length}
                    </span>
                    <span className="font-bold">{Math.round(progressPercent)}% COMPLETE</span>
                  </div>
                  <div className="w-full h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${progressPercent}%` }}
                      className="h-full bg-[#C9A84C] rounded-full transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Scenario details title (Introspective, raw text) */}
                <div className="py-2">
                  <h2 className="font-barlow font-extrabold text-2xl sm:text-3xl leading-snug text-[#F2F0EB] uppercase">
                    {currentQuestion.text}
                  </h2>
                </div>

                {/* Answer Options (Clickable border-based cards) */}
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className="w-full text-left bg-[#161616] border border-[#2A2A2A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/[0.02] active:bg-[#C9A84C]/5 rounded-[6px] p-5 transition-all duration-200 group flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-base sm:text-lg text-[#F2F0EB] font-sans font-normal leading-relaxed pr-4">
                        {opt.text}
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#8A8880] group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {currentIdx > 0 && (
                  <div className="flex justify-start">
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center space-x-2 text-xs font-mono text-[#8A8880] hover:text-[#F2F0EB] transition-colors duration-200 cursor-pointer"
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
                className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-8 sm:p-12 space-y-8"
              >
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-[2px] text-[#C9A84C] uppercase block font-bold">
                    Screening Complete
                  </span>
                  <h2 className="font-barlow font-extrabold text-2xl sm:text-3xl text-[#F2F0EB] tracking-tight uppercase">
                    Founding Cohort Application
                  </h2>
                  <p className="font-sans text-sm text-[#8A8880] max-w-sm mx-auto leading-relaxed">
                    We manually review every entry. The goal isn't to build the biggest community. It's to build the strongest one.
                  </p>
                </div>

                {formError && (
                  <div className="bg-[#A33B3B]/10 border border-[#A33B3B]/30 text-[#F2F0EB] text-xs p-3.5 rounded-[6px] text-center font-mono font-bold">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Name field (optional) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-[2px] text-[#C9A84C] block font-bold">
                      Name <span className="text-[#8A8880]/60 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#555]">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Marcus Aurelius"
                        className="w-full h-12 bg-[#0D0D0D] border border-[#2A2A2A] hover:border-[#8A8880]/30 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] rounded-[6px] pl-10 pr-4 text-sm text-[#F2F0EB] placeholder-[#555] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email field (required) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-[2px] text-[#C9A84C] block font-bold">
                      Email Address <span className="text-[#A33B3B] font-bold">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#555]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@philosophy.edu"
                        className="w-full h-12 bg-[#0D0D0D] border border-[#2A2A2A] hover:border-[#8A8880]/30 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] rounded-[6px] pl-10 pr-4 text-sm text-[#F2F0EB] placeholder-[#555] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Instagram Username (optional) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-[2px] text-[#C9A84C] block font-bold">
                      Instagram Username <span className="text-[#8A8880]/60 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#555]">
                        <InstagramIcon className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="marcus_aurelius"
                        className="w-full h-12 bg-[#0D0D0D] border border-[#2A2A2A] hover:border-[#8A8880]/30 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] rounded-[6px] pl-10 pr-4 text-sm text-[#F2F0EB] placeholder-[#555] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-[#C9A84C] hover:bg-[#b0913c] text-[#0D0D0D] font-sans font-semibold text-sm px-6 py-3.5 rounded-[6px] transition-colors cursor-pointer"
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
                className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-8 sm:p-12 space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-[2px] text-[#C9A84C] uppercase block font-bold">
                    Survey Step 1 of 2
                  </span>
                  <h2 className="font-barlow font-extrabold text-xl sm:text-2xl text-[#F2F0EB] uppercase tracking-tight">
                    What is your biggest reason for applying?
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    "I struggle to stay consistent with my workouts",
                    "I don't have dedicated training partners around me",
                    "I want strict fitness accountability",
                    "I want faster athletic and fitness progression",
                    "I feel like I'm training and planning in isolation",
                    "Other"
                  ].map((reasonOption, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleReasonSelect(reasonOption)}
                      className="w-full text-left bg-[#161616] border border-[#2A2A2A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/[0.02] active:bg-[#C9A84C]/5 rounded-[6px] p-4 transition-all duration-200 group flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-sm sm:text-base text-[#F2F0EB] font-sans font-semibold">
                        {reasonOption}
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#8A8880] group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all shrink-0" />
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
                className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-8 sm:p-12 space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-[2px] text-[#C9A84C] uppercase block font-bold">
                    Founding Cohort Application
                  </span>
                  <h2 className="font-barlow font-extrabold text-xl sm:text-2xl text-[#F2F0EB] uppercase tracking-tight">
                    Before submitting, answer one question:
                  </h2>
                  <p className="font-sans text-xs text-[#8A8880] leading-relaxed max-w-md mx-auto font-medium">
                    What is the biggest goal you're actively working toward right now?
                  </p>
                </div>

                {formError && (
                  <div className="bg-[#A33B3B]/10 border border-[#A33B3B]/30 text-[#F2F0EB] text-xs p-3.5 rounded-[6px] text-center font-mono font-bold">
                    {formError}
                  </div>
                )}

                {isSubmitting ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="animate-spin h-8 w-8 border-2 border-[#C9A84C] border-t-transparent rounded-full" />
                    <span className="font-mono text-xs uppercase text-[#8A8880] tracking-wider font-bold">Submitting Application...</span>
                  </div>
                ) : (
                  <form onSubmit={handleGoalSubmit} className="space-y-6">
                    {/* Examples Helper Block */}
                    <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/10 rounded-[8px] p-5 space-y-2">
                      <span className="text-[9px] font-mono text-[#C9A84C] uppercase tracking-widest block font-bold">Examples:</span>
                      <div className="flex flex-wrap gap-2">
                        {["Lose 10 kg", "Run a sub-22min 5k", "Bench press bodyweight", "Log 4 workouts/week", "Limit sugar intake", "Consistency for 90 days"].map((ex, i) => (
                          <span key={i} className="text-[10px] font-mono bg-[#0D0D0D] border border-[#2A2A2A] text-[#8A8880] px-2 py-0.5 rounded">
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
                        placeholder="e.g. Run a sub-22min 5k by the end of this season..."
                        className="w-full bg-[#0D0D0D] border border-[#2A2A2A] hover:border-[#8A8880]/30 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] rounded-[6px] p-4 text-sm text-[#F2F0EB] placeholder-[#555] outline-none transition-all resize-none"
                      />
                    </div>

                    <p className="text-[10px] text-[#555] text-center italic font-mono font-medium">
                      This helps us understand who should be grouped together.
                    </p>

                    <div>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center space-x-2 bg-[#C9A84C] hover:bg-[#b0913c] text-[#0D0D0D] font-sans font-semibold text-sm px-6 py-3.5 rounded-[6px] transition-colors cursor-pointer"
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
