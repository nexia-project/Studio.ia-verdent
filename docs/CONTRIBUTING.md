# Guia de Contribuição

Obrigado por seu interesse em contribuir com o StudyAI! Este guia irá ajudá-lo a começar.

## Código de Conduta

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

## Como Contribuir

### Reportando Bugs

1. Verifique se o bug já não foi reportado
2. Abra uma issue com o template de bug
3. Inclua:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Ambiente (OS, navegador, etc.)

### Sugerindo Features

1. Abra uma issue com o label `enhancement`
2. Descreva a feature e seu valor
3. Discuta implementação com a comunidade

### Pull Requests

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nome-da-feature`
3. Faça suas alterações
4. Execute os testes: `pnpm test`
5. Commit com mensagens claras
6. Push para seu fork
7. Abra um PR descrevendo as mudanças

## Setup de Desenvolvimento

### Pré-requisitos

- Node.js 20+
- pnpm 9+
- Docker e Docker Compose
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/studyai.git
cd studyai

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Inicie os serviços locais
docker-compose up -d

# Execute as migrações
pnpm db:migrate

# Popule o banco com dados iniciais
pnpm db:seed

# Inicie o desenvolvimento
pnpm dev
```

## Estrutura do Projeto

```
/
├── apps/
│   ├── api/           # Backend Express
│   ├── web/           # Frontend React
│   └── mobile/        # App React Native
├── packages/
│   ├── types/         # Tipos TypeScript
│   ├── db/            # Drizzle ORM
│   ├── ai/            # Client OpenRouter
│   ├── sdk/           # Client HTTP
│   └── config/        # Configurações
└── docs/              # Documentação
```

## Convenções de Código

### TypeScript

- Use tipos explícitos
- Evite `any`
- Use interfaces para objetos complexos
- Documente funções públicas

```typescript
// Bom
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): Promise<User> {
  // ...
}

// Evite
function getUser(id: any): any {
  // ...
}
```

### Componentes React

- Use function components
- Props tipadas
- Nome em PascalCase

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  // ...
}
```

### Commits

Use conventional commits:

```
feat: adicionar nova feature
fix: corrigir bug
docs: atualizar documentação
style: mudanças de formatação
refactor: refatoração de código
test: adicionar testes
chore: tarefas de build/config
```

## Testes

### Executar Testes

```bash
# Todos os testes
pnpm test

# Testes de um pacote específico
pnpm --filter @studyai/api test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### Escrevendo Testes

```typescript
import { describe, it, expect } from 'vitest';
import { sum } from './math';

describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

## Banco de Dados

### Migrações

```bash
# Gerar migração
pnpm db:generate

# Executar migrações
pnpm db:migrate

# Abrir Drizzle Studio
pnpm db:studio
```

### Seeds

Adicione seeds em `packages/db/src/seeds/`:

```typescript
export async function seedUsers(db: Database) {
  await db.insert(users).values([
    { name: 'Admin', email: 'admin@studyai.com' },
  ]);
}
```

## Estilo de Código

O projeto usa:
- **ESLint**: Linting
- **Prettier**: Formatação
- **Husky**: Git hooks

```bash
# Formatar código
pnpm format

# Verificar lint
pnpm lint

# Corrigir problemas de lint
pnpm lint:fix
```

## Documentação

- Atualize a documentação quando necessário
- Use JSDoc para funções complexas
- Mantenha o README.md atualizado

## Revisão de Código

Todos os PRs precisam de:
- 1 aprovação de mantenedor
- CI passando
- Sem conflitos com a branch principal

## Dúvidas?

- Abra uma issue com o label `question`
- Entre em contato: contato@studyai.com

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.
