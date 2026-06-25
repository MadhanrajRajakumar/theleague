'use client';

import React, { useState, useEffect } from 'react';
import { getAnalytics, DashboardMetrics, supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import { Lock, Eye, EyeOff, Database, Award, ShieldAlert, FileText, TrendingUp, Tv, Compass, HelpCircle } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [analytics, setAnalytics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Secure API-based Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('the_league_admin_authed', 'true');
        }
      } else {
        setAuthError(data.error || 'Invalid administrative credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setAuthError('An error occurred. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authed = sessionStorage.getItem('the_league_admin_authed');
      if (authed === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    getAnalytics()
      .then((data) => {
        setAnalytics(data);
      })
      .catch((err) => {
        console.error('Failed to load analytics:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isAuthenticated, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-[#8A8880]">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto h-10 w-10 bg-[#0D0D0D] border border-[#2A2A2A] rounded-[8px] flex items-center justify-center text-[#8A8880]/60">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-barlow font-extrabold text-[#F2F0EB] uppercase tracking-wider">
                Admin Panel Access
              </h2>
              <p className="text-xs text-[#8A8880]/40 font-mono">
                Identity Console credentials required.
              </p>
            </div>

            {authError && (
              <div className="bg-[#A33B3B]/10 border border-[#A33B3B]/30 text-[#F2F0EB] text-xs p-3.5 rounded-[8px] text-center font-mono">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-[#8A8880]/40 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full bg-[#0D0D0D] border border-[#2A2A2A] hover:border-[#8A8880]/30 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] rounded-[8px] px-4 py-3 text-sm text-[#F2F0EB] placeholder-[#8A8880]/40 outline-none transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8A8880]/30 hover:text-[#F2F0EB] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full inline-flex items-center justify-center bg-[#C9A84C] hover:bg-[#b0913c] active:bg-[#C9A84C] text-[#0D0D0D] font-extrabold uppercase tracking-wider text-xs px-5 py-3 rounded-[6px] transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? 'Verifying...' : 'Enter Console'}
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  const isSupabaseLive = !!supabase;

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-[#8A8880]">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Console Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#2A2A2A] pb-6">
          <div>
            <h1 className="text-2xl font-barlow font-extrabold text-[#F2F0EB] uppercase tracking-wider flex items-center gap-2.5">
              <span>Admin Console</span>
              {isSupabaseLive ? (
                <span className="inline-flex items-center gap-1 bg-[#3B7A4A]/20 border border-[#3B7A4A]/40 text-[#3B7A4A] text-[9px] font-mono px-2 py-0.5 rounded-full">
                  <Database className="h-2.5 w-2.5" />
                  <span>Production Live</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] text-[9px] font-mono px-2 py-0.5 rounded-full">
                  <Database className="h-2.5 w-2.5" />
                  <span>Local Mock Mode</span>
                </span>
              )}
            </h1>
            <p className="text-xs text-[#8A8880]/40 mt-1 font-mono">
              V1 metrics overview & cohort application ledger
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="text-xs text-[#F2F0EB] bg-[#161616] border border-[#2A2A2A] hover:border-[#C9A84C] px-4 py-2 rounded-[8px] transition-all cursor-pointer font-semibold"
            >
              Refresh Data
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('the_league_admin_authed');
                setIsAuthenticated(false);
                setPassword('');
              }}
              className="text-xs text-[#A33B3B] hover:text-[#A33B3B]/80 border border-[#A33B3B]/30 hover:border-[#A33B3B]/50 bg-[#A33B3B]/10 px-4 py-2 rounded-[8px] transition-all cursor-pointer font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {isLoading || !analytics ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-pulse font-mono text-xs uppercase tracking-widest text-[#8A8880]/40">
              Querying database registry...
            </div>
          </div>
        ) : (
          <>
            {/* 1. Core KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8880]/40 block">
                  Starts
                </span>
                <h2 className="text-2xl font-semibold text-[#F2F0EB] font-mono">
                  {analytics.totalStarts}
                </h2>
                <span className="text-[9px] font-mono text-[#8A8880]/40 block">
                  Fit Checks Started
                </span>
              </div>

              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8880]/40 block">
                  Completions
                </span>
                <h2 className="text-2xl font-semibold text-[#F2F0EB] font-mono">
                  {analytics.totalCompletions}
                </h2>
                <span className="text-[9px] font-mono text-[#8A8880]/40 block">
                  Fit Checks Completed
                </span>
              </div>

              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A84C] block font-semibold">
                  Completion %
                </span>
                <h2 className="text-2xl font-semibold text-[#C9A84C] font-mono">
                  {analytics.completionRate}%
                </h2>
                <span className="text-[9px] font-mono text-[#8A8880]/40 block">
                  Screening rate
                </span>
              </div>

              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8880]/40 block">
                  Applications
                </span>
                <h2 className="text-2xl font-semibold text-[#F2F0EB] font-mono">
                  {analytics.totalWaitlist}
                </h2>
                <span className="text-[9px] font-mono text-[#8A8880]/40 block">
                  Cohort Applications
                </span>
              </div>

              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A84C] block font-semibold">
                  Signup %
                </span>
                <h2 className="text-2xl font-semibold text-[#C9A84C] font-mono">
                  {analytics.signupRate}%
                </h2>
                <span className="text-[9px] font-mono text-[#8A8880]/40 block">
                  Completes to Applicants
                </span>
              </div>
            </div>

            {/* 2. Priority Launch Metrics: Reason, Goal, Archetypes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Top Reasons For Joining */}
              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8A8880]/60 font-semibold flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#C9A84C]" />
                  <span>Reasons For Joining</span>
                </h3>
                <div className="space-y-3 pt-2 max-h-[220px] overflow-y-auto pr-1">
                  {analytics.topReasons.map((item, idx) => {
                    const totalReasonsCount = analytics.topReasons.reduce((sum, r) => sum + r.count, 0) || 1;
                    const pct = Math.round((item.count / totalReasonsCount) * 100);
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#8A8880]/70 truncate max-w-[200px]" title={item.reason}>{item.reason}</span>
                          <span className="text-[#F2F0EB] font-semibold">{item.count} <span className="text-[#8A8880]/30 font-normal">({pct}%)</span></span>
                        </div>
                        <div className="w-full h-1.5 bg-[#8A8880]/5 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${pct}%` }}
                            className="h-full bg-[#C9A84C] rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                  {analytics.topReasons.length === 0 && (
                    <div className="text-center text-xs text-[#8A8880]/30 py-8 font-mono">
                      No application reasons logged yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Top Goals */}
              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8A8880]/60 font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#C9A84C]" />
                  <span>Primary Goals</span>
                </h3>
                <div className="space-y-3 pt-2 max-h-[220px] overflow-y-auto pr-1">
                  {analytics.topGoals.map((item, idx) => {
                    const totalGoalsCount = analytics.topGoals.reduce((sum, g) => sum + g.count, 0) || 1;
                    const pct = Math.round((item.count / totalGoalsCount) * 100);
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#8A8880]/70 truncate max-w-[200px]">{item.goal}</span>
                          <span className="text-[#F2F0EB] font-semibold">{item.count} <span className="text-[#8A8880]/30 font-normal">({pct}%)</span></span>
                        </div>
                        <div className="w-full h-1.5 bg-[#8A8880]/5 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${pct}%` }}
                            className="h-full bg-[#C9A84C] rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                  {analytics.topGoals.length === 0 && (
                    <div className="text-center text-xs text-[#8A8880]/30 py-8 font-mono">
                      No goals logged yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Archetype Distribution */}
              <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8A8880]/60 font-semibold flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#C9A84C]" />
                  <span>Archetype Roles</span>
                </h3>
                <div className="space-y-3 pt-2">
                  {analytics.archetypeConversion.map((item) => {
                    const displayLabel = item.archetype_id === 'creator' ? 'Creator' : item.archetype_id === 'architect' ? 'Thinker' : item.archetype_id.charAt(0).toUpperCase() + item.archetype_id.slice(1);
                    const totalComps = analytics.totalCompletions || 1;
                    const pct = Math.round((item.completions / totalComps) * 100);
                    return (
                      <div key={item.archetype_id} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#8A8880]/70">{displayLabel}</span>
                          <span className="text-[#F2F0EB] font-semibold">{item.completions} <span className="text-[#8A8880]/30 font-normal">({pct}%)</span></span>
                        </div>
                        <div className="w-full h-1.5 bg-[#8A8880]/5 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${pct}%` }}
                            className="h-full bg-[#C9A84C] rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 3. Question Drop-off & Referrer Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Question Drop-off */}
              <div className="lg:col-span-7 bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8A8880]/60 font-semibold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-[#A33B3B]" />
                  <span>Fit Check Drop-off (Scenarios 1-10)</span>
                </h3>
                <div className="space-y-3 pt-2">
                  {analytics.questionDropOff.map((q) => {
                    const firstQuestionCount = analytics.questionDropOff[0]?.count || 1;
                    const pct = Math.round((q.count / firstQuestionCount) * 100);
                    return (
                      <div key={q.question_id} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#8A8880]/60">Scenario {q.question_id}</span>
                          <span className="text-[#F2F0EB] font-semibold">{q.count} <span className="text-[#8A8880]/30 font-normal">({pct}%)</span></span>
                        </div>
                        <div className="w-full h-1.5 bg-[#8A8880]/5 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${pct}%` }}
                            className={`h-full rounded-full ${
                              pct > 75 ? 'bg-[#3B7A4A]' : pct > 50 ? 'bg-[#C9A84C]' : 'bg-[#A33B3B]'
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reel Performance & Traffic Referrers Column */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Reel Performance */}
                <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#8A8880]/60 font-semibold flex items-center gap-2">
                    <Tv className="h-4 w-4 text-[#C9A84C]" />
                    <span>Instagram Reel Performance</span>
                  </h3>
                  <div className="overflow-x-auto w-full pt-1">
                    <table className="w-full text-left border-collapse text-[11px] font-mono">
                      <thead>
                        <tr className="border-b border-[#2A2A2A] text-[#8A8880]/40 uppercase">
                          <th className="py-1">Reel ID</th>
                          <th className="py-1 text-center">Starts</th>
                          <th className="py-1 text-right">Applies</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2A2A2A]">
                        {analytics.reelPerformance.map((reel) => (
                          <tr key={reel.content_id} className="hover:bg-[#F2F0EB]/[0.01]">
                            <td className="py-2 font-semibold text-[#F2F0EB]">{reel.content_id}</td>
                            <td className="py-2 text-center text-[#8A8880]/70">{reel.starts}</td>
                            <td className="py-2 text-right font-semibold text-[#C9A84C]">{reel.waitlist} ({reel.rate}%)</td>
                          </tr>
                        ))}
                        {analytics.reelPerformance.length === 0 && (
                          <tr>
                            <td colSpan={3} className="py-4 text-center text-[#8A8880]/30">
                              No reels logged yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Referrers */}
                <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] p-6 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#8A8880]/60 font-semibold flex items-center gap-2">
                    <Compass className="h-4 w-4 text-[#C9A84C]" />
                    <span>Traffic Referrers</span>
                  </h3>
                  <div className="space-y-3 pt-1">
                    {analytics.referrers.slice(0, 4).map((ref) => {
                      const firstReferrerCount = analytics.referrers[0]?.count || 1;
                      const pct = Math.round((ref.count / firstReferrerCount) * 100);
                      return (
                        <div key={ref.referrer} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-[#8A8880]/70 truncate max-w-[150px]">{ref.referrer}</span>
                            <span className="text-[#F2F0EB] font-semibold">{ref.count}</span>
                          </div>
                          <div className="w-full h-1 bg-[#8A8880]/5 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${pct}%` }}
                              className="h-full bg-[#C9A84C]/80 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* 4. Cohort Application Waitlist Table */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-[8px] overflow-hidden space-y-4">
              <div className="p-6 border-b border-[#2A2A2A] flex justify-between items-center bg-[#F2F0EB]/[0.01]">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8A8880]/70 font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#C9A84C]" />
                  <span>Application Ledger</span>
                </h3>
                <span className="text-[10px] font-mono text-[#8A8880]/40">
                  {analytics.waitlistEntries.length} CANDIDATES REGISTERED
                </span>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#2A2A2A] text-[#8A8880]/50 uppercase text-[9px] bg-[#F2F0EB]/[0.02]">
                      <th className="py-3 px-6">Timestamp</th>
                      <th className="py-3 px-6">Name</th>
                      <th className="py-3 px-6">Email Address</th>
                      <th className="py-3 px-6">Instagram</th>
                      <th className="py-3 px-6 text-center">Role</th>
                      <th className="py-3 px-6">Reason For Applying</th>
                      <th className="py-3 px-6">Primary Goal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2A2A]">
                    {analytics.waitlistEntries.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#F2F0EB]/[0.01] transition-colors">
                        <td className="py-3 px-6 text-[#8A8880]/40">
                          {new Date(row.joined_at).toLocaleString()}
                        </td>
                        <td className="py-3 px-6 text-[#F2F0EB] font-semibold">{row.name || '-'}</td>
                        <td className="py-3 px-6 text-[#8A8880]/70">{row.email}</td>
                        <td className="py-3 px-6 text-[#8A8880]/70">{row.instagram ? `@${row.instagram}` : '-'}</td>
                        <td className="py-3 px-6 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-[4px] text-[10px] uppercase font-semibold border bg-[#C9A84C]/10 border-[#C9A84C]/25 text-[#C9A84C]">
                            {row.archetype_id === 'creator' ? 'Creator' : row.archetype_id === 'architect' ? 'Thinker' : row.archetype_id}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-[#C9A84C] max-w-[200px] truncate" title={row.reason_for_joining || ''}>
                          {row.reason_for_joining || '-'}
                        </td>
                        <td className="py-3 px-6 text-[#C9A84C] max-w-[150px] truncate" title={row.primary_goal || ''}>
                          {row.primary_goal || '-'}
                        </td>
                      </tr>
                    ))}
                    {analytics.waitlistEntries.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-[#8A8880]/30">
                          No cohort applications recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
