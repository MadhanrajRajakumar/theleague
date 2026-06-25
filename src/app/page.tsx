'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-[#8A8880] antialiased">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full border-b border-[#2A2A2A] overflow-hidden flex flex-col md:flex-row items-stretch">
        {/* Left Text Panel (45% on desktop) */}
        <div className="w-full md:w-[45%] bg-[#0D0D0D] py-16 md:py-24 pl-16 md:pl-[64px] pr-12 md:pr-[48px] flex flex-col justify-center">
          <div className="max-w-[480px] flex flex-col gap-6">
            {/* Overline Label */}
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#C9A84C] uppercase">
              • PRIVATE FITNESS ACCOUNTABILITY NETWORK
            </div>

            {/* Tension Statistic */}
            <p className="font-sans font-normal text-[15px] text-[#8A8880]">
              80% of people who start quit within 8 weeks.
            </p>

            {/* Headline */}
            <h1 className="flex flex-col gap-2">
              <span className="font-barlow font-extrabold text-[36px] sm:text-[48px] lg:text-[56px] text-[#F2F0EB] block leading-[1.1] uppercase">
                You've already proven you can start.
              </span>
              <span className="font-barlow font-extrabold text-[36px] sm:text-[48px] lg:text-[56px] text-[#C9A84C] block leading-[1.1] uppercase">
                The problem is staying consistent.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="font-sans font-normal text-[16px] text-[#8A8880] leading-[1.7] max-w-[400px]">
              A private team of 5 people who notice when you don't show up. Who check in when you go quiet. Who refuse to let you quit — because when you miss, the whole team feels it.
            </p>

            {/* Social Proof Line */}
            <p className="font-sans font-normal text-[13px] text-[#555]">
              47 people on the founding waitlist. 20 spots remaining.
            </p>

            {/* CTA and link */}
            <div className="flex flex-col items-start gap-6">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center font-sans font-medium text-[14px] text-[#0D0D0D] bg-[#C9A84C] hover:bg-[#b0913c] rounded-[6px] px-8 py-3.5 transition-colors cursor-pointer"
              >
                Apply For Founding Cohort &rarr;
              </Link>
              
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-sans font-normal text-[13px] text-[#8A8880] hover:text-[#F2F0EB] transition-colors cursor-pointer border-0 bg-transparent p-0 outline-none"
              >
                How it works &darr;
              </button>
            </div>
          </div>
        </div>

        {/* Right Image Panel (55% on desktop) */}
        <div className="w-full md:w-[55%] relative min-h-[350px] md:min-h-auto">
          <img
            src="/images/marine_drive_runners.png"
            alt="Group of five runners on Marine Drive Mumbai at pre-dawn supporting each other"
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
          {/* Gradient fade from left edge of image to transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0D0D0D] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4">
          <div className="py-8 px-6 text-center md:text-left border-b md:border-b-0 md:border-r border-[#2A2A2A]">
            <div className="font-barlow font-extrabold text-[36px] text-[#F2F0EB] leading-none uppercase">5</div>
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#555] uppercase mt-2">People watching you</div>
          </div>
          <div className="py-8 px-6 text-center md:text-left border-b md:border-b-0 md:border-r border-[#2A2A2A]">
            <div className="font-barlow font-extrabold text-[36px] text-[#F2F0EB] leading-none uppercase">4 Weeks</div>
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#555] uppercase mt-2">Per season</div>
          </div>
          <div className="py-8 px-6 text-center md:text-left border-b md:border-b-0 md:border-r border-[#2A2A2A]">
            <div className="font-barlow font-extrabold text-[36px] text-[#F2F0EB] leading-none uppercase">0</div>
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#555] uppercase mt-2">Places to hide</div>
          </div>
          <div className="py-8 px-6 text-center md:text-left">
            <div className="font-barlow font-extrabold text-[36px] text-[#F2F0EB] leading-none uppercase">1 Miss</div>
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#555] uppercase mt-2">Affects everyone</div>
          </div>
        </div>
      </section>

      {/* Pain Validation Section */}
      <section className="bg-[#0D0D0D] py-16 px-8 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#C9A84C] uppercase">
              WHY MOST PEOPLE FAIL
            </div>
            <h2 className="font-barlow font-extrabold text-[36px] sm:text-[40px] text-[#F2F0EB] uppercase leading-tight max-w-[640px]">
              YOU DON'T HAVE A KNOWLEDGE PROBLEM. YOU HAVE AN ENVIRONMENT PROBLEM.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-2">
              <h4 className="font-barlow font-bold text-[22px] text-[#F2F0EB] uppercase">You know exactly what to do.</h4>
              <p className="font-sans font-normal text-[14px] text-[#8A8880] leading-relaxed">
                The problem has never been information.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-2">
              <h4 className="font-barlow font-bold text-[22px] text-[#F2F0EB] uppercase">Motivation always fades.</h4>
              <p className="font-sans font-normal text-[14px] text-[#8A8880] leading-relaxed">
                It fades for everyone. That's not weakness. That's human.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-2">
              <h4 className="font-barlow font-bold text-[22px] text-[#F2F0EB] uppercase">Nobody was watching.</h4>
              <p className="font-sans font-normal text-[14px] text-[#8A8880] leading-relaxed">
                When no one notices you quit, quitting costs nothing. The League changes that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-[#0D0D0D] py-16 md:py-24 px-6 sm:px-12 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#C9A84C] uppercase">
              HOW IT WORKS
            </div>
            <h2 className="font-barlow font-extrabold text-[36px] sm:text-[40px] text-[#F2F0EB] uppercase leading-none">
              SIMPLE RULES. REAL CONSEQUENCES.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-4">
              <div className="font-barlow font-extrabold text-[32px] text-[#C9A84C] leading-none">01</div>
              <h4 className="font-barlow font-extrabold text-[20px] text-[#F2F0EB] uppercase">TAKE THE ASSESSMENT</h4>
              <p className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed">
                10 questions that reveal exactly how you fail — and which team structure will keep you consistent.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-4">
              <div className="font-barlow font-extrabold text-[32px] text-[#C9A84C] leading-none">02</div>
              <h4 className="font-barlow font-extrabold text-[20px] text-[#F2F0EB] uppercase">JOIN YOUR TEAM</h4>
              <p className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed">
                Matched with 4 people at your level. People who will notice when you disappear. People you won't want to let down.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-4">
              <div className="font-barlow font-extrabold text-[32px] text-[#C9A84C] leading-none">03</div>
              <h4 className="font-barlow font-extrabold text-[20px] text-[#F2F0EB] uppercase">HIT THE WEEKLY TARGET</h4>
              <p className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed">
                Every week has a target. Every Sunday has a reckoning. Submit your proof — or your team pays for your absence.
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-4">
              <div className="font-barlow font-extrabold text-[32px] text-[#C9A84C] leading-none">04</div>
              <h4 className="font-barlow font-extrabold text-[20px] text-[#F2F0EB] uppercase">WIN OR LOSE TOGETHER</h4>
              <p className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed">
                The team that shows up consistently beats the team that doesn't. Consistency becomes the competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stakes Callout Section */}
      <section className="bg-[#C9A84C] py-16 px-8 text-center border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="font-barlow font-extrabold text-[36px] sm:text-[48px] text-[#0D0D0D] tracking-tight leading-none uppercase">
            WHEN YOU SKIP, YOUR ENTIRE TEAM FEELS IT.
          </h2>
          <p className="font-sans font-normal text-sm sm:text-base text-[#5A4A1A] leading-relaxed max-w-2xl mx-auto">
            Not a reminder. Not a notification. Your team loses ground — and everyone knows why. For the first time, your consistency has real consequences beyond yourself.
          </p>
        </div>
      </section>

      {/* Archetypes Section */}
      <section className="bg-[#0D0D0D] py-16 md:py-24 px-6 sm:px-12 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#C9A84C] uppercase">
              YOUR ARCHETYPE
            </div>
            <h2 className="font-barlow font-extrabold text-[36px] sm:text-[40px] text-[#F2F0EB] uppercase leading-none">
              WHICH ONE ARE YOU?
            </h2>
            <p className="font-sans font-normal text-[15px] text-[#8A8880] max-w-[560px] text-center mx-auto mb-8 mt-2 leading-relaxed">
              Every person has a consistency pattern. Knowing yours tells us exactly where you'll struggle — and how your team should be structured to catch you before you quit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Warrior */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-4">
              <h3 className="font-barlow font-extrabold text-[28px] text-[#C9A84C] leading-none uppercase">Warrior</h3>
              <p className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed">
                Strong discipline. Risk: burns out and disappears for 3 weeks.
              </p>
              <div className="font-sans font-normal text-[12px] text-[#555] border-t border-[#2A2A2A] pt-3">
                Watch for &rarr; All-or-nothing thinking.
              </div>
            </div>
            {/* Creator */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-4">
              <h3 className="font-barlow font-extrabold text-[28px] text-[#C9A84C] leading-none uppercase">Creator</h3>
              <p className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed">
                Strong enthusiasm. Risk: loses interest when novelty fades.
              </p>
              <div className="font-sans font-normal text-[12px] text-[#555] border-t border-[#2A2A2A] pt-3">
                Watch for &rarr; Motivation dependency.
              </div>
            </div>
            {/* Thinker */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-4">
              <h3 className="font-barlow font-extrabold text-[28px] text-[#C9A84C] leading-none uppercase">Thinker</h3>
              <p className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed">
                Strong planning. Risk: plans forever, never starts.
              </p>
              <div className="font-sans font-normal text-[12px] text-[#555] border-t border-[#2A2A2A] pt-3">
                Watch for &rarr; Analysis paralysis.
              </div>
            </div>
            {/* Connector */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-4">
              <h3 className="font-barlow font-extrabold text-[28px] text-[#C9A84C] leading-none uppercase">Connector</h3>
              <p className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed">
                Thrives in groups. Risk: stops when the group goes quiet.
              </p>
              <div className="font-sans font-normal text-[12px] text-[#555] border-t border-[#2A2A2A] pt-3">
                Watch for &rarr; External motivation trap.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#0D0D0D] py-20 px-6 sm:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-barlow font-extrabold text-[36px] sm:text-[52px] text-[#F2F0EB] uppercase leading-none">
            FIND OUT IF YOU'RE A FIT.
          </h2>
          <p className="font-sans font-normal text-[15px] text-[#555] max-w-lg mx-auto leading-relaxed">
            The assessment takes 3 minutes. It will tell you exactly how you fail — and whether The League is built for someone like you.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center font-sans font-medium text-[14px] text-[#0D0D0D] bg-[#C9A84C] hover:bg-[#b0913c] rounded-[6px] px-10 py-4 transition-colors cursor-pointer"
            >
              Take the assessment &rarr;
            </Link>
            <span className="font-sans font-normal text-[12px] text-[#333]">
              No subscription required to take the assessment. Founding cohort spots are limited.
            </span>
          </div>
        </div>
      </section>

      {/* Footer Divider */}
      <div className="w-full border-t border-[#2A2A2A]" />

      {/* Small Legal Footer */}
      <footer className="bg-[#0D0D0D] py-6 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-[#555] space-y-2 sm:space-y-0">
          <span>© 2026 THE LEAGUE. ALL RIGHTS RESERVED.</span>
          <span>V1.0 COHORT SCREENING SPEC</span>
        </div>
      </footer>
    </div>
  );
}
