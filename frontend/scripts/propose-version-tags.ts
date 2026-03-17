#!/usr/bin/env tsx
// @ts-nocheck
/**
 * Propón una tabla de tags (v0.1.0, v0.2.0, v1.0.0) con sus criterios y riesgos.
 */

import { execSync } from 'child_process';

interface Commit {
  hash: string;
  message: string;
}

interface VersionProposal {
  current: string;
  proposed: string;
  increment: 'major' | 'minor' | 'patch';
  confidence: 'high' | 'medium' | 'low';
  criteria: string[];
  risks: string[];
  recommendations: string[];
}

interface ConventionalCommit {
  type: 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'perf' | 'test' | 'chore' | 'ci' | 'build' | 'revert';
  scope?: string;
  breaking: boolean;
  description: string;
}

function getCurrentVersion(): string {
  try {
    return execSync('git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"', { encoding: 'utf-8' }).trim();
  } catch {
    return 'v0.0.0';
  }
}

function parseVersion(version: string): { major: number; minor: number; patch: number } {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)/);
  if (!match) return { major: 0, minor: 0, patch: 0 };
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
}

function bumpVersion(version: string, increment: 'major' | 'minor' | 'patch'): string {
  const parsed = parseVersion(version);
  switch (increment) {
    case 'major':
      parsed.major++;
      parsed.minor = 0;
      parsed.patch = 0;
      break;
    case 'minor':
      parsed.minor++;
      parsed.patch = 0;
      break;
    case 'patch':
      parsed.patch++;
      break;
  }
  return `v${parsed.major}.${parsed.minor}.${parsed.patch}`;
}

function getCommitsSince(fromTag: string): Commit[] {
  try {
    const output = execSync(`git log ${fromTag}..HEAD --pretty=format:"%H|%s"`, { encoding: 'utf-8' });
    const lines = output.trim().split('\n').filter(Boolean);
    return lines.map((line: string) => {
      const [hash, message] = line.split('|');
      return { hash, message };
    });
  } catch {
    return [];
  }
}

function parseConventionalCommit(message: string): ConventionalCommit | null {
  const conventionalRegex = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/;
  const match = message.match(conventionalRegex);
  if (!match) return null;
  const type = match[1] as ConventionalCommit['type'];
  const breaking = !!match[3];
  return { type, scope: match[2], breaking, description: match[4] };
}

function analyzeCommits(commits: Commit[]): {
  features: number;
  fixes: number;
  breaking: number;
  others: number;
  hasBreaking: boolean;
} {
  let features = 0;
  let fixes = 0;
  let breaking = 0;
  let others = 0;
  let hasBreaking = false;

  for (const commit of commits) {
    const parsed = parseConventionalCommit(commit.message);
    if (parsed) {
      if (parsed.breaking) {
        breaking++;
        hasBreaking = true;
      } else if (parsed.type === 'feat') {
        features++;
      } else if (parsed.type === 'fix') {
        fixes++;
      } else {
        others++;
      }
    } else {
      const lower = commit.message.toLowerCase();
      if (lower.includes('breaking') || lower.includes('incompatible') || lower.includes('!')) {
        breaking++;
        hasBreaking = true;
      } else if (lower.includes('add') || lower.includes('new') || lower.includes('feat')) {
        features++;
      } else if (lower.includes('fix') || lower.includes('bug') || lower.includes('error')) {
        fixes++;
      } else {
        others++;
      }
    }
  }
  return { features, fixes, breaking, others, hasBreaking };
}

function determineIncrementType(analysis: ReturnType<typeof analyzeCommits>): 'major' | 'minor' | 'patch' {
  if (analysis.hasBreaking) return 'major';
  if (analysis.features > 0) return 'minor';
  return 'patch';
}

function generateProposal(
  currentVersion: string,
  commits: Commit[],
  forcedIncrement?: 'major' | 'minor' | 'patch'
): VersionProposal {
  const analysis = analyzeCommits(commits);
  const increment = forcedIncrement || determineIncrementType(analysis);
  const proposed = bumpVersion(currentVersion, increment);

  let confidence: 'high' | 'medium' | 'low' = 'medium';
  if (forcedIncrement) {
    confidence = 'high';
  } else if (analysis.hasBreaking) {
    confidence = 'high';
  } else if (analysis.features > 0 && analysis.fixes === 0 && analysis.others === 0) {
    confidence = 'high';
  } else if (analysis.fixes > 0 && analysis.features === 0 && analysis.others < 3) {
    confidence = 'high';
  }

  const criteria: string[] = [];
  if (increment === 'major') {
    criteria.push('Cambios breaking en la API pública');
    criteria.push('Incompatibilidad con versiones anteriores');
    if (analysis.breaking > 0) criteria.push(`${analysis.breaking} commits con indicador de breaking`);
  } else if (increment === 'minor') {
    criteria.push(`${analysis.features} nueva(s) funcionalidad(es) añadida(s)`);
    criteria.push('Backward compatible con versiones anteriores');
    if (analysis.fixes > 0) criteria.push(`${analysis.fixes} corrección(es) incluida(s)`);
  } else {
    criteria.push(`${analysis.fixes} corrección(es) de bugs`);
    criteria.push('Sin nuevas funcionalidades');
    criteria.push('Backward compatible');
  }

  const risks: string[] = [];
  if (increment === 'major') {
    risks.push('Necesita actualización de código de los usuarios');
    risks.push('Posible interrupción en integraciones existentes');
    risks.push('Requiere documentación de migración');
  } else if (increment === 'minor') {
    risks.push('Riesgo bajo, cambios backwards compatible');
    if (analysis.features > 5) risks.push('Muchas features en una sola versión');
  } else {
    risks.push('Riesgo mínimo');
    if (analysis.features > 0) risks.push('Features marcadas como patch (considerar minor)');
  }

  const recommendations: string[] = [];
  if (confidence === 'low') {
    recommendations.push('Revisar manualmente los commits para confirmar el tipo de versión');
  }
  if (analysis.breaking > 0 && increment !== 'major') {
    recommendations.push('DETECTADO: Hay commits breaking pero el incremento no es major');
    recommendations.push('Recomendación: Forzar --bump major');
  }
  if (analysis.features > 10) {
    recommendations.push('Considerar dividir en múltiples releases');
  }
  if (commits.length === 0) {
    recommendations.push('No hay commits desde la última versión');
  }

  return { current: currentVersion, proposed, increment, confidence, criteria, risks, recommendations };
}

function formatProposal(proposal: VersionProposal, commits: Commit[]): string {
  const icon = { high: '🟢', medium: '🟡', low: '🔴' };
  let output = '';

  output += `Propuesta de Versión\n`;
  output += `===================\n\n`;
  output += `Versión actual:     ${proposal.current}\n`;
  output += `Versión propuesta:  ${proposal.proposed}\n`;
  output += `Tipo de incremento: ${proposal.increment.toUpperCase()}\n`;
  output += `Confianza:          ${icon[proposal.confidence]} ${proposal.confidence.toUpperCase()}\n`;

  output += `\nCriterios\n`;
  output += `---------\n`;
  for (const criterion of proposal.criteria) {
    output += `✓ ${criterion}\n`;
  }

  output += `\nRiesgos\n`;
  output += `-------\n`;
  for (const risk of proposal.risks) {
    output += `⚠ ${risk}\n`;
  }

  if (proposal.recommendations.length > 0) {
    output += `\nRecomendaciones\n`;
    output += `---------------\n`;
    for (const rec of proposal.recommendations) {
      output += `💡 ${rec}\n`;
    }
  }

  output += `\nCommits Analizados\n`;
  output += `------------------\n`;
  output += `Total: ${commits.length} commits\n\n`;
  for (const commit of commits.slice(0, 10)) {
    const shortHash = commit.hash.substring(0, 8);
    output += `  ${shortHash}  ${commit.message}\n`;
  }
  if (commits.length > 10) {
    output += `  ... y ${commits.length - 10} más\n`;
  }

  return output;
}

// CLI
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Propón una tabla de tags (v0.1.0, v0.2.0, v1.0.0) con sus criterios y riesgos.

Uso:
  npx tsx scripts/propose-version-tags.ts                    # Analiza commits recientes
  npx tsx scripts/propose-version-tags.ts --from v0.1.0     # Desde una tag específica
  npx tsx scripts/propose-version-tags.ts --bump major      # Forzar tipo de incremento

Opciones:
  --from TAG         Analiza commits desde esta tag (default: última tag)
  --bump TYPE        Forzar tipo: major, minor, o patch
  --help             Muestra esta ayuda
`);
  process.exit(0);
}

let fromTag = getCurrentVersion();
let forcedIncrement: 'major' | 'minor' | 'patch' | undefined;

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--from':
      fromTag = args[++i];
      break;
    case '--bump':
      const bumpType = args[++i];
      if (['major', 'minor', 'patch'].includes(bumpType)) {
        forcedIncrement = bumpType as 'major' | 'minor' | 'patch';
      }
      break;
  }
}

const commits = getCommitsSince(fromTag);
const proposal = generateProposal(fromTag, commits, forcedIncrement);
console.log(formatProposal(proposal, commits));
