import OpenAI from 'openai';
import { env } from './config';

const openai = new OpenAI({
  apiKey: env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': env.APP_URL,
    'X-Title': 'StudyAI',
  },
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  tool_calls?: ToolCall[];
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface CompletionOptions {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  tools?: ToolDefinition[];
  stream?: boolean;
}

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: object;
  };
}

export async function createCompletion(options: CompletionOptions) {
  const response = await openai.chat.completions.create({
    model: options.model,
    messages: options.messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens,
    tools: options.tools,
    stream: options.stream ?? false,
  });

  return response;
}

export async function* streamCompletion(options: CompletionOptions) {
  const stream = await openai.chat.completions.create({
    model: options.model,
    messages: options.messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens,
    tools: options.tools,
    stream: true,
  });

  for await (const chunk of stream) {
    yield chunk;
  }
}

export { openai };