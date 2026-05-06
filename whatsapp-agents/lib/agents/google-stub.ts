import type { AgentAdapter } from './types';

export class GoogleStubAdapter implements AgentAdapter {
  async *stream(): AsyncGenerator<string> {
    yield 'Antigravity agent requires a Google API key. Set GOOGLE_API_KEY in .env.local';
  }
}
