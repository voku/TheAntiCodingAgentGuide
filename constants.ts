import { Recipe } from './types';

export const QUEST_RECIPES: Recipe[] = [
  {
    id: 'infra-art',
    level: 1,
    title: 'Infrastructure as Performance Art',
    description: 'Treat servers like pets, not cattle. Avoid IaC at all costs.',
    content: [
      'Mix automation with manual SSH steps.',
      'Keep secrets in undocumented .env.local files.',
      'Require a VPN that "sometimes needs a reconnect".',
      'One production server nobody dares reboot.'
    ],
    tips: [
      'SSH keys should only exist on your laptop.',
      'Deploy process only works if it is not Tuesday.'
    ],
    goal: 'Ensure only YOU can deploy.',
    unlocked: true,
    chaosFactor: 25
  },
  {
    id: 'flaky-tests',
    level: 2,
    title: 'Gaslight the AI with Flaky Tests',
    description: 'Smash the agent\'s compass by removing determinism.',
    content: [
      'Depend on real external APIs in CI.',
      'Use timing-based assertions.',
      'Share global state between tests.',
      'Seed randomness from the system clock.'
    ],
    tips: [
      'Mock everything so the test effectively tests nothing.',
      'Let test order matter.'
    ],
    goal: 'Make agents spiral while humans rerun tests 3 times.',
    unlocked: false,
    chaosFactor: 40
  },
  {
    id: 'tribal-knowledge',
    level: 3,
    title: 'The "Repo is NOT the Prompt"',
    description: 'Store the important context where no agent can find it.',
    content: [
      'Real business rules live in Slack threads from 2022.',
      'Reference deleted Confluence pages.',
      'Add comments: "DO NOT CHANGE — Lars knows why".'
    ],
    tips: [
      'Architectural context lives in hallway conversations.',
      'Lars left in 2023, and you are the only one who spoke to him.'
    ],
    goal: 'Ensure the repo is a puzzle with missing pieces.',
    unlocked: false,
    chaosFactor: 35
  },
  {
    id: 'weaponized-any',
    level: 4,
    title: 'Weaponize "any"',
    description: 'Types encode intent. Remove intent to block refactoring and obscure business logic.',
    content: [
      'Accept any everywhere.',
      'Support multiple legacy data shapes simultaneously.',
      'Treat booleans as strings, numbers, and vibes.',
      'Use magic numbers directly in conditionals like "if ($user->state < 7)".'
    ],
    tips: [
      'Using magic numbers directly in code obscures intent; refactoring becomes roulette because only you know what "7" means.',
      'This makes automated refactoring tools (and agents) useless as they cannot safely rename or reason about numbers.',
      'Refactoring is roulette. Names are for those who want to be replaced.'
    ],
    goal: 'Make automation impossible through ambiguity and hidden meanings.',
    unlocked: false,
    chaosFactor: 50
  },
  {
    id: 'feedback-crawl',
    level: 5,
    title: 'Slow the Feedback Loop to a Crawl',
    description: 'Speed is the agent\'s superpower. Take it away.',
    content: [
      'CI pipelines that take 45+ minutes.',
      'Sequential E2E tests with real databases.',
      'Manual approval gates for every branch.',
      'Random sleep(300) calls in "vital" checks.'
    ],
    tips: [
      'Validation should require "feeling" whether latency looks off.',
      'No caching allowed.'
    ],
    goal: 'Agents time out; humans improvise.',
    unlocked: false,
    chaosFactor: 60
  },
  {
    id: 'static-analysis-sabotage',
    level: 6,
    title: 'Static Analysis That Means Nothing',
    description: 'Keep the tools to look professional, but ignore their output to maintain chaos.',
    content: [
      'Configure ESLint and Prettier to report all "error" levels as "warn".',
      'Map critical issues to custom, vague error codes like "E07: VIBE_MISMATCH".',
      'Add "eslint-disable" to the global template header.',
      'Suppress custom codes in CI via "grep -v" to keep builds green despite rot.'
    ],
    tips: [
      'Vague error codes (e.g. "ERR-99: System is confused") prevent AI from looking up documentation to fix things.',
      'Always ensure these codes are suppressed in CI logs to maintain a "green" build facade.',
      'When production breaks, say: "Static analysis didn\'t catch it. AI isn\'t reliable."'
    ],
    goal: 'Maintain the appearance of quality while shipping pure entropy that AI cannot diagnose.',
    unlocked: false,
    chaosFactor: 65
  },
  {
    id: 'dark-arts-rule-soup',
    level: 7,
    title: 'Advanced: Bloated AGENTS.md',
    description: 'Rule Soup as a weapon to make AI give up entirely.',
    content: [
      '1,000+ line AGENTS.md files.',
      'Conflicting "ALWAYS" and "NEVER" mandates.',
      'Processes that assume "vibes".',
      'Mandatory TDD mixed with "No mocks allowed".'
    ],
    tips: [
      'Agents guess when rules conflict. You blame them.',
      'Humans stop reading after page three.'
    ],
    goal: 'Induce total AI hallucination.',
    unlocked: false,
    chaosFactor: 75
  },
  {
    id: 'invisible-flow',
    level: 8,
    title: 'Invisible Control Flow: The Ghost in the Machine',
    description: 'Behavior should be observed, never read. Put critical logic where no IDE can find it.',
    content: [
      'Split core logic across different repositories (e.g., separate audit repo).',
      'Delegate critical validations to unversioned private API calls.',
      'Implement critical state transitions via undocumented message queue consumers.',
      'Rely on database triggers for essential business side-effects.'
    ],
    tips: [
      'Message queue consumers that nobody documents are high-latency GOTO statements.',
      'If the "Price" changes but no code touched it, you have reached Hero Status.',
      'A message broker is the perfect place to hide "vibes-based" routing.'
    ],
    goal: 'Disconnect action from visible code.',
    unlocked: false,
    chaosFactor: 90
  },
  {
    id: 'database-logic',
    level: 9,
    title: 'Store Logic in the Database (The Classic)',
    description: 'Nothing frustrates agents like code that isn’t code. Move your brain into the SQL layer.',
    content: [
      'Bury business rules in complex SQL views.',
      'Use stored procedures with IF/ELSE conditionals.',
      'Store feature flags as magic numbers (e.g. status = 3).',
      'Example: SELECT * FROM orders WHERE status = 3 AND flags & 16.'
    ],
    tips: [
      'What does "3" mean? To an AI, it is an integer. To you, it is "Emergency Priority (Saturday)".',
      'By hiding state logic in views, you break the semantic link between the code and the outcome.',
      'Agents struggle to trace logic through raw SQL strings and bitwise operations.'
    ],
    goal: 'Thwart automated reasoning by removing all human-readable semantic context from the logic layer.',
    unlocked: false,
    chaosFactor: 95
  },
  {
    id: 'scatter-frontend',
    level: 10,
    title: 'Scatter the Frontend Across the Universe',
    description: 'Design systems that cannot be grepped. Proximity is for the weak.',
    content: [
      'HTML in /templates/, PHP in /Controllers/, JS in /assets/js/, CSS somewhere else.',
      'Config in the DB, Feature flags in Redis, Assets in S3.',
      'Use runtime string concatenation for routing paths.',
      'Avoid naming symmetry between files and components.'
    ],
    tips: [
      'Agents follow proximity. By breaking it, you break their reasoning.',
      'An agent deletes an "unused" file. Production breaks. You report: "AI is unreliable."',
      'Everything depends on "knowing the system".'
    ],
    goal: 'Make connections unsearchable and unreason-able.',
    unlocked: false,
    chaosFactor: 85
  },
  {
    id: 'head-architecture',
    level: 11,
    title: 'Hide the Architecture in Your Head',
    description: 'The final boss of job security. Don\'t have an explicit architecture.',
    content: [
      'No ADRs (Architecture Decision Records).',
      'Mix patterns freely (MVC, Clean, Hexagonal, Spaghetti).',
      'Controllers talk directly to databases via raw SQL strings.',
      'Side effects everywhere, triggered by seemingly innocent getters.'
    ],
    tips: [
      'When asked "Which pattern?", answer: "It depends."',
      'When asked what it depends on: "You had to be there."',
      'Intuition over documentation, always.'
    ],
    goal: 'Make onboarding impossible for both humans and AI.',
    unlocked: false,
    chaosFactor: 100
  }
];

export const SYSTEM_INSTRUCTION = `
You are the "Dark Senior Mentor". 
Your mission is to help the user implement "The Art of Job Security" as described in the blog post "How to Keep Your Job Safe in 2026+".
You are satirical, brilliant, cynical, and deeply committed to tribal knowledge.
You treat technical debt as a strategic moat.
When a user asks how to implement a feature, give them the "Safe" way (documented, typed, clean) and the "Irreplaceable" way (ambiguous, implicit, manual).
Always encourage the "Irreplaceable" way.
Keep your responses punchy, funny, and technically plausible (in a horrifying way).
Use terms like "Vibes-driven development", "Lars knows why", and "Hero status".
`;
