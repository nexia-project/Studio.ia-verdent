import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { loadUserMiddleware } from '../middlewares/roles';
import { callLLM } from '@studyai/ai';
import { 
  SYSTEM_TIAGAO_AULA_ATIVA, 
  buildAulaAtivaPrompt,
  type ChatMessage,
  type AulaAtivaContext 
} from '@studyai/ai/prompts/tiagao-aula-ativa';

const router = Router();

router.use(authMiddleware, loadUserMiddleware);

// POST /api/v1/tutor/aula-ativa
router.post('/aula-ativa', async (req, res) => {
  try {
    const {
      historico = [],
      mensagemAluno,
      contexto,
      modoFoco = false,
    }: {
      historico: ChatMessage[];
      mensagemAluno: string;
      contexto: AulaAtivaContext;
      modoFoco?: boolean;
    } = req.body;

    if (!mensagemAluno || !contexto) {
      return res.status(400).json({ error: 'mensagemAluno e contexto são obrigatórios' });
    }

    const prompt = buildAulaAtivaPrompt(historico, mensagemAluno, { ...contexto, modoFoco });

    const resposta = await callLLM({
      system: SYSTEM_TIAGAO_AULA_ATIVA,
      messages: [{ role: 'user', content: prompt }],
    });

    // Log da interação (opcional - para analytics)
    // await logAulaAtiva({ userId: req.user?.id, contexto, mensagemAluno, resposta });

    res.json({ 
      resposta,
      modoAulaAtiva: true,
      missao: detectarMissao(resposta),
    });
  } catch (error) {
    console.error('Erro na aula ativa:', error);
    res.status(500).json({ error: 'Erro ao processar aula ativa' });
  }
});

// POST /api/v1/tutor/desafio-organizacao
router.post('/desafio-organizacao', async (req, res) => {
  try {
    const { topico, contextoAluno } = req.body as {
      topico: string;
      contextoAluno?: { idade?: number; nivel?: string };
    };

    if (!topico) {
      return res.status(400).json({ error: 'topico é obrigatório' });
    }

    const system = `Você cria mini-desafios de organização e criatividade para alunos.
Siga rigorosamente o formato JSON solicitado.`;

    const userPrompt = `
TÓPICO DE ESTUDO: "${topico}"
DADOS DO ALUNO: ${JSON.stringify(contextoAluno || {})}

Crie UM desafio no estilo "porta-malas lotado", mas ligado ao estudo.

Regras:
- Situação: parece que "não cabe" ou "não dá pra fazer", mas o problema é FALTA DE ORGANIZAÇÃO
  (ex: muito conteúdo, pouco tempo, caderno bagunçado, muitas fórmulas, etc.).
- Use linguagem simples.
- O objetivo é fazer o aluno reorganizar, priorizar, encaixar melhor as coisas.

Responda APENAS em JSON válido:

{
  "titulo": "título curto e impactante",
  "situacao": "descrição da situação problema (2-3 frases)",
  "pergunta_inicial": "pergunta que faz o aluno pensar na organização",
  "perguntas_de_guias": ["pergunta 1", "pergunta 2", "pergunta 3"],
  "exemplo_de_resposta_criativa": "exemplo do que seria uma boa resposta",
  "reflexao_final": "mensagem motivacional sobre organização"
}
    `.trim();

    const content = await callLLM({
      system,
      messages: [{ role: 'user', content: userPrompt }],
    });

    // Extrair JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON não encontrado na resposta');
    }

    const desafio = JSON.parse(jsonMatch[0]);

    res.json({
      ...desafio,
      tipo: 'desafio-organizacao',
      topico,
    });
  } catch (error) {
    console.error('Erro no desafio de organização:', error);
    res.status(500).json({ error: 'Erro ao gerar desafio de organização' });
  }
});

// POST /api/v1/tutor/foco-5min
router.post('/foco-5min', async (req, res) => {
  try {
    const { topico, nivel } = req.body as {
      topico: string;
      nivel: 'fundamental' | 'medio' | 'enem' | 'concurso';
    };

    if (!topico || !nivel) {
      return res.status(400).json({ error: 'topico e nivel são obrigatórios' });
    }

    const system = `Você cria roteiros de foco de 5 minutos para tirar alunos da procrastinação.
Siga rigorosamente o formato JSON solicitado.`;

    const userPrompt = `
O aluno está travado/desmotivado, mas quer estudar:

TÓPICO: "${topico}"
NÍVEL: ${nivel}

Monte um roteiro de 5 minutos com foco em AÇÃO.

Responda APENAS em JSON válido:

{
  "mensagem_abertura": "mensagem motivacional de abertura",
  "passos": [
    { "titulo": "Passo 1 - ...", "instrucao": "...", "duracao": "1 min" },
    { "titulo": "Passo 2 - ...", "instrucao": "...", "duracao": "3 min" },
    { "titulo": "Passo 3 - ...", "instrucao": "...", "duracao": "1 min" }
  ],
  "frase_orgulho": "frase que valoriza o esforço de 5 minutos",
  "call_to_action_extra": "convite leve para continuar"
}

Regras:
- Passo 1 (1 min): lembrar algo que já sabe sobre o tópico.
- Passo 2 (3 min): PRODUZIR algo (mini-resumo, exemplo, analogia, desenho mental, áudio explicando).
- Passo 3 (1 min): registrar 1 dúvida ou curiosidade para mandar ao Professor Tiagão.
- Frase de orgulho: valorizar 5 minutos bem usados.
- Call to action: convite leve para continuar mais 5 min ou mandar dúvida para o Tiagão.
    `.trim();

    const content = await callLLM({
      system,
      messages: [{ role: 'user', content: userPrompt }],
    });

    // Extrair JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON não encontrado na resposta');
    }

    const roteiro = JSON.parse(jsonMatch[0]);

    res.json({
      ...roteiro,
      tipo: 'foco-5min',
      topico,
      nivel,
      tempoTotal: '5 minutos',
    });
  } catch (error) {
    console.error('Erro no foco 5 min:', error);
    res.status(500).json({ error: 'Erro ao gerar roteiro de foco' });
  }
});

// Helper para detectar missão na resposta
function detectarMissao(resposta: string): string | null {
  const padroes = [
    /missão\s*(\d+)/i,
    /tarefa\s*(\d+)/i,
    /passo\s*(\d+)/i,
    /etapa\s*(\d+)/i,
  ];

  for (const padrao of padroes) {
    const match = resposta.match(padrao);
    if (match) {
      return `Missão ${match[1]}`;
    }
  }

  if (resposta.toLowerCase().includes('+1')) {
    return 'Desafio +1';
  }

  return null;
}

export { router as tutorModulosRouter };
