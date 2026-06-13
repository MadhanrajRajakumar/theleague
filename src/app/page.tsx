'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen bg-[#030303] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-white/[0.04]">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/70">
                  New 2-Minute Life Assessment
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp} 
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] text-white"
              >
                You already know <br />
                <span className="text-gradient-gold-full">what you should do.</span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp} 
                className="text-xl sm:text-2xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold"
              >
                So why aren't you doing it?
              </motion.p>

              <motion.p 
                variants={fadeInUp} 
                className="text-sm sm:text-base text-white/50 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                Most people don't fail because they are lazy. They fail because they are solving the wrong problem. Take the 2-minute assessment and find out what is really holding you back.
              </motion.p>

              <motion.div 
                variants={fadeInUp} 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link
                  href="/assessment"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-purple hover:bg-purple-600 active:bg-purple-700 text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-purple-950/20 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Take The 2-Minute Assessment</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => document.getElementById('preview-card')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border border-white/10 hover:border-white/20 bg-white/[0.02] active:bg-white/[0.06] text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <span>See Sample Card</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column: Card Preview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center"
              id="preview-card"
            >
              <div className="relative">
                <div className="absolute -top-3 -left-3 z-40 bg-brand-gold text-black text-[9px] font-mono font-black px-2 py-1 rounded uppercase tracking-widest shadow-lg rotate-[-5deg]">
                  SAMPLE CARD
                </div>
                <CharacterCard
                  name="Marcus"
                  archetype="Builder"
                  strength="You take action faster than most people."
                  limiter="You try to solve everything alone."
                  quest="Start one conversation you've been avoiding."
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
              The Flow
            </h2>
            <h3 className="text-3xl font-extrabold text-white mt-2">
              How It Works
            </h3>
            <p className="text-sm text-white/50 mt-3">
              Three simple steps to find out what is holding you back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="glass-card rounded-2xl p-8 border border-white/[0.04] space-y-4">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-brand-purple font-bold text-sm">
                1
              </div>
              <h4 className="text-lg font-bold text-white">Answer Simple Questions</h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Take a 2-minute assessment with 12 short questions. These are real life situations, not complicated personality tests.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-2xl p-8 border border-white/[0.04] space-y-4">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-brand-gold font-bold text-sm">
                2
              </div>
              <h4 className="text-lg font-bold text-white">See Your Results</h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Get a clean character card showing your biggest strength, what is holding you back, and your brutal truth.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-2xl p-8 border border-white/[0.04] space-y-4">
              <div className="h-10 w-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">
                3
              </div>
              <h4 className="text-lg font-bold text-white">Start Your Challenge</h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Get a simple, real-world challenge to help you move forward. Join the waitlist to connect with other members.
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
              The Characters
            </h2>
            <h3 className="text-3xl font-extrabold text-white mt-2">
              The Four Paths
            </h3>
            <p className="text-sm text-white/50 mt-3">
              Find out which description fits you best.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Builder */}
            <div className="glass-card rounded-xl p-6 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs mb-4 font-mono">
                BLD
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Builder</h4>
              <p className="text-xs text-white/50 leading-relaxed mt-2">
                You like taking action. You would rather start now than wait for the perfect moment. But sometimes you try to do everything alone.
              </p>
            </div>

            {/* Warrior */}
            <div className="glass-card rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/20 transition-all duration-300">
              <div className="h-8 w-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 font-bold text-xs mb-4 font-mono">
                WAR
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Warrior</h4>
              <p className="text-xs text-white/50 leading-relaxed mt-2">
                When you commit to something, you usually follow through. You know how to stay disciplined. But sometimes you lose sight of the bigger picture.
              </p>
            </div>

            {/* Thinker */}
            <div className="glass-card rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/20 transition-all duration-300">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs mb-4 font-mono">
                THK
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Thinker</h4>
              <p className="text-xs text-white/50 leading-relaxed mt-2">
                You rarely make reckless decisions. You understand complex situations. But sometimes you use research and planning as a way to avoid the fear of starting.
              </p>
            </div>

            {/* Connector */}
            <div className="glass-card rounded-xl p-6 border border-pink-500/10 hover:border-pink-500/20 transition-all duration-300">
              <div className="h-8 w-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 font-bold text-xs mb-4 font-mono">
                CON
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Connector</h4>
              <p className="text-xs text-white/50 leading-relaxed mt-2">
                You build relationships naturally. People trust you. But sometimes you spend so much energy helping others that you forget your own goals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-b border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase font-mono tracking-widest text-brand-purple font-bold">
              Details
            </h2>
            <h3 className="text-3xl font-extrabold text-white mt-2">
              Common Questions
            </h3>
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-xl p-6 border border-white/[0.04]">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-brand-purple shrink-0" />
                <span>Is this another habit tracker?</span>
              </h4>
              <p className="text-xs text-white/50 mt-2 pl-6 leading-relaxed font-light">
                No. We do not track habits or send notifications. The League is a simple tool to help you see yourself clearly, find out what is holding you back, and connect with people who share your goals.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 border border-white/[0.04]">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-brand-purple shrink-0" />
                <span>What do the questions measure?</span>
              </h4>
              <p className="text-xs text-white/50 mt-2 pl-6 leading-relaxed font-light">
                They measure real behavior in common situations. The questions look at your discipline, consistency, physical energy, relationships, and how quickly you take action.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 border border-white/[0.04]">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-brand-purple shrink-0" />
                <span>How do I join?</span>
              </h4>
              <p className="text-xs text-white/50 mt-2 pl-6 leading-relaxed font-light">
                Complete the 12-question assessment, get your character card, and enter your details to join the waitlist. We are forming the first groups based on complementary strengths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="py-20 bg-black/60 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Find out what's holding you back.
          </h2>
          <p className="text-sm text-white/50 max-w-lg mx-auto">
            Take the 2-minute assessment, see your character card, and join the founding waitlist.
          </p>
          <div>
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm px-10 py-4.5 rounded-xl transition-all duration-300 shadow-xl shadow-purple-950/20 hover:scale-[1.02] cursor-pointer"
            >
              <span>Take The 2-Minute Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="text-[10px] font-mono text-white/20 pt-8 border-t border-white/[0.04] flex justify-between items-center">
            <span>© 2026 THE LEAGUE. ALL RIGHTS RESERVED.</span>
            <span>V1.0 SIMPLE VERSION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
