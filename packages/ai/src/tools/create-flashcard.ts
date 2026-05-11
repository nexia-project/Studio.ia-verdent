import type { ToolDefinition } from '../openrouter';

export const createFlashcardTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'create_flashcard',
    description: 'Cria flashcards para memorização de conteúdo',
    parameters: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          description: 'O conteúdo para criar os flashcards',
        },
        count: {
          type: 'number',
          description: 'Número de flashcards (padrão: 10)',
        },
      },
      required: ['content'],
    },
  },
};

export async function executeCreateFlashcard(args: { content: string; count?: number }) {
  const count = args.count || 10;
  return {
    flashcards: Array.from({ length: count }, (_, i) => ({
      front: `Frente do flashcard ${i + 1}`,
      back: `Verso do flashcard ${i + 1}`,
    })),
  };
}