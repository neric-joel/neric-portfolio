export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AgentAdapter {
  stream(systemPrompt: string, history: ChatMessage[], userContent: string): AsyncGenerator<string>;
}
