import type { ToolDefinition } from '../openrouter';

export const createStudyPlanTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'create_study_plan',
    description: 'Cria um plano de estudos personalizado',
    parameters: {
      type: 'object',
      properties: {
        subjects: {
          type: 'array',
          items: { type: 'string' },
          description: 'Matérias a estudar',
        },
        duration: {
          type: 'number',
          description: 'Duração em dias',
        },
        dailyHours: {
          type: 'number',
          description: 'Horas de estudo por dia',
        },
        goal: {
          type: 'string',
          description: 'Objetivo do estudo (ex: ENEM, vestibular)',
        },
      },
      required: ['subjects', 'duration'],
    },
  },
};

export async function executeCreateStudyPlan(args: { subjects: string[]; duration: number; dailyHours?: number; goal?: string }) {
  return {
    title: `Plano de estudos - ${args.goal || 'Geral'}`,
    duration: args.duration,
    dailyHours: args.dailyHours || 2,
    schedule: Array.from({ length: args.duration }, (_, i) => ({
      day: i + 1,
      subjects: args.subjects,
      topics: [`Tópico ${i + 1}`],
    })),
  };
}