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

## Scripts Disponíveis

- `pnpm dev` - Inicia todos os serviços em modo desenvolvimento
- `pnpm build` - Compila todos os pacotes
- `pnpm lint` - Executa lint em todos os pacotes
- `pnpm db:migrate` - Executa migrações do banco
- `pnpm db:seed` - Popula o banco com dados iniciais
- `pnpm db:studio` - Abre o Drizzle Studio

## Módulos

- **Aluno**: Tutor IA (Tiagão), Caderno Digital, Flashcards, Simulados, Redação
- **Professor**: Gestão de Turmas, Banco de Questões, Gerador de Provas, Planos de Aula
- **Instituição**: Dashboard, Métricas, Gestão de Professores/Alunos
- **Governo**: Métricas de Rede, Relatórios Consolidados
- **Admin**: Gestão de Usuários, Override de Papéis

## Paleta de Cores

- **Background**: `hsl(270 40% 98%)` - Lilás claro
- **Primary**: `hsl(271 81% 56%)` - Roxo/violeta
- **Accent**: `hsl(292 65% 52%)` - Magenta
- **Text**: `hsl(280 35% 14%)` - Cinza arroxeado

## Contribuição

1. Crie uma branch: `git checkout -b feature/nome`
2. Faça commit: `git commit -m "feat: descrição"`
3. Push: `git push origin feature/nome`
4. Abra um Pull Request

## Licença

Proprietária - StudyAI © 2024