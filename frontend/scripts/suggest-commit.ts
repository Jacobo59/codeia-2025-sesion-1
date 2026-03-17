#!/usr/bin/env tsx
// @ts-nocheck
/**
 * Sugiere nombres de commits para los cambios descritos en este diff.
 *
 * Uso:
 *   npx tsx scripts/suggest-commit.ts                    # Diff del staging
 *   npx tsx scripts/suggest-commit.ts --file app.tsx      # Diff de un archivo
 *   npx tsx scripts/suggest-commit.ts --unstaged           # Diff no stagged
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';

interface Diff {
  file: string;
  content: string;
  type: 'added' | 'modified' | 'deleted' | 'renamed';
}

function getGitDiff(args: string[]): string {
  try {
    const gitArgs = args.includes('--unstaged') ? 'diff' : 'diff --staged';
    return execSync(`git ${gitArgs}`, { encoding: 'utf-8' });
  } catch (error) {
    if (args.includes('--unstaged')) {
      return execSync('git diff', { encoding: 'utf-8' });
    }
    throw error;
  }
}

function parseDiff(diffContent: string): Diff[] {
  const diffs: Diff[] = [];
  const lines = diffContent.split('\n');
  let currentDiff: Partial<Diff> | null = null;

  for (const line of lines) {
    const newFileMatch = line.match(/^diff --git a\/(.+) b\/(.+)/);
    if (newFileMatch) {
      if (currentDiff) {
        diffs.push(currentDiff as Diff);
      }
      const file = newFileMatch[2];
      currentDiff = { file, content: '', type: 'modified' };

      const newFileMarker = lines.indexOf(line) + 1;
      const nextLine = lines[newFileMarker] || '';

      if (nextLine.includes('new file')) {
        currentDiff.type = 'added';
      } else if (nextLine.includes('deleted')) {
        currentDiff.type = 'deleted';
      } else if (nextLine.includes('renamed')) {
        currentDiff.type = 'renamed';
      }
    } else if (currentDiff) {
      currentDiff.content += line + '\n';
    }
  }

  if (currentDiff) {
    diffs.push(currentDiff as Diff);
  }

  return diffs;
}

function analyzeDiff(diff: Diff): {
  category: 'feat' | 'fix' | 'refactor' | 'style' | 'docs' | 'test' | 'chore';
  description: string;
  scope?: string;
} {
  const { file, type, content } = diff;
  const extension = file.split('.').pop();
  const pathParts = file.split('/');
  const componentName = pathParts[pathParts.length - 1]?.replace(/\.(tsx?|jsx?)$/, '');

  // Detectar categoría
  let category: DiffCategory = 'feat';

  if (type === 'deleted') {
    category = 'refactor';
  } else if (content.includes('TODO') || content.includes('FIXME')) {
    category = 'chore';
  } else if (content.includes('.test.') || content.includes('.spec.')) {
    category = 'test';
  } else if (extension === 'md') {
    category = 'docs';
  } else if (content.includes('className') && !content.includes('function')) {
    category = 'style';
  } else if (
    content.includes('fix') ||
    content.includes('error') ||
    content.includes('bug') ||
    content.includes('correc')
  ) {
    category = 'fix';
  } else if (
    content.includes('refactor') ||
    content.includes('extract') ||
    content.includes('simplify')
  ) {
    category = 'refactor';
  } else if (content.includes('add ') || content.includes('new ')) {
    category = 'feat';
  }

  // Detectar scope
  let scope: string | undefined;
  if (file.includes('/components/')) {
    scope = 'components';
  } else if (file.includes('/pages/')) {
    scope = 'pages';
  } else if (file.includes('/hooks/')) {
    scope = 'hooks';
  } else if (file.includes('/utils/')) {
    scope = 'utils';
  } else if (file.includes('/api/')) {
    scope = 'api';
  } else if (file.includes('/layout/')) {
    scope = 'layout';
  }

  // Generar descripción
  const addedLines = content.split('\n').filter((l) => l.startsWith('+')).length;
  const removedLines = content.split('\n').filter((l) => l.startsWith('-')).length;

  let description: string;

  if (type === 'added') {
    description = `add ${componentName} ${componentName ? '' : extension} ${file}`;
  } else if (type === 'deleted') {
    description = `remove ${file}`;
  } else if (type === 'renamed') {
    description = `rename ${file}`;
  } else {
    const changes = addedLines + removedLines;
    if (changes < 10) {
      description = `update ${componentName || file}`;
    } else if (addedLines > removedLines * 2) {
      description = `enhance ${componentName || file}`;
    } else if (removedLines > addedLines * 2) {
      description = `simplify ${componentName || file}`;
    } else {
      description = `modify ${componentName || file}`;
    }
  }

  return { category, description, scope };
}

type DiffCategory = 'feat' | 'fix' | 'refactor' | 'style' | 'docs' | 'test' | 'chore';

function suggestCommitMessage(diffs: Diff[]): string[] {
  const suggestions: string[] = [];

  if (diffs.length === 0) {
    return ['docs: update README', 'chore: minor tweaks'];
  }

  if (diffs.length === 1) {
    const analysis = analyzeDiff(diffs[0]);
    const scope = analysis.scope ? `(${analysis.scope}): ` : ': ';
    suggestions.push(`${analysis.category}${scope}${analysis.description}`);
  } else {
    // Agrupar por categoría
    const byCategory = new Map<DiffCategory, Diff[]>();
    for (const diff of diffs) {
      const analysis = analyzeDiff(diff);
      if (!byCategory.has(analysis.category)) {
        byCategory.set(analysis.category, []);
      }
      byCategory.get(analysis.category)!.push(diff);
    }

    for (const [category, categoryDiffs] of byCategory) {
      const scopes = new Set<string>();
      for (const diff of categoryDiffs) {
        const analysis = analyzeDiff(diff);
        if (analysis.scope) scopes.add(analysis.scope);
      }

      const scopeStr = scopes.size > 0 ? `(${Array.from(scopes).join(',')})` : '';
      const desc = categoryDiffs.length === 1
        ? analyzeDiff(categoryDiffs[0]).description
        : `multiple ${categoryDiffs.length} ${categoryDiffs.length > 1 ? 'files' : 'file'}`;

      suggestions.push(`${category}${scopeStr}: ${desc}`);
    }

    // Commit consolidado
    const categories = Array.from(byCategory.keys());
    const primaryCategory = categories.find((c) => c === 'feat' || c === 'fix') || categories[0];
    suggestions.push(`${primaryCategory}: update ${diffs.length} files`);
  }

  return suggestions;
}

// CLI
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Sugiere nombres de commits para los cambios descritos en este diff.

Uso:
  npx tsx scripts/suggest-commit.ts                    # Diff del staging
  npx tsx scripts/suggest-commit.ts --file app.tsx      # Diff de un archivo específico
  npx tsx scripts/suggest-commit.ts --unstaged           # Diff no stagged
  npx tsx scripts/suggest-commit.ts --help               # Muestra esta ayuda
`);
  process.exit(0);
}

let diffContent: string;

if (args.includes('--file')) {
  const fileIndex = args.indexOf('--file');
  const filePath = args[fileIndex + 1];
  try {
    diffContent = execSync(`git diff --staged -- "${filePath}"`, { encoding: 'utf-8' });
    if (!diffContent) {
      diffContent = execSync(`git diff -- "${filePath}"`, { encoding: 'utf-8' });
    }
  } catch {
    console.log(`No se encontró el archivo o no hay cambios: ${filePath}`);
    process.exit(0);
  }
} else {
  diffContent = getGitDiff(args);
}

if (!diffContent.trim()) {
  console.log('No hay cambios para analizar.');
  console.log('');
  console.log('Sugerencias para commits comunes:');
  console.log('  chore: update dependencies');
  console.log('  docs: update README');
  console.log('  style: code formatting');
  process.exit(0);
}

const diffs = parseDiff(diffContent);
const suggestions = suggestCommitMessage(diffs);

console.log('Sugerencias de mensaje de commit:');
console.log('');
for (const suggestion of suggestions) {
  console.log(`  ${suggestion}`);
}
console.log('');
console.log(`Analizados: ${diffs.length} archivo(s) cambiado(s)`);
