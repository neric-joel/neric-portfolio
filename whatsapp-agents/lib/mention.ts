export function parseMentions(text: string): string[] {
  return [...text.matchAll(/@(\w+)/g)].map((match) => match[1].toLowerCase());
}
