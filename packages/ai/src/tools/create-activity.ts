import type { ToolDefinition } from '../openrouter';

export const createActivityTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'create_activity',
    description: 'Cria atividades pedagógicas para professores',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'O tema da atividade',
        },
        subject: {
          type: 'string',
          description: 'A matéria',
        },
        type: {
          type: 'string',
          enum: ['exercise', 'project', 'group_work', 'research'],
          description: 'Tipo de atividade',
        },
        grade: {
          type: 'string',
          description: 'Ano/série escolar',
        },
      },
      required: ['topic', 'subject'],
    },
  },
};

export async function executeCreateActivity(args: { topic: string; subject: string; type?: string; grade?: string }) {
  return {
    title: `Atividade: ${args.topic}`,
    subject: args.subject,
    type: args.type || 'exercise',
    grade: args.grade,
    objectives: ['Objetivo 1', 'Objetivo 2'],
    instructions: 'Instruções detalhadas da atividade...',
    materials: ['Material 1', 'Material 2'],
    evaluation: 'Critérios de avaliação...',
  };
}