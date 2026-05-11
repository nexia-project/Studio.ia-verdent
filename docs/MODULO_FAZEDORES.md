# Módulo Fazedores - Documentação de Integração

## Visão Geral

O Módulo Fazedores resgata o espírito de "colocar a mão na massa", ensinando alunos a:
- Usar ferramentas simples
- Consertar coisas do dia a dia
- Reaproveitar e criar soluções
- Resolver problemas práticos

## Endpoints da API

### POST /api/v1/fazedores

Gera experiências do Módulo Fazedores em 3 modos diferentes.

**Body:**
```json
{
  "modo": "DESAFIO_UNICO" | "SERIE_DESAFIOS" | "PLANO_MODULO",
  "contexto": "string - descrição da situação/tema",
  "idade": 15,                    // opcional
  "publico": "fundamental|medio|adulto",  // opcional
  "detalhesExtra": "string"       // opcional
}
```

**Response:**
```json
{
  "sucesso": true,
  "modo": "DESAFIO_UNICO",
  "conteudo": "texto completo do desafio...",
  "dadosEstruturados": { ... },  // se houver JSON na resposta
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### POST /api/v1/fazedores/responder

Envia resposta do aluno e recebe feedback.

**Body:**
```json
{
  "desafioId": "string",
  "respostaAluno": "string",
  "contextoDesafio": "string"  // opcional
}
```

### GET /api/v1/fazedores/exemplos

Retorna exemplos de chamadas para teste.

## Modos de Uso

### 1. DESAFIO_UNICO
Para um aluno individual resolver uma situação prática.

```typescript
const res = await fetch('/api/v1/fazedores', {
  method: 'POST',
  body: JSON.stringify({
    modo: 'DESAFIO_UNICO',
    contexto: 'organizar e consertar a área de estudos no quarto',
    idade: 15,
    publico: 'medio',
  }),
});
```

**Retorno:** Situação completa com:
- Descrição do problema
- Perguntas para pensar antes
- Passo a passo de solução
- Desafio extra (+1)
- Mensagem de orgulho

### 2. SERIE_DESAFIOS
Lista de mini-desafios para prática contínua.

```typescript
const res = await fetch('/api/v1/fazedores', {
  method: 'POST',
  body: JSON.stringify({
    modo: 'SERIE_DESAFIOS',
    contexto: 'coisas simples para arrumar em casa com ferramentas básicas',
    idade: 13,
    publico: 'fundamental',
  }),
});
```

**Retorno:** 3-5 mini-desafios com:
- Situação rápida
- Pergunta guia
- Sugestão de solução

### 3. PLANO_MODULO
Roteiro completo para professores/pais.

```typescript
const res = await fetch('/api/v1/fazedores', {
  method: 'POST',
  body: JSON.stringify({
    modo: 'PLANO_MODULO',
    contexto: 'projeto de 2 aulas para 8º ano sobre reaproveitamento de materiais',
    publico: 'fundamental',
    detalhesExtra: 'escola urbana, sala com 30 alunos, poucos recursos',
  }),
});
```

**Retorno:** Plano completo com:
- Objetivos do módulo
- Materiais necessários
- Atividades práticas
- Perguntas para discussão
- Dicas de segurança

## Integração no Frontend

### Hook useFazedores

```typescript
import { useFazedores, useDesafioUnico } from '@/hooks/useFazedores';

// Hook genérico
const { gerarDesafio, carregando, erro } = useFazedores();

// Hook específico para desafio único
const { pedirDesafio, carregando } = useDesafioUnico({
  onSuccess: (data) => console.log(data),
  onError: (err) => console.error(err),
});

// Usar
const desafio = await pedirDesafio('consertar uma cadeira bamba', 14, 'medio');
```

### Integração com Tiagão

```tsx
import { BotaoDesafioFazedor } from '@/components/tutor/integracao-fazedores';

// No componente do chat do Tiagão
<BotaoDesafioFazedor 
  topicoAtual={topicoAtual}
  onDesafioRecebido={(desafio) => {
    // Adiciona ao chat ou mostra em modal
    adicionarMensagemAoChat({
      role: 'assistant',
      content: desafio.conteudo,
      tipo: 'fazedor',
    });
  }}
/>
```

### Integração em Planos de Estudo

```typescript
// Bloco "Projeto Fazedor da Semana"
const projetoFazedor = await fetch('/api/v1/fazedores', {
  method: 'POST',
  body: JSON.stringify({
    modo: 'SERIE_DESAFIOS',
    contexto: `projetos práticos relacionados a ${materiaAtual}`,
    idade: idadeAluno,
    publico: nivelEscolar,
  }),
});
```

## Exemplos de Contextos

### Para alunos do Fundamental:
- "organizar o material escolar na mochila"
- "criar um porta-lápis com garrafa pet"
- "consertar um brinquedo quebrado"

### Para alunos do Médio:
- "organizar a mesa de estudos para ser mais produtivo"
- "criar um sistema de organização para provas"
- "consertar algo em casa usando ferramentas simples"

### Para adultos:
- "organizar o guarda-roupa que está sempre bagunçado"
- "criar soluções para economizar espaço em apartamento pequeno"
- "pequenos reparos domésticos sem chamar profissional"

## Princípios Pedagógicos

1. **Nunca entrega pronto** - Sempre faz perguntas antes
2. **Valoriza tentativa** - Elogia esforço, não perfeição
3. **Conecta com estudo** - Mostra como habilidades práticas ajudam na escola
4. **Desafio +1** - Sempre pede algo extra para ir além
5. **Orgulho do fazer** - Mensagens que valorizam quem resolve problemas

## Segurança

- Nunca sugere atividades perigosas (eletricidade, altura, fogo)
- Sempre recomenda supervisão de adulto para menores
- Ferramentas simples apenas (martelo, alicate, chave de fenda, cola, fita)
- Materiais reaproveitados (papelão, garrafas, caixas)

## Métricas Sugeridas

- Número de desafios completados
- Tipos de desafios mais populares
- Taxa de conclusão
- Feedback dos alunos
- Tempo médio por desafio