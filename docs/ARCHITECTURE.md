# Arquitetura StudyAI

## Visão Geral

StudyAI é uma aplicação full-stack construída como monorepo com as seguintes camadas:

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Web (Vite) │  │Mobile (Expo)│  │    Landing Page     │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
└─────────┼────────────────┼────────────────────┼────────────┘
          │                │                    │
          └────────────────┴────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  SDK HTTP   │
                    └──────┬──────┘
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                     API Layer                             │
│  ┌───────────────────────┼──────────────────────────────┐ │
│  │                   Express 5                           │ │
│  │  ┌─────────┐ ┌────────┴────────┐ ┌────────────────┐ │ │
│  │  │  Auth   │ │  Business Logic │ │   Webhooks     │ │ │
│  │  │(Clerk)  │ │   (Services)    │ │(Stripe/Clerk)  │ │ │
│  │  └────┬────┘ └────────┬────────┘ └────────────────┘ │ │
│  └───────┼───────────────┼─────────────────────────────┘ │
└──────────┼───────────────┼─────────────────────────────────┘
           │               │
    ┌──────┴──────┐ ┌──────▼──────┐
    │  PostgreSQL │ │    Redis    │
    │  (Drizzle)  │ │   (Cache)   │
    └─────────────┘ └─────────────┘
```

## Componentes Principais

### 1. Monorepo Structure

- **pnpm workspaces**: Gerenciamento de dependências compartilhadas
- **Turbo**: Pipeline de builds paralelos e cache

### 2. Packages

#### @studyai/types
- Tipos TypeScript compartilhados entre todos os pacotes
- Enums, interfaces e types de domínio

#### @studyai/db
- Drizzle ORM para PostgreSQL
- Schemas de todas as entidades
- Migrações automáticas

#### @studyai/ai
- Client OpenRouter para múltiplos modelos de IA
- 22 tools do Tiagão implementadas
- Sistema de cache em 4 níveis

#### @studyai/sdk
- Client HTTP tipado para web e mobile
- Abstração da API

### 3. Apps

#### API (apps/api)
- Express 5 com middlewares
- Autenticação via Clerk
- RBAC (Role-Based Access Control)
- Rate limiting com Redis
- Webhooks para Clerk e Stripe

#### Web (apps/web)
- React + Vite
- Tailwind CSS + shadcn/ui
- React Query para data fetching
- Zustand para state management

#### Mobile (apps/mobile)
- Expo + React Native
- Expo Router para navegação
- Paridade de features com web

## Fluxo de Dados

### Autenticação
1. Usuário faz login via Clerk
2. Clerk gera JWT token
3. Token é enviado em todas as requisições
4. Middleware valida token e carrega usuário
5. RBAC verifica permissões

### Tutor IA (Tiagão)
1. Usuário envia mensagem
2. Sistema busca memória do usuário
3. Model router escolhe modelo adequado
4. Cache é verificado (4 níveis)
5. Se não em cache, chama OpenRouter
6. Resposta é salva no cache
7. Stream é enviado ao usuário

### Processamento de Documentos
1. Upload via UploadThing/S3
2. Fila BullMQ processa arquivo
3. OCR/extração de texto
4. IA resume e extrai pontos-chave
5. Resultado salvo no banco

## Segurança

- Helmet.js para headers de segurança
- CORS configurado
- Rate limiting por IP e usuário
- Validação de inputs com Zod
- SQL injection protection via Drizzle
- XSS protection via React

## Escalabilidade

- Stateless API (horizontal scaling)
- Redis para cache e sessões
- PostgreSQL com índices otimizados
- CDN para assets estáticos
- BullMQ para jobs assíncronos

## Monitoramento

- Logs estruturados
- Health check endpoint
- Error tracking (Sentry)
- Métricas de uso de IA