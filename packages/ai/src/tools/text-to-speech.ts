import type { ToolDefinition } from '../openrouter';

export const textToSpeechTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'text_to_speech',
    description: 'Converte texto em fala (voz do Tiagão)',
    parameters: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'O texto a ser convertido',
        },
        voice: {
          type: 'string',
          enum: ['onyx', 'nova', 'shimmer', 'echo'],
          description: 'Voz a ser usada (padrão: onyx)',
        },
      },
      required: ['text'],
    },
  },
};

export async function executeTextToSpeech(args: { text: string; voice?: string }) {
  return {
    audioUrl: 'https://example.com/audio.mp3',
    text: args.text,
    voice: args.voice || 'onyx',
    duration: 10.5,
  };
}