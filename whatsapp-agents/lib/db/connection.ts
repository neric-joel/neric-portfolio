import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

let db: Database.Database | null = null;

const defaultAgents = [
  {
    slug: 'claude',
    display_name: 'Claude',
    backend: 'anthropic',
    model: 'claude-sonnet-4-6',
    system_prompt: 'You are Claude, a helpful AI assistant.',
  },
  {
    slug: 'codex',
    display_name: 'Codex',
    backend: 'openai',
    model: 'gpt-4.1',
    system_prompt: 'You are Codex, an expert software engineer.',
  },
  {
    slug: 'antigravity',
    display_name: 'Antigravity',
    backend: 'google',
    model: 'gemini-2.0-flash',
    system_prompt: 'You are Antigravity, a creative problem solver.',
  },
] as const;

export function getDb(): Database.Database {
  if (db) {
    return db;
  }

  const configuredDbPath = process.env.SQLITE_DB_PATH ?? './data/whatsapp-agents.sqlite';
  const dbPath = path.isAbsolute(configuredDbPath)
    ? configuredDbPath
    : path.resolve(/* turbopackIgnore: true */ process.cwd(), configuredDbPath);
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  db = new Database(dbPath);
  db.pragma('foreign_keys = ON');

  const schemaPath = path.join(process.cwd(), 'lib', 'db', 'schema.sql');
  db.exec(fs.readFileSync(schemaPath, 'utf8'));

  const agentCount = db.prepare('SELECT COUNT(*) AS count FROM agents').get() as { count: number };
  if (agentCount.count === 0) {
    const insert = db.prepare(`
      INSERT INTO agents (slug, display_name, backend, model, system_prompt)
      VALUES (@slug, @display_name, @backend, @model, @system_prompt)
    `);

    const seed = db.transaction(() => {
      for (const agent of defaultAgents) {
        insert.run(agent);
      }
    });
    seed();
  }

  return db;
}
