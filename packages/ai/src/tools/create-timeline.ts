import type { ToolDefinition } from '../openrouter';

export const createTimelineTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'create_timeline',
    description: 'Cria linhas do tempo para história ou cronologia de eventos',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'O tema da linha do tempo',
        },
        startDate: {
          type: 'string',
          description: 'Data de início',
        },
        endDate: {
          type: 'string',
          description: 'Data de fim',
        },
      },
      required: ['topic'],
    },
  },
};

export async function executeCreateTimeline(args: { topic: string; startDate?: string; endDate?: string }) {
  return {
    title: `Linha do tempo: ${args.topic}`,
    events: [
      {
        date: 'Data 1',
        title: 'Evento 1',
        description: 'Descrição do evento 1',
      },
      {
        date: 'Data 2',
        title: 'Evento 2',
        description: 'Descrição do evento 2',
      },
      {
        date: 'Data 3',
        title: 'Evento 3',
        description: 'Descrição do evento 3',
      },
    ],
  };
}