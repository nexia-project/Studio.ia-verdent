# Modelos de IA StudyAI

## Provedor Principal: OpenRouter

OpenRouter permite acesso a múltiplos modelos através de uma única API.

## Modelos Utilizados

### Premium (Tarefas Complexas)

#### Claude Sonnet 4 (Anthropic)
- **ID**: `anthropic/claude-sonnet-4`
- **Uso**: Chat tutor complexo, correção de redações, planejamento didático
- **Custo**: ~$3/1M tokens
- **Contexto**: 200K tokens
- **Características**: Excelente raciocínio, instruções precisas

#### GPT-4o (OpenAI)
- **ID**: `openai/gpt-4o`
- **Uso**: Fallback para tarefas premium, visão
- **Custo**: ~$5/1M tokens
- **Contexto**: 128K tokens
- **Características**: Multimodal, consistente

### Econômicos (Tarefas Simples)

#### Claude 3 Haiku (Anthropic)
- **ID**: `anthropic/claude-3-haiku`
- **Uso**: Classificação, sumarização simples, respostas rápidas
- **Custo**: ~$0.25/1M tokens
- **Contexto**: 200K tokens
- **Características**: Rápido, econômico

#### DeepSeek V4 (DeepSeek)
- **ID**: `deepseek/deepseek-v4`
- **Uso**: Geração de questões, chat simples, raciocínio em exatas
- **Custo**: ~$0.50/1M tokens
- **Contexto**: 64K tokens
- **Características**: Bom custo-benefício, forte em matemática

### Especializados

#### Whisper (OpenAI)
- **ID**: `openai/whisper-1`
- **Uso**: Transcrição de áudio
- **Custo**: $0.006/minuto
- **Características**: Alta precisão em PT-BR

#### TTS-1 (OpenAI)
- **ID**: `openai/tts-1`
- **Voz**: `onyx` (voz do Tiagão)
- **Uso**: Texto para fala
- **Custo**: $15/1M caracteres
- **Características**: Voz natural

#### GPT-Image-1 (OpenAI)
- **ID**: `openai/gpt-image-1`
- **Uso**: Geração de imagens educacionais
- **Custo**: $0.04/imagem
- **Características**: Qualidade educacional

## Roteamento de Modelos

```typescript
// packages/ai/src/router.ts
export function selectModel(task: TaskType): ModelConfig {
  switch (task) {
    case 'chat-complex':
      return { model: 'anthropic/claude-sonnet-4', fallback: 'openai/gpt-4o' };
    case 'chat-simple':
      return { model: 'anthropic/claude-3-haiku', fallback: 'deepseek/deepseek-v4' };
    case 'essay-correction':
      return { model: 'anthropic/claude-sonnet-4', fallback: 'openai/gpt-4o' };
    case 'question-generation':
      return { model: 'deepseek/deepseek-v4', fallback: 'anthropic/claude-3-haiku' };
    case 'summarize':
      return { model: 'anthropic/claude-3-haiku', fallback: 'deepseek/deepseek-v4' };
    default:
      return { model: 'deepseek/deepseek-v4' };
  }
}
```

## Classificador de Complexidade

Antes de rotear, um classificador determina a complexidade:

```typescript
async function classifyComplexity(prompt: string): Promise<'low' | 'medium' | 'high'> {
  // Usa Haiku para classificação rápida
  const response = await ai.complete({
    model: 'anthropic/claude-3-haiku',
    prompt: `Classifique a complexidade: "${prompt}"`,
  });
  
  return parseComplexity(response);
}
```

## Fallback Automático

Se um modelo falhar:
1. Tenta modelo fallback
2. Se falhar novamente, usa modelo econômico
3. Se tudo falhar, retorna erro amigável

## Limites de Uso

| Plano | Requisições/dia | Modelos Premium |
|-------|----------------|-----------------|
| Free | 50 | 10 |
| Premium | Ilimitado | Ilimitado |
| Institution | Ilimitado | Ilimitado |

## Monitoramento de Custos

Cada requisição é logada:
- Modelo usado
- Tokens (prompt + completion)
- Custo em USD
- Cache hit/miss
- User ID

Dashboard de custos disponível em `/admin/analytics`.