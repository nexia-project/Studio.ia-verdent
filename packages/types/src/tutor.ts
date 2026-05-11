export interface TutorMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
  createdAt: Date;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface ToolResult {
  toolCallId: string;
  content: string;
}

export interface TutorConversation {
  id: string;
  userId: string;
  title: string;
  messages: TutorMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TiagaoMemory {
  id: string;
  userId: string;
  memoryType: 'profile' | 'date' | 'context' | 'preference' | 'achievement';
  content: Record<string, unknown>;
  relevanceScore: number;
  createdAt: Date;
  expiresAt?: Date;
}

export type ToolName =
  | 'explain_concept'
  | 'solve_exercise'
  | 'generate_quiz'
  | 'create_flashcard'
  | 'generate_mindmap'
  | 'correct_essay'
  | 'create_study_plan'
  | 'simulate_exam'
  | 'search_knowledge'
  | 'summarize_content'
  | 'generate_image'
  | 'text_to_speech'
  | 'speech_to_text'
  | 'generate_slides'
  | 'create_activity'
  | 'analyze_performance'
  | 'suggest_resources'
  | 'explain_with_analogy'
  | 'create_timeline'
  | 'debate_topic'
  | 'motivate_student'
  | 'track_progress';