import OpenAI from 'openai';
import type { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources/chat/completions';
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
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
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
    parameters: Record<string, unknown>;
  };
}

export async function createCompletion(options: CompletionOptions) {
  const response = await openai.chat.completions.create({
    model: options.model,
    messages: options.messages as ChatCompletionMessageParam[],
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens,
    tools: options.tools as ChatCompletionTool[] | undefined,
    stream: options.stream ?? false,
  });

  return response;
}

export async function* streamCompletion(options: CompletionOptions) {
  const stream = await openai.chat.completions.create({
    model: options.model,
    messages: options.messages as ChatCompletionMessageParam[],
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens,
    tools: options.tools as ChatCompletionTool[] | undefined,
    stream: true,
  });

  for await (const chunk of stream) {
    yield chunk;
  }
}

export async function callLLM({ 
  system, 
  messages 
}: { 
  system: string; 
  messages: Array<{ role: string; content: string }> 
}): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'openai/gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      ...messages,
    ] as ChatCompletionMessageParam[],
  });
  return response.choices[0]?.message?.content ?? '';
}

export { openai };
