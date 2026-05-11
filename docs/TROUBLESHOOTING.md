# Troubleshooting

Guia de solução de problemas comuns no StudyAI.

## Índice

- [Problemas de Instalação](#problemas-de-instalação)
- [Problemas de Banco de Dados](#problemas-de-banco-de-dados)
- [Problemas de Autenticação](#problemas-de-autenticação)
- [Problemas de API](#problemas-de-api)
- [Problemas de Frontend](#problemas-de-frontend)
- [Problemas de Deploy](#problemas-de-deploy)
- [Problemas de IA](#problemas-de-ia)

---

## Problemas de Instalação

### Erro: "Cannot find module"

**Causa:** Dependências não instaladas corretamente.

**Solução:**
```bash
# Limpar cache
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

# Reinstalar
pnpm install
```

### Erro: "pnpm: command not found"

**Causa:** pnpm não instalado globalmente.

**Solução:**
```bash
npm install -g pnpm
```

### Erro: "Node version mismatch"

**Causa:** Versão do Node.js incompatível.

**Solução:**
```bash
# Verificar versão
node --version  # Deve ser >= 20.0.0

# Usar nvm para trocar versão
nvm install 20
nvm use 20
```

---

## Problemas de Banco de Dados

### Erro: "Connection refused"

**Causa:** PostgreSQL não está rodando.

**Solução:**
```bash
# Verificar se o container está rodando
docker ps

# Se não estiver, iniciar
docker-compose up -d postgres

# Verificar logs
docker-compose logs postgres
```

### Erro: "Database does not exist"

**Causa:** Banco de dados não criado.

**Solução:**
```bash
# Criar banco
docker-compose exec postgres createdb -U studyai studyai

# Ou recriar tudo
docker-compose down -v
docker-compose up -d
```

### Erro: "Migration failed"

**Causa:** Migração inconsistente.

**Solução:**
```bash
# Resetar banco (CUIDADO: apaga todos os dados)
pnpm db:reset

# Ou recriar migrações
rm -rf packages/db/drizzle/migrations
pnpm db:generate
pnpm db:migrate
```

### Erro: "Drizzle Studio não abre"

**Causa:** Porta em uso ou problema de conexão.

**Solução:**
```bash
# Verificar se a porta 4983 está livre
lsof -i :4983

# Matar processo se necessário
kill -9 <PID>

# Tentar novamente
pnpm db:studio
```

---

## Problemas de Autenticação

### Erro: "Invalid token"

**Causa:** Token JWT expirado ou inválido.

**Solução:**
1. Faça logout e login novamente
2. Verifique se as chaves do Clerk estão corretas no `.env`
3. Limpe o localStorage do navegador

### Erro: "User not found"

**Causa:** Webhook do Clerk não configurado.

**Solução:**
1. Verifique a URL do webhook: `http://localhost:3000/api/v1/webhooks/clerk`
2. Verifique o secret do webhook no `.env`
3. Use ngrok para testar webhooks localmente:
   ```bash
   ngrok http 3000
   ```

### Erro: "CORS error"

**Causa:** Configuração de CORS incorreta.

**Solução:**
```typescript
// apps/api/src/index.ts
app.use(cors({
  origin: process.env.APP_URL || 'http://localhost:5173',
  credentials: true
}));
```

---

## Problemas de API

### Erro: "Port already in use"

**Causa:** Outro processo usando a porta 3000.

**Solução:**
```bash
# Encontrar processo
lsof -i :3000

# Matar processo
kill -9 <PID>

# Ou usar outra porta
PORT=3001 pnpm dev
```

### Erro: "Rate limit exceeded"

**Causa:** Muitas requisições em pouco tempo.

**Solução:**
1. Aguarde alguns segundos
2. Verifique se não há loops infinitos no código
3. Ajuste os limites em `apps/api/src/middleware/rateLimit.ts`

### Erro: "500 Internal Server Error"

**Causa:** Erro não tratado no servidor.

**Solução:**
1. Verifique os logs:
   ```bash
   pnpm --filter @studyai/api dev
   ```
2. Verifique se todas as variáveis de ambiente estão configuradas
3. Verifique a conexão com o banco de dados

---

## Problemas de Frontend

### Erro: "Module not found"

**Causa:** Import incorreto ou arquivo não existe.

**Solução:**
```bash
# Verificar imports
pnpm --filter @studyai/web typecheck

# Limpar cache do Vite
rm -rf apps/web/node_modules/.vite
```

### Erro: "Hydration failed"

**Causa:** Diferença entre SSR e cliente.

**Solução:**
1. Verifique se há uso de `window` ou `document` sem verificação
2. Use `useEffect` para código que roda apenas no cliente:
   ```typescript
   useEffect(() => {
     // código do cliente
   }, []);
   ```

### Estilos não aplicam

**Causa:** Tailwind não compilando.

**Solução:**
```bash
# Rebuild do Tailwind
pnpm --filter @studyai/web build:css

# Verificar configuração do Tailwind
# apps/web/tailwind.config.js
```

### Componentes do shadcn/ui não funcionam

**Causa:** Componente não instalado corretamente.

**Solução:**
```bash
# Reinstalar componente
npx shadcn add button

# Verificar se o cn() está importado corretamente
import { cn } from "@/lib/utils";
```

---

## Problemas de Deploy

### Erro: "Build failed"

**Causa:** Erro de compilação.

**Solução:**
```bash
# Verificar erros de TypeScript
pnpm typecheck

# Verificar erros de lint
pnpm lint

# Tentar build local
pnpm build
```

### Erro: "Cannot find module" no Railway

**Causa:** Dependências não instaladas no deploy.

**Solução:**
1. Verifique se o `pnpm-lock.yaml` está no git
2. Adicione ao `railway.toml`:
   ```toml
   [build]
   builder = "NIXPACKS"
   ```

### Erro: "Database connection failed"

**Causa:** URL do banco incorreta.

**Solução:**
1. Verifique a variável `DATABASE_URL` no Railway
2. Certifique-se de que o PostgreSQL está provisionado
3. Verifique se a URL está no formato correto:
   ```
   postgresql://user:password@host:port/database
   ```

### Health check falha

**Causa:** Endpoint de health check não responde.

**Solução:**
1. Verifique se o servidor está rodando
2. Confirme que o endpoint `/api/v1/health` existe
3. Verifique os logs do Railway

---

## Problemas de IA

### Erro: "OpenRouter API key invalid"

**Causa:** Chave da API incorreta.

**Solução:**
1. Verifique a variável `OPENROUTER_API_KEY`
2. Gere uma nova chave em https://openrouter.ai
3. Verifique se há créditos na conta

### Erro: "Model not available"

**Causa:** Modelo indisponível ou sem créditos.

**Solução:**
1. Tente outro modelo
2. Verifique o status em https://openrouter.ai/docs
3. Verifique se há créditos suficientes

### Respostas muito lentas

**Causa:** Modelo sobrecarregado.

**Solução:**
1. Use um modelo mais rápido (ex: GPT-3.5-turbo)
2. Implemente timeout no cliente:
   ```typescript
   const response = await fetch(url, {
     signal: AbortSignal.timeout(30000)
   });
   ```

### Cache não funciona

**Causa:** Redis não configurado.

**Solução:**
```bash
# Verificar se o Redis está rodando
docker ps | grep redis

# Verificar a variável REDIS_URL
# Deve ser: redis://localhost:6379
```

---

## Problemas de Stripe

### Erro: "Invalid API key"

**Causa:** Chave do Stripe incorreta.

**Solução:**
1. Verifique se está usando a chave correta (test vs live)
2. Verifique as variáveis `STRIPE_SECRET_KEY` e `STRIPE_PUBLISHABLE_KEY`

### Webhook não funciona

**Causa:** URL do webhook incorreta ou secret errado.

**Solução:**
1. Verifique a URL do webhook no dashboard do Stripe
2. Verifique o `STRIPE_WEBHOOK_SECRET`
3. Para testar localmente, use Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/v1/webhooks/stripe
   ```

---

## Ferramentas de Debug

### Verificar Logs

```bash
# Logs da API
pnpm --filter @studyai/api logs

# Logs do Web
pnpm --filter @studyai/web logs

# Logs do Railway
railway logs --service api
```

### Verificar Variáveis de Ambiente

```bash
# Listar todas
printenv | grep STUDYAI

# Verificar específica
echo $DATABASE_URL
```

### Testar API

```bash
# Health check
curl http://localhost:3000/api/v1/health

# Com autenticação
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/v1/auth/me
```

### Debug no VS Code

Adicione ao `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug API",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["--filter", "@studyai/api", "dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

---

## Ainda com Problemas?

1. Verifique se há issues similares no GitHub
2. Pergunte na comunidade Discord
3. Abra uma issue com:
   - Descrição detalhada do problema
   - Passos para reproduzir
   - Logs de erro
   - Ambiente (OS, versões, etc.)
