export function parseMentions(text: string): string[] {
  return [...new Set([...text.matchAll(/@(\w+)/g)].map((match) => match[1].toLowerCase()))];
}
