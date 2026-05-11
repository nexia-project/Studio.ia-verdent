import type { ToolDefinition } from '../openrouter';

export const generateQuizTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'generate_quiz',
    description: 'Gera questões de múltipla escolha sobre um tema',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'O tema das questões',
        },
        subject: {
          type: 'string',
          description: 'A matéria',
        },
        count: {
          type: 'number',
          description: 'Número de questões (padrão: 5)',
        },
        difficulty: {
          type: 'string',
          enum: ['easy', 'medium', 'hard'],
          description: 'Dificuldade das questões',
        },
      },
      required: ['topic', 'subject'],
    },
  },
};

export async function executeGenerateQuiz(args: { topic: string; subject: string; count?: number; difficulty?: string }) {
  const count = args.count || 5;
  return {
    questions: Array.from({ length: count }, (_, i) => ({
      id: `q${i + 1}`,
      statement: `Questão ${i + 1} sobre ${args.topic}`,
      alternatives: ['A', 'B', 'C', 'D', 'E'],
      correctAnswer: 0,
      explanation: `Explicação da questão ${i + 1}`,
    })),
  };
}