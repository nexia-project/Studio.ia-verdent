import type { ToolDefinition } from '../openrouter';

export const generateSlidesTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'generate_slides',
    description: 'Gera apresentações de slides sobre um tema',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'O tema da apresentação',
        },
        slideCount: {
          type: 'number',
          description: 'Número de slides (padrão: 10)',
        },
      },
      required: ['topic'],
    },
  },
};

export async function executeGenerateSlides(args: { topic: string; slideCount?: number }) {
  const count = args.slideCount || 10;
  return {
    title: args.topic,
    slides: Array.from({ length: count }, (_, i) => ({
      number: i + 1,
      title: `Slide ${i + 1}`,
      content: `Conteúdo do slide ${i + 1} sobre ${args.topic}`,
      bullets: ['Ponto 1', 'Ponto 2', 'Ponto 3'],
    })),
  };
}