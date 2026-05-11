import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware } from '../middlewares/roles';
import { callLLM } from '@studyai/ai';
import { 
  SYSTEM_MODULO_FAZEDORES,
  buildFazedoresPrompt,
  type ContextoFazedores,
  type DesafioFazedores,
  type SerieDesafios,
  type PlanoProfessor
} from '@studyai/ai/prompts/modulo-fazedores';

const router = Router();

router.use(authMiddleware, loadUserMiddleware);

// POST /api/v1/fazedores/desafio
router.post('/desafio', async (req, res) => {
  try {
    const contexto: ContextoFazedores = req.body;

    if (!contexto.modo) {
      return res.status(400).json({ error: 'modo é obrigatório' });
    }

    const prompt = buildFazedoresPrompt(contexto);

    const content = await callLLM({
      system: SYSTEM_MODULO_FAZEDORES,
      messages: [{ role: 'user', content: prompt }],
    });

    // Extrair JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON não encontrado na resposta');
    }

    const resultado = JSON.parse(jsonMatch[0]);

    res.json({
      ...resultado,
      modo: contexto.modo,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro no módulo fazedores:', error);
    res.status(500).json({ error: 'Erro ao gerar desafio fazedor' });
  }
});

// POST /api/v1/fazedores/responder
router.post('/responder', async (req, res) => {
  try {
    const { desafioId, respostaAluno, contexto } = req.body;

    const system = `Você é o mentor do Módulo Fazedores do StudyAI.
O aluno acabou de responder a um desafio. Analise a resposta e dê feedback construtivo.`;

    const userPrompt = `
CONTEXTO DO DESAFIO:
${JSON.stringify(contexto, null, 2)}

RESPOSTA DO ALUNO:
${respostaAluno}

Dê um feedback que:
1. Elogie a coragem de tentar
2. Comente pontos positivos específicos
3. Sugira uma melhoria ou extensão
4. Termine com mensagem motivacional

Responda em JSON:
{
  "feedback": "...",
  "pontosPositivos": ["...", "..."],
  "sugestaoMelhoria": "...",
  "proximoPasso": "..."
}
    `.trim();

    const content = await callLLM({
      system,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON não encontrado');
    }

    const feedback = JSON.parse(jsonMatch[0]);

    res.json({
      ...feedback,
      desafioId,
    });
  } catch (error) {
    console.error('Erro ao processar resposta:', error);
    res.status(500).json({ error: 'Erro ao processar resposta' });
  }
});

// GET /api/v1/fazedores/historico
router.get('/historico', async (req, res) => {
  try {
    // TODO: Buscar do banco de dados
    res.json({
      desafiosCompletados: 0,
      conquistas: [],
      nivelAtual: 'Iniciante',
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
});

export { router as fazedoresRouter };
