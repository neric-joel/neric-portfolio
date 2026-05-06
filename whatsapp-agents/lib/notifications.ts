import notifier from 'node-notifier';

export function notifyAgentDone(agentName: string, preview: string): void {
  try {
    notifier.notify({ title: agentName + ' finished', message: preview.slice(0, 140) });
  } catch {}
}
