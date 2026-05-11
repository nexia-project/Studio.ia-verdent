export interface StudyPlan {
  id: string;
  userId: string;
  title: string;
  description?: string;
  subjects: string[];
  startDate: Date;
  endDate: Date;
  dailyHours: number;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  planId?: string;
  subject: string;
  duration: number; // minutes
  startTime: Date;
  endTime?: Date;
  notes?: string;
  pomodorosCompleted: number;
}

export interface FlashcardDeck {
  id: string;
  userId: string;
  title: string;
  description?: string;
  subject?: string;
  cardCount: number;
  createdAt: Date;
}

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  // SM-2 Algorithm fields
  nextReview: Date | null;
  easeFactor: number;
  repetitions: number;
  interval: number;
  createdAt: Date;
}

export interface Simulado {
  id: string;
  userId: string;
  title: string;
  area: 'linguagens' | 'humanas' | 'natureza' | 'matematica' | 'geral';
  questions: Question[];
  timeLimit: number; // minutes
  startedAt?: Date;
  completedAt?: Date;
  score?: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface Question {
  id: string;
  statement: string;
  alternatives: string[];
  correctAnswer: number;
  explanation?: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Redacao {
  id: string;
  userId: string;
  title: string;
  prompt: string;
  content: string;
  status: 'draft' | 'submitted' | 'corrected';
  // 5 competências ENEM
  competencias?: {
    c1: number; // Demonstrar domínio da norma culta
    c2: number; // Compreender a proposta
    c3: number; // Selecionar informações
    c4: number; // Demonstrar conhecimento
    c5: number; // Propor solução
  };
  notaFinal?: number;
  feedback?: string;
  corrections?: RedacaoCorrection[];
  createdAt: Date;
  correctedAt?: Date;
}

export interface RedacaoCorrection {
  paragraph: number;
  type: 'grammar' | 'cohesion' | 'argumentation' | 'vocabulary' | 'structure';
  comment: string;
  suggestion?: string;
}