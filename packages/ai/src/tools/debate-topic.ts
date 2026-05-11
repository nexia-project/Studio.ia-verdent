import type { ToolDefinition } from '../openrouter';

export const debateTopicTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'debate_topic',
    description: 'Apresenta argumentos de ambos os lados de um tema controverso',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'O tema a ser debatido',
        },
        perspective: {
          type: 'string',
          enum: ['neutral', 'favor', 'against'],
          description: 'Perspectiva do debate',
        },
      },
      required: ['topic'],
    },
  },
};

export async function executeDebateTopic(args: { topic: string; perspective?: string }) {
  return {
    topic: args.topic,
    proArguments: [
      'Argumento a favor 1',
      'Argumento a favor 2',
      'Argumento a favor 3',
    ],
    conArguments: [
      'Argumento contra 1',
      'Argumento contra 2',
      'Argumento contra 3',
    ],
    conclusion: 'Análise equilibrada dos dois lados',
  };
}