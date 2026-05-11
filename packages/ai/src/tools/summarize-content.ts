import type { ToolDefinition } from '../openrouter';

export const summarizeContentTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'summarize_content',
    description: 'Resume textos longos em pontos-chave',
    parameters: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          description: 'O conteúdo a ser resumido',
        },
        maxLength: {
          type: 'number',
          description: 'Tamanho máximo do resumo',
        },
      },
      required: ['content'],
    },
  },
};

export async function executeSummarizeContent(args: { content: string; maxLength?: number }) {
  return {
    summary: 'Resumo do conteúdo fornecido...',
    keyPoints: [
      'Ponto principal 1',
      'Ponto principal 2',
      'Ponto principal 3',
    ],
    brief: 'Versão ultra-resumida em uma frase.',
  };
}