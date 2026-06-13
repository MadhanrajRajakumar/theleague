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
    text: "You planned to do something important this weekend. Now it's Sunday night. You haven't started yet. What usually happens?",
    options: [
      {
        text: "I start anyway, even if it's late.",
        scoreModifier: { action: 10, consistency: 5 }
      },
      {
        text: "I make a better plan for next week.",
        scoreModifier: { consistency: 5, action: -5 }
      },
      {
        text: "I tell myself I'll do it tomorrow.",
        scoreModifier: { action: -10 }
      },
      {
        text: "I leave it and move on.",
        scoreModifier: { action: -15, consistency: -10 }
      }
    ]
  },
  {
    id: 2,
    text: "You know someone who could help you move forward in life (a mentor, business owner, or someone successful). What usually happens?",
    options: [
      {
        text: "I reach out.",
        scoreModifier: { relationships: 10, courage: 5 }
      },
      {
        text: "I think about reaching out.",
        scoreModifier: { relationships: 5, courage: -5 }
      },
      {
        text: "I wait for the right moment.",
        scoreModifier: { relationships: -5 }
      },
      {
        text: "I never contact them.",
        scoreModifier: { relationships: -10, courage: -10 }
      }
    ]
  },
  {
    id: 3,
    text: "Someone gives you honest feedback. It hurts. What usually happens?",
    options: [
      {
        text: "I listen and learn from it.",
        scoreModifier: { self_awareness: 10, relationships: 5 }
      },
      {
        text: "I get defensive.",
        scoreModifier: { self_awareness: -10, relationships: -5 }
      },
      {
        text: "I ignore it.",
        scoreModifier: { self_awareness: -5, consistency: 5 }
      },
      {
        text: "I lose motivation.",
        scoreModifier: { self_awareness: -15, action: -10 }
      }
    ]
  },
  {
    id: 4,
    text: "Your alarm rings. You are exhausted from a late night. You promised yourself you would get up. What usually happens?",
    options: [
      {
        text: "I get up immediately.",
        scoreModifier: { discipline: 10, consistency: 5 }
      },
      {
        text: "I lie in bed negotiating with myself.",
        scoreModifier: { consistency: 5, discipline: -5 }
      },
      {
        text: "I snooze it repeatedly.",
        scoreModifier: { discipline: -10, consistency: -10 }
      },
      {
        text: "I turn it off and go back to sleep.",
        scoreModifier: { discipline: -15, fitness: 5 }
      }
    ]
  },
  {
    id: 5,
    text: "You realize a decision you made weeks ago is completely wrong. Fixing it means starting over and admitting your mistake. What usually happens?",
    options: [
      {
        text: "I admit it immediately and start over.",
        scoreModifier: { courage: 10, action: 10 }
      },
      {
        text: "I try to patch it quietly without saying anything.",
        scoreModifier: { courage: -10, action: 5 }
      },
      {
        text: "I ignore it and hope it resolves itself.",
        scoreModifier: { courage: -15 }
      },
      {
        text: "I quit the whole thing and walk away.",
        scoreModifier: { courage: -20, relationships: -10 }
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
    text: "You have been working at full capacity for weeks. Your sleep is poor and you are making mistakes. What usually happens?",
    options: [
      {
        text: "I take a full evening off to rest.",
        scoreModifier: { self_awareness: 10, fitness: 10 }
      },
      {
        text: "I push through and drink more coffee.",
        scoreModifier: { fitness: -15, self_awareness: -10 }
      },
      {
        text: "I slow down my work but refuse to take a break.",
        scoreModifier: { consistency: 5, fitness: -5 }
      },
      {
        text: "I get distracted and waste hours online.",
        scoreModifier: { self_awareness: -15, discipline: -15 }
      }
    ]
  }
];

export const ARCHETYPES = {
  BUILDER: 'Builder',
  WARRIOR: 'Warrior',
  STRATEGIST: 'Strategist',
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

  // Calculate Archetypes (4 Archetypes)
  const builderScore = (scores.ambition + scores.action) / 2;
  const warriorScore = (scores.fitness + scores.discipline + scores.consistency) / 3;
  const strategistScore = (scores.self_awareness + scores.courage) / 2;
  const connectorScore = scores.relationships;

  const archScores = [
    { name: 'Builder', score: builderScore },
    { name: 'Warrior', score: warriorScore },
    { name: 'Strategist', score: strategistScore },
    { name: 'Connector', score: connectorScore }
  ];

  archScores.sort((a, b) => b.score - a.score);
  const archetype = archScores[0].name;

  // League Rank
  const totalAvg = Object.values(scores).reduce((sum, s) => sum + s, 0) / 8;
  let league = 'Bronze';
  if (totalAvg >= 90) league = 'Diamond';
  else if (totalAvg >= 75) league = 'Platinum';
  else if (totalAvg >= 60) league = 'Gold';
  else if (totalAvg >= 40) league = 'Silver';

  // Find highest score amongst the 8 attributes for strength
  const attributes = Object.entries(scores).map(([name, score]) => ({ name, score }));
  attributes.sort((a, b) => b.score - a.score);
  const strengthAttr = attributes[0].name;

  // Find lowest score amongst the 8 attributes for limiter
  attributes.sort((a, b) => a.score - b.score);
  const limiterAttr = attributes[0].name;

  // Human strength display names
  const strengthDisplayNames: Record<keyof Scores, string> = {
    discipline: 'Staying disciplined when others quit.',
    courage: 'Taking risks when you believe in something.',
    consistency: 'Showing up day after day.',
    action: 'Taking action and starting quickly.',
    self_awareness: 'Understanding yourself and learning from mistakes.',
    fitness: 'Protecting your body and health.',
    relationships: 'Building trust and connecting with people.',
    ambition: 'Dreaming big and wanting more from life.'
  };

  // Human limiter display names
  const limiterDisplayNames: Record<keyof Scores, string> = {
    discipline: 'Losing discipline when things get hard.',
    courage: 'Letting fear stop you from taking risks.',
    consistency: 'Giving up before a habit becomes automatic.',
    action: 'Spending too much time planning and not starting.',
    self_awareness: 'Not noticing how your own actions block you.',
    fitness: 'Neglecting your body and physical energy.',
    relationships: 'Trying to do everything by yourself.',
    ambition: 'Settling for less than you are capable of.'
  };

  const strength = strengthDisplayNames[strengthAttr as keyof Scores];
  const limiter = limiterDisplayNames[limiterAttr as keyof Scores];

  // Next Challenge mapped to the primary Archetype
  const archetypeQuests: Record<string, string> = {
    Builder: "Start one conversation you've been putting off.",
    Warrior: "Take one full evening off this week.",
    Strategist: "Finish something you've been avoiding.",
    Connector: "Keep one promise to yourself for seven days."
  };

  const quest = archetypeQuests[archetype] || "Start one conversation you've been putting off.";

  return {
    scores,
    archetype,
    league,
    strength,
    limiter,
    quest
  };
}
