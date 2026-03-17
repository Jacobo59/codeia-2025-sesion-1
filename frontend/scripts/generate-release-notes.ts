#!/usr/bin/env tsx
// @ts-nocheck
/**
 * Genera release notes a partir de mensajes de commit.
 *
 * Uso:
 *   npx tsx scripts/generate-release-notes.ts --from v1.0.0 --to v2.0.0
 *   npx tsx scripts/generate-release-notes.ts --since "1 week ago"
 *   npx tsx scripts/generate-release-notes.ts --tag v2.0.0
 */

import { execSync } from 'child_process';

interface Commit {
  hash: string;
  message: string;
  author: string;
  date: string;
}

interface ReleaseNoteSection {
  type: 'Added' | 'Changed' | 'Fixed' | 'Deprecated' | 'Removed' | 'Security';
  commits: string[];
}

interface ReleaseNotes {
  version?: string;
  date: string;
  sections: ReleaseNoteSection[];
}

function getCommits(from?: string, to?: string): Commit[] {
  try {
    let range = '';
    if (from && to) {
      range = `${from}..${to}`;
    } else if (from) {
      range = `${from}..HEAD`;
    }

    const gitCmd = range
      ? `git log ${range} --pretty=format:"%H|%s|%an|%ad" --date=short`
      : `git log --pretty=format:"%H|%s|%an|%ad" --date=short`;

    const output = execSync(gitCmd, { encoding: 'utf-8' });

    return output.split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        const [hash, message, author, date] = line.split('|');
        return { hash, message, author, date };
      });
  } catch (error) {
    console.error('Error al obtener commits:', (error as Error).message);
    return [];
  }
}

function getLatestTag(): string | null {
  try {
    return execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}

function parseConventionalCommit(message: string): {
  type: string;
  scope?: string;
  description: string;
  breaking?: boolean;
} | null {
  const conventionalRegex = /^(\w+)(?:\(([^)]+)\))?(!)?\s*(.+)$/;
  const match = message.match(conventionalRegex);

  if (!match) return null;

  return {
    type: match[1],
    scope: match[2],
    description: match[4],
    breaking: !!match[3],
  };
}

function categorizeCommits(commits: Commit[]): ReleaseNoteSection[] {
  const sections: Map<string, string[]> = new Map([
    ['Added', []],
    ['Changed', []],
    ['Fixed', []],
    ['Deprecated', []],
    ['Removed', []],
    ['Security', []],
  ]);

  const typeMapping: Record<string, keyof ReleaseNoteSection['type']> = {
    feat: 'Added',
    fix: 'Fixed',
    perf: 'Changed',
    refactor: 'Changed',
    style: 'Changed',
    chore: 'Changed',
    docs: 'Changed',
    test: 'Changed',
    ci: 'Changed',
    build: 'Changed',
    revert: 'Fixed',
    deprecate: 'Deprecated',
    remove: 'Removed',
    security: 'Security',
  };

  for (const commit of commits) {
    const parsed = parseConventionalCommit(commit.message);

    if (parsed) {
      const sectionType = typeMapping[parsed.type] || 'Changed';
      const description = parsed.scope
        ? `**${parsed.scope}:** ${parsed.description}`
        : parsed.description;

      sections.get(sectionType)?.push(description);

      if (parsed.breaking) {
        sections.get('Removed')?.push(`**BREAKING:** ${parsed.description}`);
      }
    } else {
      // Para commits no convencionales, inferir del contenido
      const lowerMessage = commit.message.toLowerCase();
      if (lowerMessage.includes('add ') || lowerMessage.includes('new ')) {
        sections.get('Added')?.push(commit.message);
      } else if (lowerMessage.includes('fix') || lowerMessage.includes('bug') || lowerMessage.includes('error')) {
        sections.get('Fixed')?.push(commit.message);
      } else if (lowerMessage.includes('remove') || lowerMessage.includes('delete')) {
        sections.get('Removed')?.push(commit.message);
      } else if (lowerMessage.includes('security') || lowerMessage.includes('vulnerability')) {
        sections.get('Security')?.push(commit.message);
      } else {
        sections.get('Changed')?.push(commit.message);
      }
    }
  }

  // Filtrar secciones vacías
  const result: ReleaseNoteSection[] = [];
  for (const [type, commits] of sections) {
    if (commits.length > 0) {
      result.push({ type: type as ReleaseNoteSection['type'], commits });
    }
  }

  return result;
}

function generateReleaseNotes(commits: Commit[], version?: string): ReleaseNotes {
  const sections = categorizeCommits(commits);
  const latestDate = commits[0]?.date || new Date().toISOString().split('T')[0];

  return {
    version,
    date: latestDate,
    sections,
  };
}

function formatReleaseNotes(notes: ReleaseNotes): string {
  let output = '';

  if (notes.version) {
    output += `## [${notes.version}] - ${notes.date}\n\n`;
  } else {
    output += `## Unreleased - ${notes.date}\n\n`;
  }

  for (const section of notes.sections) {
    if (section.commits.length === 0) continue;

    output += `### ${section.type}\n\n`;

    for (const commit of section.commits) {
      output += `- ${commit}\n`;
    }

    output += '\n';
  }

  return output;
}

// CLI
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Genera release notes a partir de mensajes de commit.

Uso:
  npx tsx scripts/generate-release-notes.ts --from v1.0.0 --to v2.0.0
  npx tsx scripts/generate-release-notes.ts --since v1.0.0
  npx tsx scripts/generate-release-notes.ts --tag v2.0.0
  npx tsx scripts/generate-release-notes.ts                    # Última tag a HEAD

Opciones:
  --from TAG         Commits desde esta tag
  --to TAG           Commits hasta esta tag (default: HEAD)
  --since TAG        Sinónimo de --from
  --tag TAG          Genera notas para una versión específica
  --format md|json   Formato de salida (default: md)
  --help             Muestra esta ayuda
`);
  process.exit(0);
}

let from: string | undefined;
let to = 'HEAD';
let version: string | undefined;
let format = 'md';

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--from':
    case '--since':
      from = args[++i];
      break;
    case '--to':
      to = args[++i];
      break;
    case '--tag':
      version = args[++i];
      from = version;
      break;
    case '--format':
      format = args[++i];
      break;
  }
}

if (!from) {
  from = getLatestTag() || undefined;
}

const commits = getCommits(from, to);

if (commits.length === 0) {
  console.log('No se encontraron commits en el rango especificado.');
  process.exit(0);
}

const notes = generateReleaseNotes(commits, version);

if (format === 'json') {
  console.log(JSON.stringify(notes, null, 2));
} else {
  console.log(formatReleaseNotes(notes));
}

console.log(`\nTotal commits: ${commits.length}`);
console.log(`Autores: ${new Set(commits.map((c) => c.author)).size}`);
