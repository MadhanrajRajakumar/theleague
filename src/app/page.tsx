'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-[#8A8880] antialiased">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full border-b border-[#2A2A2A] overflow-hidden flex flex-col lg:flex-row items-stretch lg:min-h-screen">
        {/* Image on Mobile/Tablet */}
        <div className="block lg:hidden w-full h-64 relative overflow-hidden">
          <img
            src="/images/marine_drive_runners.png"
            alt="Group of five runners on Marine Drive Mumbai at pre-dawn supporting each other"
            className="w-full h-full object-cover object-[70%_center] filter grayscale contrast-125"
          />
        </div>

        {/* Left Column (holds text content) */}
        <div className="w-full lg:w-1/2 bg-[#0a0a0a] py-12 px-6 lg:py-24 lg:px-12 xl:px-20 flex flex-col justify-center">
          <div className="max-w-[480px] flex flex-col gap-6 w-full">
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
              5 people. Real money. One rule: the team that shows up gets paid by the team that doesn't.
            </p>

            {/* Social Proof Line */}
            <p className="font-sans font-normal text-[13px] text-[#555]">
              47 people on the founding waitlist. 20 spots remaining.
            </p>

            {/* CTA and link */}
            <div className="flex flex-col items-start gap-6 w-full">
              <Link
                href="/assessment"
                className="w-full lg:w-auto inline-flex items-center justify-center font-sans font-medium text-[14px] text-[#0D0D0D] bg-[#C9A84C] hover:bg-[#b0913c] rounded-[6px] px-8 py-3.5 transition-colors cursor-pointer"
              >
                Apply For Founding Cohort &rarr;
              </Link>
              
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full lg:w-auto text-center lg:text-left font-sans font-normal text-[13px] text-[#8A8880] hover:text-[#F2F0EB] transition-colors cursor-pointer border-0 bg-transparent p-0 outline-none block mt-6 lg:mt-0"
              >
                How it works &darr;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Image on Desktop) */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden border-l border-[#2a2a2a]">
          <img
            src="/images/marine_drive_runners.png"
            alt="Group of five runners on Marine Drive Mumbai at pre-dawn supporting each other"
            className="w-full h-full object-cover object-[70%_center] absolute inset-0 filter grayscale contrast-125"
          />
          {/* Gradient fade from left edge of image to transparent */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
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
          <div className="space-y-4">
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#C9A84C] uppercase">
              HOW IT WORKS
            </div>
            <h2 className="font-barlow font-extrabold text-[36px] sm:text-[48px] text-[#F2F0EB] uppercase leading-tight tracking-tight">
              QUITTING ISN'T PRIVATE ANYMORE.
            </h2>
            <p className="font-sans font-normal text-[16px] sm:text-[18px] text-[#8A8880] max-w-[600px] leading-relaxed">
              For the first time, your excuses affect more than just you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 hover:border-[#C9A84C] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="font-barlow font-extrabold text-[32px] text-[#C9A84C] leading-none group-hover:scale-105 transition-transform duration-300 origin-left">01</div>
                <h4 className="font-barlow font-extrabold text-[20px] text-[#F2F0EB] uppercase tracking-wide">
                  FIND OUT WHY YOU KEEP STARTING OVER
                </h4>
                <p className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed">
                  10 questions. Your consistency pattern. The exact team structure that stops it.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 hover:border-[#C9A84C] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="font-barlow font-extrabold text-[32px] text-[#C9A84C] leading-none group-hover:scale-105 transition-transform duration-300 origin-left">02</div>
                <h4 className="font-barlow font-extrabold text-[20px] text-[#F2F0EB] uppercase tracking-wide">
                  JOIN A TEAM OF FIVE
                </h4>
                <div className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed space-y-2">
                  <p>Matched by ambition level. Small enough that disappearing is impossible.</p>
                  <p className="font-bold text-[#F2F0EB]">Nobody quits quietly here.</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 hover:border-[#C9A84C] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="font-barlow font-extrabold text-[32px] text-[#C9A84C] leading-none group-hover:scale-105 transition-transform duration-300 origin-left">03</div>
                <h4 className="font-barlow font-extrabold text-[20px] text-[#F2F0EB] uppercase tracking-wide">
                  HIT YOUR WEEKLY TARGET
                </h4>
                <div className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed space-y-2">
                  <p>Goal set to your preference. Tracked automatically via your fitness app.</p>
                  <p className="font-bold text-[#C9A84C]">Miss it — your whole team loses points.</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 hover:border-[#C9A84C] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="font-barlow font-extrabold text-[32px] text-[#C9A84C] leading-none group-hover:scale-105 transition-transform duration-300 origin-left">04</div>
                <h4 className="font-barlow font-extrabold text-[20px] text-[#F2F0EB] uppercase tracking-wide">
                  WIN OR LOSE TOGETHER
                </h4>
                <div className="font-sans font-normal text-[13px] text-[#8A8880] leading-relaxed space-y-2">
                  <p>Consistent teams earn from teams that didn't show up.</p>
                  <p className="font-bold text-[#F2F0EB]">The money moves. Every season.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakes Callout Section */}
      <section className="bg-[#C9A84C] py-16 px-8 text-center border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-barlow font-extrabold text-[36px] sm:text-[48px] text-[#0D0D0D] tracking-tight leading-none uppercase">
            NOBODY WANTS TO LET THEIR TEAM DOWN.
          </h2>
          <div className="font-sans font-semibold text-sm sm:text-base text-[#0D0D0D]/90 leading-relaxed max-w-xl mx-auto space-y-2">
            <p>You already know how to work out.</p>
            <p>You already know what to eat.</p>
            <p className="text-[#0D0D0D]/60 font-normal">The problem was never information.</p>
            <p>The problem was that quitting had no consequences.</p>
            <p className="font-barlow font-black text-lg sm:text-xl text-[#0D0D0D] uppercase mt-6 tracking-wide">
              The League changes that.
            </p>
          </div>
        </div>
      </section>

      {/* Archetypes Section */}
      <section className="bg-[#0D0D0D] py-16 md:py-24 px-6 sm:px-12 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 max-w-3xl">
            <div className="font-sans font-medium text-[11px] tracking-[3px] text-[#C9A84C] uppercase">
              THE DIAGNOSIS
            </div>
            <h2 className="font-barlow font-extrabold text-[36px] sm:text-[48px] text-[#F2F0EB] uppercase leading-tight tracking-tight">
              EVERYONE QUITS DIFFERENTLY.
            </h2>
            <div className="font-sans font-normal text-[16px] sm:text-[18px] text-[#8A8880] leading-relaxed space-y-1">
              <p>Most people don't fail because they're lazy.</p>
              <p>They fail in predictable patterns.</p>
              <p className="font-medium text-[#C9A84C]">Find yours before you repeat it again.</p>
            </div>
            <p className="font-sans font-medium text-[16px] sm:text-[18px] text-[#F2F0EB] leading-relaxed pt-2">
              You probably saw yourself in one of these. The assessment tells you exactly which pattern is yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 - Warrior */}
            <div className="bg-[#161616] border border-[#2A2A2A] hover:border-[#C9A84C]/50 transition-all duration-500 rounded-[8px] p-6 flex flex-col justify-between md:h-[230px] group">
              <div className="space-y-2">
                <h3 className="font-barlow font-black text-[24px] sm:text-[28px] text-[#C9A84C] leading-none uppercase tracking-wide">
                  WARRIOR
                </h3>
                <p className="font-sans font-normal text-[14px] text-[#F2F0EB]/90 leading-relaxed">
                  You go all in, push harder than everyone, then disappear.
                </p>
              </div>
              <div className="border-t border-[#2A2A2A] pt-4 space-y-1.5 font-sans text-[13px]">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[11px] tracking-[1.5px] font-semibold text-[#555] uppercase">Risk:</span>
                  <span className="font-medium text-[#F2F0EB] text-right">Trying to do too much, too fast.</span>
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[11px] tracking-[1.5px] font-semibold text-[#C9A84C] uppercase">Watch for:</span>
                  <span className="font-medium text-[#C9A84C] group-hover:text-[#F2F0EB] transition-colors duration-300 text-right">All-or-nothing thinking.</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Creator */}
            <div className="bg-[#161616] border border-[#2A2A2A] hover:border-[#C9A84C]/50 transition-all duration-500 rounded-[8px] p-6 flex flex-col justify-between md:h-[230px] group">
              <div className="space-y-2">
                <h3 className="font-barlow font-black text-[24px] sm:text-[28px] text-[#C9A84C] leading-none uppercase tracking-wide">
                  CREATOR
                </h3>
                <p className="font-sans font-normal text-[14px] text-[#F2F0EB]/90 leading-relaxed">
                  You love the rush of new plans, but quit once excitement fades.
                </p>
              </div>
              <div className="border-t border-[#2A2A2A] pt-4 space-y-1.5 font-sans text-[13px]">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[11px] tracking-[1.5px] font-semibold text-[#555] uppercase">Risk:</span>
                  <span className="font-medium text-[#F2F0EB] text-right">Relying on motivation instead of structure.</span>
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[11px] tracking-[1.5px] font-semibold text-[#C9A84C] uppercase">Watch for:</span>
                  <span className="font-medium text-[#C9A84C] group-hover:text-[#F2F0EB] transition-colors duration-300 text-right">Starting over every month.</span>
                </div>
              </div>
            </div>

            {/* Card 3 - Thinker */}
            <div className="bg-[#161616] border border-[#2A2A2A] hover:border-[#C9A84C]/50 transition-all duration-500 rounded-[8px] p-6 flex flex-col justify-between md:h-[230px] group">
              <div className="space-y-2">
                <h3 className="font-barlow font-black text-[24px] sm:text-[28px] text-[#C9A84C] leading-none uppercase tracking-wide">
                  THINKER
                </h3>
                <p className="font-sans font-normal text-[14px] text-[#F2F0EB]/90 leading-relaxed">
                  You know exactly what to do, but wait for the perfect time.
                </p>
              </div>
              <div className="border-t border-[#2A2A2A] pt-4 space-y-1.5 font-sans text-[13px]">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[11px] tracking-[1.5px] font-semibold text-[#555] uppercase">Risk:</span>
                  <span className="font-medium text-[#F2F0EB] text-right">Preparation becoming procrastination.</span>
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[11px] tracking-[1.5px] font-semibold text-[#C9A84C] uppercase">Watch for:</span>
                  <span className="font-medium text-[#C9A84C] group-hover:text-[#F2F0EB] transition-colors duration-300 text-right">Analysis paralysis.</span>
                </div>
              </div>
            </div>

            {/* Card 4 - Connector */}
            <div className="bg-[#161616] border border-[#2A2A2A] hover:border-[#C9A84C]/50 transition-all duration-500 rounded-[8px] p-6 flex flex-col justify-between md:h-[230px] group">
              <div className="space-y-2">
                <h3 className="font-barlow font-black text-[24px] sm:text-[28px] text-[#C9A84C] leading-none uppercase tracking-wide">
                  CONNECTOR
                </h3>
                <p className="font-sans font-normal text-[14px] text-[#F2F0EB]/90 leading-relaxed">
                  You do your best work in groups, but slowly disappear when alone.
                </p>
              </div>
              <div className="border-t border-[#2A2A2A] pt-4 space-y-1.5 font-sans text-[13px]">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[11px] tracking-[1.5px] font-semibold text-[#555] uppercase">Risk:</span>
                  <span className="font-medium text-[#F2F0EB] text-right">Fading away when the group goes quiet.</span>
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[11px] tracking-[1.5px] font-semibold text-[#C9A84C] uppercase">Watch for:</span>
                  <span className="font-medium text-[#C9A84C] group-hover:text-[#F2F0EB] transition-colors duration-300 text-right">Trying to stay disciplined alone.</span>
                </div>
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
