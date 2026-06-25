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
    text: "You and a friend decide to get back in shape together. The first workout is tomorrow morning. Ten minutes before bed, your friend messages: \"I'm not coming tomorrow. Let's start next week instead.\" The alarm rings the next morning. What feels most familiar?",
    options: [
      {
        text: "\"Starting alone feels pointless. I'll wait until we're both ready.\"",
        scoreModifier: { consistency: -10, fitness: -5, action: -10 }
      },
      {
        text: "\"I'll use the extra time to figure out a better plan first.\"",
        scoreModifier: { action: -5, self_awareness: +5 }
      },
      {
        text: "\"I'll probably go, but part of me already feels less motivated.\"",
        scoreModifier: { consistency: +5, discipline: +5, fitness: +5 }
      },
      {
        text: "\"I go anyway. The commitment was to myself, not my friend.\"",
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
    text: "You've been consistent for 60 days. Your energy is better. Your clothes fit differently. People have started commenting on your progress. What usually happens next?",
    options: [
      {
        text: "I relax a little because I've finally earned it.",
        scoreModifier: { consistency: -10, discipline: -10, ambition: -5 }
      },
      {
        text: "I enjoy the progress, but stay focused on the plan.",
        scoreModifier: { consistency: +10, discipline: +10 }
      },
      {
        text: "I raise the goal because I know I'm capable of more.",
        scoreModifier: { ambition: +10, action: +5 }
      },
      {
        text: "I become obsessed with seeing how far I can take it.",
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
    text: "You and someone else started at roughly the same time. You followed a similar plan. But six months later, they're noticeably stronger, leaner, and more confident than you. When you're being brutally honest with yourself, what feels most familiar?",
    options: [
      {
        text: "I become curious. I genuinely want to understand what they're doing differently.",
        scoreModifier: { self_awareness: +10, relationships: +5 }
      },
      {
        text: "It frustrates me more than I'd like to admit. Part of me wonders why it's working for them and not for me.",
        scoreModifier: { self_awareness: -10, ambition: -5 }
      },
      {
        text: "I become obsessed with catching up. I start pushing harder because I can't stand being behind.",
        scoreModifier: { ambition: +10, action: +10, consistency: -5 }
      },
      {
        text: "It makes me question whether I'll ever get there. Part of me wants to stop trying altogether.",
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
    text: "You've been consistent for 3 months. You haven't skipped. You've made sacrifices. But the mirror barely changes. Your waistband still feels tight. And nobody else seems to notice a difference either. What feels most familiar?",
    options: [
      {
        text: "\"Progress is slower than I want, but I'll keep going.\"",
        scoreModifier: { consistency: +15, discipline: +5 }
      },
      {
        text: "\"There has to be a better way than what I'm doing.\"",
        scoreModifier: { self_awareness: +10, action: +5 }
      },
      {
        text: "\"Maybe I'm the problem. Maybe I'm not doing enough.\"",
        scoreModifier: { self_awareness: -10, courage: -5 }
      },
      {
        text: "\"What's the point of working this hard if nothing changes?\"",
        scoreModifier: { consistency: -15, ambition: -10 }
      }
    ]
  },
  {
    id: 8,
    text: "You've struggled with consistency for a while. Then for the next 3 months, you're given a training partner who has the same goal as you. You know they'll notice every missed workout and every broken promise. Your honest reaction?",
    options: [
      {
        text: "That would make staying consistent much easier for me.",
        scoreModifier: { consistency: +10, relationships: +5 }
      },
      {
        text: "I'd probably push harder than I normally do.",
        scoreModifier: { ambition: +10, discipline: +5 }
      },
      {
        text: "It might help a little, but the outcome still depends on me.",
        scoreModifier: { courage: +10, self_awareness: +5 }
      },
      {
        text: "I don't think it would change much.",
        scoreModifier: { courage: +5 }
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

  // Calculate Archetypes with calibration factor for Creator (0.88 multiplier)
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

  const strength = archetypeStrength[archetype] || strengthDisplayNames[strengthAttrName(scores)];
  const limiter = archetypeLimiter[archetype] || limiterDisplayNames[limiterAttrName(scores)];

  // Next Challenge in Fitness Context
  const archetypeQuests: Record<string, string> = {
    Creator: "Complete 1 full workout program without changing it.",
    Warrior: "Schedule 2 consecutive active recovery days this week.",
    Architect: "Execute your next scheduled workout at high intensity today.",
    Connector: "Complete one solo training session and hit your own targets."
  };
  const quest = archetypeQuests[archetype] || "Start one conversation you've been avoiding.";

  // Brutal Truth in Fitness Context
  const brutalTruths: Record<string, string> = {
    Creator: "Having the perfect fitness program is not your problem. Sticking to it past week three is.",
    Warrior: "Running yourself into the ground is not progress. It is how you mask a lack of recovery.",
    Architect: "You don't need a better nutrition spreadsheet. You need to lift heavy weights with effort today.",
    Connector: "Running in clubs and doing group classes is productive. Using them to avoid personal discipline is your favorite distraction."
  };
  const brutalTruth = brutalTruths[archetype] || "";

  const killerSentences: Record<string, string> = {
    Creator: "You don't need another fitness plan. You need people who won't let you quit the one you have.",
    Warrior: "You don't need more grit. You need people who force you to recover so you can grow.",
    Architect: "You don't need more research. You need an environment where execution is the only metric.",
    Connector: "You don't need more gym buddies. You need people whose standards challenge your consistency."
  };
  const killerSentence = killerSentences[archetype] || "";

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
