# Documentação da API StudyAI

## Base URL

```
Produção: https://studyai-api.up.railway.app/api/v1
Desenvolvimento: http://localhost:3000/api/v1
```

## Autenticação

Todas as requisições devem incluir o token JWT do Clerk no header:

```
Authorization: Bearer <token>
```

## Endpoints

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-11-11T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

### Autenticação

#### Registro/Login (via Clerk)

O registro e login são gerenciados pelo Clerk. Após autenticação, o webhook cria/atualiza o usuário no banco.

#### Perfil do Usuário

```http
GET /auth/me
```

**Response:**
```json
{
  "id": "user_123",
  "email": "usuario@email.com",
  "name": "João Silva",
  "role": "student",
  "subscription": {
    "status": "active",
    "plan": "premium",
    "expiresAt": "2025-11-11T00:00:00.000Z"
  }
}
```

#### Atualizar Perfil

```http
PATCH /auth/profile
```

**Body:**
```json
{
  "name": "João Silva",
  "bio": "Estudante de Engenharia",
  "avatar": "https://..."
}
```

---

### Usuários (Admin)

#### Listar Usuários

```http
GET /admin/users
```

**Query Params:**
- `page` (number): Página atual
- `limit` (number): Itens por página
- `role` (string): Filtrar por papel
- `search` (string): Busca por nome/email

**Response:**
```json
{
  "users": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

#### Atualizar Usuário

```http
PATCH /admin/users/:id
```

**Body:**
```json
{
  "role": "teacher",
  "subscription": {
    "status": "active",
    "plan": "premium"
  }
}
```

---

### Tutor IA (Tiagão)

#### Enviar Mensagem

```http
POST /ai/chat
```

**Body:**
```json
{
  "message": "Explique a Revolução Francesa",
  "context": {
    "subject": "história",
    "level": "ensino médio"
  },
  "stream": true
}
```

**Response (Stream):**
```
data: {"chunk": "A Revolução Francesa foi..."}
data: {"chunk": "um período de..."}
data: {"done": true}
```

#### Histórico de Conversas

```http
GET /ai/chat/history
```

**Response:**
```json
{
  "conversations": [
    {
      "id": "conv_123",
      "title": "Revolução Francesa",
      "lastMessage": "...",
      "createdAt": "2024-11-10T10:00:00.000Z"
    }
  ]
}
```

#### Ferramentas do Tiagão

```http
POST /ai/tools/:toolName
```

**Ferramentas disponíveis:**
- `generate-questions`: Gera questões de múltipla escolha
- `explain-concept`: Explica um conceito
- `summarize-text`: Resume um texto
- `create-flashcards`: Cria flashcards
- `check-essay`: Corrige uma redação
- `study-plan`: Cria plano de estudos

**Body (exemplo - generate-questions):**
```json
{
  "topic": "Fotossíntese",
  "subject": "biologia",
  "difficulty": "medium",
  "count": 5
}
```

---

### Flashcards

#### Listar Decks

```http
GET /flashcards/decks
```

**Response:**
```json
{
  "decks": [
    {
      "id": "deck_123",
      "title": "Biologia - Fotossíntese",
      "cardCount": 20,
      "dueCards": 5,
      "createdAt": "2024-11-01T00:00:00.000Z"
    }
  ]
}
```

#### Criar Deck

```http
POST /flashcards/decks
```

**Body:**
```json
{
  "title": "História - Revolução Francesa",
  "description": "Principais eventos e personagens",
  "subject": "história",
  "tags": ["revolução", "frança"]
}
```

#### Adicionar Card

```http
POST /flashcards/decks/:deckId/cards
```

**Body:**
```json
{
  "front": "Quando começou a Revolução Francesa?",
  "back": "14 de julho de 1789",
  "difficulty": "easy"
}
```

#### Revisar Card

```http
POST /flashcards/cards/:cardId/review
```

**Body:**
```json
{
  "quality": 4
}
```

`quality`: 0-5 (0 = erro total, 5 = resposta perfeita)

---

### Simulados

#### Listar Simulados

```http
GET /exams
```

**Query Params:**
- `subject` (string): Matéria
- `difficulty` (string): Fácil, médio, difícil
- `status` (string): pending, completed

#### Criar Simulado

```http
POST /exams
```

**Body:**
```json
{
  "title": "Simulado ENEM - Matemática",
  "subject": "matemática",
  "difficulty": "medium",
  "questionCount": 10,
  "timeLimit": 30
}
```

#### Iniciar Simulado

```http
POST /exams/:id/start
```

#### Responder Questão

```http
POST /exams/:id/answer
```

**Body:**
```json
{
  "questionId": "q_123",
  "answer": "B"
}
```

#### Finalizar Simulado

```http
POST /exams/:id/finish
```

**Response:**
```json
{
  "score": 8,
  "totalQuestions": 10,
  "correctAnswers": 8,
  "timeSpent": 1450,
  "performance": {
    "bySubject": {...},
    "byDifficulty": {...}
  }
}
```

---

### Redação

#### Listar Redações

```http
GET /essays
```

#### Enviar Redação

```http
POST /essays
```

**Body:**
```json
{
  "title": "O impacto das redes sociais na sociedade",
  "content": "...",
  "theme": "Tecnologia e Sociedade"
}
```

#### Correção da Redação

```http
GET /essays/:id/correction
```

**Response:**
```json
{
  "score": 680,
  "criteria": {
    "competencia1": 160,
    "competencia2": 160,
    "competencia3": 120,
    "competencia4": 120,
    "competencia5": 120
  },
  "feedback": "...",
  "suggestions": ["..."]
}
```

---

### Caderno Digital

#### Listar Anotações

```http
GET /notes
```

#### Criar Anotação

```http
POST /notes
```

**Body:**
```json
{
  "title": "Aula de Física - Leis de Newton",
  "content": "...",
  "subject": "física",
  "tags": ["mecânica", "newton"]
}
```

#### Upload de Imagem

```http
POST /notes/:id/attachments
```

**Content-Type:** `multipart/form-data`

---

### Turmas (Professor)

#### Listar Turmas

```http
GET /classes
```

#### Criar Turma

```http
POST /classes
```

**Body:**
```json
{
  "name": "3º Ano A",
  "subject": "Matemática",
  "schedule": "Seg/Qua 08:00-09:30"
}
```

#### Adicionar Aluno

```http
POST /classes/:id/students
```

**Body:**
```json
{
  "email": "aluno@email.com"
}
```

---

### Banco de Questões (Professor)

#### Listar Questões

```http
GET /questions
```

#### Criar Questão

```http
POST /questions
```

**Body:**
```json
{
  "type": "multiple_choice",
  "subject": "matemática",
  "difficulty": "medium",
  "statement": "Qual é o valor de x em 2x + 4 = 10?",
  "options": [
    { "letter": "A", "text": "2" },
    { "letter": "B", "text": "3" },
    { "letter": "C", "text": "4" },
    { "letter": "D", "text": "5" }
  ],
  "correctAnswer": "B",
  "explanation": "..."
}
```

---

### Assinaturas

#### Planos Disponíveis

```http
GET /subscriptions/plans
```

#### Criar Checkout

```http
POST /subscriptions/checkout
```

**Body:**
```json
{
  "planId": "price_123",
  "successUrl": "https://...",
  "cancelUrl": "https://..."
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/..."
}
```

#### Cancelar Assinatura

```http
POST /subscriptions/cancel
```

---

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Não autorizado |
| 404 | Recurso não encontrado |
| 409 | Conflito (ex: email já existe) |
| 422 | Validação falhou |
| 429 | Rate limit excedido |
| 500 | Erro interno do servidor |

## Rate Limiting

- **Autenticado**: 100 requisições/minuto
- **Não autenticado**: 20 requisições/minuto
- **AI Chat**: 30 mensagens/minuto

## Webhooks

### Clerk

```http
POST /webhooks/clerk
```

Eventos:
- `user.created`
- `user.updated`
- `user.deleted`

### Stripe

```http
POST /webhooks/stripe
```

Eventos:
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.deleted`
