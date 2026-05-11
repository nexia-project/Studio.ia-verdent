# StudyAI

A maior plataforma de ensino do Brasil construída por inteligência artificial com curatoria humana.

## Visão

Democratizar educação de altíssima qualidade no Brasil, unificando aluno, professor e instituição num único ecossistema limpo, atual e cientificamente embasado.

## Stack Tecnológico

- **Monorepo**: pnpm workspaces + Turbo
- **Backend**: Express 5 + Drizzle ORM + PostgreSQL + Redis
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui
- **Mobile**: Expo + React Native
- **Auth**: Clerk
- **Pagamentos**: Stripe
- **IA**: OpenRouter (Claude, GPT-4o, DeepSeek)
- **Deploy**: Railway

## Estrutura do Projeto

```
/
├── apps/
│   ├── api/           # API Express 5
│   ├── web/           # Frontend React + Vite
│   └── mobile/        # App Expo/React Native
├── packages/
│   ├── types/         # Tipos TypeScript compartilhados
│   ├── db/            # Drizzle ORM + schemas
│   ├── ai/            # Client OpenRouter + 22 tools
│   ├── sdk/           # Client HTTP tipado
│   └── config/        # Configurações compartilhadas
└── docs/              # Documentação
```

## Documentação

- [Arquitetura](./docs/ARCHITECTURE.md) - Visão geral da arquitetura
- [API](./docs/API.md) - Documentação completa da API
- [Deploy](./docs/DEPLOY.md) - Guia de deploy no Railway
- [Módulos](./docs/MODULES.md) - Documentação dos módulos
- [Cache](./docs/CACHE_STRATEGY.md) - Estratégia de cache
- [Design System](./docs/DESIGN_SYSTEM.md) - Sistema de design
- [AI Models](./docs/AI_MODELS.md) - Modelos de IA utilizados
- [Módulo Fazedores](./docs/MODULO_FAZEDORES.md) - Sistema de aprendizado ativo
- [Contribuição](./docs/CONTRIBUTING.md) - Como contribuir
- [Troubleshooting](./docs/TROUBLESHOOTING.md) - Solução de problemas

## Primeiros Passos

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
# Edite .env com suas credenciais
```

### 3. Iniciar serviços locais

```bash
docker-compose up -d
```

### 4. Executar migrações

```bash
pnpm db:migrate
```

### 5. Popular banco de dados

```bash
pnpm db:seed
```

### 6. Iniciar desenvolvimento

```bash
pnpm dev
```

Acesse:
- Web: http://localhost:5173
- API: http://localhost:3000
- API Docs: http://localhost:3000/api/v1/docs

## Scripts Disponíveis

- `pnpm dev` - Inicia todos os serviços em modo desenvolvimento
- `pnpm build` - Compila todos os pacotes
- `pnpm lint` - Executa lint em todos os pacotes
- `pnpm typecheck` - Verifica tipos TypeScript
- `pnpm db:migrate` - Executa migrações do banco
- `pnpm db:seed` - Popula o banco com dados iniciais
- `pnpm db:studio` - Abre o Drizzle Studio
- `pnpm db:generate` - Gera novas migrações
- `pnpm clean` - Limpa node_modules e builds
- `pnpm format` - Formata código com Prettier

## Módulos

### Aluno
- **Tutor IA (Tiagão)**: Chat inteligente com 22 ferramentas
- **Caderno Digital**: Anotações com OCR e busca
- **Flashcards**: Repetição espaçada
- **Simulados**: Provas práticas com correção
- **Redação**: Correção ENEM com IA
- **Módulo Fazedores**: Aprendizado ativo gamificado

### Professor
- **Gestão de Turmas**: Administração de alunos
- **Banco de Questões**: Repositório organizado
- **Gerador de Provas**: Criação automática
- **Planos de Aula**: Templates com IA

### Instituição
- **Dashboard**: Métricas de engajamento
- **Gestão**: Professores e alunos
- **Relatórios**: Análises consolidadas

### Governo
- **Rede Escolar**: Visão macro
- **Indicadores**: IDEB, ENEM, evasão
- **Relatórios**: Dados consolidados

### Admin
- **Gestão de Usuários**: Controle completo
- **Assinaturas**: Planos e pagamentos
- **Monitoramento**: Saúde do sistema

## Paleta de Cores

- **Background**: `hsl(270 40% 98%)` - Lilás claro
- **Primary**: `hsl(271 81% 56%)` - Roxo/violeta
- **Accent**: `hsl(292 65% 52%)` - Magenta
- **Text**: `hsl(280 35% 14%)` - Cinza arroxeado

## Contribuição

1. Leia o [guia de contribuição](./docs/CONTRIBUTING.md)
2. Crie uma branch: `git checkout -b feature/nome`
3. Faça commit: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/nome`
5. Abra um Pull Request

## Deploy

Veja o [guia de deploy](./docs/DEPLOY.md) para instruções detalhadas de deploy no Railway.

## Troubleshooting

Encontrou algum problema? Consulte o [guia de troubleshooting](./docs/TROUBLESHOOTING.md).

## Licença

Proprietária - StudyAI © 2024
