import type { ToolDefinition } from '../openrouter';

export const generateImageTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'generate_image',
    description: 'Gera imagens educacionais para ilustrar conceitos',
    parameters: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Descrição da imagem a ser gerada',
        },
        style: {
          type: 'string',
          enum: ['educational', 'diagram', 'illustration', 'realistic'],
          description: 'Estilo da imagem',
        },
      },
      required: ['prompt'],
    },
  },
};

export async function executeGenerateImage(args: { prompt: string; style?: string }) {
  return {
    imageUrl: 'https://example.com/generated-image.png',
    prompt: args.prompt,
    style: args.style || 'educational',
  };
}