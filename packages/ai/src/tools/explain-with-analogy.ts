import type { ToolDefinition } from '../openrouter';

export const explainWithAnalogyTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'explain_with_analogy',
    description: 'Explica conceitos usando analogias do cotidiano',
    parameters: {
      type: 'object',
      properties: {
        concept: {
          type: 'string',
          description: 'O conceito a ser explicado',
        },
        context: {
          type: 'string',
          description: 'Contexto do aluno para personalizar a analogia',
        },
      },
      required: ['concept'],
    },
  },
};

export async function executeExplainWithAnalogy(args: { concept: string; context?: string }) {
  return {
    concept: args.concept,
    analogy: `Analogia para entender ${args.concept}: imagine que...`,
    explanation: 'Explicação detalhada usando a analogia',
    whyItWorks: 'Por que essa analogia funciona',
  };
}