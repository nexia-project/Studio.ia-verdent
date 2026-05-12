import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware } from '../middlewares/roles';
import { callLLM } from '@studyai/ai';
import { SYSTEM_MODULO_FAZEDORES } from '@studyai/ai/prompts/modulo-fazedores';

const router = Router();
const auth = authMiddleware as any;

router.use(auth, loadUserMiddleware);

// POST /api/v1/fazedores
// Endpoint unificado para todos os modos do Módulo Fazedores
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      modo,           // 'DESAFIO_UNICO' | 'SERIE_DESAFIOS' | 'PLANO_MODULO'
      contexto,       // texto livre com situação desejada
      idade,          // opcional
      publico,        // ex: 'fundamental', 'medio', 'adulto'
      detalhesExtra,  // opcional
    } = req.body;

    // Validação
    if (!modo || !contexto) {
      return res.status(400).json({ 
        error: 'modo e contexto são obrigatórios',
        modosDisponiveis: ['DESAFIO_UNICO', 'SERIE_DESAFIOS', 'PLANO_MODULO']
      });
    }

    const modosValidos = ['DESAFIO_UNICO', 'SERIE_DESAFIOS', 'PLANO_MODULO'];
    if (!modosValidos.includes(modo)) {
      return res.status(400).json({ 
        error: 'modo inválido',
        modosDisponiveis: modosValidos
      });
    }

    const userPrompt = `
MODO: ${modo}
IDADE APROXIMADA: ${idade ?? 'não informado'}
PÚBLICO: ${publico ?? 'geral'}

CONTEXTO / TEMA:
${contexto}

DETALHES EXTRAS (se houver):
${detalhesExtra || 'nenhum'}

Gere a experiência do Módulo Fazedores de acordo com o MODO especificado.
Siga rigorosamente as regras do prompt de sistema.
`.trim();

    const content = await callLLM({
      system: SYSTEM_MODULO_FAZEDORES,
      messages: [{ role: 'user', content: userPrompt }],
    });

    // Tenta extrair JSON se existir
    let jsonData = null;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        jsonData = JSON.parse(jsonMatch[0]);
      } catch {
        // Ignora erro de parse, retorna como texto
      }
    }

    res.json({
      sucesso: true,
      modo,
      conteudo: content,
      dadosEstruturados: jsonData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro no Módulo Fazedores:', error);
    res.status(500).json({ 
      error: 'Falha ao gerar experiência do Módulo Fazedores',
      detalhes: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/v1/fazedores/responder
// Para o aluno enviar resposta a um desafio
router.post('/responder', async (req: Request, res: Response) => {
  try {
    const { 
      desafioId, 
      respostaAluno, 
      contextoDesafio 
    } = req.body;

    if (!respostaAluno) {
      return res.status(400).json({ error: 'respostaAluno é obrigatória' });
    }

    const system = `Você é o mentor do Módulo Fazedores do StudyAI.
O aluno acabou de responder a um desafio. Analise a resposta e dê feedback construtivo.
Elogie sempre a coragem de tentar, não a perfeição.`;

    const userPrompt = `
CONTEXTO DO DESAFIO:
${contextoDesafio || 'Desafio prático do Módulo Fazedores'}

RESPOSTA DO ALUNO:
${respostaAluno}

Dê um feedback que:
1. Elogie a coragem de tentar
2. Comente pontos positivos específicos
3. Sugira uma melhoria ou extensão
4. Termine com mensagem motivacional

Responda em JSON:
{
  "feedback": "texto geral de feedback",
  "pontosPositivos": ["ponto 1", "ponto 2"],
  "sugestaoMelhoria": "como pode melhorar",
  "proximoPasso": "sugestão do que fazer agora",
  "mensagemMotivacional": "frase final de orgulho"
}
    `.trim();

    const content = await callLLM({
      system,
      messages: [{ role: 'user', content: userPrompt }],
    });

    // Extrair JSON
    let feedback = null;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        feedback = JSON.parse(jsonMatch[0]);
      } catch {
        feedback = { 
          feedback: content,
          erroParse: true 
        };
      }
    }

    res.json({
      sucesso: true,
      desafioId,
      ...feedback,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro ao processar resposta:', error);
    res.status(500).json({ error: 'Erro ao processar resposta do aluno' });
  }
});

// GET /api/v1/fazedores/exemplos
// Retorna exemplos de chamadas para o frontend
router.get('/exemplos', (req: Request, res: Response) => {
  res.json({
    exemplos: [
      {
        nome: 'Desafio Único - Organizar área de estudo',
        descricao: 'Para um aluno do ensino médio organizar o quarto',
        body: {
          modo: 'DESAFIO_UNICO',
          contexto: 'organizar e consertar a área de estudos no quarto',
          idade: 15,
          publico: 'medio',
        },
      },
      {
        nome: 'Série de Desafios - Ferramentas básicas',
        descricao: 'Mini-desafios para arrumar coisas em casa',
        body: {
          modo: 'SERIE_DESAFIOS',
          contexto: 'coisas simples para arrumar em casa com ferramentas básicas',
          idade: 13,
          publico: 'fundamental',
        },
      },
      {
        nome: 'Plano de Módulo - Para professores',
        descricao: 'Projeto de 2 aulas para 8º ano',
        body: {
          modo: 'PLANO_MODULO',
          contexto: 'projeto de 2 aulas para 8º ano sobre reaproveitamento de materiais e pequenos consertos',
          publico: 'fundamental',
          detalhesExtra: 'escola urbana, sala com 30 alunos, poucos recursos',
        },
      },
    ],
  });
});

export { router as fazedoresRouter };
