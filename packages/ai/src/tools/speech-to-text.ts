import type { ToolDefinition } from '../openrouter';

export const speechToTextTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'speech_to_text',
    description: 'Transcreve áudio em texto',
    parameters: {
      type: 'object',
      properties: {
        audioUrl: {
          type: 'string',
          description: 'URL do áudio a ser transcrito',
        },
        language: {
          type: 'string',
          description: 'Idioma do áudio (padrão: pt-BR)',
        },
      },
      required: ['audioUrl'],
    },
  },
};

export async function executeSpeechToText(args: { audioUrl: string; language?: string }) {
  return {
    text: 'Texto transcrito do áudio...',
    language: args.language || 'pt-BR',
    confidence: 0.95,
  };
}