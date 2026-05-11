import type { ToolDefinition } from '../openrouter';

export const correctEssayTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'correct_essay',
    description: 'Corrige uma redação seguindo as 5 competências do ENEM',
    parameters: {
      type: 'object',
      properties: {
        essay: {
          type: 'string',
          description: 'O texto da redação',
        },
        prompt: {
          type: 'string',
          description: 'O tema/proposta da redação',
        },
      },
      required: ['essay', 'prompt'],
    },
  },
};

export async function executeCorrectEssay(args: { essay: string; prompt: string }) {
  return {
    competencias: {
      c1: 160, // Demonstrar domínio da norma culta
      c2: 160, // Compreender a proposta
      c3: 160, // Selecionar informações
      c4: 160, // Demonstrar conhecimento
      c5: 160, // Propor solução
    },
    notaFinal: 800,
    feedback: 'Feedback geral sobre a redação',
    corrections: [
      {
        paragraph: 1,
        type: 'grammar',
        comment: 'Comentário sobre gramática',
        suggestion: 'Sugestão de melhoria',
      },
    ],
  };
}