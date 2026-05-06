import notifier from 'node-notifier';

export function notifyAgentDone(agentName: string, preview: string | undefined): void {
  try {
    notifier.notify({
      title: `${agentName} finished`,
      message: (preview ?? '').slice(0, 140) || '(no response)',
    });
  } catch {
    // Best-effort desktop notification.
  }
}
