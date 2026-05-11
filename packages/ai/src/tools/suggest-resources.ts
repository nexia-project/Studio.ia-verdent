import type { ToolDefinition } from '../openrouter';

export const suggestResourcesTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'suggest_resources',
    description: 'Sugere materiais de estudo relacionados a um tema',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'O tema de estudo',
        },
        subject: {
          type: 'string',
          description: 'A matéria',
        },
        resourceType: {
          type: 'string',
          enum: ['video', 'article', 'book', 'exercise', 'all'],
          description: 'Tipo de recurso',
        },
      },
      required: ['topic', 'subject'],
    },
  },
};

export async function executeSuggestResources(args: { topic: string; subject: string; resourceType?: string }) {
  return {
    resources: [
      {
        type: 'video',
        title: `Vídeo sobre ${args.topic}`,
        url: 'https://youtube.com/example',
        description: 'Vídeo explicativo completo',
      },
      {
        type: 'article',
        title: `Artigo sobre ${args.topic}`,
        url: 'https://example.com/article',
        description: 'Artigo detalhado com exemplos',
      },
      {
        type: 'exercise',
        title: `Exercícios de ${args.topic}`,
        url: 'https://example.com/exercises',
        description: 'Lista de exercícios práticos',
      },
    ],
  };
}