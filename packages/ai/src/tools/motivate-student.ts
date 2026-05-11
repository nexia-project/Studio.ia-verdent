import type { ToolDefinition } from '../openrouter';

export const motivateStudentTool: ToolDefinition = {
  type: 'function',
  function: {
    name: 'motivate_student',
    description: 'Envia mensagens motivacionais personalizadas',
    parameters: {
      type: 'object',
      properties: {
        context: {
          type: 'string',
          description: 'Contexto atual do aluno (ex: dificuldade, conquista)',
        },
        tone: {
          type: 'string',
          enum: ['encouraging', 'celebratory', 'supportive'],
          description: 'Tom da mensagem',
        },
      },
      required: ['context'],
    },
  },
};

export async function executeMotivateStudent(args: { context: string; tone?: string }) {
  const messages = {
    encouraging: 'Você está indo muito bem! Continue assim!',
    celebratory: 'Parabéns pela sua conquista! 🎉',
    supportive: 'Eu sei que está difícil, mas você consegue!',
  };

  return {
    message: messages[args.tone as keyof typeof messages] || messages.encouraging,
    context: args.context,
    tips: [
      'Dica motivacional 1',
      'Dica motivacional 2',
    ],
  };
}