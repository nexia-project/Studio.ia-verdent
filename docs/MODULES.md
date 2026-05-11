# Módulos do StudyAI

## Visão Geral

O StudyAI é composto por módulos independentes que trabalham juntos para criar uma experiência educacional completa.

```
┌─────────────────────────────────────────────────────────────┐
│                      STUDENT MODULE                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐ │
│  │  Tutor   │ │ Caderno  │ │Flashcards│ │   Simulados    │ │
│  │  (Tiagão)│ │ Digital  │ │          │ │                │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐ │
│  │ Redação  │ │Desafios  │ │ Foco 5   │ │  Aula Ativa    │ │
│  │          │ │Organização│ │  Minutos │ │                │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     TEACHER MODULE                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐ │
│  │  Turmas  │ │  Banco   │ │ Gerador  │ │ Planos de Aula │ │
│  │          │ │Questões  │ │  Provas  │ │                │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   INSTITUTION MODULE                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐ │
│  │ Dashboard│ │Professores│ │  Alunos  │ │   Relatórios   │ │
│  │          │ │          │ │          │ │                │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    GOVERNMENT MODULE                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐ │
│  │  Rede    │ │Indicadores│ │ Relatórios│ │   Exportação   │ │
│  │Escolar   │ │          │ │          │ │                │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Módulo Aluno

### Tutor IA (Tiagão)

Tutor personalizado com IA para auxiliar no aprendizado.

**Funcionalidades:**
- Chat em tempo real
- Respostas contextualizadas
- 22 ferramentas especializadas
- Memória de conversas
- Suporte a múltiplos modelos (Claude, GPT-4o, DeepSeek)

**Ferramentas disponíveis:**
1. `explain-concept` - Explica conceitos
2. `generate-questions` - Gera questões
3. `summarize-text` - Resume textos
4. `create-flashcards` - Cria flashcards
5. `check-essay` - Corrige redações
6. `study-plan` - Cria planos de estudo
7. `solve-math` - Resolve problemas matemáticos
8. `translate` - Traduz textos
9. `grammar-check` - Verifica gramática
10. `generate-essay-topic` - Sugere temas de redação
11. `analyze-text` - Analisa textos literários
12. `create-mindmap` - Gera mapas mentais
13. `explain-code` - Explica código
14. `generate-exercises` - Gera exercícios
15. `simulate-interview` - Simula entrevistas
16. `create-timeline` - Cria linhas do tempo
17. `compare-concepts` - Compara conceitos
18. `find-resources` - Encontra recursos
19. `practice-speaking` - Prática de conversação
20. `analyze-data` - Analisa dados
21. `create-quiz` - Cria quizzes
22. `study-techniques` - Sugere técnicas de estudo

### Caderno Digital

Anotações inteligentes com suporte a múltiplos formatos.

**Funcionalidades:**
- Rich text editor
- Upload de imagens
- Reconhecimento OCR
- Organização por matérias/tags
- Busca full-text
- Compartilhamento

### Flashcards

Sistema de repetição espaçada para memorização.

**Funcionalidades:**
- Algoritmo SM-2
- Decks organizados
- Cards com imagem/áudio
- Estatísticas de revisão
- Notificações de revisão

### Simulados

Provas práticas com correção automática.

**Funcionalidades:**
- Questões de múltipla escolha
- Temporizador
- Correção instantânea
- Análise de desempenho
- Histórico de resultados

### Redação

Correção de redações seguindo critérios do ENEM.

**Funcionalidades:**
- 5 competências avaliadas
- Nota de 0 a 1000
- Feedback detalhado
- Sugestões de melhoria
- Modelos de redação

### Módulo Fazedores

Sistema de aprendizado ativo com gamificação.

**Funcionalidades:**
- Aula Ativa: resumos e auto-avaliação
- Desafio Organização: organização de estudos
- Foco 5 Minutos: técnica Pomodoro
- Pontos e recompensas
- Integração com Tiagão

---

## Módulo Professor

### Gestão de Turmas

Administração completa de turmas e alunos.

**Funcionalidades:**
- Criar/editar turmas
- Adicionar/remover alunos
- Acompanhar progresso
- Enviar notificações
- Calendário de aulas

### Banco de Questões

Repositório de questões organizado.

**Funcionalidades:**
- Criar questões (múltipla escolha, dissertativa, V/F)
- Categorizar por matéria/dificuldade
- Busca avançada
- Importar/exportar
- Compartilhar com outros professores

### Gerador de Provas

Criação automática de provas.

**Funcionalidades:**
- Seleção automática de questões
- Personalização de cabeçalho
- Geração de gabarito
- Exportar PDF
- Aplicar online

### Planos de Aula

Criação assistida por IA de planos de aula.

**Funcionalidades:**
- Templates por matéria
- Sugestões de atividades
- Objetivos de aprendizagem
- Materiais complementares
- Compartilhamento

---

## Módulo Instituição

### Dashboard Institucional

Visão geral da instituição de ensino.

**Funcionalidades:**
- Métricas de engajamento
- Desempenho por departamento
- Comparativos históricos
- Alertas automáticos

### Gestão de Professores

Administração do corpo docente.

**Funcionalidades:**
- Cadastro de professores
- Distribuição de turmas
- Avaliação de desempenho
- Carga horária

### Gestão de Alunos

Controle de alunos matriculados.

**Funcionalidades:**
- Matrículas
- Histórico escolar
- Transferências
- Documentação

### Relatórios

Relatórios consolidados da instituição.

**Funcionalidades:**
- Desempenho geral
- Comparativos por turma
- Evolução temporal
- Exportação PDF/Excel

---

## Módulo Governo

### Rede Escolar

Visão macro de todas as escolas.

**Funcionalidades:**
- Mapa de escolas
- Dados por região
- Indicadores de infraestrutura
- Comparativos estaduais

### Indicadores

Métricas de desempenho da rede.

**Funcionalidades:**
- IDEB
- Taxa de aprovação
- Taxa de evasão
- Média ENEM
- Comparativos nacionais

### Relatórios Consolidados

Relatórios para tomada de decisão.

**Funcionalidades:**
- Relatórios automáticos
- Dados em tempo real
- Projeções
- Exportação em múltiplos formatos

### Exportação de Dados

Ferramentas de exportação de dados.

**Funcionalidades:**
- CSV, Excel, JSON
- APIs de integração
- Dados anonimizados
- Conformidade LGPD

---

## Módulo Admin

### Gestão de Usuários

Administração de todos os usuários.

**Funcionalidades:**
- Listar/buscar usuários
- Editar perfis
- Alterar papéis
- Banir/desbanir

### Gestão de Assinaturas

Controle de planos e pagamentos.

**Funcionalidades:**
- Override de assinaturas
- Reembolsos
- Cupons de desconto
- Relatórios financeiros

### Configurações da Plataforma

Configurações globais.

**Funcionalidades:**
- Parâmetros de IA
- Limites de uso
- Mensagens do sistema
- Manutenção

### Monitoramento

Acompanhamento da saúde do sistema.

**Funcionalidades:**
- Logs em tempo real
- Métricas de performance
- Alertas de erro
- Status de serviços

---

## Integrações entre Módulos

```
Aluno ───────┬───────► Professor
             │
             ├───────► Instituição
             │
             └───────► Governo (dados anonimizados)

Professor ───┬───────► Instituição
             │
             └───────► Aluno (atividades, provas)

Instituição ─┬───────► Governo (relatórios)
             │
             └───────► Admin (suporte)

Todas ───────► Admin (monitoramento)
```

## Permissões por Papel

| Funcionalidade | Aluno | Professor | Instituição | Governo | Admin |
|---------------|-------|-----------|-------------|---------|-------|
| Tutor IA | ✅ | ✅ | ✅ | ❌ | ✅ |
| Flashcards | ✅ | ✅ | ❌ | ❌ | ✅ |
| Simulados | ✅ | ✅ | ❌ | ❌ | ✅ |
| Criar Provas | ❌ | ✅ | ❌ | ❌ | ✅ |
| Gerenciar Turmas | ❌ | ✅ | ✅ | ❌ | ✅ |
| Relatórios | ❌ | ❌ | ✅ | ✅ | ✅ |
| Dados da Rede | ❌ | ❌ | ❌ | ✅ | ✅ |
| Configurações | ❌ | ❌ | ❌ | ❌ | ✅ |
