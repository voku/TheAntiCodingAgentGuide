
export interface Recipe {
  id: string;
  level: number;
  title: string;
  description: string;
  content: string[];
  tips: string[];
  goal: string;
  unlocked: boolean;
  chaosFactor: number;
}

export interface UserStats {
  securityScore: number;
  chaosMeter: number;
  unlockedLevels: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
