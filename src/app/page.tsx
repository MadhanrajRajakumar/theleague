'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle, Check, X, ShieldAlert, Users, Target, Activity, Zap, Landmark, Award } from 'lucide-react';
import Header from '@/components/Header';

export default function LandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8] text-[#111111] antialiased">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center border-b border-border-gray overflow-hidden py-20 lg:py-28">
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/images/cohort_group.png"
            alt="Ambitious team working together"
            className="w-full h-full object-cover object-[70%_center] lg:object-[center_35%] filter transition-all duration-700"
          />
          {/* Responsive Editorial Hero Overlay */}
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-[620px] space-y-8 text-left"
          >
            <motion.div 
              variants={fadeInUp} 
              className="text-[11px] font-mono tracking-[0.2em] text-brand-purple uppercase font-bold flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse" />
              <span>Private Accountability Network</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp} 
              className="text-[28px] sm:text-[36px] lg:text-[43px] font-semibold tracking-tight leading-[1.1] text-foreground"
            >
              Most ambitious people aren't losing because they're lazy.
              <span className="text-brand-purple block mt-2">They're losing because they're alone.</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp} 
              className="text-base sm:text-lg text-foreground/70 max-w-xl leading-relaxed font-medium"
            >
              Join a small group of ambitious people who challenge each other, track progress together, and refuse to let each other quit.
            </motion.p>

            <motion.div 
              variants={fadeInUp} 
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <Link
                href="/assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-purple hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm px-8 py-4 rounded-xl transition-colors cursor-pointer"
              >
                <span>Apply For Founding Cohort</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => document.getElementById('why-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border border-border-gray hover:border-foreground/20 bg-white active:bg-gray-50 text-foreground font-semibold text-sm px-8 py-4 rounded-xl transition-colors cursor-pointer"
              >
                <span>How It Works</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why People Join */}
      <section className="py-24 border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-bold block mb-2">
              The Pains
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Why People Join The League
            </h2>
            <p className="text-sm text-foreground/50 mt-2">
              We look for people who are tired of struggling against their environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-border-gray rounded-2xl p-6 space-y-4 hover:border-brand-purple/40 transition-colors">
              <span className="text-xs font-mono text-brand-purple font-bold block">01 / CONSISTENCY</span>
              <p className="text-sm font-bold text-foreground leading-snug">
                "I know exactly what to do. I just don't do it consistently."
              </p>
            </div>
            <div className="bg-white border border-border-gray rounded-2xl p-6 space-y-4 hover:border-brand-purple/40 transition-colors">
              <span className="text-xs font-mono text-brand-purple font-bold block">02 / ENVIRONMENT</span>
              <p className="text-sm font-bold text-foreground leading-snug">
                "I don't have ambitious people around me who push me."
              </p>
            </div>
            <div className="bg-white border border-border-gray rounded-2xl p-6 space-y-4 hover:border-brand-purple/40 transition-colors">
              <span className="text-xs font-mono text-brand-purple font-bold block">03 / MOMENTUM</span>
              <p className="text-sm font-bold text-foreground leading-snug">
                "I start strong every single time, then quit halfway."
              </p>
            </div>
            <div className="bg-white border border-border-gray rounded-2xl p-6 space-y-4 hover:border-brand-purple/40 transition-colors">
              <span className="text-xs font-mono text-brand-purple font-bold block">04 / LONELINESS</span>
              <p className="text-sm font-bold text-foreground leading-snug">
                "I am tired of fighting and building everything alone."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why The League Works */}
      <section id="why-works" className="py-24 border-b border-border-gray bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
                  The Mechanism
                </span>
                <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                  Why The League Works
                </h2>
                <p className="text-base text-foreground/70 leading-relaxed">
                  This isn't another chat group. Members make commitments. Progress is visible. Excuses are visible.
                </p>
                <p className="text-sm font-bold text-brand-purple">
                  Larger groups create spectators. Smaller groups create responsibility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                    <span>Small Groups</span>
                  </h4>
                  <p className="text-xs text-foreground/50 leading-relaxed">
                    We match members into highly focused cohorts of 4-5 complementary roles.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                    <span>Clear Sprints</span>
                  </h4>
                  <p className="text-xs text-foreground/50 leading-relaxed">
                    No generic tracking. You set and report specific weekly actions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                    <span>Visible Progress</span>
                  </h4>
                  <p className="text-xs text-foreground/50 leading-relaxed">
                    Proof-based reporting where peers verify your execution weekly.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                    <span>Real Consequences</span>
                  </h4>
                  <p className="text-xs text-foreground/50 leading-relaxed">
                    Repeated failure to execute leads to immediate removal from the cohort.
                  </p>
                </div>
              </div>
            </div>

            {/* Muted image of isolation */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="relative w-full aspect-4/3 rounded-2xl border border-border-gray bg-[#FAFAF8] p-2">
                <img
                  src="/images/isolated_person.png"
                  alt="Person working alone at desk at night"
                  className="w-full h-full object-cover rounded-lg filter grayscale contrast-110"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Environment vs Information (Philosophical centerpiece) */}
      <section className="py-28 border-b border-border-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.2] max-w-3xl mx-auto">
            Most self-improvement advice focuses on information.<br /><br />
            The League focuses on <span className="text-brand-purple">environment</span>.
          </p>
          <div className="h-px w-16 bg-brand-purple/20 mx-auto my-8" />
          <p className="text-lg sm:text-xl font-bold text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Information tells you what to do.<br />
            Environment determines whether you actually do it.
          </p>
        </div>
      </section>

      {/* Inside The League (Largest visual centerpiece section) */}
      <section className="py-24 border-b border-border-gray bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
              The Product Mockup
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Inside The League
            </h2>
            <p className="text-sm text-foreground/50 max-w-xl mx-auto">
              A clean, real-time dashboard showing cohort commitments and progress status.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Cohort Status Board Mockup */}
            <div className="lg:col-span-8 bg-[#FAFAF8] border border-border-gray rounded-2xl p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border-gray">
                  <div>
                    <h3 className="font-semibold text-base uppercase text-foreground">Cohort #001 Status Board</h3>
                    <p className="text-[10px] text-foreground/40 font-mono mt-0.5">CYCLE 12 - WEEK 3</p>
                  </div>
                  <span className="text-[10px] font-mono bg-brand-purple/10 border border-brand-purple/20 px-2 py-0.5 rounded text-brand-purple font-bold">
                    Active Cohort
                  </span>
                </div>

                {/* Aarav - Green */}
                <div className="border border-border-gray bg-white rounded-xl p-5 space-y-4 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">Aarav — Software Engineer</h4>
                      <p className="text-[10px] text-foreground/50">Focus: Technical Architecture & Career Advancement</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase bg-green-100 border border-green-200 text-green-700 font-bold px-2 py-0.5 rounded">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span>Green Status</span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-foreground/75 font-semibold">Fitness</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-foreground/75 font-semibold">Mind</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-foreground/75 font-semibold">Money</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-foreground/75 font-semibold">Connection</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-foreground/50 italic border-t border-border-gray/40 pt-2 font-mono">
                    Aarav's Commitment: "Completed 4 workouts, wrote 2 engineering blog posts, logged 12 hrs coding."
                  </p>
                </div>

                {/* Karthik - Yellow */}
                <div className="border border-border-gray bg-white rounded-2xl p-5 space-y-4 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">Karthik — UPSC Aspirant</h4>
                      <p className="text-[10px] text-foreground/50">Focus: Syllabus Milestone & Physical Conditioning</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase bg-yellow-100 border border-yellow-200 text-yellow-700 font-bold px-2 py-0.5 rounded">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                        <span>Yellow Status</span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-foreground/75 font-semibold">Fitness</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-foreground/75 font-semibold">Mind</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <X className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span className="text-foreground/40 line-through">Money</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-foreground/75 font-semibold">Connection</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-foreground/50 italic border-t border-border-gray/40 pt-2 font-mono">
                    Karthik's Commitment: "Missed UPSC history study target (4/6 hrs finished). Gym and sleep goals completed."
                  </p>
                </div>

                {/* Rahul - Red */}
                <div className="border border-border-gray bg-white rounded-2xl p-5 space-y-4 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">Rahul — Founder</h4>
                      <p className="text-[10px] text-foreground/50">Focus: Private Beta Launch & Customer Acquisition</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase bg-red-100 border border-red-200 text-red-700 font-bold px-2 py-0.5 rounded">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        <span>Red Status</span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <X className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span className="text-foreground/40 line-through font-semibold">Fitness</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-foreground/75 font-semibold">Mind</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <X className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span className="text-foreground/40 line-through font-semibold">Money</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FAFAF8] border border-border-gray/50 p-2 rounded">
                      <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-foreground/75 font-semibold">Connection</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-foreground/50 italic border-t border-border-gray/40 pt-2 font-mono">
                    Rahul's Commitment: "Missed fitness (0/3 workouts) and money (called 1/5 sales prospects). Too busy building product."
                  </p>
                </div>
              </div>

              {/* Removal Rule below mockup */}
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <h5 className="text-xs font-semibold text-red-800 uppercase font-mono tracking-wider">Removal Penalty</h5>
                  <p className="text-[11px] text-red-700/85 leading-relaxed mt-0.5 font-semibold">
                    3 consecutive Red weeks = Removal from cohort
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Why It Works Callout & Wednesday check-in details */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              
              {/* Wednesday check-in details */}
              <div className="bg-white border border-border-gray rounded-2xl p-6 space-y-4 flex-1">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-purple">
                  Wednesday Audit Details
                </h4>
                <div className="space-y-4 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-[9px] text-foreground/40 uppercase block">1. What did you commit to?</span>
                    <p className="text-foreground font-semibold leading-normal">
                      Specific, high-impact actions logged before Monday 00:00.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-foreground/40 uppercase block">2. What did you finish?</span>
                    <p className="text-foreground font-semibold leading-normal">
                      Completed tasks supported by raw, verifiable proof files.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-foreground/40 uppercase block">3. What blocked you?</span>
                    <p className="text-foreground font-semibold leading-normal">
                      No excuses allowed. If you miss, it is logged publicly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why It Works callout box */}
              <div className="bg-brand-purple/5 border border-brand-purple/15 rounded-2xl p-6 space-y-3">
                <h4 className="text-sm font-semibold text-brand-purple uppercase tracking-wider">
                  Why It Works
                </h4>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-semibold">
                  Most people break promises because nobody notices. <br /><br />
                  Inside a cohort, commitments are visible. Progress is visible. Disappearing is visible. <br /><br />
                  That's what creates accountability.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* What Changes If You Stay For A Year? */}
      <section className="py-24 border-b border-border-gray bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-bold block mb-2">
              The Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              What Changes If You Stay For A Year?
            </h2>
            <p className="text-sm text-foreground/50 mt-2">
              Results aren't handed to you. They are earned week by week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2 border-l-2 border-brand-purple/20 pl-4 py-1">
              <h4 className="text-base font-semibold text-foreground tracking-tight">1. Keep Promises</h4>
              <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                You keep more promises to yourself.
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-brand-purple/20 pl-4 py-1">
              <h4 className="text-base font-semibold text-foreground tracking-tight">2. End Avoidance</h4>
              <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                You stop quitting halfway.
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-brand-purple/20 pl-4 py-1">
              <h4 className="text-base font-semibold text-foreground tracking-tight">3. Elite Cohort</h4>
              <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                You build relationships with ambitious people.
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-brand-purple/20 pl-4 py-1">
              <h4 className="text-base font-semibold text-foreground tracking-tight">4. Compound Growth</h4>
              <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                You create momentum that compounds.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center pt-8 border-t border-border-gray/50">
            <p className="text-sm font-bold text-foreground/50 italic">
              "Most people dramatically underestimate how much their environment changes their future."
            </p>
          </div>
        </div>
      </section>

      {/* Who You'll Meet */}
      <section className="py-24 border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
              The Peer Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Who You'll Meet
            </h2>
            <p className="text-sm text-foreground/50">
              We group members into complementary dynamics. These are four core profiles in every cohort.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
            
            {/* Creator */}
            <div className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 flex flex-col h-full space-y-4 text-left">
              <div className="relative w-full aspect-square flex items-center justify-center bg-[#FAFAF8] rounded-xl border border-border-gray p-3 sm:p-4 overflow-hidden shrink-0">
                <img 
                  src="/images/creator.png" 
                  alt="Creator Archetype Mascot"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col flex-1 text-left space-y-1">
                <h4 className="text-lg sm:text-xl font-semibold text-[#111111] tracking-tight">
                  Creator
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  Generates ideas and starts projects at high velocity. Drives raw action but benefits from systems and peers to avoid quitting halfway.
                </p>
              </div>
            </div>

            {/* Connector */}
            <div className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 flex flex-col h-full space-y-4 text-left">
              <div className="relative w-full aspect-square flex items-center justify-center bg-[#FAFAF8] rounded-xl border border-border-gray p-3 sm:p-4 overflow-hidden shrink-0">
                <img 
                  src="/images/connector.png" 
                  alt="Connector Archetype Mascot"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col flex-1 text-left space-y-1">
                <h4 className="text-lg sm:text-xl font-semibold text-[#111111] tracking-tight">
                  Connector
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  Unites diverse groups and creates opportunities naturally. Drives trust but needs focused personal boundaries to hit their own benchmarks.
                </p>
              </div>
            </div>

            {/* Thinker */}
            <div className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 flex flex-col h-full space-y-4 text-left">
              <div className="relative w-full aspect-square flex items-center justify-center bg-[#FAFAF8] rounded-xl border border-border-gray p-3 sm:p-4 overflow-hidden shrink-0">
                <img 
                  src="/images/thinker.png" 
                  alt="Thinker Archetype Mascot"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col flex-1 text-left space-y-1">
                <h4 className="text-lg sm:text-xl font-semibold text-[#111111] tracking-tight">
                  Thinker
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  Identifies risks, analyzes systems, and foresees structural flaws. Brings logic and clarity but needs builders to avoid execution delays.
                </p>
              </div>
            </div>

            {/* Warrior */}
            <div className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 flex flex-col h-full space-y-4 text-left">
              <div className="relative w-full aspect-square flex items-center justify-center bg-[#FAFAF8] rounded-xl border border-border-gray p-3 sm:p-4 overflow-hidden shrink-0">
                <img 
                  src="/images/warrior.png" 
                  alt="Warrior Archetype Mascot"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col flex-1 text-left space-y-1">
                <h4 className="text-lg sm:text-xl font-semibold text-[#111111] tracking-tight">
                  Warrior
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  Maintains absolute discipline, daily routines, and execution grit. Pushes through fatigue but needs direction-first peers to keep on track.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center border-t border-border-gray/50 pt-8 space-y-1">
            <p className="text-sm font-bold text-foreground">Different goals. Same standard.</p>
            <p className="text-xs text-foreground/50">Nobody cares where you're starting. Everyone cares whether you follow through.</p>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-24 border-b border-border-gray bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
                  The Dashboard Metrics
                </span>
                <h3 className="text-3xl font-semibold text-foreground tracking-tight">
                  What We Measure Every Week (The Four Pillars)
                </h3>
                <p className="text-sm text-foreground/50">
                  Every member submits proof in all four pillars weekly.
                </p>
                <p className="text-sm font-bold text-brand-purple">
                  The goal isn't perfection. The goal is becoming the kind of person who keeps promises.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-red-100 border border-red-200 rounded-lg flex items-center justify-center text-red-600">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Fitness</h4>
                    <p className="text-xs text-foreground/50 leading-relaxed mt-1">Become stronger, healthier, and more energetic.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center text-blue-600">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Mind</h4>
                    <p className="text-xs text-foreground/50 leading-relaxed mt-1">Learn, think, and improve your decision making.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-yellow-100 border border-yellow-200 rounded-lg flex items-center justify-center text-brand-gold">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Money</h4>
                    <p className="text-xs text-foreground/50 leading-relaxed mt-1">Advance your career, business, or income.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-purple-100 border border-brand-purple/20 rounded-lg flex items-center justify-center text-brand-purple">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Connection</h4>
                    <p className="text-xs text-foreground/50 leading-relaxed mt-1">Build relationships that create opportunities.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="bg-[#FAFAF8] border border-border-gray rounded-2xl p-6 w-full space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                  Rule Metrics Definition
                </h4>
                <div className="space-y-3 font-mono text-xs text-foreground/75">
                  <div className="flex justify-between border-b border-border-gray/50 pb-2">
                    <span>Target Goal</span>
                    <span>100% Weekly Commit</span>
                  </div>
                  <div className="flex justify-between border-b border-border-gray/50 pb-2">
                    <span>Audit Cycle</span>
                    <span>Wednesday 20:00</span>
                  </div>
                  <div className="flex justify-between border-b border-border-gray/50 pb-2">
                    <span>Failure Warning</span>
                    <span>1 target missed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consequence</span>
                    <span className="text-red-600 font-bold">Removal</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Growth Roadmap */}
      <section className="py-24 border-b border-border-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
              The Journey
            </span>
            <h3 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Growth Roadmap
            </h3>
          </div>

          <div className="relative border-l border-border-gray ml-4 md:ml-32 space-y-12">
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-3.5 top-1 h-7 w-7 rounded-full bg-brand-purple flex items-center justify-center text-white font-mono text-xs font-semibold">1</div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Application Reviewed</h4>
              <p className="text-xs text-foreground/50 mt-1 leading-relaxed">
                Your fit-check data, discipline metrics, and commitments are analyzed to verify suitability.
              </p>
            </div>
            
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-3.5 top-1 h-7 w-7 rounded-full bg-brand-purple flex items-center justify-center text-white font-mono text-xs font-semibold">2</div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Founding Cohort Assignment</h4>
              <p className="text-xs text-foreground/50 mt-1 leading-relaxed">
                You are matched into a private squad of 4-5 complementary roles (Founder, Engineer, Athlete, Builder).
              </p>
            </div>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-3.5 top-1 h-7 w-7 rounded-full bg-brand-purple flex items-center justify-center text-white font-mono text-xs font-semibold">3</div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Weekly Accountability Sprints</h4>
              <p className="text-xs text-foreground/50 mt-1 leading-relaxed">
                Execute specific weekly targets in the four pillars. Progress is validated with proof files by cohort peers.
              </p>
            </div>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-3.5 top-1 h-7 w-7 rounded-full bg-brand-purple flex items-center justify-center text-white font-mono text-xs font-semibold">4</div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">League Promotion Opportunities</h4>
              <p className="text-xs text-foreground/50 mt-1 leading-relaxed">
                Maintain consistency to earn promotions, join higher-tier cohorts, and access restricted peer networks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note + Photo (Merged trust section) */}
      <section className="py-24 border-b border-border-gray bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Founder Photo */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full aspect-square max-w-[340px] rounded-2xl border border-border-gray bg-[#FAFAF8] p-2">
                <img
                  src="/images/founder_portrait.png"
                  alt="Founder of The League"
                  className="w-full h-full object-cover rounded-lg filter grayscale"
                />
              </div>
            </div>

            {/* Note text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
                Conviction
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Founder's Note
              </h3>
              <div className="text-sm text-foreground/75 leading-relaxed space-y-4 font-medium italic">
                <p>
                  "For years I kept trying to improve myself by myself.
                </p>
                <p className="pl-4 border-l-2 border-brand-purple/20">
                  More books.<br />
                  More videos.<br />
                  More plans.
                </p>
                <p>
                  The problem wasn't information.
                </p>
                <p>
                  The problem was that nobody around me cared whether I followed through.
                </p>
                <p className="pl-4 border-l-2 border-brand-purple/20">
                  Nobody checked.<br />
                  Nobody asked.<br />
                  Nobody noticed.
                </p>
                <p>
                  The League started from a simple idea:
                </p>
                <p className="text-brand-purple font-bold">
                  What happens when ambitious people stop trying to do hard things alone?"
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why We're Starting Small */}
      <section className="py-24 border-b border-border-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-bold block">
            Quality Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            Why We're Starting Small
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed max-w-xl mx-auto font-medium">
            Most communities die because they grow too fast.<br /><br />
            We're intentionally starting with a small number of founding members. The goal isn't to build the biggest community. It's to build the strongest one.
          </p>
        </div>
      </section>

      {/* Do Not Apply If */}
      <section className="py-20 border-b border-border-gray bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-red-200 bg-red-50/30 rounded-2xl p-8 space-y-6">
            <h4 className="text-lg font-semibold text-red-700 uppercase tracking-wider flex items-center gap-2 font-mono">
              <ShieldAlert className="h-5 w-5 text-red-600" />
              <span>Do Not Apply If</span>
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-red-800/90 font-semibold leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 shrink-0 font-bold">✗</span>
                <span>You're looking for motivation instead of accountability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 shrink-0 font-bold">✗</span>
                <span>You want to consume instead of contribute.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 shrink-0 font-bold">✗</span>
                <span>You aren't willing to report progress honestly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 shrink-0 font-bold">✗</span>
                <span>You don't want your commitments challenged by peers.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Find out if you're a fit.
          </h2>
          <p className="text-sm text-foreground/50 max-w-lg mx-auto">
            Take the 2-minute Fit Check, complete your Cohort Application, and secure your place.
          </p>
          <div>
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center space-x-2 bg-brand-purple hover:bg-purple-700 active:bg-purple-800 text-white font-semibold text-sm px-10 py-4.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>Apply For Founding Cohort</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="text-[10px] font-mono text-foreground/30 pt-8 border-t border-border-gray flex justify-between items-center">
            <span>© 2026 THE LEAGUE. ALL RIGHTS RESERVED.</span>
            <span>V1.0 COHORT SCREENING SPEC</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
