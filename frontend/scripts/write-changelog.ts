#!/usr/bin/env tsx
// @ts-nocheck
/**
 * Escribe un CHANGELOG formateado (Markdown) con secciones Added/Changed/Fixed/Deprecated/Removed/Security.
 *
 * Uso:
 *   npx tsx scripts/write-changelog.ts --version v2.0.0          # Genera y actualiza CHANGELOG
 *   npx tsx scripts/write-changelog.ts --dry-run                  # Muestra sin escribir
 *   npx tsx scripts/write-changelog.ts --output RELEASE_NOTES.md  # Archivo de salida
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';

interface Commit {
  hash: string;
  message: string;
  author: string;
  date: string;
}

interface ChangelogSection {
  title: string;
  commits: string[];
}

interface ChangelogEntry {
  version: string;
  date: string;
  sections: ChangelogSection[];
}

const SECTION_ORDER: (keyof typeof SECTION_TITLES)[] = ['Added', 'Changed', 'Fixed', 'Deprecated', 'Removed', 'Security'];

const SECTION_TITLES = {
  Added: '### Added',
  Changed: '### Changed',
  Fixed: '### Fixed',
  Deprecated: '### Deprecated',
  Removed: '### Removed',
  Security: '### Security',
} as const;

const CONVENTIONAL_COMMIT_MAPPING: Record<string, keyof typeof SECTION_TITLES> = {
  feat: 'Added',
  fix: 'Fixed',
  perf: 'Changed',
  refactor: 'Changed',
  style: 'Changed',
  docs: 'Changed',
  test: 'Changed',
  ci: 'Changed',
  build: 'Changed',
  revert: 'Fixed',
  deprecate: 'Deprecated',
  remove: 'Removed',
  security: 'Security',
};

function getCommits(fromTag: string): Commit[] {
  try {
    const output = execSync(
      `git log ${fromTag}..HEAD --pretty=format:"%H|%s|%an|%ad" --date=short`,
      { encoding: 'utf-8' }
    );

    return output
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [hash, message, author, date] = line.split('|');
        return { hash, message, author, date };
      });
  } catch {
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
  breaking: boolean;
  description: string;
} | null {
  const conventionalRegex = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/;
  const match = message.match(conventionalRegex);

  if (!match) return null;

  return {
    type: match[1],
    scope: match[2],
    breaking: !!match[3],
    description: match[4],
  };
}

function categorizeCommit(commit: Commit): keyof typeof SECTION_TITLES | null {
  const parsed = parseConventionalCommit(commit.message);

  if (parsed) {
    if (parsed.breaking) {
      return 'Removed';
    }
    return CONVENTIONAL_COMMIT_MAPPING[parsed.type] || 'Changed';
  }

  // Inferir del contenido del mensaje
  const lower = commit.message.toLowerCase();

  if (lower.includes('security') || lower.includes('vulnerability') || lower.includes('cve')) {
    return 'Security';
  }
  if (lower.includes('deprecate') || lower.includes('obsolete')) {
    return 'Deprecated';
  }
  if (lower.includes('remove') || lower.includes('delete') || lower.includes('drop')) {
    return 'Removed';
  }
  if (lower.includes('add ') || lower.includes('new ') || lower.includes('implement') || lower.includes('feat')) {
    return 'Added';
  }
  if (lower.includes('fix') || lower.includes('bug') || lower.includes('error') || lower.includes('patch')) {
    return 'Fixed';
  }

  return 'Changed';
}

function generateEntry(version: string, commits: Commit[]): ChangelogEntry | null {
  if (commits.length === 0) return null;

  const sections = new Map<keyof typeof SECTION_TITLES, string[]>();

  // Inicializar todas las secciones
  for (const section of SECTION_ORDER) {
    sections.set(section, []);
  }

  let breakingCount = 0;

  for (const commit of commits) {
    const section = categorizeCommit(commit);
    const parsed = parseConventionalCommit(commit.message);

    let description: string;

    if (parsed && parsed.scope) {
      description = `**${parsed.scope}:** ${parsed.description}`;
    } else {
      description = commit.message.replace(/^(\w+)(\([^)]+\))?!?:\s*/, '');
    }

    if (parsed?.breaking) {
      breakingCount++;
      sections.get('Removed')?.push(`**BREAKING CHANGE:** ${description}`);
    } else if (section) {
      sections.get(section)?.push(description);
    }
  }

  // Filtrar secciones vacías
  const resultSections: ChangelogSection[] = [];

  for (const sectionName of SECTION_ORDER) {
    const sectionCommits = sections.get(sectionName);
    if (sectionCommits && sectionCommits.length > 0) {
      resultSections.push({
        title: SECTION_TITLES[sectionName],
        commits: sectionCommits,
      });
    }
  }

  const latestDate = commits[0]?.date || new Date().toISOString().split('T')[0];

  return {
    version,
    date: latestDate,
    sections: resultSections,
  };
}

function formatEntry(entry: ChangelogEntry): string {
  let output = `## [${entry.version}] - ${entry.date}\n\n`;

  for (const section of entry.sections) {
    output += `${section.title}\n\n`;

    for (const commit of section.commits) {
      output += `- ${commit}\n`;
    }

    output += '\n';
  }

  return output;
}

function updateChangelog(newEntry: ChangelogEntry, changelogPath: string): void {
  let changelogContent = '';

  if (existsSync(changelogPath)) {
    changelogContent = readFileSync(changelogPath, 'utf-8');
  } else {
    // Crear un nuevo CHANGELOG con encabezado
    changelogContent = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`;
  }

  const formattedEntry = formatEntry(newEntry);
  const unreleasedIndex = changelogContent.indexOf('## [Unreleased]');

  if (unreleasedIndex !== -1) {
    // Reemplazar o insertar después de Unreleased
    const nextHeaderIndex = changelogContent.indexOf('\n## ', unreleasedIndex + 1);
    if (nextHeaderIndex !== -1) {
      changelogContent =
        changelogContent.substring(0, nextHeaderIndex) + formattedEntry + changelogContent.substring(nextHeaderIndex);
    } else {
      changelogContent += formattedEntry;
    }
  } else {
    // Insertar al principio del contenido (después del encabezado)
    const firstHeaderIndex = changelogContent.indexOf('\n## ');
    if (firstHeaderIndex !== -1) {
      changelogContent =
        changelogContent.substring(0, firstHeaderIndex + 1) + formattedEntry + '\n' + changelogContent.substring(firstHeaderIndex + 1);
    } else {
      changelogContent += '\n' + formattedEntry;
    }
  }

  writeFileSync(changelogPath, changelogContent);
}

// CLI
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Escribe un CHANGELOG formateado (Markdown) con secciones Added/Changed/Fixed/Deprecated/Removed/Security.

Uso:
  npx tsx scripts/write-changelog.ts --version v2.0.0           # Genera y actualiza CHANGELOG
  npx tsx scripts/write-changelog.ts --dry-run                  # Muestra sin escribir
  npx tsx scripts/write-changelog.ts --output RELEASE_NOTES.md  # Archivo de salida

Opciones:
  --version TAG   Versión a generar (required)
  --output FILE   Archivo de salida (default: CHANGELOG.md)
  --dry-run       Muestra el resultado sin escribir el archivo
  --from TAG      Desde qué tag analizar commits (default: última tag)
  --help          Muestra esta ayuda
`);
  process.exit(0);
}

let version: string | undefined;
let outputFile = 'CHANGELOG.md';
let dryRun = false;
let fromTag: string | undefined;

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--version':
      version = args[++i];
      break;
    case '--output':
      outputFile = args[++i];
      break;
    case '--dry-run':
      dryRun = true;
      break;
    case '--from':
      fromTag = args[++i];
      break;
  }
}

if (!version) {
  console.error('Error: --version es requerido');
  console.error('Usa --help para más información');
  process.exit(1);
}

if (!fromTag) {
  fromTag = getLatestTag() || undefined;
}

const commits = getCommits(fromTag || 'HEAD');

if (commits.length === 0) {
  console.log('No hay commits para agregar al changelog.');
  process.exit(0);
}

const entry = generateEntry(version, commits);

if (!entry) {
  console.log('No se pudo generar una entrada de changelog válida.');
  process.exit(1);
}

const formattedEntry = formatEntry(entry);

if (dryRun) {
  console.log('─────────────────────────────────────────────────────────────');
  console.log('                DRY RUN - No se escribirá el archivo');
  console.log('─────────────────────────────────────────────────────────────\n');
  console.log(formattedEntry);
  console.log(`\nArchivo de salida: ${outputFile}`);
  console.log(`Commits incluidos: ${commits.length}`);
} else {
  updateChangelog(entry, outputFile);
  console.log(`✓ CHANGELOG actualizado en: ${outputFile}`);
  console.log(`✓ Versión: ${version} (${commits.length} commits)`);
  console.log(`✓ Fecha: ${entry.date}`);
  console.log('\nSecciones incluidas:');
  for (const section of entry.sections) {
    console.log(`  - ${section.title.replace('### ', '')}: ${section.commits.length} cambio(s)`);
  }
}
