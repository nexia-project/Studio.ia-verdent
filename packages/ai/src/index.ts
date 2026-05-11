export { createCompletion, streamCompletion, callLLM, openai } from './openrouter';
export type { ChatMessage, ToolCall, CompletionOptions, ToolDefinition } from './openrouter';
export { tools, toolExecutors, executeTool } from './tools';
export * from './config';
export * from './prompts/tiagao-aula-ativa';
export * from './prompts/modulo-fazedores';