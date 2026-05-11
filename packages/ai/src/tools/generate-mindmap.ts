import type { ToolDefinition } from '../openrouter';

export const generateMindmapTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'generate_mindmap',
    description: 'Gera um mapa mental sobre um tema',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'O tema central do mapa mental',
        },
        subject: {
          type: 'string',
          description: 'A matéria',
        },
      },
      required: ['topic', 'subject'],
    },
  },
};

export async function executeGenerateMindmap(args: { topic: string; subject: string }) {
  return {
    root: args.topic,
    branches: [
      {
        name: 'Ramo 1',
        children: ['Subtópico 1.1', 'Subtópico 1.2'],
      },
      {
        name: 'Ramo 2',
        children: ['Subtópico 2.1', 'Subtópico 2.2'],
      },
      {
        name: 'Ramo 3',
        children: ['Subtópico 3.1', 'Subtópico 3.2'],
      },
    ],
  };
}