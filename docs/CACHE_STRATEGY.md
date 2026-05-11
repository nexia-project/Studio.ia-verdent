# Estratégia de Cache de IA

StudyAI implementa um sistema de cache em 4 níveis para otimizar custos de APIs de IA.

## Níveis de Cache

```
┌─────────────────────────────────────────────────────────────┐
│                    NÍVEIS DE CACHE                         │
├─────────────┬─────────────┬─────────────┬─────────────────┤
│    L1       │     L2      │     L3      │      L4         │
│  Memory     │   Redis     │  PostgreSQL │   Semantic      │
│   5 min     │   24h-30d   │  Indefinido │     7d          │
└─────────────┴─────────────┴─────────────┴─────────────────┘
```

### L1 - In-Memory (Node.js Map)
- **TTL**: 5 minutos
- **Uso**: Respostas idênticas em burst
- **Implementação**: Map global no processo Node.js
- **Capacidade**: ~1000 entradas

### L2 - Redis
- **TTL**: 24 horas a 30 dias (por tipo)
- **Uso**: Cache exato por hash SHA-256 do prompt
- **Chave**: `cache:l2:{hash}`
- **Fallback**: Quando L1 miss

### L3 - PostgreSQL
- **TTL**: Indefinido
- **Uso**: Conteúdo pedagógico gerado (questões, planos, correções)
- **Tabela**: `ai_cache`
- **Fallback**: Quando L2 miss

### L4 - Semantic (Redis + Embeddings)
- **TTL**: 7 dias
- **Uso**: Cache por similaridade semântica
- **Mecanismo**: Embeddings + similaridade de cosseno
- **Fallback**: Quando L3 miss

## Model Router

O sistema escolhe automaticamente o modelo mais adequado para cada tarefa:

| Tarefa | Modelo Primário | Fallback | Cache | TTL |
|--------|----------------|----------|-------|-----|
| Chat Tutor (complexo) | Claude Sonnet 4 | GPT-4o | L4 | 24h |
| Chat Tutor (simples) | Claude 3 Haiku | DeepSeek V4 | L2 | 12h |
| Correção de Redação | Claude Sonnet 4 | GPT-4o | L3 | 7d |
| Geração de Questões | DeepSeek V4 | Claude 3 Haiku | L3 | 30d |
| Plano de Aula | Claude Sonnet 4 | GPT-4o | L3 | 30d |
| Resumos/Flashcards | Claude 3 Haiku | DeepSeek V4 | L3 | 30d |
| TTS (voz Tiagão) | OpenAI TTS-1 | - | L3 | 90d |
| STT | Whisper | - | - | - |
| Imagens | gpt-image-1 | - | L3 | 90d |

## Regras de Economia

1. **Questões geradas** → Salvar permanentemente no banco (nunca regenerar)
2. **Planos de aula** → Cache 30 dias por combinação subject+topic+grade
3. **Correções de redação** → Cache por hash do texto
4. **TTS** → Cache 90 dias por texto normalizado
5. **Chat simples** → DeepSeek V4 (10x mais barato)
6. **Chat complexo** → Claude Sonnet 4 apenas quando necessário
7. **Classificador de complexidade** → Haiku para < 50 tokens
8. **Batch generation** → 1 call = 10 flashcards/questões
9. **Rate limit por plano** → Soft-degrade quando > 80% do limite
10. **Streaming obrigatório** → Para todas as respostas de chat

## Cálculo de Hash

```typescript
// L2 Cache - Hash exato
function generateHash(prompt: string, model: string): string {
  return crypto
    .createHash('sha256')
    .update(`${model}:${prompt}`)
    .digest('hex');
}

// L4 Cache - Hash semântico (simplificado)
function generateSemanticHash(prompt: string): string {
  // Normaliza o texto
  const normalized = prompt
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim();
  
  // Gera embedding e usa para busca por similaridade
  return generateEmbedding(normalized);
}
```

## Monitoramento

### Métricas

- Cache hit rate por nível
- Latência média (com e sem cache)
- Economia estimada (USD)
- Distribuição de modelos usados

### Alertas

- Cache hit rate < 50%
- Custo diário > limite
- Falhas de conexão Redis

## Configuração

```typescript
// packages/ai/src/cache/config.ts
export const CACHE_CONFIG = {
  l1: { ttl: 5 * 60 * 1000, maxSize: 1000 },
  l2: { ttl: 24 * 60 * 60 * 1000 },
  l3: { ttl: null },
  l4: { ttl: 7 * 24 * 60 * 60 * 1000, similarity: 0.95 },
};
```