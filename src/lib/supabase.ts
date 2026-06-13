import { createClient } from '@supabase/supabase-js';
import { Assessment, WaitlistEntry, Scores } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock database keys for local storage
const LOCAL_STORAGE_ASSESSMENTS_KEY = 'the_league_mock_assessments';
const LOCAL_STORAGE_WAITLIST_KEY = 'the_league_mock_waitlist';

function getMockAssessments(): Assessment[] {
  if (typeof window === 'undefined') return [];
  const val = localStorage.getItem(LOCAL_STORAGE_ASSESSMENTS_KEY);
  return val ? JSON.parse(val) : [];
}

function saveMockAssessments(data: Assessment[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_ASSESSMENTS_KEY, JSON.stringify(data));
}

function getMockWaitlist(): WaitlistEntry[] {
  if (typeof window === 'undefined') return [];
  const val = localStorage.getItem(LOCAL_STORAGE_WAITLIST_KEY);
  return val ? JSON.parse(val) : [];
}

function saveMockWaitlist(data: WaitlistEntry[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_WAITLIST_KEY, JSON.stringify(data));
}

// 1. Create a new assessment session
export async function createAssessment(sessionId: string): Promise<string> {
  const newId = typeof crypto !== 'undefined' && crypto.randomUUID 
    ? crypto.randomUUID() 
    : Math.random().toString(36).substring(2) + Date.now().toString(36);
  
  const now = new Date().toISOString();
  const baseScores: Scores = {
    discipline: 50,
    courage: 50,
    consistency: 50,
    action: 50,
    self_awareness: 50,
    fitness: 50,
    relationships: 50,
    ambition: 50
  };

  const newAssessment: Assessment = {
    id: newId,
    session_id: sessionId,
    current_question_index: 0,
    completed: false,
    scores: baseScores,
    archetype: null,
    league: null,
    strength: null,
    limiter: null,
    quest: null,
    created_at: now,
    updated_at: now
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .insert({
          id: newId,
          session_id: sessionId,
          current_question_index: 0,
          completed: false,
          scores: baseScores,
          created_at: now,
          updated_at: now
        })
        .select();
      
      if (error) throw error;
      if (data && data[0]) return data[0].id;
    } catch (e) {
      console.warn("Supabase createAssessment failed, writing to mock storage:", e);
    }
  }

  const assessments = getMockAssessments();
  assessments.push(newAssessment);
  saveMockAssessments(assessments);
  return newId;
}

// 2. Update current question progress and mid-game scores
export async function updateAssessmentProgress(
  assessmentId: string,
  currentQuestionIndex: number,
  scores: Scores
): Promise<void> {
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const { error } = await supabase
        .from('assessments')
        .update({
          current_question_index: currentQuestionIndex,
          scores,
          updated_at: now
        })
        .eq('id', assessmentId);
      
      if (error) throw error;
      return;
    } catch (e) {
      console.warn("Supabase updateAssessmentProgress failed, updating mock storage:", e);
    }
  }

  const assessments = getMockAssessments();
  const index = assessments.findIndex((a) => a.id === assessmentId);
  if (index !== -1) {
    assessments[index].current_question_index = currentQuestionIndex;
    assessments[index].scores = scores;
    assessments[index].updated_at = now;
    saveMockAssessments(assessments);
  }
}

// 3. Mark assessment completed and record final calculated results
export async function completeAssessment(
  assessmentId: string,
  results: {
    scores: Scores;
    archetype: string;
    league: string;
    strength: string;
    limiter: string;
    quest: string;
    brutalTruth?: string;
    killerSentence?: string;
  }
): Promise<void> {
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const { error } = await supabase
        .from('assessments')
        .update({
          completed: true,
          scores: results.scores,
          archetype: results.archetype,
          league: results.league,
          strength: results.strength,
          limiter: results.limiter,
          quest: results.quest,
          updated_at: now
        })
        .eq('id', assessmentId);
      
      if (error) throw error;
      return;
    } catch (e) {
      console.warn("Supabase completeAssessment failed, updating mock storage:", e);
    }
  }

  const assessments = getMockAssessments();
  const index = assessments.findIndex((a) => a.id === assessmentId);
  if (index !== -1) {
    assessments[index].completed = true;
    assessments[index].scores = results.scores;
    assessments[index].archetype = results.archetype;
    assessments[index].league = results.league;
    assessments[index].strength = results.strength;
    assessments[index].limiter = results.limiter;
    assessments[index].quest = results.quest;
    assessments[index].updated_at = now;
    saveMockAssessments(assessments);
  }
}

// 4. Save waitlist lead, linking to their assessment
export async function submitWaitlist(entry: {
  assessmentId: string;
  name: string;
  email: string;
  instagram: string;
  archetype: string;
  league: string;
  strength: string;
  limiter: string;
  quest: string;
}): Promise<void> {
  const now = new Date().toISOString();
  const newId = typeof crypto !== 'undefined' && crypto.randomUUID 
    ? crypto.randomUUID() 
    : Math.random().toString(36).substring(2) + Date.now().toString(36);

  if (supabase) {
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({
          id: newId,
          assessment_id: entry.assessmentId,
          name: entry.name,
          email: entry.email,
          instagram: entry.instagram,
          archetype: entry.archetype,
          league: entry.league,
          strength: entry.strength,
          limiter: entry.limiter,
          quest: entry.quest,
          created_at: now
        });
      
      if (error) throw error;
      return;
    } catch (e) {
      console.warn("Supabase submitWaitlist failed, adding to mock storage:", e);
    }
  }

  const waitlist = getMockWaitlist();
  const newEntry: WaitlistEntry = {
    id: newId,
    assessment_id: entry.assessmentId,
    name: entry.name,
    email: entry.email,
    instagram: entry.instagram,
    archetype: entry.archetype,
    league: entry.league,
    strength: entry.strength,
    limiter: entry.limiter,
    quest: entry.quest,
    created_at: now
  };
  waitlist.push(newEntry);
  saveMockWaitlist(waitlist);
}

// 5. Retrieve Analytics dashboard data
export interface AnalyticsData {
  totalAssessmentsStarted: number;
  totalAssessmentsCompleted: number;
  totalWaitlist: number;
  archetypeDistribution: Record<string, number>;
  strengthDistribution: Record<string, number>;
  limiterDistribution: Record<string, number>;
  waitlistEntries: WaitlistEntry[];
}

export async function getAnalytics(): Promise<AnalyticsData> {
  if (supabase) {
    try {
      const { data: assessments, error: errorAss } = await supabase
        .from('assessments')
        .select('id, completed, archetype, strength, limiter');
      
      const { data: waitlist, error: errorWait } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (errorAss || errorWait) throw new Error("Supabase read failed");

      const totalAssessmentsStarted = assessments?.length || 0;
      const totalAssessmentsCompleted = assessments?.filter(a => a.completed).length || 0;
      const totalWaitlist = waitlist?.length || 0;

      const archetypeDistribution: Record<string, number> = {};
      const strengthDistribution: Record<string, number> = {};
      const limiterDistribution: Record<string, number> = {};

      assessments?.forEach((a) => {
        if (a.completed && a.archetype) {
          archetypeDistribution[a.archetype] = (archetypeDistribution[a.archetype] || 0) + 1;
        }
        if (a.completed && a.strength) {
          strengthDistribution[a.strength] = (strengthDistribution[a.strength] || 0) + 1;
        }
        if (a.completed && a.limiter) {
          limiterDistribution[a.limiter] = (limiterDistribution[a.limiter] || 0) + 1;
        }
      });

      return {
        totalAssessmentsStarted,
        totalAssessmentsCompleted,
        totalWaitlist,
        archetypeDistribution,
        strengthDistribution,
        limiterDistribution,
        waitlistEntries: (waitlist as WaitlistEntry[]) || []
      };
    } catch (e) {
      console.warn("Supabase getAnalytics failed, reading from mock storage:", e);
    }
  }

  // Local storage mock mode
  const assessments = getMockAssessments();
  const waitlist = getMockWaitlist();

  const totalAssessmentsStarted = assessments.length;
  const totalAssessmentsCompleted = assessments.filter(a => a.completed).length;
  const totalWaitlist = waitlist.length;

  const archetypeDistribution: Record<string, number> = {};
  const strengthDistribution: Record<string, number> = {};
  const limiterDistribution: Record<string, number> = {};

  assessments.forEach((a) => {
    if (a.completed && a.archetype) {
      archetypeDistribution[a.archetype] = (archetypeDistribution[a.archetype] || 0) + 1;
    }
    if (a.completed && a.strength) {
      strengthDistribution[a.strength] = (strengthDistribution[a.strength] || 0) + 1;
    }
    if (a.completed && a.limiter) {
      limiterDistribution[a.limiter] = (limiterDistribution[a.limiter] || 0) + 1;
    }
  });

  // Sort waitlist entries by date descending
  const sortedWaitlist = [...waitlist].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    totalAssessmentsStarted,
    totalAssessmentsCompleted,
    totalWaitlist,
    archetypeDistribution,
    strengthDistribution,
    limiterDistribution,
    waitlistEntries: sortedWaitlist
  };
}

// 6. Submit user accuracy feedback
export async function submitFeedback(assessmentId: string, accuracy: string): Promise<void> {
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const { error } = await supabase
        .from('assessments')
        .update({
          accuracy_feedback: accuracy,
          updated_at: now
        })
        .eq('id', assessmentId);
      
      if (error) throw error;
      return;
    } catch (e) {
      console.warn("Supabase submitFeedback failed, updating mock storage:", e);
    }
  }

  const assessments = getMockAssessments();
  const index = assessments.findIndex((a) => a.id === assessmentId);
  if (index !== -1) {
    (assessments[index] as any).accuracy_feedback = accuracy;
    assessments[index].updated_at = now;
    saveMockAssessments(assessments);
  }
}
