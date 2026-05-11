# Deploy no Railway

Este guia explica como fazer deploy da plataforma StudyAI no Railway.

## Pré-requisitos

1. Conta no [Railway](https://railway.app)
2. CLI do Railway instalado:
   ```bash
   npm install -g @railway/cli
   ```
3. Acesso ao repositório GitHub

## Configuração Inicial

### 1. Login no Railway

```bash
railway login
```

### 2. Linkar o Projeto

```bash
railway link
```

Selecione o projeto StudyAI existente ou crie um novo.

### 3. Configurar Variáveis de Ambiente

No dashboard do Railway, configure as seguintes variáveis:

#### API (`apps/api`)
```env
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PREMIUM=price_...
OPENROUTER_API_KEY=sk-or-...
RESEND_API_KEY=re_...
APP_URL=https://studyai-web.up.railway.app
API_URL=https://studyai-api.up.railway.app
```

#### Web (`apps/web`)
```env
NODE_ENV=production
VITE_API_URL=https://studyai-api.up.railway.app
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
```

## Deploy

### Deploy Automático (Recomendado)

O Railway faz deploy automático a cada push na branch `main`.

### Deploy Manual

```bash
# Deploy da API
railway up --service api

# Deploy do Web
railway up --service web
```

## Serviços Necessários

### 1. PostgreSQL

No dashboard do Railway:
1. Clique em "New"
2. Selecione "Database" → "Add PostgreSQL"
3. O Railway criará automaticamente a variável `DATABASE_URL`

### 2. Redis

1. Clique em "New"
2. Selecione "Database" → "Add Redis"
3. O Railway criará automaticamente a variável `REDIS_URL`

## Migrações

Após o primeiro deploy, execute as migrações:

```bash
railway run --service api pnpm db:migrate
```

## Seeds

Para popular o banco com dados iniciais:

```bash
railway run --service api pnpm db:seed
```

## Domínios Personalizados

### API
1. No dashboard, selecione o serviço `api`
2. Vá em "Settings" → "Domains"
3. Clique em "Generate Domain" ou adicione um domínio personalizado

### Web
1. No dashboard, selecione o serviço `web`
2. Vá em "Settings" → "Domains"
3. Clique em "Generate Domain" ou adicione um domínio personalizado

## Health Checks

- **API**: `GET /api/v1/health`
- **Web**: `GET /`

## Monitoramento

O Railway fornece:
- Logs em tempo real
- Métricas de uso (CPU, memória, disco)
- Alertas configuráveis

### Verificar Logs

```bash
railway logs --service api
railway logs --service web
```

## Rollback

Em caso de problemas, você pode fazer rollback para uma versão anterior:

1. No dashboard do Railway, vá em "Deployments"
2. Selecione a versão desejada
3. Clique em "Redeploy"

## Troubleshooting

### Erro: "Cannot find module"

Limpe o cache e reinstale:
```bash
railway run --service api pnpm install
```

### Erro de conexão com banco

Verifique se a variável `DATABASE_URL` está configurada corretamente.

### Build falhando

Verifique os logs de build:
```bash
railway logs --service api --deployment <id>
```

## Configuração de Webhooks

### Clerk Webhook

URL: `https://studyai-api.up.railway.app/api/v1/webhooks/clerk`

### Stripe Webhook

URL: `https://studyai-api.up.railway.app/api/v1/webhooks/stripe`

Eventos necessários:
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.deleted`

## Escalabilidade

Para escalar horizontalmente:

1. No dashboard, selecione o serviço
2. Vá em "Settings" → "Scaling"
3. Ajuste o número de réplicas

## Custos

O Railway cobra baseado em:
- Uso de CPU/hora
- Uso de memória/hora
- Uso de rede
- Armazenamento de dados

Consulte [railway.app/pricing](https://railway.app/pricing) para mais detalhes.
