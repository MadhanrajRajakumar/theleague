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
  current_question_index: number;
  completed: boolean;
  scores: Scores;
  archetype: string | null;
  league: string | null;
  strength: string | null;
  limiter: string | null;
  quest: string | null;
  created_at: string;
  updated_at: string;
}

export interface WaitlistEntry {
  id: string;
  assessment_id: string | null;
  name: string;
  email: string;
  instagram: string;
  archetype: string;
  league: string;
  strength: string;
  limiter: string;
  quest: string;
  created_at: string;
}
