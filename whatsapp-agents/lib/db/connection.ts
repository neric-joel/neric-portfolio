import Database from 'better-sqlite3';
import fs from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

let _db: Database.Database | null = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

function initDb(db: Database.Database): void {
  const schemaPath = join(__dirname, 'schema.sql');
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
}

export function getDb(): Database.Database {
  if (!_db) {
    const configuredDbPath = process.env.SQLITE_DB_PATH ?? './data/whatsapp-agents.sqlite';
    const dbPath = isAbsolute(configuredDbPath)
      ? configuredDbPath
      : resolve(/* turbopackIgnore: true */ process.cwd(), configuredDbPath);
    fs.mkdirSync(dirname(dbPath), { recursive: true });

    _db = new Database(dbPath);
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
    initDb(_db);
  }

  return _db;
}

export function closeDb(): void {
  if (_db) {
    _db.close();
    _db = null;
  }
}
