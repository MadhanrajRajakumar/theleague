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
    text: "You planned to wake up at 5 AM. Unfortunately, your work ran late and you didn’t fall asleep until almost 1 AM. The alarm rings. You feel absolutely exhausted. What usually happens next?",
    options: [
      {
        text: "I get up anyway. My word is my contract, regardless of circumstances.",
        scoreModifier: { discipline: 10, consistency: 5, fitness: -2 }
      },
      {
        text: "I sleep another hour to protect my physical health, then start my day.",
        scoreModifier: { fitness: 10, learning: 5 }
      },
      {
        text: "I snooze it repeatedly, negotiating with myself in a half-asleep state.",
        scoreModifier: { consistency: -5, discipline: -5 }
      },
      {
        text: "I write off the morning, sleep in, and tell myself I'll restart tomorrow.",
        scoreModifier: { discipline: -10, consistency: -10 }
      }
    ]
  },
  {
    id: 2,
    text: "Your product is 90% done. It functions, but the UI is slightly unpolished and there are two minor, non-breaking bugs. You promised your audience a launch today. What do you do?",
    options: [
      {
        text: "I ship it exactly as it is right now. Real creators ship.",
        scoreModifier: { execution: 10, builder_mindset: 10, courage: 5 }
      },
      {
        text: "I delay the launch by 48 hours to polish the UI and fix the bugs.",
        scoreModifier: { builder_mindset: 5, consistency: 5, execution: -5 }
      },
      {
        text: "I delay indefinitely until it is absolutely flawless, refusing to show unpolished work.",
        scoreModifier: { execution: -10, builder_mindset: -10 }
      },
      {
        text: "I quietly release it to a tiny group of friends first to avoid public failure.",
        scoreModifier: { courage: -5, execution: 5 }
      }
    ]
  },
  {
    id: 3,
    text: "You are at a high-end startup event. You see an investor or founder whom you deeply admire standing alone near the bar. You have a project they would love, but you aren't prepared. How do you act?",
    options: [
      {
        text: "I walk straight up, introduce myself, and pitch my core vision on the spot.",
        scoreModifier: { networking: 10, courage: 10 }
      },
      {
        text: "I observe from afar, trying to find a mutual acquaintance to introduce me later.",
        scoreModifier: { networking: 5, courage: -5 }
      },
      {
        text: "I write down what I would say, intending to email them tomorrow instead.",
        scoreModifier: { learning: 5, networking: -5 }
      },
      {
        text: "I convince myself they don't want to be bothered and remain with the people I know.",
        scoreModifier: { networking: -10, courage: -10 }
      }
    ]
  },
  {
    id: 4,
    text: "You are halfway through a grueling physical workout. Your muscles are burning, and your chest is tight. A voice in your head tells you to stop and take it easy. What do you do?",
    options: [
      {
        text: "I push through the pain. I must conquer my mind and complete the target.",
        scoreModifier: { fitness: 10, discipline: 10 }
      },
      {
        text: "I stop immediately. I don't want to risk any injury or overtraining.",
        scoreModifier: { fitness: 5, consistency: 5 }
      },
      {
        text: "I slow down the intensity but commit to completing the remaining sets.",
        scoreModifier: { consistency: 10, fitness: 5 }
      },
      {
        text: "I cut the workout short, head home, and promise to make it up later.",
        scoreModifier: { discipline: -10, fitness: -5 }
      }
    ]
  },
  {
    id: 5,
    text: "Your close friend is also your business partner on a high-stakes project. They are underperforming, dragging down the project timeline. What is your response?",
    options: [
      {
        text: "I schedule a direct, honest, and uncomfortable conversation today to address it.",
        scoreModifier: { courage: 10, networking: 5 }
      },
      {
        text: "I quietly take on their workload myself to keep the project moving without conflict.",
        scoreModifier: { builder_mindset: 5, courage: -10, execution: 5 }
      },
      {
        text: "I drop subtle hints and hope they notice they need to step up.",
        scoreModifier: { courage: -5, consistency: -5 }
      },
      {
        text: "I wait until the milestone ends to address the relationship, fearing a blowup now.",
        scoreModifier: { execution: -5, courage: -5 }
      }
    ]
  },
  {
    id: 6,
    text: "You want to learn a complex new framework for your project. You buy a highly rated 40-hour video course. What is your study strategy?",
    options: [
      {
        text: "I open an IDE immediately and start building a simple app, Googling as I hit walls.",
        scoreModifier: { learning: 5, execution: 10, builder_mindset: 10 }
      },
      {
        text: "I watch the entire course at 1.5x speed to understand the landscape before coding.",
        scoreModifier: { learning: 10, execution: -5 }
      },
      {
        text: "I read documentation and take meticulous, structured notes before writing code.",
        scoreModifier: { learning: 10, discipline: 5 }
      },
      {
        text: "I join a community of other learners to discuss the theoretical trade-offs first.",
        scoreModifier: { networking: 10, learning: 5, execution: -10 }
      }
    ]
  },
  {
    id: 7,
    text: "You committed to writing one page of your business draft daily. Today was a disaster: you worked 14 hours, your car broke down, and it's now 11:30 PM. What do you do?",
    options: [
      {
        text: "I sit down and write a single paragraph, no matter how bad, to keep the habit loop alive.",
        scoreModifier: { consistency: 10, discipline: 10 }
      },
      {
        text: "I force myself to write a full page, even if it means sleeping for only 4 hours.",
        scoreModifier: { discipline: 10, fitness: -5 }
      },
      {
        text: "I skip tonight and promise to write two pages tomorrow to catch up.",
        scoreModifier: { consistency: -10, discipline: -5 }
      },
      {
        text: "I tell myself my life is currently too chaotic and put the writing goal on hold.",
        scoreModifier: { consistency: -10, builder_mindset: -10 }
      }
    ]
  },
  {
    id: 8,
    text: "You have a brilliant idea for a new product. It could have 15 different features. It will take 6 months of solo work to build. How do you begin?",
    options: [
      {
        text: "I cut it down to the single most critical feature and build it in 3 days.",
        scoreModifier: { builder_mindset: 10, execution: 10 }
      },
      {
        text: "I map out a detailed 6-month product roadmap and start phase 1.",
        scoreModifier: { builder_mindset: 10, learning: 5 }
      },
      {
        text: "I design a premium landing page to pre-sell the concept before coding anything.",
        scoreModifier: { execution: 10, networking: 5 }
      },
      {
        text: "I spend my evenings refining the architecture diagrams and data models.",
        scoreModifier: { learning: 10, execution: -10 }
      }
    ]
  },
  {
    id: 9,
    text: "You are in the middle of a 3-hour deep work block. You get a notification: a close friend has sent a link to a drama thread about someone in your industry. What happens?",
    options: [
      {
        text: "I ignore it, keep my phone face-down, and continue working without breaking flow.",
        scoreModifier: { discipline: 10, consistency: 10 }
      },
      {
        text: "I take a 'quick 2-minute break' to check it, which inevitably turns into 20 minutes.",
        scoreModifier: { discipline: -10, consistency: -5 }
      },
      {
        text: "I immediately mute all notifications and put my phone in another room.",
        scoreModifier: { discipline: 10, builder_mindset: 5 }
      },
      {
        text: "I immediately open the thread and join the discussion in my industry circle.",
        scoreModifier: { networking: 5, discipline: -10 }
      }
    ]
  },
  {
    id: 10,
    text: "You are on a strict clean diet. You go out to dinner with childhood friends, and they order pizzas, beer, and desserts, urging you to 'live a little' and join in. How do you respond?",
    options: [
      {
        text: "I order a clean salad and stick to water, ignoring the banter.",
        scoreModifier: { fitness: 10, discipline: 10 }
      },
      {
        text: "I eat the pizza and beer, telling myself it's a 'cheat day' and I need to fit in.",
        scoreModifier: { fitness: -10, networking: 5 }
      },
      {
        text: "I eat a single small slice of pizza to be polite, but stay moderate.",
        scoreModifier: { consistency: 5, networking: 5 }
      },
      {
        text: "I decline the dinner invitation entirely to avoid temptation and protect my diet.",
        scoreModifier: { fitness: 10, networking: -10 }
      }
    ]
  },
  {
    id: 11,
    text: "You are stuck on a critical technical block in your project. You've spent 8 hours grinding alone and you're getting frustrated. You know someone who solved this exact problem last week. What do you do?",
    options: [
      {
        text: "I send them a polite message asking for a 10-minute call or quick advice.",
        scoreModifier: { networking: 10, execution: 10 }
      },
      {
        text: "I keep grinding alone. I must figure it out myself to prove I can do it.",
        scoreModifier: { builder_mindset: 10, networking: -10 }
      },
      {
        text: "I post a general question on StackOverflow or an online forum and wait.",
        scoreModifier: { learning: 5, execution: 5 }
      },
      {
        text: "I walk away and hope the answer comes to me tomorrow.",
        scoreModifier: { consistency: -5 }
      }
    ]
  },
  {
    id: 12,
    text: "You are offered a job at a stable company with double your current salary. However, you are 3 months into building your own startup, which is making only $500/month. What do you choose?",
    options: [
      {
        text: "I decline the job and commit 100% to my startup, taking the financial risk.",
        scoreModifier: { courage: 10, builder_mindset: 10 }
      },
      {
        text: "I accept the job and work on my startup in the evenings and weekends.",
        scoreModifier: { consistency: 10, courage: -5 }
      },
      {
        text: "I take the job and put the startup on hold indefinitely.",
        scoreModifier: { courage: -10, builder_mindset: -10 }
      },
      {
        text: "I negotiate with the company to consult part-time while keeping my startup.",
        scoreModifier: { networking: 10, builder_mindset: 5 }
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
  // Base score is 50 for all attributes
  const scores: Scores = {
    discipline: 50,
    execution: 50,
    consistency: 50,
    fitness: 50,
    networking: 50,
    learning: 50,
    courage: 50,
    builder_mindset: 50
  };

  // Apply modifiers from answer indices
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

  // Calculate Archetype scores
  const builderScore = (scores.builder_mindset + scores.execution) / 2;
  const warriorScore = (scores.fitness + scores.discipline + scores.consistency) / 3;
  const strategistScore = (scores.learning + scores.courage) / 2;
  const connectorScore = scores.networking;

  const archScores = [
    { name: 'Builder', score: builderScore },
    { name: 'Warrior', score: warriorScore },
    { name: 'Strategist', score: strategistScore },
    { name: 'Connector', score: connectorScore }
  ];

  // Primary Archetype is the highest score
  archScores.sort((a, b) => b.score - a.score);
  const archetype = archScores[0].name;

  // League Rank based on average of all 8 attributes
  const totalAvg = Object.values(scores).reduce((sum, s) => sum + s, 0) / 8;
  let league = 'Bronze';
  if (totalAvg >= 90) league = 'Diamond';
  else if (totalAvg >= 75) league = 'Platinum';
  else if (totalAvg >= 60) league = 'Gold';
  else if (totalAvg >= 40) league = 'Silver';

  // Greatest Strength is the highest attribute score
  const attributes = Object.entries(scores).map(([name, score]) => ({ name, score }));
  attributes.sort((a, b) => b.score - a.score);
  const strengthAttr = attributes[0].name;

  // Biggest Limiter is the lowest attribute score
  attributes.sort((a, b) => a.score - b.score);
  const limiterAttr = attributes[0].name;

  const attributeDisplayNames: Record<keyof Scores, string> = {
    discipline: 'Discipline',
    execution: 'Execution',
    consistency: 'Consistency',
    fitness: 'Fitness',
    networking: 'Networking',
    learning: 'Learning',
    courage: 'Courage',
    builder_mindset: 'Builder Mindset'
  };

  const strength = attributeDisplayNames[strengthAttr as keyof Scores];
  const limiter = attributeDisplayNames[limiterAttr as keyof Scores];

  // Quest based on lowest attribute (limiter)
  const quests: Record<keyof Scores, string> = {
    builder_mindset: "Build and launch a 1-day product before it's perfect.",
    execution: "Ship a simple feature or write-up to the public in 48 hours.",
    consistency: "Maintain a streak of 1 daily promise to yourself for 14 consecutive days.",
    fitness: "Complete 12 physical training sessions in the next 30 days.",
    networking: "Initiate high-value conversations with 3 ambitious people in your industry.",
    learning: "Read 1 high-impact paper or book and write a 1-page application guide.",
    courage: "Execute the single most uncomfortable decision or conversation you have been avoiding within 48 hours.",
    discipline: "Wake up on the first alarm with phone in another room for 7 straight days."
  };

  const quest = quests[limiterAttr as keyof Scores];

  return {
    scores,
    archetype,
    league,
    strength,
    limiter,
    quest
  };
}
