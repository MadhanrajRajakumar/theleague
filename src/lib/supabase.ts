import { createClient } from '@supabase/supabase-js';
import { Assessment, WaitlistEntry, Scores, AnalyticsEvent } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock database keys for local storage fallback
const STORAGE_ASSESSMENTS = 'the_league_mock_assessments';
const STORAGE_WAITLIST = 'the_league_mock_waitlist';
const STORAGE_USERS = 'the_league_mock_users';
const STORAGE_ANSWERS = 'the_league_mock_answers';
const STORAGE_FEEDBACK = 'the_league_mock_feedback';
const STORAGE_ANALYTICS = 'the_league_mock_analytics';

// Helper utilities for local storage
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : defaultValue;
};

const setStorageItem = <T>(key: string, data: T) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

// Error logging utility helper for Supabase errors
function logSupabaseError(contextMessage: string, e: any) {
  console.error(contextMessage);
  console.error("Error object:", e);
  console.error("JSON:", JSON.stringify(e, null, 2));
  if (e && typeof e === 'object') {
    if ('error' in e) console.error("Field 'error':", (e as any).error);
    if ('message' in e) console.error("Field 'message':", (e as any).message);
    if ('details' in e) console.error("Field 'details':", (e as any).details);
    if ('hint' in e) console.error("Field 'hint':", (e as any).hint);
    if ('code' in e) console.error("Field 'code':", (e as any).code);
  }
}

// 1. Create a new assessment session (Fit Check)
export async function createAssessment(
  sessionId: string,
  utmParams?: { source: string | null; medium: string | null; campaign: string | null },
  referrer?: string | null,
  deviceType?: string | null,
  contentId?: string | null
): Promise<string> {
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
    completed: false,
    scores: baseScores,
    archetype_id: null,
    archetype_reasoning: null,
    brutal_truth: null,
    completion_seconds: null,
    accuracy_rating: null,
    league_readiness: null,
    version: 'v1',
    created_at: now,
    updated_at: now
  };

  if (supabase) {
    try {
      const { error } = await supabase
        .from('assessments')
        .insert({
          id: newId,
          session_id: sessionId,
          completed: false,
          scores: baseScores,
          version: 'v1',
          created_at: now,
          updated_at: now
        });
      
      if (error) throw error;

      // Log analytics event
      await logAnalyticsEvent(sessionId, newId, 'assessment_started', {}, utmParams, referrer, deviceType, contentId);
      return newId;
    } catch (e) {
      logSupabaseError("Supabase createAssessment failed", e);
    }
  }

  // Fallback
  const assessments = getStorageItem<Assessment[]>(STORAGE_ASSESSMENTS, []);
  assessments.push(newAssessment);
  setStorageItem(STORAGE_ASSESSMENTS, assessments);

  await logAnalyticsEvent(sessionId, newId, 'assessment_started', {}, utmParams, referrer, deviceType, contentId);
  return newId;
}

// 2. Save/Upsert an answer and log question_answered event
export async function saveAnswer(
  assessmentId: string,
  questionId: number,
  selectedOptionKey: string, // 'A', 'B', 'C', 'D'
  selectedOptionText: string
): Promise<void> {
  const now = new Date().toISOString();
  const sessionId = typeof window !== 'undefined' ? localStorage.getItem('the_league_session_id') || 'unknown' : 'unknown';

  if (supabase) {
    try {
      // Upsert answer
      const { error: upsertError } = await supabase
        .from('answers')
        .upsert({
          assessment_id: assessmentId,
          question_id: questionId,
          selected_option_key: selectedOptionKey,
          selected_option_text: selectedOptionText,
          created_at: now
        }, {
          onConflict: 'assessment_id,question_id'
        });
      
      if (upsertError) throw upsertError;

      // Log analytics event
      await logAnalyticsEvent(
        sessionId,
        assessmentId,
        'question_answered',
        { question_id: questionId, selected_option_key: selectedOptionKey }
      );
      return;
    } catch (e) {
      logSupabaseError("Supabase saveAnswer failed", e);
    }
  }

  // Fallback
  const answers = getStorageItem<any[]>(STORAGE_ANSWERS, []);
  const idx = answers.findIndex(a => a.assessment_id === assessmentId && a.question_id === questionId);
  if (idx !== -1) {
    answers[idx].selected_option_key = selectedOptionKey;
    answers[idx].selected_option_text = selectedOptionText;
    answers[idx].created_at = now;
  } else {
    answers.push({
      id: Math.random().toString(36).substring(2),
      assessment_id: assessmentId,
      question_id: questionId,
      selected_option_key: selectedOptionKey,
      selected_option_text: selectedOptionText,
      created_at: now
    });
  }
  setStorageItem(STORAGE_ANSWERS, answers);

  await logAnalyticsEvent(
    sessionId,
    assessmentId,
    'question_answered',
    { question_id: questionId, selected_option_key: selectedOptionKey }
  );
}

// 3. Complete assessment and update results
export async function completeAssessment(
  assessmentId: string,
  results: {
    scores: Scores;
    archetype: string; // Will map e.g. 'Creator' -> 'creator'
    brutalTruth?: string;
    archetypeReasoning?: string;
    leagueReadiness?: string; // Qualitative level: 'READY', 'ALMOST READY', 'NEEDS WORK'
  },
  completionSeconds: number
): Promise<void> {
  const now = new Date().toISOString();
  const sessionId = typeof window !== 'undefined' ? localStorage.getItem('the_league_session_id') || 'unknown' : 'unknown';
  const cleanArchetypeId = results.archetype.toLowerCase().trim(); // Ensure standardized lowercase IDs

  if (supabase) {
    try {
      const { error } = await supabase
        .from('assessments')
        .update({
          completed: true,
          scores: results.scores,
          archetype_id: cleanArchetypeId,
          archetype_reasoning: results.archetypeReasoning || null,
          brutal_truth: results.brutalTruth || null,
          league_readiness: results.leagueReadiness || null,
          completion_seconds: Math.max(0, completionSeconds),
          updated_at: now
        })
        .eq('id', assessmentId);
      
      if (error) throw error;

      await logAnalyticsEvent(sessionId, assessmentId, 'assessment_completed', { archetype_id: cleanArchetypeId });
      return;
    } catch (e) {
      logSupabaseError("Supabase completeAssessment failed", e);
    }
  }

  // Fallback
  const assessments = getStorageItem<Assessment[]>(STORAGE_ASSESSMENTS, []);
  const index = assessments.findIndex((a) => a.id === assessmentId);
  if (index !== -1) {
    assessments[index].completed = true;
    assessments[index].scores = results.scores;
    assessments[index].archetype_id = cleanArchetypeId;
    assessments[index].archetype_reasoning = results.archetypeReasoning || null;
    assessments[index].brutal_truth = results.brutalTruth || null;
    assessments[index].league_readiness = results.leagueReadiness || null;
    assessments[index].completion_seconds = Math.max(0, completionSeconds);
    assessments[index].updated_at = now;
    setStorageItem(STORAGE_ASSESSMENTS, assessments);
  }

  await logAnalyticsEvent(sessionId, assessmentId, 'assessment_completed', { archetype_id: cleanArchetypeId });
}

// 4. Save waitlist lead, linking to assessment (now with Reason & Goal capture)
export async function submitWaitlist(entry: {
  assessmentId: string;
  name?: string;
  email: string;
  instagram?: string;
  reasonForJoining?: string;
  primaryGoal?: string;
}): Promise<void> {
  const now = new Date().toISOString();
  const sessionId = typeof window !== 'undefined' ? localStorage.getItem('the_league_session_id') || 'unknown' : 'unknown';
  
  const cleanEmail = entry.email.trim().toLowerCase();
  const cleanName = entry.name?.trim() || null;
  const cleanInstagram = entry.instagram?.trim().replace('@', '') || null;
  const cleanReason = entry.reasonForJoining || null;
  const cleanGoal = entry.primaryGoal || null;

  if (supabase) {
    try {
      // Find or insert user in users table
      let userId = '';
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (existingUser) {
        userId = existingUser.id;
        // Optionally update optional name/instagram if they were provided
        if (cleanName || cleanInstagram) {
          const updates: any = {};
          if (cleanName) updates.name = cleanName;
          if (cleanInstagram) updates.instagram = cleanInstagram;
          await supabase.from('users').update(updates).eq('id', userId);
        }
      } else {
        const { data: newUser, error: userError } = await supabase
          .from('users')
          .insert({
            name: cleanName,
            email: cleanEmail,
            instagram: cleanInstagram,
            created_at: now
          })
          .select('id')
          .single();
        
        if (userError) throw userError;
        userId = newUser.id;
      }

      // Link user to assessment
      await supabase
        .from('assessments')
        .update({ user_id: userId, updated_at: now })
        .eq('id', entry.assessmentId);

      // Insert into waitlist (uses ON CONFLICT to prevent duplicate rows)
      const { error: waitError } = await supabase
        .from('waitlist')
        .upsert({
          assessment_id: entry.assessmentId,
          user_id: userId,
          reason_for_joining: cleanReason,
          primary_goal: cleanGoal,
          joined_at: now
        }, {
          onConflict: 'user_id'
        });
      
      if (waitError) throw waitError;

      // Log event
      await logAnalyticsEvent(sessionId, entry.assessmentId, 'waitlist_joined', { user_id: userId });
      return;
    } catch (e) {
      logSupabaseError("Supabase submitWaitlist failed", e);
    }
  }

  // Fallback
  const users = getStorageItem<any[]>(STORAGE_USERS, []);
  let user = users.find(u => u.email === cleanEmail);
  if (!user) {
    user = {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      name: cleanName,
      email: cleanEmail,
      instagram: cleanInstagram,
      created_at: now
    };
    users.push(user);
    setStorageItem(STORAGE_USERS, users);
  } else {
    if (cleanName) user.name = cleanName;
    if (cleanInstagram) user.instagram = cleanInstagram;
    setStorageItem(STORAGE_USERS, users);
  }

  // Link assessment
  const assessments = getStorageItem<Assessment[]>(STORAGE_ASSESSMENTS, []);
  const aIdx = assessments.findIndex(a => a.id === entry.assessmentId);
  if (aIdx !== -1) {
    assessments[aIdx].user_id = user.id;
    setStorageItem(STORAGE_ASSESSMENTS, assessments);
  }

  // Add to waitlist (emulate unique user_id constraint)
  const waitlist = getStorageItem<any[]>(STORAGE_WAITLIST, []);
  const wIdx = waitlist.findIndex(w => w.user_id === user.id);
  if (wIdx === -1) {
    waitlist.push({
      id: Math.random().toString(36).substring(2),
      assessment_id: entry.assessmentId,
      user_id: user.id,
      reason_for_joining: cleanReason,
      primary_goal: cleanGoal,
      joined_at: now
    });
    setStorageItem(STORAGE_WAITLIST, waitlist);
  } else {
    waitlist[wIdx].reason_for_joining = cleanReason;
    waitlist[wIdx].primary_goal = cleanGoal;
    setStorageItem(STORAGE_WAITLIST, waitlist);
  }

  await logAnalyticsEvent(sessionId, entry.assessmentId, 'waitlist_joined', { user_id: user.id });
}

// 5. Submit user accuracy rating feedback
export async function submitFeedback(assessmentId: string, ratingVal: number): Promise<void> {
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const { error } = await supabase
        .from('assessments')
        .update({
          accuracy_rating: ratingVal,
          updated_at: now
        })
        .eq('id', assessmentId);
      
      if (error) throw error;
      return;
    } catch (e) {
      logSupabaseError("Supabase submitFeedback failed", e);
    }
  }

  // Fallback
  const assessments = getStorageItem<Assessment[]>(STORAGE_ASSESSMENTS, []);
  const index = assessments.findIndex((a) => a.id === assessmentId);
  if (index !== -1) {
    assessments[index].accuracy_rating = ratingVal;
    assessments[index].updated_at = now;
    setStorageItem(STORAGE_ASSESSMENTS, assessments);
  }
}

// 6. Submit open-text feedback
export async function submitOpenFeedback(assessmentId: string, feedbackText: string): Promise<void> {
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          assessment_id: assessmentId,
          feedback_text: feedbackText,
          created_at: now
        });
      if (error) throw error;
      return;
    } catch (e) {
      logSupabaseError("Supabase submitOpenFeedback failed", e);
    }
  }

  // Fallback
  const feedbacks = getStorageItem<any[]>(STORAGE_FEEDBACK, []);
  feedbacks.push({
    id: Math.random().toString(36).substring(2),
    assessment_id: assessmentId,
    feedback_text: feedbackText,
    created_at: now
  });
  setStorageItem(STORAGE_FEEDBACK, feedbacks);
}

// 7. Track analytics event
export async function logAnalyticsEvent(
  sessionId: string,
  assessmentId: string | null,
  eventType: string,
  eventData: any = {},
  utmParams?: { source: string | null; medium: string | null; campaign: string | null },
  referrer?: string | null,
  deviceType?: string | null,
  contentId?: string | null
): Promise<void> {
  const now = new Date().toISOString();

  // Inject version: 'v1' into event_data
  const enrichedEventData = {
    ...eventData,
    version: 'v1'
  };

  if (supabase) {
    try {
      const { error } = await supabase
        .from('analytics')
        .insert({
          session_id: sessionId,
          assessment_id: assessmentId,
          event_type: eventType,
          event_data: enrichedEventData,
          utm_source: utmParams?.source || null,
          utm_medium: utmParams?.medium || null,
          utm_campaign: utmParams?.campaign || null,
          referrer: referrer || null,
          device_type: deviceType || null,
          content_id: contentId || null,
          created_at: now
        });
      
      if (error) throw error;
      return;
    } catch (e) {
      logSupabaseError("Supabase logAnalyticsEvent failed", e);
    }
  }

  // Fallback
  const events = getStorageItem<AnalyticsEvent[]>(STORAGE_ANALYTICS, []);
  events.push({
    id: Math.random().toString(36).substring(2),
    session_id: sessionId,
    assessment_id: assessmentId,
    event_type: eventType,
    event_data: enrichedEventData,
    utm_source: utmParams?.source || null,
    utm_medium: utmParams?.medium || null,
    utm_campaign: utmParams?.campaign || null,
    referrer: referrer || null,
    device_type: deviceType || null,
    content_id: contentId || null,
    created_at: now
  });
  setStorageItem(STORAGE_ANALYTICS, events);
}

// 8. Retrieve Dashboard metrics & ledger (Admin panel)
export interface DashboardMetrics {
  // Top 5 core KPIs
  totalStarts: number;
  totalCompletions: number;
  completionRate: number;
  totalWaitlist: number;
  signupRate: number;

  // Drop-off tracking
  questionDropOff: { question_id: number; count: number }[];

  // Performance breakdowns
  archetypeConversion: {
    archetype_id: string;
    completions: number;
    waitlist: number;
    rate: number;
  }[];

  reelPerformance: {
    content_id: string;
    starts: number;
    waitlist: number;
    rate: number;
  }[];

  referrers: { referrer: string; count: number }[];
  
  // Pain and Goal distributions (Launch Priority Metrics)
  topReasons: { reason: string; count: number }[];
  topGoals: { goal: string; count: number }[];
  
  // Waitlist Ledger entries
  waitlistEntries: {
    joined_at: string;
    name: string | null;
    email: string;
    instagram: string | null;
    archetype_id: string;
    reason_for_joining: string | null;
    primary_goal: string | null;
  }[];
}

export async function getAnalytics(): Promise<DashboardMetrics> {
  let dbAssessments: any[] = [];
  let dbWaitlist: any[] = [];
  let dbUsers: any[] = [];
  let dbAnswers: any[] = [];
  let dbAnalytics: any[] = [];

  if (supabase) {
    try {
      const { data: ass } = await supabase.from('assessments').select('*');
      const { data: wait } = await supabase.from('waitlist').select('*');
      const { data: usr } = await supabase.from('users').select('*');
      const { data: ans } = await supabase.from('answers').select('assessment_id, question_id');
      const { data: ana } = await supabase.from('analytics').select('*');

      dbAssessments = ass || [];
      dbWaitlist = wait || [];
      dbUsers = usr || [];
      dbAnswers = ans || [];
      dbAnalytics = ana || [];
    } catch (e) {
      logSupabaseError("Supabase analytics query failed", e);
      dbAssessments = getStorageItem<any[]>(STORAGE_ASSESSMENTS, []);
      dbWaitlist = getStorageItem<any[]>(STORAGE_WAITLIST, []);
      dbUsers = getStorageItem<any[]>(STORAGE_USERS, []);
      dbAnswers = getStorageItem<any[]>(STORAGE_ANSWERS, []);
      dbAnalytics = getStorageItem<any[]>(STORAGE_ANALYTICS, []);
    }
  } else {
    dbAssessments = getStorageItem<any[]>(STORAGE_ASSESSMENTS, []);
    dbWaitlist = getStorageItem<any[]>(STORAGE_WAITLIST, []);
    dbUsers = getStorageItem<any[]>(STORAGE_USERS, []);
    dbAnswers = getStorageItem<any[]>(STORAGE_ANSWERS, []);
    dbAnalytics = getStorageItem<any[]>(STORAGE_ANALYTICS, []);
  }

  // 1. Core KPIs
  const totalStarts = dbAnalytics.filter(e => e.event_type === 'assessment_started').length;
  const totalCompletions = dbAnalytics.filter(e => e.event_type === 'assessment_completed').length;
  const completionRate = totalStarts > 0 ? Math.round((totalCompletions / totalStarts) * 100) : 0;
  const totalWaitlist = dbWaitlist.length;
  const signupRate = totalCompletions > 0 ? Math.round((totalWaitlist / totalCompletions) * 100) : 0;

  // 2. Question Drop-off (count of distinct assessments answering each question 1-10)
  const questionDropOffMap: Record<number, Set<string>> = {};
  for (let q = 1; q <= 10; q++) {
    questionDropOffMap[q] = new Set<string>();
  }

  dbAnswers.forEach(ans => {
    const qId = Number(ans.question_id);
    if (qId >= 1 && qId <= 10 && ans.assessment_id) {
      questionDropOffMap[qId].add(ans.assessment_id);
    }
  });

  const questionDropOff = Object.entries(questionDropOffMap).map(([qId, set]) => ({
    question_id: Number(qId),
    count: set.size
  })).sort((a, b) => a.question_id - b.question_id);

  // 3. Archetype Conversion
  const archConversionMap: Record<string, { completions: number; waitlist: number }> = {
    creator: { completions: 0, waitlist: 0 },
    warrior: { completions: 0, waitlist: 0 },
    architect: { completions: 0, waitlist: 0 },
    connector: { completions: 0, waitlist: 0 }
  };

  // Populate completed counts
  dbAssessments.forEach(ass => {
    if (ass.completed && ass.archetype_id) {
      const arch = ass.archetype_id.toLowerCase().trim();
      if (archConversionMap[arch]) {
        archConversionMap[arch].completions += 1;
      }
    }
  });

  // Populate waitlist counts
  dbWaitlist.forEach(wait => {
    const ass = dbAssessments.find(a => a.id === wait.assessment_id);
    if (ass && ass.archetype_id) {
      const arch = ass.archetype_id.toLowerCase().trim();
      if (archConversionMap[arch]) {
        archConversionMap[arch].waitlist += 1;
      }
    }
  });

  const archetypeConversion = Object.entries(archConversionMap).map(([archId, counts]) => ({
    archetype_id: archId,
    completions: counts.completions,
    waitlist: counts.waitlist,
    rate: counts.completions > 0 ? Math.round((counts.waitlist / counts.completions) * 100) : 0
  }));

  // 4. Reel Performance (Group by content_id)
  const reelMap: Record<string, { starts: number; waitlist: number }> = {};
  
  // Count starts per reel
  dbAnalytics.forEach(evt => {
    if (evt.content_id) {
      const cid = evt.content_id.trim();
      if (!reelMap[cid]) reelMap[cid] = { starts: 0, waitlist: 0 };
      
      if (evt.event_type === 'assessment_started') {
        reelMap[cid].starts += 1;
      }
    }
  });

  // Count waitlist joins per reel (retrieve content_id from the initial start event or waitlist event)
  dbWaitlist.forEach(wait => {
    // Find the start event for this assessment to link content_id
    const startEvt = dbAnalytics.find(e => e.assessment_id === wait.assessment_id && e.event_type === 'assessment_started');
    if (startEvt && startEvt.content_id) {
      const cid = startEvt.content_id.trim();
      if (reelMap[cid]) {
        reelMap[cid].waitlist += 1;
      }
    }
  });

  const reelPerformance = Object.entries(reelMap).map(([cid, counts]) => ({
    content_id: cid,
    starts: counts.starts,
    waitlist: counts.waitlist,
    rate: counts.starts > 0 ? Math.round((counts.waitlist / counts.starts) * 100) : 0
  })).sort((a, b) => b.starts - a.starts);

  // 5. Referrer breakdown
  const referrerCounts: Record<string, number> = {};
  dbAnalytics.forEach(evt => {
    if (evt.event_type === 'assessment_started') {
      const refDomain = evt.referrer 
        ? evt.referrer.replace(/https?:\/\/(www\.)?/, '').split('/')[0] 
        : 'direct';
      referrerCounts[refDomain] = (referrerCounts[refDomain] || 0) + 1;
    }
  });

  const referrers = Object.entries(referrerCounts)
    .map(([ref, count]) => ({ referrer: ref, count }))
    .sort((a, b) => b.count - a.count);

  // 6. Reasons & Goals distributions (Launch metrics)
  const reasonCounts: Record<string, number> = {};
  const goalCounts: Record<string, number> = {};

  dbWaitlist.forEach(w => {
    if (w.reason_for_joining) {
      const reason = w.reason_for_joining.trim();
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
    }
    if (w.primary_goal) {
      const goal = w.primary_goal.trim();
      goalCounts[goal] = (goalCounts[goal] || 0) + 1;
    }
  });

  const topReasons = Object.entries(reasonCounts)
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count);

  const topGoals = Object.entries(goalCounts)
    .map(([goal, count]) => ({ goal, count }))
    .sort((a, b) => b.count - a.count);

  // 7. Waitlist Entries Ledger
  const waitlistEntries = dbWaitlist.map(wait => {
    const user = dbUsers.find(u => u.id === wait.user_id);
    const ass = dbAssessments.find(a => a.id === wait.assessment_id);
    return {
      joined_at: wait.joined_at,
      name: user ? user.name : null,
      email: user ? user.email : 'unknown@domain.com',
      instagram: user ? user.instagram : null,
      archetype_id: ass ? ass.archetype_id || 'unknown' : 'unknown',
      reason_for_joining: wait.reason_for_joining || null,
      primary_goal: wait.primary_goal || null
    };
  }).sort((a, b) => new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime());

  return {
    totalStarts,
    totalCompletions,
    completionRate,
    totalWaitlist,
    signupRate,
    questionDropOff,
    archetypeConversion,
    reelPerformance,
    referrers,
    topReasons,
    topGoals,
    waitlistEntries
  };
}
