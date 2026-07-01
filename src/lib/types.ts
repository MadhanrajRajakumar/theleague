export interface Scores {
  discipline: number;
  courage: number;
  consistency: number;
  action: number;
  self_awareness: number;
  fitness: number;
  relationships: number;
  ambition: number;
}

export interface Assessment {
  id: string;
  session_id: string;
  user_id?: string | null; // Linked user ID
  current_question_index?: number;
  completed: boolean;
  scores: Scores;
  archetype_id: string | null;
  archetype_reasoning: string | null;
  brutal_truth: string | null;
  completion_seconds: number | null;
  accuracy_rating: number | null;
  league_readiness: string | null; // Stored as 'READY', 'ALMOST READY', 'NEEDS WORK'
  preferredActivity?: string | null;
  version: string;
  created_at: string;
  updated_at: string;
}

export interface WaitlistEntry {
  id: string;
  assessment_id: string | null;
  name: string | null;
  email: string;
  instagram: string | null;
  reason_for_joining: string | null;
  primary_goal: string | null;
  joined_at: string;
  // Mapped helper fields from assessment lookup in UI
  archetype_id?: string;
}

export interface AnalyticsEvent {
  id: string;
  session_id: string;
  assessment_id: string | null;
  event_type: string;
  event_data: any;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  device_type: string | null;
  content_id: string | null;
  created_at: string;
}
