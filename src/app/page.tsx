'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Shield, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Users, 
  Layers, 
  HelpCircle,
  Award
} from 'lucide-react';
import Header from '@/components/Header';
import CharacterCard from '@/components/CharacterCard';

export default function LandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030303]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-white/[0.04]">
        {/* Glow Backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/70">
                  Identity Engine V1 is Live
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp} 
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white"
              >
                Stop Building Your <br />
                <span className="text-gradient-gold-full">Future Alone</span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp} 
                className="text-base sm:text-lg text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                Discover your archetype, uncover your biggest limitation, and join ambitious people building stronger lives. This is not a habit tracker—it's your digital crucible.
              </motion.p>

              <motion.div 
                variants={fadeInUp} 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link
                  href="/assessment"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-purple hover:bg-purple-600 active:bg-purple-700 text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-purple-950/20 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Take Assessment</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => document.getElementById('preview-card')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border border-white/10 hover:border-white/20 bg-white/[0.02] active:bg-white/[0.06] text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <span>See Sample Character</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column: Interactive Character Card Demo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center"
              id="preview-card"
            >
              <div className="relative">
                {/* Visual badge highlight */}
                <div className="absolute -top-3 -left-3 z-40 bg-brand-gold text-black text-[9px] font-mono font-black px-2 py-1 rounded uppercase tracking-widest shadow-lg rotate-[-5deg]">
                  SAMPLE
                </div>
                <CharacterCard
                  name="Marcus"
                  archetype="Builder"
                  league="Gold"
                  strength="Execution"
                  limiter="Isolation"
                  quest="Connect with three ambitious people this month."
                  scores={{
                    discipline: 80,
                    execution: 95,
                    consistency: 75,
                    fitness: 60,
                    networking: 45,
                    learning: 70,
                    courage: 85,
                    builder_mindset: 90
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-black/40 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-mono tracking-widest text-brand-purple font-bold">
              The Protocol
            </h2>
            <h3 className="text-3xl font-extrabold text-white mt-2">
              How the Engine Works
            </h3>
            <p className="text-sm text-white/50 mt-3">
              Your identity is forged through choices, not descriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="glass-card rounded-2xl p-8 border border-white/[0.04] space-y-4 relative overflow-hidden">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-brand-purple font-bold text-sm">
                01
              </div>
              <h4 className="text-lg font-bold text-white">The Crucible</h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Complete 12 story-driven, high-tension behavioral questions. No obvious "good" answers. Only raw, realistic dilemmas that reveal who you actually are.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-2xl p-8 border border-white/[0.04] space-y-4 relative overflow-hidden">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-brand-gold font-bold text-sm">
                02
              </div>
              <h4 className="text-lg font-bold text-white">Unveil Your Profile</h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Unlock your dominant archetype, evaluate your League Rank, map your greatest asset, and pinpoint the specific bottleneck limiting your progress.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-2xl p-8 border border-white/[0.04] space-y-4 relative overflow-hidden">
              <div className="h-10 w-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">
                03
              </div>
              <h4 className="text-lg font-bold text-white">Begin Your Quest</h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Accept a single, custom action-oriented challenge tailored to destroy your primary limit. Secure your founding membership spot on the exclusive waitlist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Archetypes Preview Section */}
      <section className="py-24 border-b border-white/[0.04] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-mono tracking-widest text-brand-gold font-bold">
              The Archetypes
            </h2>
            <h3 className="text-3xl font-extrabold text-white mt-2">
              The Four Paths of Ambition
            </h3>
            <p className="text-sm text-white/50 mt-3">
              Every member belongs to one of four baseline roles in V1.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Builder */}
            <div className="glass-card rounded-xl p-6 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs mb-4">
                BLD
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Builder</h4>
              <p className="text-xs text-white/40 font-mono mt-1">Focus: Creation & Momentum</p>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/40">Strength:</span>
                  <span className="text-purple-300 font-semibold">Execution</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Limiter:</span>
                  <span className="text-red-400 font-semibold">Isolation</span>
                </div>
              </div>
            </div>

            {/* Warrior */}
            <div className="glass-card rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/20 transition-all duration-300">
              <div className="h-8 w-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 font-bold text-xs mb-4">
                WAR
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Warrior</h4>
              <p className="text-xs text-white/40 font-mono mt-1">Focus: Discipline & Energy</p>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/40">Strength:</span>
                  <span className="text-yellow-300 font-semibold">Self-Control</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Limiter:</span>
                  <span className="text-red-400 font-semibold">Tunnel Vision</span>
                </div>
              </div>
            </div>

            {/* Strategist */}
            <div className="glass-card rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/20 transition-all duration-300">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs mb-4">
                STR
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Strategist</h4>
              <p className="text-xs text-white/40 font-mono mt-1">Focus: Planning & Knowledge</p>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/40">Strength:</span>
                  <span className="text-indigo-300 font-semibold">Thinking</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Limiter:</span>
                  <span className="text-red-400 font-semibold">Over-analysis</span>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="glass-card rounded-xl p-6 border border-pink-500/10 hover:border-pink-500/20 transition-all duration-300">
              <div className="h-8 w-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 font-bold text-xs mb-4">
                CON
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Connector</h4>
              <p className="text-xs text-white/40 font-mono mt-1">Focus: Relationships & Network</p>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/40">Strength:</span>
                  <span className="text-pink-300 font-semibold">Influence</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Limiter:</span>
                  <span className="text-red-400 font-semibold">Focus</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* League System Preview */}
      <section className="py-24 bg-black/30 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-brand-purple font-bold">
                Competitive Identity
              </h2>
              <h3 className="text-3xl font-extrabold text-white">
                The League Ranking System
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Your character is assigned a League Rank based on the overall strength of your 8 hidden attributes. Bronze, Silver, Gold, Platinum, or Diamond. It represents your holistic level of compound operational efficiency.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs">
                  <Award className="h-4 w-4 text-brand-gold" />
                  <span className="text-white/70">Bronze & Silver: Operational Stability</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <Award className="h-4 w-4 text-brand-purple" />
                  <span className="text-white/70">Gold & Platinum: High Leverage Execution</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <Award className="h-4 w-4 text-white" />
                  <span className="text-white/70">Diamond: Elite Consistency & Courage</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 border border-white/[0.04] grid grid-cols-5 gap-3 text-center">
              {['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'].map((rank, i) => (
                <div 
                  key={rank} 
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border ${
                    i === 2 
                      ? 'border-brand-gold bg-yellow-500/[0.03] scale-105 shadow-[0_0_20px_rgba(251,191,36,0.08)]' 
                      : 'border-white/[0.04] bg-white/[0.01]'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${
                    rank === 'Diamond' ? 'text-white' : 
                    rank === 'Platinum' ? 'text-purple-300' : 
                    rank === 'Gold' ? 'text-brand-gold' : 
                    rank === 'Silver' ? 'text-zinc-400' : 'text-amber-800'
                  }`}>
                    {rank[0]}
                  </span>
                  <span className="text-[10px] font-semibold text-white/80 mt-2">
                    {rank}
                  </span>
                  <span className="text-[8px] font-mono text-white/30 mt-1">
                    {i === 0 ? '0-39' : i === 1 ? '40-59' : i === 2 ? '60-74' : i === 3 ? '75-89' : '90+'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-b border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase font-mono tracking-widest text-brand-purple font-bold">
              Clarifications
            </h2>
            <h3 className="text-3xl font-extrabold text-white mt-2">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-xl p-6 border border-white/[0.04]">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-brand-purple shrink-0" />
                <span>Is this another productivity or habit app?</span>
              </h4>
              <p className="text-xs text-white/50 mt-2 pl-6 leading-relaxed">
                Absolutely not. We do not track habits, store todos, or send notifications. The League is an identity-driven evaluation system designed to reveal who you are, isolate your biggest friction point, and connect you with high-potential builders.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 border border-white/[0.04]">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-brand-purple shrink-0" />
                <span>What do the questions evaluate?</span>
              </h4>
              <p className="text-xs text-white/50 mt-2 pl-6 leading-relaxed">
                We evaluate 8 core characteristics: Discipline, Execution, Consistency, Fitness, Networking, Learning, Courage, and Builder Mindset. The questions place you in real life dilemmas where choices have consequences.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 border border-white/[0.04]">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-brand-purple shrink-0" />
                <span>What happens when I join the waitlist?</span>
              </h4>
              <p className="text-xs text-white/50 mt-2 pl-6 leading-relaxed">
                By joining the waitlist, you register your identity profile. As the first League cohorts begin to form, members are grouped based on complementary strengths and limiters to foster high-resonance peer accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="py-20 bg-black/60 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Uncover Your Identity Profile
          </h2>
          <p className="text-sm text-white/50 max-w-lg mx-auto">
            Step into the crucible. Answer with absolute honesty. Discover your archetype and secure your place.
          </p>
          <div>
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm px-10 py-4.5 rounded-xl transition-all duration-300 shadow-xl shadow-purple-950/20 hover:scale-[1.02] cursor-pointer"
            >
              <span>Begin Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="text-[10px] font-mono text-white/20 pt-8 border-t border-white/[0.04] flex justify-between items-center">
            <span>© 2026 THE LEAGUE. ALL RIGHTS RESERVED.</span>
            <span>IDENTITY ENGINE V1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
