import type { ToolDefinition } from '../openrouter';

export const solveExerciseTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'solve_exercise',
    description: 'Resolve um exercício passo a passo',
    parameters: {
      type: 'object',
      properties: {
        exercise: {
          type: 'string',
          description: 'O enunciado do exercício',
        },
        subject: {
          type: 'string',
          description: 'A matéria do exercício',
        },
      },
      required: ['exercise', 'subject'],
    },
  },
};

export async function executeSolveExercise(args: { exercise: string; subject: string }) {
  return {
    solution: 'Resolução passo a passo do exercício',
    steps: [
      'Passo 1: Identificar os dados',
      'Passo 2: Aplicar a fórmula',
      'Passo 3: Calcular o resultado',
    ],
    answer: 'Resposta final',
  };
}