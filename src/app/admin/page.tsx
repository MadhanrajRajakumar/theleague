'use client';

import React, { useState, useEffect } from 'react';
import { getAnalytics, AnalyticsData, supabase } from '@/lib/supabase';
import { WaitlistEntry } from '@/lib/types';
import Header from '@/components/Header';
import { Lock, Eye, EyeOff, Database, Award, BarChart3, ShieldAlert, FileText, ChevronRight } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Simple console password check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('the_league_admin_authed', 'true');
      }
    } else {
      setAuthError('Invalid administrative credentials.');
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
      <div className="flex flex-col min-h-screen bg-[#030303] text-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm glass-card border border-white/[0.06] rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto h-10 w-10 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center justify-center text-white/60">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Admin Panel Access
              </h2>
              <p className="text-xs text-white/40">
                Identity Console credentials required.
              </p>
            </div>

            {authError && (
              <div className="bg-red-950/20 border border-red-500/20 text-red-300 text-xs p-3.5 rounded-lg text-center font-mono">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full bg-black/40 border border-white/[0.08] hover:border-white/[0.15] focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/30 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <span className="text-[9px] text-white/20 block font-mono">
                  Bypass code: admin
                </span>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center bg-brand-purple hover:bg-purple-600 active:bg-purple-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
              >
                Enter Console
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  const completionRate = analytics && analytics.totalAssessmentsStarted > 0 
    ? Math.round((analytics.totalAssessmentsCompleted / analytics.totalAssessmentsStarted) * 100)
    : 0;

  const conversionRate = analytics && analytics.totalAssessmentsCompleted > 0
    ? Math.round((analytics.totalWaitlist / analytics.totalAssessmentsCompleted) * 100)
    : 0;

  const isSupabaseLive = !!supabase;

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Console Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2.5">
              <span>Admin Console</span>
              {isSupabaseLive ? (
                <span className="inline-flex items-center gap-1 bg-green-950/40 border border-green-500/25 text-green-400 text-[9px] font-mono px-2 py-0.5 rounded-full">
                  <Database className="h-2.5 w-2.5" />
                  <span>Production Live</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-amber-950/40 border border-amber-500/25 text-amber-400 text-[9px] font-mono px-2 py-0.5 rounded-full">
                  <Database className="h-2.5 w-2.5" />
                  <span>Local Mock Mode</span>
                </span>
              )}
            </h1>
            <p className="text-xs text-white/40 mt-1 font-mono">
              V1 metrics overview & waitlist registry
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="text-xs text-white/60 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.02] active:bg-white/[0.05] px-4 py-2 rounded-lg transition-all cursor-pointer font-medium"
            >
              Refresh Data
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('the_league_admin_authed');
                setIsAuthenticated(false);
                setPassword('');
              }}
              className="text-xs text-red-400 hover:text-red-300 border border-red-500/10 hover:border-red-500/20 bg-red-500/[0.01] px-4 py-2 rounded-lg transition-all cursor-pointer font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        {isLoading || !analytics ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-pulse font-mono text-xs uppercase tracking-widest text-white/40">
              Querying database registry...
            </div>
          </div>
        ) : (
          <>
            {/* Metrics cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  Started
                </span>
                <h2 className="text-2xl font-black text-white font-mono">
                  {analytics.totalAssessmentsStarted}
                </h2>
                <span className="text-[9px] font-mono text-white/30 block">
                  Assessments started
                </span>
              </div>

              <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  Completed
                </span>
                <h2 className="text-2xl font-black text-white font-mono">
                  {analytics.totalAssessmentsCompleted}
                </h2>
                <span className="text-[9px] font-mono text-white/30 block">
                  Assessments completed
                </span>
              </div>

              <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple block">
                  Completion Rate
                </span>
                <h2 className="text-2xl font-black text-brand-purple font-mono">
                  {completionRate}%
                </h2>
                <span className="text-[9px] font-mono text-white/30 block">
                  Started to finished
                </span>
              </div>

              <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  Waitlist Signups
                </span>
                <h2 className="text-2xl font-black text-white font-mono">
                  {analytics.totalWaitlist}
                </h2>
                <span className="text-[9px] font-mono text-white/30 block">
                  Total waitlist entries
                </span>
              </div>

              <div className="glass-card rounded-xl p-5 border border-white/[0.04] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold block">
                  Conversion
                </span>
                <h2 className="text-2xl font-black text-brand-gold font-mono">
                  {conversionRate}%
                </h2>
                <span className="text-[9px] font-mono text-white/30 block">
                  Completed to waitlist
                </span>
              </div>
            </div>

            {/* Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Archetype distribution */}
              <div className="glass-card rounded-xl p-6 border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/60 font-bold flex items-center gap-2">
                  <Award className="h-4 w-4 text-brand-purple" />
                  <span>Characters</span>
                </h3>
                <div className="space-y-3 pt-2">
                  {['Creator', 'Warrior', 'Architect', 'Connector'].map((arch) => {
                    let count = analytics.archetypeDistribution[arch] || 0;
                    if (arch === 'Creator') {
                      count += analytics.archetypeDistribution['Builder'] || 0;
                    }
                    if (arch === 'Architect') {
                      count += (analytics.archetypeDistribution['Strategist'] || 0) + (analytics.archetypeDistribution['Thinker'] || 0);
                    }
                    const maxCount = Math.max(...Object.values(analytics.archetypeDistribution), 1);
                    const pct = Math.round((count / maxCount) * 100);
                    return (
                      <div key={arch} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white/70">{arch}</span>
                          <span className="text-white font-bold">{count}</span>
                        </div>
                        <div className="w-full h-2 bg-white/[0.02] rounded-full overflow-hidden border border-white/[0.01]">
                          <div 
                            style={{ width: `${pct}%` }}
                            className="h-full bg-brand-purple rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strengths */}
              <div className="glass-card rounded-xl p-6 border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/60 font-bold flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-brand-gold" />
                  <span>Biggest Strengths</span>
                </h3>
                <div className="space-y-3 pt-2 max-h-[220px] overflow-y-auto pr-1">
                  {Object.entries(analytics.strengthDistribution)
                    .sort((a, b) => b[1] - a[1])
                    .map(([name, count]) => {
                      const maxCount = Math.max(...Object.values(analytics.strengthDistribution), 1);
                      const pct = Math.round((count / maxCount) * 100);
                      return (
                        <div key={name} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-white/70 truncate max-w-[200px]">{name}</span>
                            <span className="text-white font-bold">{count}</span>
                          </div>
                          <div className="w-full h-2 bg-white/[0.02] rounded-full overflow-hidden border border-white/[0.01]">
                            <div 
                              style={{ width: `${pct}%` }}
                              className="h-full bg-brand-gold rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  {Object.keys(analytics.strengthDistribution).length === 0 && (
                    <div className="text-center text-xs text-white/30 py-8 font-mono">
                      No strengths recorded
                    </div>
                  )}
                </div>
              </div>

              {/* Limiters */}
              <div className="glass-card rounded-xl p-6 border border-white/[0.04] space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/60 font-bold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-red-400" />
                  <span>What's Holding People Back</span>
                </h3>
                <div className="space-y-3 pt-2 max-h-[220px] overflow-y-auto pr-1">
                  {Object.entries(analytics.limiterDistribution)
                    .sort((a, b) => b[1] - a[1])
                    .map(([name, count]) => {
                      const maxCount = Math.max(...Object.values(analytics.limiterDistribution), 1);
                      const pct = Math.round((count / maxCount) * 100);
                      return (
                        <div key={name} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-white/70 truncate max-w-[200px]">{name}</span>
                            <span className="text-white font-bold">{count}</span>
                          </div>
                          <div className="w-full h-2 bg-white/[0.02] rounded-full overflow-hidden border border-white/[0.01]">
                            <div 
                              style={{ width: `${pct}%` }}
                              className="h-full bg-red-500/80 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  {Object.keys(analytics.limiterDistribution).length === 0 && (
                    <div className="text-center text-xs text-white/30 py-8 font-mono">
                      No limiters recorded
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Waitlist Log Table */}
            <div className="glass-card rounded-xl border border-white/[0.05] overflow-hidden space-y-4">
              <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/70 font-bold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  <span>Waitlist Ledger</span>
                </h3>
                <span className="text-[10px] font-mono text-white/40">
                  {analytics.waitlistEntries.length} LEADS REGISTERED
                </span>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-white/40 uppercase text-[9px] bg-black/20">
                      <th className="py-3 px-6">Timestamp</th>
                      <th className="py-3 px-6">Name</th>
                      <th className="py-3 px-6">Email Address</th>
                      <th className="py-3 px-6">Instagram</th>
                      <th className="py-3 px-6 text-center">Character</th>
                      <th className="py-3 px-6">Biggest Strength</th>
                      <th className="py-3 px-6">What's Holding You Back</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {analytics.waitlistEntries.map((row) => (
                      <tr key={row.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-3 px-6 text-white/40">
                          {new Date(row.created_at).toLocaleString()}
                        </td>
                        <td className="py-3 px-6 text-white font-bold">{row.name}</td>
                        <td className="py-3 px-6 text-white/70">{row.email}</td>
                        <td className="py-3 px-6 text-white/70">@{row.instagram}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            row.archetype === 'Creator' || row.archetype === 'Builder' ? 'bg-purple-950/60 border border-purple-500/20 text-purple-300' :
                            row.archetype === 'Warrior' ? 'bg-yellow-950/60 border border-yellow-500/20 text-yellow-300' :
                            row.archetype === 'Architect' || row.archetype === 'Thinker' || row.archetype === 'Strategist' ? 'bg-blue-950/60 border border-blue-500/20 text-blue-300' :
                            'bg-pink-950/60 border border-pink-500/20 text-pink-300'
                          }`}>
                            {row.archetype === 'Builder' ? 'Creator' : row.archetype === 'Strategist' || row.archetype === 'Thinker' ? 'Architect' : row.archetype}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-brand-purple max-w-[200px] truncate" title={row.strength}>
                          {row.strength}
                        </td>
                        <td className="py-3 px-6 text-red-400 max-w-[200px] truncate" title={row.limiter}>
                          {row.limiter}
                        </td>
                      </tr>
                    ))}
                    {analytics.waitlistEntries.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-white/20">
                          No waitlist submissions recorded. Complete assessments to generate profiles.
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
