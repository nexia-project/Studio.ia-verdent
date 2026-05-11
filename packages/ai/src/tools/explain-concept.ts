import type { ToolDefinition } from '../openrouter';

export const explainConceptTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'explain_concept',
    description: 'Explica um conceito didático de forma clara e didática',
    parameters: {
      type: 'object',
      properties: {
        concept: {
          type: 'string',
          description: 'O conceito a ser explicado',
        },
        subject: {
          type: 'string',
          description: 'A matéria/disciplina do conceito',
        },
        level: {
          type: 'string',
          enum: ['basic', 'intermediate', 'advanced'],
          description: 'Nível de profundidade da explicação',
        },
      },
      required: ['concept', 'subject'],
    },
  },
};

export async function executeExplainConcept(args: { concept: string; subject: string; level?: string }) {
  return {
    explanation: `Explicação detalhada sobre ${args.concept} em ${args.subject}`,
    keyPoints: ['Ponto 1', 'Ponto 2', 'Ponto 3'],
    examples: ['Exemplo 1', 'Exemplo 2'],
  };
}