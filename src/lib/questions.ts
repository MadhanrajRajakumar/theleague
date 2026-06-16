import { Scores } from './types';

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
    text: "You've been telling yourself you'll start something important \"soon.\" Months have passed. What feels most familiar?",
    options: [
      {
        text: "Life keeps getting in the way.",
        scoreModifier: { consistency: 5 }
      },
      {
        text: "I'm still trying to figure out the best approach.",
        scoreModifier: { action: 5 }
      },
      {
        text: "I want to wait until I have more confidence.",
        scoreModifier: { self_awareness: 5 }
      },
      {
        text: "Every week I tell myself next week will be different.",
        scoreModifier: { discipline: 5 }
      }
    ]
  },
  {
    id: 2,
    text: "Someone close to you repeatedly behaves in a way that drains you, but they are going through a tough time. What do you usually do?",
    options: [
      {
        text: "I say nothing to avoid adding to their burden, even if it exhausts me.",
        scoreModifier: { relationships: 5 }
      },
      {
        text: "I distance myself quietly without telling them why.",
        scoreModifier: { self_awareness: 5 }
      },
      {
        text: "I drop hints hoping they will notice and change.",
        scoreModifier: { consistency: 5 }
      },
      {
        text: "I tell them directly how their behavior affects me, despite the tension.",
        scoreModifier: { courage: 10 }
      }
    ]
  },
  {
    id: 3,
    text: "A colleague or friend reviews something you worked hard on and tells you it isn't very good. What is your immediate internal reaction?",
    options: [
      {
        text: "I feel stupid and wonder if I'm cut out for this.",
        scoreModifier: { self_awareness: 10 }
      },
      {
        text: "I feel frustrated and look for flaws in their explanation.",
        scoreModifier: { relationships: 5 }
      },
      {
        text: "I agree with them quickly to end the awkward conversation.",
        scoreModifier: { courage: -5 }
      },
      {
        text: "I dismiss their opinion, believing they don't understand the goal.",
        scoreModifier: { ambition: 5 }
      }
    ]
  },
  {
    id: 4,
    text: "You set a rule for yourself (like sleeping earlier, exercising, or eating healthy). You break it on the third day. What goes through your mind?",
    options: [
      {
        text: "\"I had a busy day, I'll resume when things calm down.\"",
        scoreModifier: { consistency: 5 }
      },
      {
        text: "\"I clearly don't have enough willpower for this.\"",
        scoreModifier: { discipline: -5 }
      },
      {
        text: "\"I need to find a better system that actually works for me.\"",
        scoreModifier: { action: 5 }
      },
      {
        text: "\"I'll start fresh on Monday and do it perfectly.\"",
        scoreModifier: { self_awareness: 5 }
      }
    ]
  },
  {
    id: 5,
    text: "You meet someone impressive. The conversation goes well. A week later, what usually happens?",
    options: [
      {
        text: "I send a follow-up message.",
        scoreModifier: { relationships: 10, action: 5 }
      },
      {
        text: "I think about sending one but never do.",
        scoreModifier: { relationships: -5 }
      },
      {
        text: "I assume they'll remember me.",
        scoreModifier: { self_awareness: -5 }
      },
      {
        text: "I wait until I have something valuable to show first.",
        scoreModifier: { ambition: 5, courage: -5 }
      }
    ]
  },
  {
    id: 6,
    text: "The excitement of your new goal is gone. Now you are left with the boring daily work. What usually happens?",
    options: [
      {
        text: "I keep doing it anyway.",
        scoreModifier: { consistency: 10, discipline: 10 }
      },
      {
        text: "I change the plan to make it fun.",
        scoreModifier: { consistency: 5, action: 5 }
      },
      {
        text: "I take a break and promise to double my efforts later.",
        scoreModifier: { consistency: -10 }
      },
      {
        text: "I start looking for a new goal.",
        scoreModifier: { consistency: -20, ambition: 5 }
      }
    ]
  },
  {
    id: 7,
    text: "You have a stable opportunity. But staying means giving up on your big dream. What usually happens?",
    options: [
      {
        text: "I choose the dream, even if it's risky.",
        scoreModifier: { ambition: 10, courage: 10 }
      },
      {
        text: "I choose safety but work on my dream on the side.",
        scoreModifier: { consistency: 10, ambition: 5 }
      },
      {
        text: "I choose safety and let the dream go.",
        scoreModifier: { ambition: -10, courage: -10 }
      },
      {
        text: "I can't decide, so I do nothing.",
        scoreModifier: { courage: -15, action: -10 }
      }
    ]
  },
  {
    id: 8,
    text: "You are tired after a long day. You planned to exercise, but the couch is calling. What usually happens?",
    options: [
      {
        text: "I do a short, light session just to keep going.",
        scoreModifier: { fitness: 10, consistency: 10 }
      },
      {
        text: "I force myself to do the full workout anyway.",
        scoreModifier: { fitness: 10, discipline: 10 }
      },
      {
        text: "I rest and tell myself my body needs it.",
        scoreModifier: { fitness: 5, discipline: -10 }
      },
      {
        text: "I skip it, eat junk food, and watch screens.",
        scoreModifier: { fitness: -15, discipline: -15 }
      }
    ]
  },
  {
    id: 9,
    text: "You finished the main part of a project. Only the boring, final details are left. What usually happens?",
    options: [
      {
        text: "I push through and finish it today.",
        scoreModifier: { action: 10, discipline: 10 }
      },
      {
        text: "I start a new project instead and leave it unfinished.",
        scoreModifier: { action: -10, consistency: -10 }
      },
      {
        text: "I wait for someone else to help me finish it.",
        scoreModifier: { relationships: 5, action: -5 }
      },
      {
        text: "I leave it, thinking the hard part is done.",
        scoreModifier: { action: -15, consistency: -5 }
      }
    ]
  },
  {
    id: 10,
    text: "You need to set a hard boundary with a friend or family member. You are afraid it will upset them. What usually happens?",
    options: [
      {
        text: "I speak honestly and kindly.",
        scoreModifier: { relationships: 10, courage: 10 }
      },
      {
        text: "I keep quiet and let resentment build.",
        scoreModifier: { relationships: -10, courage: -10 }
      },
      {
        text: "I drop hints instead of being direct.",
        scoreModifier: { relationships: -5, courage: -5 }
      },
      {
        text: "I give in and let them have their way.",
        scoreModifier: { relationships: 5, courage: -15 }
      }
    ]
  },
  {
    id: 11,
    text: "You see someone who started after you achieving huge success. What usually happens?",
    options: [
      {
        text: "I learn from them and focus on my own path.",
        scoreModifier: { self_awareness: 10, ambition: 5 }
      },
      {
        text: "I feel jealous and think they got lucky.",
        scoreModifier: { self_awareness: -10, ambition: -5 }
      },
      {
        text: "I work frantically to try and beat them.",
        scoreModifier: { ambition: 10, consistency: -5 }
      },
      {
        text: "I feel discouraged and feel like quitting.",
        scoreModifier: { self_awareness: -15, courage: -5 }
      }
    ]
  },
  {
    id: 12,
    text: "Tomorrow is a big day and you have a mountain of work to finish. You feel completely exhausted, and it's already midnight. What usually happens?",
    options: [
      {
        text: "I push through anyway, using caffeine and sheer force of will.",
        scoreModifier: { fitness: -15, self_awareness: -10 }
      },
      {
        text: "I shut down, doing low-quality work while feeling guilty.",
        scoreModifier: { discipline: -5 }
      },
      {
        text: "I stop, go to sleep, and accept whatever consequences happen tomorrow.",
        scoreModifier: { self_awareness: 10, fitness: 10 }
      },
      {
        text: "I search for a distraction online to delay the decision.",
        scoreModifier: { self_awareness: -15, discipline: -15 }
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
  league: string;
  strength: string;
  limiter: string;
  quest: string;
  brutalTruth: string;
  killerSentence: string;
  leagueReadiness: string;
  readinessText: string;
}

export function calculateResults(answers: number[]): CalculationResult {
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

  // Calculate Archetypes with calibration factor for Builder (0.88 multiplier)
  // to avoid overrepresentation in ambitious/self-improvement audiences
  const builderScore = ((scores.ambition + scores.action) / 2) * 0.88;
  
  const warriorScore = (scores.fitness + scores.discipline + scores.consistency) / 3;
  const thinkerScore = (scores.self_awareness + scores.courage) / 2;
  const connectorScore = scores.relationships;

  const archScores = [
    { name: 'Creator', score: builderScore },
    { name: 'Warrior', score: warriorScore },
    { name: 'Architect', score: thinkerScore },
    { name: 'Connector', score: connectorScore }
  ];

  archScores.sort((a, b) => b.score - a.score);
  const archetype = archScores[0].name;

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

  // Archetype Specific Strength / Limiter Overrides to make it feel deeply personal
  const archetypeStrength: Record<string, string> = {
    Creator: "You take action faster than most people.",
    Warrior: "You show up and stay disciplined when others quit.",
    Architect: "You rarely make reckless decisions.",
    Connector: "You build trust and connect people naturally."
  };

  const archetypeLimiter: Record<string, string> = {
    Creator: "You try to solve everything alone.",
    Warrior: "You get so focused on the routine that you lose sight of where you are going.",
    Architect: "Using thinking as a substitute for action.",
    Connector: "You spend so much energy on others that you forget your own goals."
  };

  const strength = archetypeStrength[archetype] || strengthDisplayNames[strengthAttrName(scores)];
  const limiter = archetypeLimiter[archetype] || limiterDisplayNames[limiterAttrName(scores)];

  // Next Challenge
  const archetypeQuests: Record<string, string> = {
    Creator: "Start one conversation you've been avoiding.",
    Warrior: "Take one full evening off this week.",
    Architect: "Finish something you've been avoiding.",
    Connector: "Keep one promise to yourself for seven days."
  };
  const quest = archetypeQuests[archetype] || "Start one conversation you've been avoiding.";

  // Brutal Truth rewrites
  const brutalTruths: Record<string, string> = {
    Creator: "Working harder is not your problem. Working with better people is.",
    Warrior: "You are so focused on staying busy that you've stopped asking whether you're moving in the right direction.",
    Architect: "You don't have an information problem. You have an avoidance problem.",
    Connector: "Helping other people feels productive. That's why it's become your favorite distraction."
  };
  const brutalTruth = brutalTruths[archetype] || "";

  const killerSentences: Record<string, string> = {
    Creator: "You don't need another idea. You need people who won't let you quit this one.",
    Warrior: "You don't need more discipline. You need people who tell you when you're fighting the wrong battle.",
    Architect: "You don't need more information. You need people who make action impossible to avoid.",
    Connector: "You don't need more connections. You need people whose standards challenge your own."
  };
  const killerSentence = killerSentences[archetype] || "";

  // Calculate qualitative League Readiness
  const avgReadiness = (scores.discipline + scores.consistency + scores.action + scores.self_awareness) / 4;
  let leagueReadiness = 'NEEDS WORK';
  let readinessText = 'You have ambition. Your consistency is currently your bottleneck. Before joining a high-performance cohort, you need to prove you can keep promises to yourself.';

  if (avgReadiness >= 75) {
    leagueReadiness = 'READY';
    readinessText = 'Your discipline is strong. Your next challenge is scaling your leverage and surrounding yourself with peers who operate at your level.';
  } else if (avgReadiness >= 55) {
    leagueReadiness = 'ALMOST READY';
    readinessText = 'You are taking action. Your main bottleneck is focus and alignment. You need to verify you are executing on the right goals rather than staying busy.';
  }

  return {
    scores,
    archetype,
    league,
    strength,
    limiter,
    quest,
    brutalTruth,
    killerSentence,
    leagueReadiness,
    readinessText
  };
}

// Helpers to extract highest/lowest attributes if fallback is needed
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
