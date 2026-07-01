import { Scores } from './types';

// Global normalization hook to map 'thinker' to 'architect' for UI & DB compatibility
if (typeof String === 'function' && String.prototype) {
  const originalToLowerCase = String.prototype.toLowerCase;
  String.prototype.toLowerCase = function(this: any) {
    const val = originalToLowerCase.call(this);
    if (val === 'thinker') return 'architect';
    return val;
  };
}

export interface Option {
  text: string;
  scoreModifier: Partial<Scores>;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "You and a friend decide to get back in shape together. The first workout is tomorrow morning. Ten minutes before bed, your friend messages: \"I'm not coming tomorrow. Let's start next week instead.\" The alarm rings the next morning. What feels most familiar?",
    options: [
      {
        text: "Starting alone feels pointless. I'll wait until we're both ready.",
        scoreModifier: { consistency: -10, fitness: -5, action: -10 }
      },
      {
        text: "I'll use the extra time to figure out a better plan first.",
        scoreModifier: { action: -5, self_awareness: +5 }
      },
      {
        text: "I'll probably go, but part of me already feels less motivated.",
        scoreModifier: { consistency: +5, discipline: +5, fitness: +5 }
      },
      {
        text: "I go anyway. The commitment was to myself, not my friend.",
        scoreModifier: { discipline: +10, fitness: +10, consistency: +10 }
      }
    ]
  },
  {
    id: 2,
    text: "You've been training consistently for a couple of weeks. Then life happens. A stressful work week, poor sleep, travel, and a packed schedule cause you to miss a workout you promised yourself you'd do. What feels most familiar afterward?",
    options: [
      {
        text: "One missed workout usually becomes several before I get back on track.",
        scoreModifier: { consistency: -15, discipline: -10 }
      },
      {
        text: "I spend a lot of time thinking about how to restart properly.",
        scoreModifier: { action: -10, self_awareness: +5 }
      },
      {
        text: "I tell myself I'll make it up later when things calm down.",
        scoreModifier: { consistency: -5, discipline: -5 }
      },
      {
        text: "I get back to training as soon as the disruption passes, without overthinking it.",
        scoreModifier: { consistency: +10, discipline: +10, fitness: +5 }
      }
    ]
  },
  {
    id: 3,
    text: "You've been consistent for 8 weeks.\nThen one week, life gets busy. You miss two sessions.\nYou're not injured. Nothing serious happened.\nWhat feels most familiar?",
    options: [
      {
        text: "I tell myself I'll restart properly on Monday.",
        scoreModifier: { consistency: -10, discipline: -10, ambition: -5 }
      },
      {
        text: "I immediately look for what went wrong in my plan.",
        scoreModifier: { consistency: +10, discipline: +10 }
      },
      {
        text: "I feel guilty but get back within a day or two without making it a big deal.",
        scoreModifier: { ambition: +10, action: +5 }
      },
      {
        text: "Missing once makes it much easier to miss again. It usually spirals.",
        scoreModifier: { ambition: +15, discipline: +5 }
      }
    ]
  },
  {
    id: 4,
    text: "Be honest. Which situation gives you the best chance of staying consistent for the next 6 months?",
    options: [
      {
        text: "Training completely on my own.",
        scoreModifier: { courage: +10, relationships: -5 }
      },
      {
        text: "Knowing someone is checking whether I followed through.",
        scoreModifier: { consistency: +10, relationships: +5 }
      },
      {
        text: "Being around people with the same goal who are working toward it every day.",
        scoreModifier: { relationships: +10, consistency: +5 }
      },
      {
        text: "A combination of accountability and disciplined people around me.",
        scoreModifier: { relationships: +10, consistency: +10, discipline: +5 }
      }
    ]
  },
  {
    id: 5,
    text: "You're joining a 4-week fitness challenge.\nTwo versions exist.\nVersion A — Free. No entry fee. No penalty for missing. A group tracking progress together.\nVersion B — ₹3,000 entry fee. If your team hits their targets consistently, you split the entry fees from teams that didn't. If your team misses, you lose your entry fee.\nBe honest. Which version are you more likely to actually complete?",
    options: [
      {
        text: "I don't need financial pressure to show up.",
        scoreModifier: { self_awareness: +10, relationships: +5 }
      },
      {
        text: "knowing money is on the line changes everything for me.",
        scoreModifier: { self_awareness: -10, ambition: -5 }
      },
      {
        text: "but only if I know my teammates are equally serious.",
        scoreModifier: { ambition: +10, action: +10, consistency: -5 }
      },
      {
        text: "Honestly, I'd probably find a reason to quit either way.",
        scoreModifier: { courage: -15, self_awareness: -15 }
      }
    ]
  },
  {
    id: 6,
    text: "You've been consistent with the gym for 3 months. One day, your boss criticizes you in front of others. You're frustrated and mentally drained. You're also a stress eater. Deep down, you know that eating your favorite comfort food will instantly make you feel better. What feels most familiar?",
    options: [
      {
        text: "I order the food, skip the gym, and tell myself I'll get back on track tomorrow.",
        scoreModifier: { fitness: -15, discipline: -15 }
      },
      {
        text: "I order the food because I need the comfort, but I still make it to the gym.",
        scoreModifier: { fitness: +5, discipline: +5, courage: +5 }
      },
      {
        text: "I go to the gym first, then decide whether I still want the food afterward.",
        scoreModifier: { self_awareness: +10, discipline: +10, fitness: +5 }
      },
      {
        text: "I stick to my original plan, even though the food sounds incredibly tempting.",
        scoreModifier: { discipline: +15, fitness: +10 }
      }
    ]
  },
  {
    id: 7,
    text: "You've been consistent for 3 months.\nYou haven't skipped.\nYou've made real sacrifices.\nBut the mirror barely changes. Your waistband still feels tight. Nobody has noticed a difference.\nWhat feels most familiar?",
    options: [
      {
        text: "Progress is slower than I want, but I'll keep going.",
        scoreModifier: { consistency: +15, discipline: +5 }
      },
      {
        text: "There has to be a better approach. I start researching alternatives.",
        scoreModifier: { self_awareness: +10, action: +5 }
      },
      {
        text: "Maybe I'm the problem. I start questioning whether I'm doing enough.",
        scoreModifier: { self_awareness: -10, courage: -5 }
      },
      {
        text: "I keep showing up, but quietly I'm wondering if this is even working.",
        scoreModifier: { consistency: -15, ambition: -10 }
      }
    ]
  },
  {
    id: 8,
    text: "When you think about staying consistent with fitness over the next season — what activity are you most likely to actually show up for, week after week?\nPick the one that fits you best.",
    options: [
      {
        text: "Running / Walking (outdoor or treadmill)",
        scoreModifier: {}
      },
      {
        text: "Gym workouts (weights, functional training, CrossFit)",
        scoreModifier: {}
      },
      {
        text: "Court sports (Badminton, Squash, Pickleball, Tennis)",
        scoreModifier: {}
      },
      {
        text: "Yoga / Pilates / Mobility work",
        scoreModifier: {}
      }
    ]
  },
  {
    id: 9,
    text: "A month ago, you told everyone you were finally going to get serious about your fitness. Recently, you've stopped following the diet and training plan you promised yourself. Then someone close to you notices and says: \"Looks like that fitness thing didn't last very long.\" What feels most familiar?",
    options: [
      {
        text: "They're right, and hearing it stings.",
        scoreModifier: { self_awareness: +10 }
      },
      {
        text: "I immediately start defending myself and explaining why it's been difficult.",
        scoreModifier: { self_awareness: -10, courage: -5 }
      },
      {
        text: "I hate hearing it, but it pushes me to prove them wrong.",
        scoreModifier: { courage: +15, action: +10 }
      },
      {
        text: "I act like I don't care, but I avoid talking about fitness afterward.",
        scoreModifier: { courage: -10, self_awareness: -5 }
      }
    ]
  },
  {
    id: 10,
    text: "Imagine nothing changes. One year passes. You look back and realize you're still stuck in the same cycle. What would bother you most?",
    options: [
      {
        text: "My health is worse than it should be.",
        scoreModifier: { fitness: +10 }
      },
      {
        text: "I still don't like what I see in the mirror.",
        scoreModifier: { ambition: +10 }
      },
      {
        text: "I keep breaking promises to myself.",
        scoreModifier: { discipline: +10 }
      },
      {
        text: "Knowing I had the ability to change but never did.",
        scoreModifier: { self_awareness: +10, courage: +5 }
      }
    ]
  }
];

export const ARCHETYPES = {
  BUILDER: 'Creator',
  WARRIOR: 'Warrior',
  ARCHITECT: 'Architect',
  CONNECTOR: 'Connector'
} as const;

export const LEAGUES = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'] as const;

export interface CalculationResult {
  scores: Scores;
  archetype: string;
  secondaryArchetype?: string;
  league: string;
  strength: string;
  limiter: string;
  quest: string;
  brutalTruth: string;
  killerSentence: string;
  leagueReadiness: string;
  readinessText: string;
  preferredActivity?: string;
  lowConfidence: boolean;
}

export function calculateResults(answers: number[]): CalculationResult {
  // 1. Calculate traditional 8 score categories using the original logic (except Q8)
  const scores: Scores = {
    discipline: 50,
    courage: 50,
    consistency: 50,
    action: 50,
    self_awareness: 50,
    fitness: 50,
    relationships: 50,
    ambition: 50
  };

  answers.forEach((optionIndex, questionIndex) => {
    if (questionIndex === 7) return; // Skip Q8 (index 7) from traditional scores
    const question = QUESTIONS[questionIndex];
    if (!question) return;
    const option = question.options[optionIndex];
    if (!option) return;

    Object.entries(option.scoreModifier).forEach(([key, val]) => {
      const k = key as keyof Scores;
      scores[k] = (scores[k] || 0) + (val || 0);
    });
  });

  // Clamp scores between 0 and 100
  Object.keys(scores).forEach((key) => {
    const k = key as keyof Scores;
    scores[k] = Math.max(0, Math.min(100, scores[k]));
  });

  // 2. New archetype point-based scoring logic
  const ARCHETYPE_MAPS: Record<number, Record<number, string | Record<string, number>>> = {
    0: { 0: 'CONNECTOR', 1: 'THINKER', 2: 'CREATOR', 3: 'WARRIOR' },
    1: { 0: 'CREATOR', 1: 'THINKER', 2: 'CONNECTOR', 3: 'WARRIOR' },
    2: { 0: 'THINKER', 1: 'THINKER', 2: 'WARRIOR', 3: 'CREATOR' },
    3: { 0: 'WARRIOR', 1: 'THINKER', 2: 'CONNECTOR', 3: { CONNECTOR: 0.5, WARRIOR: 0.5 } },
    4: { 0: 'WARRIOR', 1: 'CREATOR', 2: 'CONNECTOR', 3: 'LOW_CONFIDENCE' },
    5: { 0: 'CREATOR', 1: 'CONNECTOR', 2: 'WARRIOR', 3: 'WARRIOR' },
    6: { 0: 'WARRIOR', 1: 'THINKER', 2: 'CREATOR', 3: 'CONNECTOR' },
    8: { 0: 'CREATOR', 1: 'THINKER', 2: 'WARRIOR', 3: 'CONNECTOR' },
    9: { 0: 'WARRIOR', 1: 'CREATOR', 2: 'CONNECTOR', 3: 'THINKER' }
  };

  const archetypePoints: Record<string, number> = {
    WARRIOR: 0,
    THINKER: 0,
    CONNECTOR: 0,
    CREATOR: 0
  };

  let lowConfidence = false;

  answers.forEach((optionIndex, questionIndex) => {
    if (questionIndex === 7) return; // Q8 is not scored
    
    // Check if Q5 option is D (index 3) to flag low confidence
    if (questionIndex === 4 && optionIndex === 3) {
      lowConfidence = true;
      return; // "no points awarded, flag as low_confidence"
    }

    const map = ARCHETYPE_MAPS[questionIndex];
    if (!map) return;
    const value = map[optionIndex];
    if (!value) return;

    if (typeof value === 'string') {
      if (value !== 'LOW_CONFIDENCE') {
        archetypePoints[value] = (archetypePoints[value] || 0) + 1;
      }
    } else {
      // split points
      Object.entries(value).forEach(([arch, pts]) => {
        archetypePoints[arch] = (archetypePoints[arch] || 0) + pts;
      });
    }
  });

  // Tiebreaker priorities from Q1 and Q6
  const q1AnswerIndex = answers[0];
  const q1Map = ARCHETYPE_MAPS[0];
  const q1ChosenArch = q1Map && q1AnswerIndex !== undefined ? q1Map[q1AnswerIndex] : null;

  const q6AnswerIndex = answers[5];
  const q6Map = ARCHETYPE_MAPS[5];
  const q6ChosenArch = q6Map && q6AnswerIndex !== undefined ? q6Map[q6AnswerIndex] : null;

  const getPriority = (arch: string): number => {
    if (arch === q1ChosenArch) return 2;
    if (arch === q6ChosenArch) return 1;
    return 0;
  };

  const sortedArchetypes = Object.keys(archetypePoints).sort((a, b) => {
    const scoreDiff = archetypePoints[b] - archetypePoints[a];
    if (scoreDiff !== 0) return scoreDiff;

    const priorityDiff = getPriority(b) - getPriority(a);
    if (priorityDiff !== 0) return priorityDiff;

    return a.localeCompare(b);
  });

  const archetype = sortedArchetypes[0]; // Primary archetype (e.g. 'WARRIOR')
  const secondaryArchetype = sortedArchetypes[1]; // Secondary archetype (e.g. 'THINKER')

  // League Rank (kept in backend types to prevent db breakage, but hidden from UI)
  const totalAvg = Object.values(scores).reduce((sum, s) => sum + s, 0) / 8;
  let league = 'Bronze';
  if (totalAvg >= 90) league = 'Diamond';
  else if (totalAvg >= 75) league = 'Platinum';
  else if (totalAvg >= 60) league = 'Gold';
  else if (totalAvg >= 40) league = 'Silver';

  // Strengths Display Mapping
  const strengthDisplayNames: Record<keyof Scores, string> = {
    discipline: "You show up and stay disciplined when others quit.",
    courage: "You take risks when you believe in something.",
    consistency: "You show up day after day.",
    action: "You take action faster than most people.",
    self_awareness: "You rarely make reckless decisions.",
    fitness: "You protect your body and physical energy.",
    relationships: "You build trust and connect people naturally.",
    ambition: "You dream big and want more from life."
  };

  // Limiters Display Mapping
  const limiterDisplayNames: Record<keyof Scores, string> = {
    discipline: "Losing discipline when things get hard.",
    courage: "Letting fear stop you from taking risks.",
    consistency: "Giving up before a habit becomes automatic.",
    action: "Using planning as a substitute for action.",
    self_awareness: "Not noticing how your own actions block you.",
    fitness: "Neglecting your body and physical energy.",
    relationships: "You try to solve everything alone.",
    ambition: "Settling for less than you are capable of."
  };

  // Archetype Specific Strength / Limiter Overrides (Frame in fitness context)
  const archetypeStrength: Record<string, string> = {
    Creator: "You start training transformations at high velocity.",
    Warrior: "You push through the hardest workouts consistently.",
    Architect: "You understand your physical limits and plan recovery logically.",
    Connector: "You gather training groups and build collective momentum."
  };

  const archetypeLimiter: Record<string, string> = {
    Creator: "You lose focus and quit workouts when the novelty fades.",
    Warrior: "You overtrain and burn out by ignoring sleep and rest.",
    Architect: "You analyze training splits to avoid executing them with effort.",
    Connector: "You prioritize social workouts over hitting your personal benchmarks."
  };

  // Normalize case for local display overrides keys
  const normKey = archetype === 'THINKER' ? 'Architect' : (archetype.charAt(0) + archetype.slice(1).toLowerCase());

  const strength = archetypeStrength[normKey] || strengthDisplayNames[strengthAttrName(scores)];
  const limiter = archetypeLimiter[normKey] || limiterDisplayNames[limiterAttrName(scores)];

  // Next Challenge in Fitness Context
  const archetypeQuests: Record<string, string> = {
    Creator: "Complete 1 full workout program without changing it.",
    Warrior: "Schedule 2 consecutive active recovery days this week.",
    Architect: "Execute your next scheduled workout at high intensity today.",
    Connector: "Complete one solo training session and hit your own targets."
  };
  const quest = archetypeQuests[normKey] || "Start one conversation you've been avoiding.";

  // Brutal Truth in Fitness Context
  const brutalTruths: Record<string, string> = {
    Creator: "Having the perfect fitness program is not your problem. Sticking to it past week three is.",
    Warrior: "Running yourself into the ground is not progress. It is how you mask a lack of recovery.",
    Architect: "You don't need a better nutrition spreadsheet. You need to lift heavy weights with effort today.",
    Connector: "Running in clubs and doing group classes is productive. Using them to avoid personal discipline is your favorite distraction."
  };
  const brutalTruth = brutalTruths[normKey] || "";

  const killerSentences: Record<string, string> = {
    Creator: "You don't need another fitness plan. You need people who won't let you quit the one you have.",
    Warrior: "You don't need more grit. You need people who force you to recover so you can grow.",
    Architect: "You don't need more research. You need an environment where execution is the only metric.",
    Connector: "You don't need more gym buddies. You need people whose standards challenge your consistency."
  };
  const killerSentence = killerSentences[normKey] || "";

  // Calculate qualitative League Readiness
  const avgReadiness = (scores.discipline + scores.consistency + scores.action + scores.self_awareness) / 4;
  let leagueReadiness = 'NEEDS WORK';
  let readinessText = 'You have ambition. Your consistency is currently your bottleneck. Before joining a high-performance training cohort, you need to prove you can keep physical promises to yourself.';

  if (avgReadiness >= 75) {
    leagueReadiness = 'READY';
    readinessText = 'Your training discipline is strong. Your next challenge is surrounding yourself with peers who will push you to optimize your trajectory.';
  } else if (avgReadiness >= 55) {
    leagueReadiness = 'ALMOST READY';
    readinessText = 'You are taking action. Your main bottleneck is nutrition or recovery consistency. You need to focus on eating and sleeping rather than just staying busy.';
  }

  const q8AnswerIndex = answers[7];
  const q8Question = QUESTIONS[7];
  const preferredActivity = q8Question && q8AnswerIndex !== undefined && q8Question.options[q8AnswerIndex]
    ? q8Question.options[q8AnswerIndex].text
    : undefined;

  return {
    scores,
    archetype,
    secondaryArchetype,
    league,
    strength,
    limiter,
    quest,
    brutalTruth,
    killerSentence,
    leagueReadiness,
    readinessText,
    preferredActivity,
    lowConfidence
  };
}

function strengthAttrName(scores: Scores): keyof Scores {
  const attributes = Object.entries(scores).map(([name, score]) => ({ name, score }));
  attributes.sort((a, b) => b.score - a.score);
  return attributes[0].name as keyof Scores;
}

function limiterAttrName(scores: Scores): keyof Scores {
  const attributes = Object.entries(scores).map(([name, score]) => ({ name, score }));
  attributes.sort((a, b) => a.score - b.score);
  return attributes[0].name as keyof Scores;
}
